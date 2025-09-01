'use client';

import { useState, useRef } from "react";
import { generateLessonPlan } from "@/lib/gemini";
import { generatePDF, formatGeminiResponse } from "@/lib/utils";
import { LessonCreatorProps, ContentChangeParams } from "../../../types";
import { PromptInput } from "./PromptInput";
import { LessonPlanHeader } from "./LessonPlanHeader";
import { LessonPlanContent } from "./LessonPlanContent";
import { LessonPlanActions } from "./LessonPlanActions";

export function LessonCreator({ onSavePlan }: LessonCreatorProps) {
  const [prompt, setPrompt] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePlan = async () => {
    setIsLoading(true);
    try {
      const response = await generateLessonPlan(prompt);
      const formattedResponse = formatGeminiResponse(response);
      setGeneratedPlan(formattedResponse);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    await generatePDF(contentRef.current, `Lesson Plan - ${prompt}.pdf`);
  };

  const handleContentChange = (params: ContentChangeParams) => {
    const { sectionIndex, lineIndex, newValue, isList } = params;
    const sections = generatedPlan.split(/(?=##\s+[A-Z])/);
    const section = sections[sectionIndex];
    const lines = section.split('\n');
    
    // Handle section titles with asterisks
    if (lineIndex === 0) {
      const titleMatch = lines[0].match(/##\s+(.*)/);
      if (titleMatch) {
        lines[0] = `## **${newValue}**`;
      }
    } else {
      // Handle regular content lines
      if (isList) {
        lines[lineIndex + 1] = `- ${newValue}`;
      } else {
        lines[lineIndex + 1] = newValue;
      }
    }
    
    sections[sectionIndex] = lines.join('\n');
    setGeneratedPlan(sections.join(''));
  };

  const handleSavePlanWithScroll = (title: string, content: string) => {
    onSavePlan(title, content);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        isLoading={isLoading}
        onGenerate={generatePlan}
      />

      {generatedPlan && (
        <div ref={contentRef}>
          <LessonPlanHeader
            title={prompt}
            isEditing={isEditing}
            onToggleEdit={() => setIsEditing(!isEditing)}
          />
          
          <LessonPlanContent
            content={generatedPlan}
            isEditing={isEditing}
            onContentChange={handleContentChange}
          />

          <LessonPlanActions
            onDownloadPDF={downloadPDF}
            onSavePlan={() => handleSavePlanWithScroll(prompt, generatedPlan)}
          />
        </div>
      )}
    </div>
  );
} 