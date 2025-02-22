import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// 🛑 Add a new health report for a user
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { userId, heartRate, bloodPressure, bloodSugar, healthMetrics } = await req.json();

    // Validate input
    if (!userId || !heartRate || !bloodPressure || !bloodSugar || !healthMetrics) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Create new report entry
    const newReport = {
      heartRate,
      bloodPressure,
      bloodSugar,
      healthMetrics,
      createdAt: new Date(),
    };

    // Push report into user's report array
    user.report.push(newReport);

    await user.save();

    return NextResponse.json(
      { success: true, message: "Health report added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding health report:", error);
    return NextResponse.json(
      { success: false, message: "Error adding health report" },
      { status: 500 }
    );
  }
}

// 🛑 Fetch all health reports for a user
export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Find user and populate reports
    const user = await UserModel.findById(userId).select("report");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, reports: user.report },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching health reports:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching health reports" },
      { status: 500 }
    );
  }
}
