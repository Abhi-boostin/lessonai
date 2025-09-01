'use client';

import { Button } from "@/components/ui/button";

interface LessonPlanActionsProps {
  onDownloadPDF: () => void;
  onSavePlan: () => void;
}

export function LessonPlanActions({ onDownloadPDF, onSavePlan }: LessonPlanActionsProps) {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <Button 
        onClick={onDownloadPDF}
        variant="outline"
        className="bg-background/50 backdrop-blur-sm"
      >
        Download PDF
      </Button>
      <Button 
        onClick={onSavePlan}
        variant="default"
        className="transform transition-all duration-200 hover:scale-105 hover:bg-primary/90 hover:shadow-lg active:scale-95"
      >
        Save Plan
      </Button>
    </div>
  );
} 