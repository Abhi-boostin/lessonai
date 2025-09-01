'use client';

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { parseContentSections, parseSectionContent } from "@/lib/utils";
import { ContentChangeParams } from "../../../types";

interface LessonPlanContentProps {
  content: string;
  isEditing: boolean;
  onContentChange: (params: ContentChangeParams) => void;
}

export function LessonPlanContent({ content, isEditing, onContentChange }: LessonPlanContentProps) {
  const sections = parseContentSections(content);
  
  const renderContentLine = (line: string, lineIndex: number, sectionIndex: number) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return null;
    
    if (trimmedLine.startsWith('- ')) {
      return (
        <div key={lineIndex} className="ml-4">
          <Textarea
            defaultValue={trimmedLine.replace('- ', '')}
            onChange={(e) => onContentChange({
              sectionIndex,
              lineIndex,
              newValue: e.target.value,
              isList: true
            })}
            className={`min-h-[40px] bg-background/50 backdrop-blur-sm resize-none ${
              !isEditing ? 'cursor-default border-transparent focus-visible:ring-0' : ''
            }`}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
        </div>
      );
    }
    
    // Check if the line contains text between ** **
    if (trimmedLine.match(/\*\*(.*?)\*\*/)) {
      return (
        <h3 key={lineIndex} className="text-lg font-semibold mt-4 mb-2">
          {trimmedLine.replace(/\*\*(.*?)\*\*/g, '$1')}
        </h3>
      );
    }
    
    return (
      <Textarea
        key={lineIndex}
        defaultValue={trimmedLine}
        onChange={(e) => onContentChange({
          sectionIndex,
          lineIndex,
          newValue: e.target.value,
          isList: false
        })}
        className={`min-h-[40px] bg-background/50 backdrop-blur-sm resize-none ${
          !isEditing ? 'cursor-default border-transparent focus-visible:ring-0' : ''
        }`}
        disabled={!isEditing}
        readOnly={!isEditing}
      />
    );
  };

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => {
        if (!section.trim()) return null;
        
        const { title, content: sectionContent } = parseSectionContent(section);
        
        return (
          <Card key={sectionIndex} className="p-6 bg-card/30 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="space-y-2">
              {sectionContent.map((line, lineIndex) => 
                renderContentLine(line, lineIndex, sectionIndex)
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
} 