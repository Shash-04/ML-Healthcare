import { useEffect, useState } from "react";
import UserProfile from "@/components/UserProfile";

interface UserData {
  username: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  smokingStatus: string;
  regularExercise: boolean;
  alcoholStatus: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);

  // Replace this with an API call or session fetch in your real app
  useEffect(() => {
    const dummyUser: UserData = {
      username: "JaneSmith",
      age: 28,
      gender: "Female",
      height: "170", // in cm
      weight: "65",  // in kg
      smokingStatus: "Non-smoker",
      regularExercise: true,
      alcoholStatus: "Occasional drinker",
    };
    setUser(dummyUser);
  }, []);

  if (!user) return <div>Loading...</div>;
  return <UserProfile user={user} />;
}
