'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";

const Auth = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (credentials: { username: string; password: string }) => {
    if (credentials.username === "abhiboostin" && credentials.password === "abhiboostin123") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/lessonplanner");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Card className="w-[350px] bg-background/20 backdrop-blur-lg border-muted">
      <CardHeader>
        <CardTitle className="text-foreground">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm onSubmit={handleLogin} error={error} />
      </CardContent>
    </Card>
  );
};

export default Auth; 