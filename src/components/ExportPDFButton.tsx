"use client"

import React from 'react'
import { Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface PatientData {
  id: string
  name: string
  bloodReports: {
    parameter: string
    value: number
    unit: string
    normalRange: string
    status: string
    date: string
  }[]
  labReports: {
    testName: string
    result: string
    unit: string
    referenceRange: string
    status: string
    date: string
  }[]
  medications: {
    name: string
    dosage: string
    frequency: string
    startDate: string
  }[]
  allergies: string[]
  recentDiagnosis: string
}

interface ExportButtonProps {
    data: PatientData
  fileName?: string
}

const ExportPDFButton = ({ 
  data, 
  fileName = 'patient_report'
}: ExportButtonProps) => {
  const exportToPDF = () => {
    const doc = new jsPDF()
    
    // Add patient info
    doc.setFontSize(20)
    doc.text('Patient Medical Report', 14, 15)
    
    doc.setFontSize(12)
    doc.text(`Patient Name: ${data.name}`, 14, 25)
    doc.text(`Patient ID: ${data.id}`, 14, 32)
    doc.text(`Recent Diagnosis: ${data.recentDiagnosis}`, 14, 39)
    
    // Add allergies
    doc.setFontSize(14)
    doc.text('Allergies:', 14, 50)
    doc.setFontSize(12)
    doc.text(data.allergies.join(', '), 14, 57)

    // Add blood reports
    doc.setFontSize(14)
    doc.text('Blood Reports:', 14, 70)
    
    const bloodReportHeaders = ['Parameter', 'Value', 'Unit', 'Normal Range', 'Status', 'Date']
    const bloodReportRows = data.bloodReports.map(report => [
      report.parameter,
      report.value.toString(),
      report.unit,
      report.normalRange,
      report.status.toUpperCase(),
      new Date(report.date).toLocaleDateString()
    ])
    
    autoTable(doc, {
      head: [bloodReportHeaders],
      body: bloodReportRows,
      startY: 75,
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    })

    // Add lab reports
    const finalY = (doc as any).lastAutoTable.finalY + 15
    doc.setFontSize(14)
    doc.text('Lab Reports:', 14, finalY)
    
    const labReportHeaders = ['Test Name', 'Result', 'Unit', 'Reference Range', 'Status', 'Date']
    const labReportRows = data.labReports.map(report => [
      report.testName,
      report.result,
      report.unit,
      report.referenceRange,
      report.status.toUpperCase(),
      new Date(report.date).toLocaleDateString()
    ])
    
    autoTable(doc, {
      head: [labReportHeaders],
      body: labReportRows,
      startY: finalY + 5,
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    })

    // Add medications
    const finalY2 = (doc as any).lastAutoTable.finalY + 15
    doc.setFontSize(14)
    doc.text('Current Medications:', 14, finalY2)
    
    const medicationHeaders = ['Medication', 'Dosage', 'Frequency', 'Start Date']
    const medicationRows = data.medications.map(med => [
      med.name,
      med.dosage,
      med.frequency,
      new Date(med.startDate).toLocaleDateString()
    ])
    
    autoTable(doc, {
      head: [medicationHeaders],
      body: medicationRows,
      startY: finalY2 + 5,
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    })
    
    // Save PDF
    doc.save(`${fileName}.pdf`)
  }

  return (
    <Button 
      onClick={exportToPDF}
      className="flex items-center gap-2"
      variant="outline"
    >
      <Download className="h-4 w-4" />
      Export PDF
    </Button>
  )
}

export default ExportPDFButton