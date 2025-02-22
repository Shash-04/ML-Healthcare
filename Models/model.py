
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

# Mount Google Drive to access dataset
# from google.colab import drive
# drive.mount('/content/drive')

# Load dataset (update path accordingly)
normal_df = pd.read_csv('E:/ML-Healthcare/Models/data/ptbdb_normal.csv').iloc[:, :-1]
anomaly_df = pd.read_csv('E:/ML-Healthcare/Models/data/ptbdb_abnormal.csv').iloc[:, :-1]

# Prepare data
normal = normal_df.to_numpy()
anomaly = anomaly_df.to_numpy()
X_train, X_test = train_test_split(normal, test_size=0.15, random_state=45, shuffle=True)

# Normalize data
def normalize(tensor):
    return (tensor - tensor.min()) / (tensor.max() - tensor.min())

X_train, X_test, anomaly = map(lambda x: torch.tensor(x, dtype=torch.float32), [X_train, X_test, anomaly])
X_train, X_test, anomaly = map(normalize, [X_train, X_test, anomaly])

# Define PyTorch Autoencoder model
class AutoEncoder(nn.Module):
    def __init__(self, input_dim, latent_dim=32):
        super(AutoEncoder, self).__init__()
        self.encoder = nn.Sequential(
            nn.Conv1d(1, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm1d(128),
            nn.MaxPool1d(kernel_size=2, stride=2, padding=1),  # ✅ Added padding

            nn.Conv1d(128, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm1d(64),
            nn.MaxPool1d(kernel_size=2, stride=2, padding=1),  # ✅ Added padding

            nn.Conv1d(64, latent_dim, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.BatchNorm1d(latent_dim)
        )

        self.decoder = nn.Sequential(
            nn.ConvTranspose1d(latent_dim, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Upsample(size=46, mode='linear', align_corners=True),  # ✅ Fixes sequence length

            nn.ConvTranspose1d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Upsample(size=93, mode='linear', align_corners=True),  # ✅ Fixes sequence length

            nn.Conv1d(128, 1, kernel_size=3, padding=1),
            nn.Upsample(size=187, mode='linear', align_corners=True)  # ✅ Ensures exact 187 length
        )

    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded

# Train model
input_dim = X_train.shape[1]
model = AutoEncoder(input_dim)
criterion = nn.L1Loss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

X_train = X_train.unsqueeze(1)  # Add channel dimension

model.train()
for epoch in range(10):  # Train for 10 epochs
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, X_train)
    loss.backward()
    optimizer.step()
    print(f'Epoch [{epoch+1}/10], Loss: {loss.item():.4f}')

# Save model
torch.save(model.state_dict(), 'autoencoder_model.pth')
print("Model training complete and saved.")

# Load and test model
loaded_model = AutoEncoder(input_dim)
loaded_model.load_state_dict(torch.load('autoencoder_model.pth'))
loaded_model.eval()

# Test on sample data
def predict_anomaly(model, data):
    with torch.no_grad():
        reconstructed = model(data.unsqueeze(0).unsqueeze(0))
    loss = torch.mean(torch.abs(data - reconstructed))
    return loss.item()

sample_data = X_test[0]
anomaly_score = predict_anomaly(loaded_model, sample_data)
print(f"Anomaly Score: {anomaly_score}")
