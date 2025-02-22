import os
import base64
import streamlit as st
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq Client
groq_client = Groq(api_key=GROQ_API_KEY)

# Function to encode image as base64
def encode_image(image):
    return base64.b64encode(image.read()).decode("utf-8")

# Streamlit UI
st.title("📝 OCR Text Extraction with AI")

st.markdown("### Upload an image to extract text:")
uploaded_image = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_image:
    st.image(uploaded_image, caption="Uploaded Image", use_container_width=True)  # Fix deprecation warning

    # Convert image to base64
    base64_image = encode_image(uploaded_image)

    # Call Groq API
    with st.spinner("Extracting text..."):
        response = groq_client.chat.completions.create(
            model="llama-3.2-11b-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Extract text from this image"},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                    ]
                }
            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=False
        )

        # ✅ Fix: Access 'content' as an attribute
        extracted_text = response.choices[0].message.content

    # Display extracted text
    st.markdown("### Extracted Text:")
    st.text_area("Text Output", extracted_text, height=200)

    # Option to download text as a file
    st.download_button(
        label="📥 Download Extracted Text",
        data=extracted_text,
        file_name="extracted_text.txt",
        mime="text/plain"
    )
