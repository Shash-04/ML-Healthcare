from flask import Flask, request, jsonify, render_template
import pandas as pd
import tensorflow as tf
import joblib

app = Flask(__name__)

# Load model and scaler
MODEL_PATH = "cardio_model.keras"
SCALER_PATH = "scaler.pkl"
model = tf.keras.models.load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

def predict_cardiovascular_disease(data):
    data_df = pd.DataFrame([data])
    scaled_data = scaler.transform(data_df)
    prediction = model.predict(scaled_data)[0][0]
    return round(prediction, 4)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_data = {key: float(request.form[key]) for key in request.form}
        prediction = predict_cardiovascular_disease(user_data)
        result = "Likely" if prediction > 0.5 else "Unlikely"
        return render_template("heart.html", prediction=prediction, result=result)
    return render_template("heart.html", prediction=None)

if __name__ == "__main__":
    app.run(debug=True)
