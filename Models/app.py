from flask import Flask, request, jsonify
import torch
import torch.nn as nn
import numpy as np
from model import AutoEncoder  # Import model class

app = Flask(__name__)

# Load trained PyTorch model (DO NOT retrain)
input_dim = 187  # Adjust based on your dataset
model = AutoEncoder(input_dim)
model.load_state_dict(torch.load('autoencoder_model.pth'))
model.eval()

# Function to preprocess input
def preprocess(data):
    data = np.array(data, dtype=np.float32)
    data = (data - np.min(data)) / (np.max(data) - np.min(data))
    return torch.tensor(data).unsqueeze(0).unsqueeze(0)  # Reshape for model

# Predict function
def predict_anomaly(data):
    with torch.no_grad():
        reconstructed = model(data)
    loss = torch.mean(torch.abs(data - reconstructed))
    return loss.item()

# Define anomaly threshold
THRESHOLD = 0.05

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the ECG Anomaly Detection API"}), 200

@app.route('/predict', methods=['POST'])
def predict():
    req = request.get_json()
    if 'ecg_data' not in req:
        return jsonify({'error': 'Missing ECG data'}), 400

    ecg_data = preprocess(req['ecg_data'])
    loss = predict_anomaly(ecg_data)
    is_anomaly = loss > THRESHOLD

    return jsonify({'loss': float(loss), 'anomaly_detected': bool(is_anomaly)})

if __name__ == '__main__':
    app.run(debug=True)
