// Lesson Plan Types
export interface LessonPlan {
  title: string;
  content: string;
  createdAt: string;
}

export interface LessonCreatorProps {
  onSavePlan: (title: string, content: string) => void;
}

export interface LessonPlanDrawerProps {
  plan: LessonPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (title: string) => void;
}

// PDF Generation Types
export interface PDFGenerationOptions {
  scale: number;
  useCORS: boolean;
  logging: boolean;
  backgroundColor: string | null;
}

export interface PDFPageConfig {
  imgWidth: number;
  pageHeight: number;
  imgHeight: number;
}

// Content Editing Types
export interface ContentChangeParams {
  sectionIndex: number;
  lineIndex: number;
  newValue: string;
  isList: boolean;
}

// Authentication Types
export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  username: string;
  password: string;
  error: string;
}

// UI Component Types
export interface ButtonProps {
  variant?: 'default' | 'outline' | 'destructive';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

// Background Component Types
export interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
} 