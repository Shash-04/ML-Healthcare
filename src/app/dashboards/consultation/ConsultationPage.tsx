"use client"
import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AnimatedTooltip } from './AnimatedTooltip';

const ConsultationPage = () => {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample doctor data
    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Wilson",
            specialization: "Cardiologist",
            experience: "15 years",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            availability: "Mon-Fri",
            rating: 4.8
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            specialization: "General Physician",
            experience: "12 years",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            availability: "Mon-Sat",
            rating: 4.9
        },
        {
            id: 3,
            name: "Dr. Emily Brooks",
            specialization: "Pediatrician",
            experience: "10 years",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            availability: "Tue-Sat",
            rating: 4.7
        },
        {
            id: 4,
            name: "Dr. Sarah Williams",
            specialization: "General Phsyician",
            experience: "11 years",
            image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
            availability: "Tue-Sat",
            rating: 4.2
        }
    ];

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-900 p-6 flex">
            <div className="max-w-6xl mx-48">
                {/* Header Section */}
                <div className="text-center mb-8  ">
                    <h1 className="text-3xl font-bold text-white mb-4 ">Book A Consultation</h1>
                    <p className="text-gray-400">Connect with our experienced doctors for personalized care</p>
                </div>
                <div className="flex flex-col">
                    {/* Consultation Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">Consultation Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    {/* Personal Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Symptoms */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-white">Symptoms & Concerns</h3>
                                        <textarea
                                            placeholder="Please describe your symptoms or health concerns..."
                                            rows={4}
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Preferred Time */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-white">Preferred Consultation Time</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                <input
                                                    type="date"
                                                    className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                <input
                                                    type="time"
                                                    className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                                    >
                                        Book Consultation
                                    </button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Doctors List */}
                    <div className=" flex items-center justify-center mt-10">
                        <AnimatedTooltip items={doctors.map(doctor => ({
                            id: doctor.id,
                            name: doctor.name,
                            designation: doctor.specialization,
                            image: doctor.image
                        }))} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationPage;