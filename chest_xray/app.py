from flask import Flask, render_template, request
import os
from classifier import classify_image

app = Flask(__name__)

# Ensure 'static/uploads' directory exists
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return {"error": "No file part"}, 400

    file = request.files["file"]
    if file.filename == "":
        return {"error": "No selected file"}, 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)
    
    # Perform classification
    top_predictions = classify_image(file_path)
    
    return {"predictions": top_predictions, "image_path": file_path}



if __name__ == "__main__":
    app.run(debug=True)