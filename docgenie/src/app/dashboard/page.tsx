"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // redirect to login if not logged in
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    setUser(decoded);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Welcome, {user.name}!</h1>
      <p className="text-gray-600">
        You are logged in as a <strong>{user.role}</strong>.
      </p>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Log Out
      </button>
    </div>
  );
}
