'use client';

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface LessonPlanDrawerProps {
  plan: {
    title: string;
    content: string;
    createdAt: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LessonPlanDrawer({ plan, isOpen, onClose }: LessonPlanDrawerProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `Lesson Plan - ${plan?.title || 'Untitled'}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]/g, '$1')
      .replace(/^#\s+/g, ''); // Remove single hashes at the start of lines
  };

  if (!plan) return null;

  // Parse markdown-like sections
  const sections = plan.content.split(/(?=##?\s+[A-Z])/);

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <div className="no-print">
          <DrawerHeader className="border-b">
            <DrawerTitle className="text-2xl font-bold">{plan.title}</DrawerTitle>
            <p className="text-sm text-muted-foreground">
              Created on {new Date(plan.createdAt).toLocaleDateString()}
            </p>
          </DrawerHeader>
        </div>

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
                
                const [title, ...content] = section.split('\n');
                const isMainHeader = title.startsWith('# ');
                const headerContent = title.replace(/^#+ /, '');
                
                return (
                  <Card key={index} className="p-6">
                    <h2 className={`${
                      isMainHeader ? 'text-2xl' : 'text-xl'
                    } font-semibold text-primary mb-4`}>
                      {headerContent}
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                      {content.map((line, i) => {
                        if (line.startsWith('- ')) {
                          return (
                            <li key={i} className="text-base leading-relaxed ml-4"
                              dangerouslySetInnerHTML={{
                                __html: formatText(line.replace('- ', ''))
                              }}
                            />
                          );
                        }
                        if (line.startsWith('### ')) {
                          return (
                            <h3 key={i} className="text-lg font-medium mt-4 mb-2"
                              dangerouslySetInnerHTML={{
                                __html: formatText(line.replace('### ', ''))
                              }}
                            />
                          );
                        }
                        return line.trim() && (
                          <p key={i} className="text-base leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: formatText(line.trim())
                            }}
                          />
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="no-print">
          <DrawerFooter className="border-t">
            <div className="flex gap-2">
              <Button 
                onClick={handlePrint} 
                variant="default"
                className="flex-1"
              >
                Download PDF
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 