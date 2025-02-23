import os
import base64
import json
from flask import Flask, request, render_template, jsonify
from groq import Groq
from dotenv import load_dotenv

# Load API Key
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Flask app
app = Flask(__name__)

# Ensure upload directory exists
UPLOAD_FOLDER = "static/uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Initialize Groq Client
groq_client = Groq(api_key=GROQ_API_KEY)

# Available Groq models
GROQ_MODELS = {
    "vision": "llama-3.2-11b-vision-preview",
    "text": "mixtral-8x7b-32768",  # You can change this to any other Groq text model
}

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def process_vision_request(image_path):
    base64_image = encode_image(image_path)
    
    response = groq_client.chat.completions.create(
        model=GROQ_MODELS["vision"],
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """Please analyze this image and provide information in the following JSON structure:
                        {
                            "extracted_text": "text found in the image",
                            "main_subject": "main subject or topic",
                            "key_elements": ["list of important elements"],
                            "description": "brief description"
                        }"""
                    },
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                ]
            }
        ],
        temperature=0.5,
        max_completion_tokens=1024,
        top_p=1,
        stream=False
    )
    
    try:
        # Try to parse the response as JSON
        return json.loads(response.choices[0].message.content)
    except json.JSONDecodeError:
        # If parsing fails, return a structured format anyway
        return {
            "extracted_text": response.choices[0].message.content,
            "main_subject": "Not specified",
            "key_elements": [],
            "description": "Raw output"
        }

def process_text_request(text_input):
    response = groq_client.chat.completions.create(
        model=GROQ_MODELS["text"],
        messages=[
            {
                "role": "user",
                "content": f"""Analyze the following text and provide information in this JSON structure:
                {{
                    "main_topic": "main topic or subject",
                    "key_points": ["list of key points"],
                    "summary": "brief summary",
                    "sentiment": "positive/negative/neutral"
                }}

                Text: {text_input}"""
            }
        ],
        temperature=0.5,
        max_completion_tokens=1024,
        top_p=1,
        stream=False
    )
    
    try:
        return json.loads(response.choices[0].message.content)
    except json.JSONDecodeError:
        return {
            "main_topic": "Not specified",
            "key_points": [],
            "summary": response.choices[0].message.content,
            "sentiment": "Not analyzed"
        }

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    error = None

    if request.method == "POST":
        # Check if it's an image upload or text input
        if "image" in request.files:
            image = request.files["image"]
            if image.filename == "":
                error = "No file selected!"
            else:
                image_path = os.path.join(UPLOAD_FOLDER, image.filename)
                image.save(image_path)
                result = process_vision_request(image_path)
        
        elif "text" in request.form:
            text_input = request.form["text"]
            if text_input.strip() == "":
                error = "No text provided!"
            else:
                result = process_text_request(text_input)
        
        else:
            error = "No input provided!"

    return render_template("index.html", result=result, error=error)

if __name__ == "__main__":
    app.run(debug=True)