'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

export function LoginCredentials() {
  return (
    <div className="fixed bottom-4 right-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <KeyRound className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60" align="end">
          <div className="space-y-2">
            <h4 className="font-medium">Login Credentials</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Username: <span className="font-mono">abhiboostin</span></p>
              <p>Password: <span className="font-mono">abhiboostin123</span></p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 