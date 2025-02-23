"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HealthProfileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    smokingStatus: "",
    regularExercise: "",
    alcoholStatus: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(formData.age),
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          smokingStatus: formData.smokingStatus,
          regularExercise: formData.regularExercise === "true",
          alcoholStatus: formData.alcoholStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setMessage(data.message);
      router.push("/profile"); // Redirect to the profile page after successful update
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Health Profile</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="p-2 border rounded w-full"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height (cm)"
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          required
          className="p-2 border rounded w-full"
        />
        <select
          name="smokingStatus"
          value={formData.smokingStatus}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        >
          <option value="">Smoking Status</option>
          <option value="Non-smoker">Non-smoker</option>
          <option value="Occasional smoker">Occasional smoker</option>
          <option value="Regular smoker">Regular smoker</option>
        </select>
        <select
          name="regularExercise"
          value={formData.regularExercise}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        >
          <option value="">Regular Exercise?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select
          name="alcoholStatus"
          value={formData.alcoholStatus}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        >
          <option value="">Alcohol Status</option>
          <option value="Non-drinker">Non-drinker</option>
          <option value="Occasional drinker">Occasional drinker</option>
          <option value="Regular drinker">Regular drinker</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
