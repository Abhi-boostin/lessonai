'use client';

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateLessonPlan } from "@/lib/gemini";
import { useReactToPrint } from 'react-to-print';
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LessonCreatorProps {
  onSavePlan: (title: string, content: string) => void;
}

export function LessonCreator({ onSavePlan }: LessonCreatorProps) {
  const [prompt, setPrompt] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `Lesson Plan - ${prompt}`,
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

  const generatePlan = async () => {
    setIsLoading(true);
    try {
      const response = await generateLessonPlan(prompt);
      // Clean up any stray # symbols
      const cleanedResponse = response.replace(/^#\s*|(?<=\n)#\s*/g, '');
      setGeneratedPlan(cleanedResponse);
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sections = generatedPlan ? generatedPlan.split(/(?=##?\s+[A-Z])/).filter(Boolean) : [];

  const downloadPDF = async () => {
    if (!contentRef.current) return;
    
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
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
      
      pdf.save(`Lesson Plan - ${prompt}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <Card className="border-2 relative bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <Textarea
            placeholder="Enter your lesson topic or requirements..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-32 mb-4 bg-background/50 backdrop-blur-sm"
          />
          <Button 
            onClick={generatePlan} 
            disabled={!prompt || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Crafting your lesson plan...</span>
              </div>
            ) : (
              "Generate Lesson Plan"
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedPlan && (
        <div ref={contentRef}>
          <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-2">Lesson Plan: {prompt}</h1>
          </Card>
          
          <div className="space-y-6">
            {sections.map((section, index) => {
              if (!section.trim()) return null;
              
              const [title, ...content] = section.split('\n');
              const headerContent = title.replace(/^##?\s+/, '');
              
              return (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold text-primary mb-4">
                    {headerContent}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {content.map((line, i) => {
                      if (!line.trim()) return null;
                      if (line.startsWith('- ')) {
                        return (
                          <li key={i} className="text-base leading-relaxed ml-4"
                            dangerouslySetInnerHTML={{
                              __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }}
                          />
                        );
                      }
                      if (line.startsWith('### ')) {
                        return (
                          <h3 key={i} className="text-lg font-medium mt-4 mb-2">
                            {line.replace('### ', '')}
                          </h3>
                        );
                      }
                      return (
                        <p key={i} className="text-base leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: line.trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          }}
                        />
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button 
              onClick={downloadPDF}
              variant="outline"
              className="bg-background/50 backdrop-blur-sm"
            >
              Download PDF
            </Button>
            <Button 
              onClick={() => onSavePlan(prompt, generatedPlan)} 
              variant="default"
            >
              Save Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 