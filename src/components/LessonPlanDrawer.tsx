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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LessonPlanDrawerProps {
  plan: {
    title: string;
    content: string;
    createdAt: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function LessonPlanDrawer({ plan, isOpen, onClose, onDelete }: LessonPlanDrawerProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!contentRef.current) return;
    
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      const pdf = new jsPDF('p', 'mm');
      let firstPage = true;
      
      while (heightLeft >= 0) {
        if (!firstPage) {
          pdf.addPage();
        }
        
        pdf.addImage(
          canvas.toDataURL('image/png'), 
          'PNG', 
          0, 
          position,
          imgWidth, 
          imgHeight
        );
        
        heightLeft -= pageHeight;
        position -= pageHeight;
        firstPage = false;
      }
      
      pdf.save(`Lesson Plan - ${plan?.title || 'Untitled'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const formatText = (text: string) => {
    // Remove markdown symbols but maintain structure
    return text
      .replace(/^#\s+([^:]+):/gm, '$1') // Remove # but keep section titles
      .replace(/^\s*-\s*/gm, '') // Remove bullet points
      .replace(/\[(.*?)\]/g, '$1') // Remove brackets
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
      .trim();
  };

  if (!plan) return null;

  // Parse markdown-like sections
  const sections = plan.content.split(/(?=# [A-Z])/);

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
                            {formatText(paragraph)}
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

        <div className="no-print">
          <DrawerFooter className="border-t">
            <div className="flex gap-2">
              <Button 
                onClick={downloadPDF}
                variant="outline"
                className="bg-background/50 backdrop-blur-sm"
              >
                Download PDF
              </Button>
              <Button 
                onClick={() => plan && onDelete(plan.id)}
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
        </div>
      </DrawerContent>
    </Drawer>
  );
} 