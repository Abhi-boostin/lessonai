'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useReactToPrint } from 'react-to-print';
import { generateLessonPlan } from "@/lib/gemini";

interface LessonPlan {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function LessonPlanner() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [savedPlans, setSavedPlans] = useState<LessonPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/");
      return;
    }

    // Load saved plans from localStorage
    const saved = localStorage.getItem("lessonPlans");
    if (saved) {
      setSavedPlans(JSON.parse(saved));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  const generatePlan = async () => {
    setIsLoading(true);
    try {
      const response = await generateLessonPlan(prompt);
      setGeneratedPlan(response);
    } catch (error) {
      console.error("Error generating plan:", error);
      // Add error handling UI if needed
    } finally {
      setIsLoading(false);
    }
  };

  const savePlan = () => {
    if (!generatedPlan) return;

    const newPlan: LessonPlan = {
      id: Date.now().toString(),
      title: prompt.slice(0, 50) + "...",
      content: generatedPlan,
      createdAt: new Date().toISOString(),
    };

    const updatedPlans = [...savedPlans, newPlan];
    setSavedPlans(updatedPlans);
    localStorage.setItem("lessonPlans", JSON.stringify(updatedPlans));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 bg-secondary/10">
        <div className="flex flex-col h-full">
          <h2 className="text-lg font-bold mb-4">Saved Plans</h2>
          <div className="flex-grow overflow-auto">
            {savedPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-3 mb-2 bg-card rounded-lg cursor-pointer hover:bg-accent/20"
                onClick={() => {
                  setPrompt(plan.title);
                  setGeneratedPlan(plan.content);
                }}
              >
                <h3 className="font-medium text-sm">{plan.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          <Button onClick={handleLogout} variant="outline" className="mt-4">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="max-w-3xl mx-auto w-full">
          <Textarea
            placeholder="Enter your lesson plan topic or requirements..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mb-4 h-32"
          />
          <div className="flex gap-2 mb-6">
            <Button onClick={generatePlan} disabled={!prompt || isLoading}>
              {isLoading ? "Generating..." : "Generate Plan"}
            </Button>
          </div>

          {generatedPlan && (
            <Card>
              <CardContent className="p-6" ref={printRef}>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap">{generatedPlan}</pre>
                </div>
              </CardContent>
              <div className="flex gap-2 p-4 border-t">
                <Button onClick={savePlan} variant="outline">
                  Save Plan
                </Button>
                <Button onClick={handlePrint} variant="outline">
                  Download PDF
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 