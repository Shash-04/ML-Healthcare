import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, FileText, Beaker, Droplets,FlaskConical } from 'lucide-react';

// TypeScript interfaces
interface BloodReport {
  parameter: string;
  value: number | string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low';
  date: string;
}

interface LabReport {
  testName: string;
  result: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'abnormal';
  date: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
}

interface PatientData {
  id: string;
  name: string;
  bloodReports: BloodReport[];
  labReports: LabReport[];
  medications: Medication[];
  allergies: string[];
  recentDiagnosis: string;
}

// Dummy data
const patientData: PatientData = {
  id: "P12345",
  name: "Jane Smith",
  bloodReports: [
    { parameter: "Hemoglobin", value: 14.2, unit: "g/dL", normalRange: "12.0-15.5", status: "normal", date: "2024-02-15" },
    { parameter: "White Blood Cells", value: 7.8, unit: "K/µL", normalRange: "4.5-11.0", status: "normal", date: "2024-02-15" },
    { parameter: "Platelets", value: 140, unit: "K/µL", normalRange: "150-450", status: "low", date: "2024-02-15" },
    { parameter: "Red Blood Cells", value: 4.8, unit: "M/µL", normalRange: "4.0-5.2", status: "normal", date: "2024-02-15" },
    { parameter: "Hematocrit", value: 42, unit: "%", normalRange: "36-46", status: "normal", date: "2024-02-15" }
  ],
  labReports: [
    { testName: "Glucose Fasting", result: "126", unit: "mg/dL", referenceRange: "70-100", status: "abnormal", date: "2024-02-15" },
    { testName: "Creatinine", result: "0.9", unit: "mg/dL", referenceRange: "0.6-1.2", status: "normal", date: "2024-02-15" },
    { testName: "ALT", result: "45", unit: "U/L", referenceRange: "7-56", status: "normal", date: "2024-02-15" },
    { testName: "TSH", result: "2.5", unit: "mIU/L", referenceRange: "0.4-4.0", status: "normal", date: "2024-02-15" }
  ],
  medications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2023-12-01" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2023-11-15" }
  ],
  allergies: ["Penicillin", "Latex"],
  recentDiagnosis: "Type 2 Diabetes"
};

const StatusBadge = ({ status }: { status: 'normal' | 'high' | 'low' | 'abnormal' }) => {
  const colors = {
    normal: "bg-green-500/10 text-green-500",
    abnormal: "bg-red-500/10 text-red-500",
    high: "bg-red-500/10 text-red-500",
    low: "bg-yellow-500/10 text-yellow-500"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

interface ReportTableProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  data: any[];
  columns: string[];
}

const ReportTable: React.FC<ReportTableProps> = ({ title, icon: Icon, data, columns }) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-blue-400" />
        <CardTitle className="text-gray-100">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              {columns.map((column, index) => (
                <th key={index} className="text-left py-3 px-4 text-gray-400 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-800 last:border-0">
                {Object.keys(item).map((key, keyIndex) => (
                  key !== 'status' && (
                    <td key={keyIndex} className="py-3 px-4 text-gray-300">
                      {item[key]}
                    </td>
                  )
                ))}
                <td className="py-3 px-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const PatientOverview = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-950 min-h-screen">
      {/* Patient Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">{patientData.name}</h1>
          <p className="text-gray-400">ID: {patientData.id}</p>
        </div>
      </div>

      {/* Blood Report */}
      <ReportTable
        title="Blood Report"
        icon={Droplets}
        data={patientData.bloodReports}
        columns={["Parameter", "Value", "Unit", "Normal Range", "Date", "Status"]}
      />

      {/* Lab Report */}
      <ReportTable
        title="Laboratory Report"
        icon={Beaker}
        data={patientData.labReports}
        columns={["Test Name", "Result", "Unit", "Reference Range", "Date", "Status"]}
      />

      {/* Medical Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-gray-100">Current Medications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientData.medications.map((med, index) => (
                <div key={index} className="border-b border-gray-800 pb-4 last:border-0">
                  <h4 className="font-semibold text-gray-100">{med.name}</h4>
                  <p className="text-sm text-gray-400">
                    {med.dosage} • {med.frequency}
                    <br />
                    Started: {med.startDate}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-gray-100">Medical Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-100">Recent Diagnosis</h4>
                <p className="text-sm text-gray-400">{patientData.recentDiagnosis}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-100">Allergies</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {patientData.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientOverview;