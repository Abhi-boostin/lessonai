'use client';

import { useRef } from 'react';
import { Card } from "@/components/ui/card";
import { parseContentSections, formatTextForDisplay } from "@/lib/utils";
import { LessonPlan } from "../../../types";

interface DrawerContentProps {
  plan: LessonPlan;
}

export function DrawerContentComponent({ plan }: DrawerContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Parse markdown-like sections
  const sections = parseContentSections(plan.content);

  return (
    <div className="p-6 overflow-auto" ref={contentRef}>
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{plan.title}</h1>
          <p className="text-sm text-muted-foreground">
            Created on {new Date(plan.createdAt).toLocaleDateString()}
          </p>
        </Card>
        
        <div className="space-y-8">
          {sections.map((section, index) => {
            if (!section.trim()) return null;
            
            const [title, ...content] = section.split('\n\n');
            const headerContent = title.replace(/^# /, '').replace(/:$/, '');
            
            return (
              <Card key={index} className="p-6">
                <h2 className="text-xl font-semibold text-primary mb-4">
                  {headerContent}
                </h2>
                <div className="prose dark:prose-invert max-w-none space-y-4">
                  {content.map((paragraph, i) => {
                    const lines = paragraph.split('\n');
                    
                    if (lines[0].includes('minutes):')) {
                      // This is a lesson structure subsection
                      return (
                        <div key={i} className="ml-4">
                          <h3 className="text-lg font-medium mb-2">
                            {lines[0].replace(/:$/, '')}
                          </h3>
                          <p className="text-base leading-relaxed">
                            {lines.slice(1).join('\n')}
                          </p>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={i} className="text-base leading-relaxed">
                        {formatTextForDisplay(paragraph)}
                      </p>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 