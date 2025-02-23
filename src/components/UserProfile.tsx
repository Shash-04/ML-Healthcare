import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { User as UserIcon, Edit, CigaretteOff, Dumbbell, Wine, Scale, Ruler, Calendar } from "lucide-react";

interface UserProfileProps {
  user: {
    username: string;
    age: number;
    gender: string;
    height: string;
    weight: string;
    smokingStatus: string;
    regularExercise: boolean;
    alcoholStatus: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <UserIcon className="w-6 h-6" />
          My Profile
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info Card */}
          <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{user.username}</h2>
                  <p className="text-gray-400">{user.age} years old</p>
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
                  <p className="text-xl font-semibold text-white">{user.weight} kg</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Height</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{user.height} cm</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Gender</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{user.gender}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Info Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Lifestyle Info</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CigaretteOff className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">Smoking Status</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{user.smokingStatus}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Regular Exercise</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{user.regularExercise ? "Yes" : "No"}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wine className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">Alcohol Consumption</span>
                  </div>
                  <p className="text-xl font-semibold text-white">{user.alcoholStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
