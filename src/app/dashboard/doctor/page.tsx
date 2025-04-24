"use client";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/lib/getUser";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getUserFromToken();
    console.log("🔑 Loaded user:", u);

    if (!u) {
      console.log("❌ No user token, redirecting to login");
      router.replace("/login");
    } else if (u.role !== "doctor") {
      console.log("🔁 Wrong role, redirecting to patient dashboard");
      router.replace("/dashboard/patient");
    } else {
      setUser(u);
    }

    setLoading(false);
  }, []);

  if (loading || !user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Welcome Dr. {user.name} 👨‍⚕️</h1>
      <p>Your doctor dashboard.</p>
    </div>
  );
}
