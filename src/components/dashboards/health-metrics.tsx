"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Blood Glucose",
      data: [95, 98, 92, 96, 94, 97, 93],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
    {
      label: "Heart Rate",
      data: [72, 75, 71, 73, 70, 74, 72],
      backgroundColor: "rgba(153, 102, 255, 0.5)",
    },
  ],
}

export function HealthMetrics() {
  return (
    <div className="h-[400px]">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Weekly Health Metrics",
            },
          },
        }}
      />
    </div>
  )
}

