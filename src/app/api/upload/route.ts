import { NextRequest, NextResponse } from "next/server";

const FLASK_API_URL = "http://127.0.0.1:5000/upload"; // Your Flask backend URL

export async function POST(req: NextRequest) {
    try {
      
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert File to Buffer for sending to Flask backend
        const buffer = await file.arrayBuffer();
        const blob = new Blob([buffer], { type: file.type });
        const backendFormData = new FormData();
        backendFormData.append("file", blob, file.name);

        // Send file to Flask API
        const flaskResponse = await fetch(FLASK_API_URL, {
            method: "POST",
            body: backendFormData,
        });

        if (!flaskResponse.ok) {
            return NextResponse.json({ error: "Flask API error" }, { status: flaskResponse.status });
        }

        const flaskData = await flaskResponse.json();
        console.log(flaskData)
        return NextResponse.json(flaskData);
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}