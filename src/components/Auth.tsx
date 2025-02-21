'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "abhiboostin" && password === "abhiboostin123") {
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
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-background/50 backdrop-blur-sm border-muted"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/50 backdrop-blur-sm border-muted"
            />
          </div>
          <Button type="submit" className="w-full bg-primary/80 hover:bg-primary/90">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Auth; 