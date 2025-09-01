'use client';

import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { generatePDF } from "@/lib/utils";
import { LessonPlanDrawerProps } from "../../../types";
import { DrawerHeaderComponent } from "./DrawerHeader";
import { DrawerContentComponent } from "./DrawerContent";
import { DrawerFooterComponent } from "./DrawerFooter";

export function LessonPlanDrawer({ plan, isOpen, onClose, onDelete }: LessonPlanDrawerProps) {
  const downloadPDF = async () => {
    await generatePDF(
      document.querySelector('[data-content-ref]') as HTMLDivElement,
      `Lesson Plan - ${plan?.title || 'Untitled'}.pdf`
    );
  };

  if (!plan) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <div className="no-print">
          <DrawerHeaderComponent plan={plan} />
        </div>

        <div data-content-ref>
          <DrawerContentComponent plan={plan} />
        </div>

        <div className="no-print">
          <DrawerFooterComponent
            plan={plan}
            onDelete={onDelete}
            onDownloadPDF={downloadPDF}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
} 