import { NextResponse } from "next/server"
import dbConnect from "@/lib/db/connect"
import { HealthData } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    await dbConnect()
    const data = await req.json()
    const healthData = await HealthData.create(data)
    return NextResponse.json(healthData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to save health data" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    const healthData = await HealthData.find({ userId }).sort({ date: -1 })
    return NextResponse.json(healthData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch health data" }, { status: 500 })
  }
}

