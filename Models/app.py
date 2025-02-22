from flask import Flask, request, jsonify
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        response = jsonify({"error": "No file part"}), 400
        print(response)  # Print response in the terminal
        return response

    file = request.files["file"]

    if file.filename == "":
        response = jsonify({"error": "No selected file"}), 400
        print(response)  # Print response in the terminal
        return response

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    # Dummy response - replace with actual image classification logic
    response = jsonify({"message": "File uploaded successfully", "file_path": file_path})
    print(response)  # Print response in the terminal
    return response

if __name__ == "__main__":
    app.run(debug=True)
