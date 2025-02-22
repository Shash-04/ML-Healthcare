import { NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import { Prediction } from "@/lib/db/schema"

export async function GET(req: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    const predictions = await Prediction.find({ userId }).sort({ date: -1 })
    return NextResponse.json(predictions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch predictions" }, { status: 500 })
  }
}

