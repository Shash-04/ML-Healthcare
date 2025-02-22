import numpy as np
import tensorflow as tf
import cv2
import os

# Load the model once to avoid reloading on every request
model = tf.keras.models.load_model('model_wts.keras', compile=False)

# Define class labels
labels = [
    'Cardiomegaly', 'Emphysema', 'Effusion', 'No Finding', 'Hernia', 
    'Infiltration', 'Mass', 'Nodule', 'Atelectasis', 'Pneumothorax', 
    'Pleural_Thickening', 'Pneumonia', 'Fibrosis', 'Edema', 'Consolidation'
]

def classify_image(image_path):
    """
    Classifies an uploaded chest X-ray image and returns top 3 predictions.
    
    Args:
        image_path (str): Path to the uploaded image.
    
    Returns:
        list: Top 3 predicted labels with probabilities.
    """
    
    # Load and preprocess the image
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB
    img = cv2.resize(img, (256, 256))  # Resize to match model input
    img = img / 255.0  # Normalize pixel values
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    
    # Predict using the model
    predictions = model.predict(img)[0]
    
    # Convert predictions to a sorted dictionary (descending order)
    results = {labels[i]: float(predictions[i]) for i in range(len(labels))}
    sorted_results = sorted(results.items(), key=lambda item: item[1], reverse=True)
    
    # Return top 3 predictions
    return sorted_results[:3]
