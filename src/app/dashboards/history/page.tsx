'use client'
import { Key, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function HistoryPage() {
  const { data: session } = useSession();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        if (data.success) {
          setHistory(data.history);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [session]);

  if (!session) {
    return <p className="text-center mt-10 text-red-500">Please sign in to view your history.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Health Report History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((report, index) => (
            <li key={index} className="border p-4 rounded-lg shadow">
              <p className="font-semibold">Created At: {new Date(report.createdAt).toLocaleString()}</p>
              <p>Blood Pressure: {report.healthMetrics.bloodPressure.systolic}/{report.healthMetrics.bloodPressure.diastolic} ({report.healthMetrics.bloodPressure.status})</p>
              <p>Blood Glucose: {report.healthMetrics.bloodGlucose.level} ({report.healthMetrics.bloodGlucose.status})</p>
              <p>Heart Rate: {report.healthMetrics.heartRate.bpm} bpm ({report.healthMetrics.heartRate.status})</p>
              <p>Oxygen Level: {report.healthMetrics.oxygenLevel.percentage}% ({report.healthMetrics.oxygenLevel.status})</p>
              <p className="font-semibold">Lab Reports:</p>
              {report.labReports.length > 0 ? (
                report.labReports.map((lab: { imageUrl: string | undefined; uploadedAt: string | number | Date; }, idx: Key | null | undefined) => (
                  <div key={idx} className="mt-2">
                    <img src={lab.imageUrl} alt="Lab Report" className="w-full max-w-sm rounded-md" />
                    <p className="text-sm text-gray-600">Uploaded At: {new Date(lab.uploadedAt).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>No lab reports available.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
