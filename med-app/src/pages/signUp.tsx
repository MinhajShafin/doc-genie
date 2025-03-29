import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    if (res.ok) {
      alert("Signup successful! You can log in now.");
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="p-6 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input
          className="border p-2 mb-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 mb-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="border p-2 mb-4 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value as "patient" | "doctor")}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button className="bg-blue-500 text-white p-2 w-full rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
