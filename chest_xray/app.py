from flask import Flask, request, jsonify, send_from_directory, render_template
import os
import pandas as pd
import tensorflow as tf
import joblib
from classifier import classify_image

app = Flask(__name__)

# Upload folder for image classification
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load model and scaler for cardiovascular disease prediction
MODEL_PATH = "cardio_model.keras"
SCALER_PATH = "scaler.pkl"
model = tf.keras.models.load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

def predict_cardiovascular_disease(data):
    data_df = pd.DataFrame([data])
    scaled_data = scaler.transform(data_df)
    prediction = model.predict(scaled_data)[0][0]
    return round(prediction, 4)

# Endpoint for image upload and classification
@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    predictions = classify_image(file_path)
    image_url = f"/uploads/{file.filename}"
    
    return jsonify({"predictions": predictions, "image_url": image_url})

# Serve uploaded images
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# Endpoint for cardiovascular disease prediction via form submission
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_data = {key: float(request.form[key]) for key in request.form}
        prediction = predict_cardiovascular_disease(user_data)
        result = "Likely" if prediction > 0.5 else "Unlikely"
        return render_template("heart.html", prediction=prediction, result=result)
    return render_template("heart.html", prediction=None)

# Endpoint for cardiovascular disease prediction via API
@app.route("/predict", methods=["POST"])
def predict():
    if not request.json:
        return jsonify({"error": "Invalid input"}), 400
    
    user_data = {key: float(value) for key, value in request.json.items()}
    prediction = predict_cardiovascular_disease(user_data)
    result = "Likely" if prediction > 0.5 else "Unlikely"
    
    return jsonify({"prediction": prediction, "result": result})

if __name__ == "__main__":
    app.run(debug=True)