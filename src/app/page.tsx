'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/components/Auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Auth />
      </div>
    </div>
  );
}
