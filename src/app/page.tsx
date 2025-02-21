'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/components/ui/Auth";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    if (authStatus === "true") {
      setIsLoggedIn(true);
      router.push("/lessonplanner");
    }
  }, [router]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Auth onLogin={handleLogin} />
    </div>
  );
}
