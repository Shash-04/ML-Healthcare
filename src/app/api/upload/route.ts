
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { Readable } from 'stream';

export async function POST(req: NextRequest) {
  try {
    // Connect to database using your implementation
    await dbConnect();
    console.log("Database connection established");

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Log file details for debugging
    console.log("File received:", {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Validate file type
    if (!file.type.match(/^(image\/(jpeg|png|jpg)|application\/pdf)$/)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG and PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with more detailed options
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'health-reports',
          resource_type: 'auto',
          allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
          transformation: file.type.startsWith('image/') ? [
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ] : undefined
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      const stream = Readable.from(buffer);
      stream.pipe(uploadStream);
    });

    const result = await uploadPromise as any;
    console.log("File uploaded to Cloudinary:", result.secure_url);

    // Find and update user
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const newLabReport = {
      imageUrl: result.secure_url,
      uploadedAt: new Date()
    };

    // Add lab report to user's health reports
    if (!user.healthReports.length) {
      user.healthReports.push({
        healthMetrics: {
          bloodPressure: { systolic: 120, diastolic: 80, status: "Normal range" },
          bloodGlucose: { level: 90, status: "Fasting" },
          heartRate: { bpm: 70, status: "Resting" },
          oxygenLevel: { percentage: 98, status: "SpO2" },
          healthTrends: []
        },
        labReports: [newLabReport],
        createdAt: new Date()
      });
    } else {
      user.healthReports[user.healthReports.length - 1].labReports.push(newLabReport);
    }

    await user.save();
    console.log("User document updated successfully");

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      fileDetails: {
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: newLabReport.uploadedAt
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { error: 'Error uploading file', details: errorMessage },
      { status: 500 }
    );
  }
}
