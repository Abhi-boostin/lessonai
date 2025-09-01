'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LessonPlanHeaderProps {
  title: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export function LessonPlanHeader({ title, isEditing, onToggleEdit }: LessonPlanHeaderProps) {
  return (
    <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lesson Plan: {title}</h1>
        <Button
          onClick={onToggleEdit}
          variant="outline"
          className="bg-background/50 backdrop-blur-sm"
        >
          {isEditing ? "Done Editing" : "Edit Plan"}
        </Button>
      </div>
    </Card>
  );
} 