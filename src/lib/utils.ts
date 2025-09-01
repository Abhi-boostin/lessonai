import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFGenerationOptions, PDFPageConfig } from '../../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// PDF Generation Utilities
export const generatePDF = async (
  elementRef: HTMLDivElement | null,
  filename: string,
  options: PDFGenerationOptions = {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null
  }
): Promise<void> => {
  if (!elementRef) return;
  
  try {
    const canvas = await html2canvas(elementRef, options);
    
    const pageConfig: PDFPageConfig = {
      imgWidth: 210, // A4 width in mm
      pageHeight: 297, // A4 height in mm
      imgHeight: (canvas.height * 210) / canvas.width
    };
    
    const pdf = new jsPDF('p', 'mm');
    let heightLeft = pageConfig.imgHeight;
    let position = 0;
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
        pageConfig.imgWidth, 
        pageConfig.imgHeight
      );
      
      heightLeft -= pageConfig.pageHeight;
      position -= pageConfig.pageHeight;
      firstPage = false;
    }
    
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Content Formatting Utilities
export const formatGeminiResponse = (text: string): string => {
  // Remove any standalone # and duplicate titles
  const cleanedText = text
    .replace(/^#\s*$/gm, '')  // Remove standalone #
    .replace(/^Lesson Plan:.*$/gm, '') // Remove duplicate lesson plan titles
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double
    .replace(/^(##\s+[A-Z][^*\n]+)$/gm, '## **$1**'); // Add asterisks to section titles

  // Split into sections and process
  const sections = cleanedText
    .split(/(?=(?:Basic Information|Learning Objectives|Materials and Resources|Lesson Structure|Extensions and Modifications))/g)
    .map(section => section.trim())
    .filter(section => section.length > 0);

  return sections.join('\n\n');
};

export const formatTextForDisplay = (text: string): string => {
  // Remove markdown symbols but maintain structure
  return text
    .replace(/^#\s+([^:]+):/gm, '$1') // Remove # but keep section titles
    .replace(/^\s*-\s*/gm, '') // Remove bullet points
    .replace(/\[(.*?)\]/g, '$1') // Remove brackets
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
    .trim();
};

export const parseContentSections = (content: string): string[] => {
  return content
    .split(/(?=##\s+[A-Z])/)
    .map(section => section.trim())
    .filter(section => section.length > 0);
};

export const parseSectionContent = (section: string): { title: string; content: string[] } => {
  const lines = section.split('\n');
  const title = lines[0].replace(/^##\s+/, '');
  const content = lines.slice(1);
  
  return { title, content };
};

// Date Utilities
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// Validation Utilities
export const validatePrompt = (prompt: string): boolean => {
  return prompt.trim().length > 0;
};

export const validateLessonPlan = (plan: { title: string; content: string }): boolean => {
  return plan.title.trim().length > 0 && plan.content.trim().length > 0;
};
