'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Auth = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      onLogin();
      router.push("/lessonplanner");
    }
  }, [onLogin, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "abhiboostin" && password === "abhiboostin123") {
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
      router.push("/lessonplanner");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth; 