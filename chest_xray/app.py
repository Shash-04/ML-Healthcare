from flask import Flask, render_template, request
import os
from classifier import classify_image

app = Flask(__name__)

# Ensure 'static/uploads' directory exists
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Check if a file was uploaded
        if "file" not in request.files:
            return render_template("index.html", error="No file part")

        file = request.files["file"]

        if file.filename == "":
            return render_template("index.html", error="No selected file")

        # Save the uploaded file
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(file_path)

        # Perform classification
        top_predictions = classify_image(file_path)

        return render_template("index.html", predictions=top_predictions, image_path=file_path)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)