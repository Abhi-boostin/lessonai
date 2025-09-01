'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { validatePrompt } from "@/lib/utils";

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

export function PromptInput({ prompt, setPrompt, isLoading, onGenerate }: PromptInputProps) {
  const handleSubmit = () => {
    if (validatePrompt(prompt)) {
      onGenerate();
    }
  };

  return (
    <Card className="border-2 relative bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <Textarea
          placeholder="Enter your lesson topic or requirements..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-32 mb-4 bg-background/50 backdrop-blur-sm"
        />
        <Button 
          onClick={handleSubmit} 
          disabled={!validatePrompt(prompt) || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Crafting your lesson plan...</span>
            </div>
          ) : (
            "Generate Lesson Plan"
          )}
        </Button>
      </CardContent>
    </Card>
  );
} 