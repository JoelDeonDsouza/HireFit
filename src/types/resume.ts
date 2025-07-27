import { type FormEvent, type ChangeEvent } from 'react';

// AI Review Result Interface //
export interface AIReviewResult {
  candidate_name: string;
  job_title: string;
  analysis: {
    skills_match: {
      score: number;
    };
    strengths: string[];
    improvements: string[];
    overall_match_score: number;
  };
}

// Skill Analysis Interface //
export interface SkillAnalysis {
  rating: number;
  mentioned: boolean;
  importance: 'Critical' | 'Important' | 'Nice to have';
}

// Skills Analysis Collection //
export interface SkillsAnalysis {
  [skillName: string]: SkillAnalysis;
}

// Hook Return Type //
export interface UseAIResumeTypesReturn {
  url: string;
  setUrl: (url: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  extractedText: string;
  // Loading and Error States //
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  // Resume File States //
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  resumeText: string;
  resumeLoading: boolean;
  resumeError: string;
  // AI Review States //
  aiReviewResult: AIReviewResult | null;
  setAiReviewResult: (result: AIReviewResult | null) => void;
  // Event Handlers //
  handleUrlSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleFileUpload: () => Promise<void>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleResumeFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleResumeUpload: () => Promise<void>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleAIReviewSubmit: () => Promise<void>;
  handleCompleteWorkflow: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

// File Processing Types //
export interface ProcessingResult {
  text: string;
  success: boolean;
  error?: string;
}

// Supported File Types //
export type SupportedFileExtension = 'pdf' | 'jpg' | 'jpeg' | 'png';

// API Response Types //
export interface APIError {
  message: string;
  code?: string;
  status?: number;
}

// Form Validation Types //
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Component Props Types //
export interface ResumeUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string[];
  maxSize?: number;
  loading?: boolean;
  error?: string;
}

export interface AIReviewDisplayProps {
  result: AIReviewResult;
  loading?: boolean;
}

export interface SkillsAnalysisDisplayProps {
  skillsAnalysis: SkillsAnalysis;
}

// Constants //
export const SUPPORTED_FILE_TYPES: SupportedFileExtension[] = ['pdf', 'jpg', 'jpeg', 'png'];

export const RATING_SCALE = {
  POOR: { min: 0, max: 3, label: 'Poor/No evidence' },
  BASIC: { min: 4, max: 5, label: 'Basic/Some evidence' },
  GOOD: { min: 6, max: 7, label: 'Good/Clear evidence' },
  STRONG: { min: 8, max: 9, label: 'Strong/Excellent evidence' },
  PERFECT: { min: 10, max: 10, label: 'Perfect/Exceptional evidence' },
} as const;
