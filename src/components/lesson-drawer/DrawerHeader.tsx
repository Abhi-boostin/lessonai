'use client';

import {
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { LessonPlan } from "../../../types";
import { formatDate } from "@/lib/utils";

interface DrawerHeaderProps {
  plan: LessonPlan;
}

export function DrawerHeaderComponent({ plan }: DrawerHeaderProps) {
  return (
    <DrawerHeader className="border-b">
      <DrawerTitle className="text-2xl font-bold">{plan.title}</DrawerTitle>
      <p className="text-sm text-muted-foreground">
        Created on {formatDate(plan.createdAt)}
      </p>
    </DrawerHeader>
  );
} 