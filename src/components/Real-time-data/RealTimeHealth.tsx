'use client';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HealthData {
  heart_rate: number;
  oxygen_saturation: number;
  steps: number;
  timestamp: string;
}

export default function RealTimeHealth() {
  const [data, setData] = useState<HealthData | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/fitbit-dummy-data');

    eventSource.onmessage = (event) => {
      const newData: HealthData = JSON.parse(event.data);
      setData(newData);

      // Toast notifications instead of alerts
      if (newData.heart_rate > 120) {
        toast.error('🚨 High Heart Rate Detected! Consult a doctor.');
      }
      if (newData.oxygen_saturation < 94) {
        toast.warn('⚠️ Low Oxygen Levels! Take precautions.');
      }
    };

    return () => eventSource.close(); // Cleanup when component unmounts
  }, []);

  return (
    <div className='p-4  rounded-lg shadow-lg text-center'>
      <h2 className='text-xl font-bold'>📡 Real-Time Health Data</h2>
      {data ? (
        <>
          <p>💓 Heart Rate: {data.heart_rate} BPM</p>
          <p>🫁 SpO2: {data.oxygen_saturation} %</p>
          <p>👟 Steps: {data.steps}</p>
          <p>⏳ Timestamp: {data.timestamp}</p>
        </>
      ) : (
        <p>Loading real-time data...</p>
      )}
      <ToastContainer />
    </div>
  );
}
