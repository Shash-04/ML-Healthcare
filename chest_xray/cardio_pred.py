import pandas as pd
import numpy as np
import tensorflow as tf
import joblib

# Load the trained model
def load_model(model_path):
    return tf.keras.models.load_model(model_path)

# Load the scaler
def load_scaler(scaler_path):
    return joblib.load(scaler_path)

# Function to predict cardiovascular disease
def predict_cardiovascular_disease(model, scaler, new_data):
    if not isinstance(new_data, pd.DataFrame):
        new_data = pd.DataFrame([new_data])
    
    # Scale the new data
    new_data_scaled = scaler.transform(new_data)
    
    # Make prediction
    prediction = model.predict(new_data_scaled)
    
    return prediction[0][0]
