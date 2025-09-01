'use client';

import { Button } from "@/components/ui/button";
import {
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { LessonPlan } from "../../../types";

interface DrawerFooterProps {
  plan: LessonPlan;
  onDelete: (title: string) => void;
  onDownloadPDF: () => void;
}

export function DrawerFooterComponent({ plan, onDelete, onDownloadPDF }: DrawerFooterProps) {
  return (
    <DrawerFooter className="border-t">
      <div className="flex gap-2">
        <Button 
          onClick={onDownloadPDF}
          variant="outline"
          className="bg-background/50 backdrop-blur-sm"
        >
          Download PDF
        </Button>
        <Button 
          onClick={() => onDelete(plan.title)}
          variant="destructive"
          className="bg-destructive/90 hover:bg-destructive"
        >
          Delete
        </Button>
        <DrawerClose asChild>
          <Button variant="outline" className="flex-1">
            Close
          </Button>
        </DrawerClose>
      </div>
    </DrawerFooter>
  );
} 