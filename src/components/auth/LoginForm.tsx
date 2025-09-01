'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthState } from "../../../types";

interface LoginFormProps {
  onSubmit: (credentials: { username: string; password: string }) => void;
  error: string;
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [formState, setFormState] = useState<AuthState>({
    username: "",
    password: "",
    error: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      username: formState.username,
      password: formState.password
    });
  };

  const updateField = (field: keyof AuthState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={(e) => updateField('username', e.target.value)}
          required
          className="bg-background/50 backdrop-blur-sm border-muted"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) => updateField('password', e.target.value)}
          required
          className="bg-background/50 backdrop-blur-sm border-muted"
        />
      </div>
      <Button type="submit" className="w-full bg-primary/80 hover:bg-primary/90">
        Login
      </Button>
    </form>
  );
} 