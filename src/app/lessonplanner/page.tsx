'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from 'react-to-print';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LessonCreator } from "@/components/LessonCreator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LessonPlanDrawer } from "@/components/LessonPlanDrawer";
import { RefreshCcw } from "lucide-react";

interface LessonPlan {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function LessonPlanner() {
  const router = useRouter();
  const [savedPlans, setSavedPlans] = useState<LessonPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<LessonPlan | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/");
      return;
    }

    const saved = localStorage.getItem("lessonPlans");
    if (saved) {
      setSavedPlans(JSON.parse(saved));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  const handleSavePlan = (title: string, content: string) => {
    const newPlan: LessonPlan = {
      id: Date.now().toString(),
      title: title.slice(0, 50) + "...",
      content,
      createdAt: new Date().toISOString(),
    };

    const updatedPlans = [...savedPlans, newPlan];
    setSavedPlans(updatedPlans);
    localStorage.setItem("lessonPlans", JSON.stringify(updatedPlans));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePlanClick = (plan: LessonPlan) => {
    setSelectedPlan(plan);
    setIsDrawerOpen(true);
  };

  const handleRefresh = () => {
    // Clear all localStorage items
    localStorage.clear();
    // Reset states
    setSavedPlans([]);
    setSelectedPlan(null);
    setIsDrawerOpen(false);
    // Redirect to login
    router.push('/');
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950"
      >
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_4rem]"
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </div>
      <div className="relative">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Lesson Planner</h1>
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleRefresh} 
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <ThemeToggle />
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-[300px_1fr] gap-8">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="pr-4 space-y-4">
                <h2 className="font-semibold mb-4">Saved Plans</h2>
                {savedPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                      selectedPlan?.id === plan.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => handlePlanClick(plan)}
                  >
                    <h3 className="font-medium text-sm">{plan.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </p>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div>
              <LessonCreator onSavePlan={handleSavePlan} />
            </div>
          </div>
        </div>

        <LessonPlanDrawer
          plan={selectedPlan}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </div>
  );
} 