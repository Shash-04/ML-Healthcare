import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: "Next.js API is working!" }, { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create a new FormData object to send to Flask
        const flaskFormData = new FormData();
        flaskFormData.append("file", new Blob([buffer], { type: file.type }), file.name);

        // Send the file to Flask
        const flaskResponse = await fetch("http://127.0.0.1:5000/", {
            method: "POST",
            body: flaskFormData,
        });

        if (!flaskResponse.ok) {
            return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
        }

        const data = await flaskResponse.json();
        console.log(data)
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
