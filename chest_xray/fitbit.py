import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def load_data():
    file_path = "dailyActivity_merged.csv"  # Ensure the file is uploaded
    df = pd.read_csv(file_path, parse_dates=['ActivityDate'])
    df['DayOfWeek'] = df['ActivityDate'].dt.day_name()
    return df

def plot_steps_vs_calories(df):
    fig, ax = plt.subplots(figsize=(8,6))
    sns.scatterplot(x=df['TotalSteps'], y=df['Calories'], hue=df['Calories'], palette='coolwarm', ax=ax)
    ax.set_title("Total Steps vs Calories Burned")
    st.pyplot(fig)

def plot_activity_distribution(df):
    labels = ['Very Active', 'Fairly Active', 'Lightly Active', 'Sedentary']
    minutes = [df['VeryActiveMinutes'].sum(), df['FairlyActiveMinutes'].sum(), df['LightlyActiveMinutes'].sum(), df['SedentaryMinutes'].sum()]
    fig, ax = plt.subplots()
    ax.pie(minutes, labels=labels, autopct='%1.1f%%', explode=[0.1, 0.1, 0.05, 0.05], colors=['red', 'orange', 'yellow', 'gray'])
    ax.set_title("Activity Distribution")
    st.pyplot(fig)

def plot_correlation_heatmap(df):
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.heatmap(df.corr(), annot=True, cmap='coolwarm', ax=ax)
    ax.set_title("Correlation Heatmap")
    st.pyplot(fig)

def plot_daily_trends(df):
    if 'DayOfWeek' not in df.columns:
        df['DayOfWeek'] = df['ActivityDate'].dt.day_name()
    df_grouped = df.groupby('DayOfWeek').mean()
    fig, ax = plt.subplots(figsize=(10, 5))
    sns.lineplot(data=df_grouped[['TotalSteps', 'Calories']], markers=True, ax=ax)
    ax.set_title("Daily Trends in Steps and Calories")
    ax.set_ylabel("Average Value")
    st.pyplot(fig)

def detect_anomalies(df):
    threshold = df['TotalSteps'].mean() + 2 * df['TotalSteps'].std()
    anomalies = df[df['TotalSteps'] > threshold]
    st.write("### Anomalies in Step Count")
    st.dataframe(anomalies[['ActivityDate', 'TotalSteps', 'Calories']])

def main():
    st.title("🏥 FitTrack - AI-Powered Health Dashboard")
    st.sidebar.header("Upload Your Fitbit Data")
    uploaded_file = st.sidebar.file_uploader("Upload CSV File", type=["csv"])
    
    if uploaded_file is not None:
        df = pd.read_csv(uploaded_file, parse_dates=['ActivityDate'])
        df['DayOfWeek'] = df['ActivityDate'].dt.day_name()
        st.write("### Preview of Data")
        st.dataframe(df.head())
        
        st.write("### Steps vs Calories Burned")
        plot_steps_vs_calories(df)
        
        st.write("### Activity Time Distribution")
        plot_activity_distribution(df)
        
        st.write("### Correlation Heatmap")
        plot_correlation_heatmap(df)
        
        st.write("### Daily Trends in Steps and Calories")
        plot_daily_trends(df)
        
        detect_anomalies(df)
    else:
        st.warning("Please upload a CSV file to proceed.")

if __name__ == "__main__":
    main()
