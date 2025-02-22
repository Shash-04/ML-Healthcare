import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    start(controller) {
      const sendData = () => {
        // Simulate realistic human data
        const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Resting heart rate (60–100 BPM)
        const oxygenSaturation = (Math.random() * (100 - 95) + 95).toFixed(1); // Normal SpO2 (95–100%)
        const steps = Math.floor(Math.random() * 200); // Steps per minute (0–200 steps)
        const timestamp = new Date().toISOString();

        const healthData = {
          heart_rate: heartRate,
          oxygen_saturation: oxygenSaturation,
          steps: steps,
          timestamp: timestamp,
        };

        // Format for Server-Sent Events
        const dataString = `data: ${JSON.stringify(healthData)}\n\n`; 
        controller.enqueue(encoder.encode(dataString));
      };

      // Send the first response immediately      sendData();

      // Stream data every minute (60000 ms)
      const interval = setInterval(sendData, 4500);

      // Cleanup function when client disconnects
      controller.close = () => clearInterval(interval);
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream', // Correct MIME type for EventSource
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
