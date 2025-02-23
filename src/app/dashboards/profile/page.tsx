import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { User, Heart, Activity, Scale, Ruler, Calendar, Edit } from 'lucide-react';

const UserProfile = () => {
  const profile = {
    name: "Jane Smith",
    age: 28,
    height: "5'10",
    weight: "165 lbs",
    bmi: 23.7,
    bloodType: "A+",
    healthMetrics: {
      avgHeartRate: "87 BPM",
      avgBloodOxygen: "95.4%",
      avgStepsDaily: "8,500"
    },
    goals: {
      dailySteps: "10,000",
      activeMinutes: "30",
      sleepHours: "8"
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <User className="w-6 h-6" />
          My Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info Card */}
          <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
                  <p className="text-gray-400">{profile.age} years old</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <Edit className="w-5 h-5 text-gray-400" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Weight</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{profile.weight}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Height</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{profile.height}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">BMI</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{profile.bmi}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Blood Type</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{profile.bloodType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Current Metrics</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="text-gray-400">Heart Rate</p>
                  <p className="text-2xl font-bold text-white">{profile.healthMetrics.avgHeartRate}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="text-gray-400">Blood Oxygen</p>
                  <p className="text-2xl font-bold text-white">{profile.healthMetrics.avgBloodOxygen}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="text-gray-400">Daily Steps</p>
                  <p className="text-2xl font-bold text-white">{profile.healthMetrics.avgStepsDaily}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Goals Card */}
          <Card className="lg:col-span-3 bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">My Health Goals</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="text-gray-400">Daily Steps Target</p>
                  <p className="text-2xl font-bold text-white">{profile.goals.dailySteps}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="text-gray-400">Active Minutes Goal</p>
                  <p className="text-2xl font-bold text-white">{profile.goals.activeMinutes} min</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="text-gray-400">Sleep Goal</p>
                  <p className="text-2xl font-bold text-white">{profile.goals.sleepHours} hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;