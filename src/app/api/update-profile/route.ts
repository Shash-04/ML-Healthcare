import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Adjust import if needed
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { authOptions } from "../auth/[...nextauth]/option";


export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure DB connection

    // Get the logged-in user's session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = session.user;
    const { age, gender, height, weight, smokingStatus, regularExercise, alcoholStatus } = await req.json();

    // Validate input fields
    if (!age || !gender || !height || !weight || !smokingStatus || typeof regularExercise === "undefined" || !alcoholStatus) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Update the user document (or create if not exists)
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { age, gender, height, weight, smokingStatus, regularExercise, alcoholStatus },
      { new: true, upsert: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
