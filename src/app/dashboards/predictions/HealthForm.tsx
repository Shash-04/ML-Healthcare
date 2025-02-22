"use client"
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InfoIcon } from 'lucide-react';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    systolic: '',
    diastolic: '',
    cholesterol: '',
    glucose: '',
    smoking: '',
    alcohol: '',
    exercise: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const calculateBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const analyzeHealthRisks = () => {
    const risks = [];
    const bmi = Number(calculateBMI(Number(formData.height), Number(formData.weight)));

    if (bmi < 18.5) {
      risks.push('You are underweight - this may indicate nutritional deficiencies');
    } else if (bmi >= 25 && bmi < 30) {
      risks.push('You are overweight - this increases risk of cardiovascular diseases');
    } else if (bmi >= 30) {
      risks.push('You are in the obese range - this significantly increases health risks');
    }

    if (Number(formData.systolic) >= 140 || Number(formData.diastolic) >= 90) {
      risks.push('You have high blood pressure - this increases risk of heart disease and stroke');
    } else if (Number(formData.systolic) >= 130 || Number(formData.diastolic) >= 80) {
      risks.push('You have elevated blood pressure - lifestyle changes recommended');
    }

    if (Number(formData.cholesterol) > 200) {
      risks.push('Your cholesterol is high - this increases risk of heart disease');
    }

    if (Number(formData.glucose) > 140) {
      risks.push('Your blood glucose is elevated - this may indicate pre-diabetes');
    }

    if (formData.smoking === '1') {
      risks.push('Smoking significantly increases risk of cancer and heart disease');
    }
    if (formData.alcohol === '1') {
      risks.push('Regular alcohol consumption increases health risks');
    }
    if (formData.exercise === '0') {
      risks.push('Lack of exercise increases risk of various health conditions');
    }
    return risks;
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => value === '')
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      toast.error('Please fill all fields');
      return;
    }

    const healthRisks = analyzeHealthRisks();
    
    if (healthRisks.length === 0) {
      toast.success('Great news! No significant health risks detected. Keep maintaining your healthy lifestyle!', {
        duration: 5000
      });
    } else {
      toast.error(
        <div className="space-y-2">
          <p className="font-bold">Health Risks Detected:</p>
          <ul className="list-disc pl-4">
            {healthRisks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
        </div>,
        { duration: 10000 }
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl h-screen mx-60 bg-slate-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Health Risk Assessment</CardTitle>
        <CardDescription className="text-slate-400">
          Fill in your health metrics below for a comprehensive health risk analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2">
                Age <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Enter your age (18-100)"
                min="18"
                max="100"
                value={formData.age}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="flex items-center gap-2">
                Gender <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="gender"
                name="gender"
                type="number"
                placeholder="0 for Female, 1 for Male"
                min="0"
                max="1"
                value={formData.gender}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2">
                Height <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="height"
                name="height"
                type="number"
                placeholder="Height in cm (e.g., 170)"
                min="120"
                max="220"
                value={formData.height}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2">
                Weight <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                placeholder="Weight in kg (e.g., 70)"
                min="30"
                max="200"
                value={formData.weight}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systolic" className="flex items-center gap-2">
                Systolic BP <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="systolic"
                name="systolic"
                type="number"
                placeholder="Upper BP number (e.g., 120)"
                min="70"
                max="200"
                value={formData.systolic}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diastolic" className="flex items-center gap-2">
                Diastolic BP <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="diastolic"
                name="diastolic"
                type="number"
                placeholder="Lower BP number (e.g., 80)"
                min="40"
                max="130"
                value={formData.diastolic}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cholesterol" className="flex items-center gap-2">
                Cholesterol <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="cholesterol"
                name="cholesterol"
                type="number"
                placeholder="Total cholesterol (mg/dL)"
                min="100"
                max="400"
                value={formData.cholesterol}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="glucose" className="flex items-center gap-2">
                Blood Glucose <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="glucose"
                name="glucose"
                type="number"
                placeholder="Fasting glucose (mg/dL)"
                min="50"
                max="300"
                value={formData.glucose}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smoking" className="flex items-center gap-2">
                Smoking Status <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="smoking"
                name="smoking"
                type="number"
                placeholder="0 for No, 1 for Yes"
                min="0"
                max="1"
                value={formData.smoking}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alcohol" className="flex items-center gap-2">
                Regular Alcohol <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="alcohol"
                name="alcohol"
                type="number"
                placeholder="0 for No, 1 for Yes"
                min="0"
                max="1"
                value={formData.alcohol}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exercise" className="flex items-center gap-2">
                Regular Exercise <InfoIcon className="w-4 h-4 text-slate-400" />
              </Label>
              <Input
                id="exercise"
                name="exercise"
                type="number"
                placeholder="0 for No, 1 for Yes"
                min="0"
                max="1"
                value={formData.exercise}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Analyze Health Risks
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthForm;