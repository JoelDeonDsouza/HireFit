import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import { load } from 'cheerio';
import 'pdfjs-dist/build/pdf.worker.entry';
import { GoogleGenerativeAI } from '@google/generative-ai';
//  types  //
import type {
  AIReviewResult,
  UseAIResumeTypesReturn,
  SupportedFileExtension,
} from '../types/resume';
// prompts //
import { AI_PROMPTS } from '../constants/prompts';

export const useResumeAIReview = (corsProxy: string): UseAIResumeTypesReturn => {
  // State //
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [resumeLoading, setResumeLoading] = useState<boolean>(false);
  const [resumeError, setResumeError] = useState<string>('');
  const [aiReviewResult, setAiReviewResult] = useState<AIReviewResult | null>(null);
  const [autoTriggerAI, setAutoTriggerAI] = useState<boolean>(false);

  // Auto-trigger AI //
  useEffect(() => {
    const triggerAIReview = async () => {
      if (extractedText && resumeText && autoTriggerAI && !loading) {
        setAutoTriggerAI(false);
        await handleAIReviewSubmit();
      }
    };
    triggerAIReview();
  }, [extractedText, resumeText, autoTriggerAI, loading]);

  // Process PDF file //
  const processPdf = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => ('str' in item ? item.str : '')).join(' ');
        fullText += pageText + '\n';
      }
      return fullText;
    } catch (err) {
      console.error('PDF processing error:', err);
      throw new Error('Failed to process PDF');
    }
  };

  // Process image file //
  const processImage = async (file: File): Promise<string> => {
    try {
      const { data } = await Tesseract.recognize(file, 'eng');
      return data.text;
    } catch (err) {
      console.error('Image processing error:', err);
      throw new Error('Failed to process image');
    }
  };

  // Validate file extension //
  const isValidFileExtension = (extension: string): extension is SupportedFileExtension => {
    return ['pdf', 'jpg', 'jpeg', 'png'].includes(extension);
  };

  // Handle URL submission //
  const handleUrlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(corsProxy + url);
      const $ = load(response.data);
      $('script, style').remove();
      const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
      setExtractedText(bodyText);
    } catch (err) {
      setError('Failed to fetch URL. You may need a CORS proxy for this operation.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload //
  const handleFileUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !isValidFileExtension(fileExtension)) {
        setError('Unsupported file format. Please upload a PDF or image file.');
        return;
      }
      let text = '';
      if (fileExtension === 'pdf') {
        text = await processPdf(file);
      } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        text = await processImage(file);
      }
      setExtractedText(text);
    } catch (err) {
      setError('Failed to process file. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change //
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setUrl('');
      setExtractedText('');
    }
  };

  // Handle resume file input change //
  const handleResumeFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setResumeFile(e.target.files[0]);
      setResumeError('');
      setResumeText('');
    }
  };

  // Handle resume file upload //
  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    setResumeLoading(true);
    setResumeError('');
    try {
      const fileExtension = resumeFile.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !isValidFileExtension(fileExtension)) {
        setResumeError('Unsupported resume file format. Please upload a PDF or image file.');
        return;
      }
      let text = '';
      if (fileExtension === 'pdf') {
        text = await processPdf(resumeFile);
      }
      setResumeText(text);
    } catch (err) {
      setResumeError('Failed to process resume file. Please try again.');
      console.error(err);
    } finally {
      setResumeLoading(false);
    }
  };

  // Handle form submission //
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url) {
      handleUrlSubmit(e);
    } else if (file) {
      handleFileUpload();
    }
  };

  // WorkFlow //
  const handleCompleteWorkflow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasJobPosting = url || file;
    const hasResume = resumeFile;
    if (!hasJobPosting || !hasResume) {
      setError('Please provide both a job posting and a resume');
      return;
    }
    try {
      setAiReviewResult(null);
      setError('');
      setResumeError('');
      setAutoTriggerAI(true);
      // Process job posting //
      if (url) {
        await handleUrlSubmit(e);
      } else if (file) {
        await handleFileUpload();
      }
      // Process resume //
      await handleResumeUpload();
    } catch (err) {
      console.error('Error in complete workflow:', err);
      setError('An error occurred during processing');
    }
  };

  // Handle AI review submission //
  const handleAIReviewSubmit = async () => {
    if (!extractedText || !resumeText) {
      setError('Both job description and resume text are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string;
      if (!apiKey) {
        throw new Error('API key is missing. Please check your environment variables.');
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
      const prompt = AI_PROMPTS.RESUME_REVIEW(extractedText, resumeText);
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      try {
        const cleanedResponse = responseText.replace(/```json\n?|\n?```/g, '').trim();
        const parsedResult: AIReviewResult = JSON.parse(cleanedResponse);
        if (!parsedResult.isValid) {
          setError(parsedResult.error || 'Please upload a valid resume and job description');
          return;
        }
        if (
          !parsedResult.analysis?.overall_match_score ||
          typeof parsedResult.analysis.overall_match_score !== 'number' ||
          !parsedResult.analysis?.skills_match ||
          !parsedResult.overallScore ||
          !parsedResult.metrics ||
          !parsedResult.missingKeywords
        ) {
          throw new Error('Invalid response structure from AI');
        }
        setAiReviewResult(parsedResult);
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        setError('Failed to parse AI response. Please try again.');
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while generating the review';
      setError(`Error: ${errorMessage}`);
      console.error('Error generating AI review:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset all data //
  const resetAllData = (): void => {
    setUrl('');
    setFile(null);
    setExtractedText('');
    setResumeFile(null);
    setResumeText('');
    setAiReviewResult(null);
    setError('');
    setResumeError('');
    setLoading(false);
    setResumeLoading(false);
    setAutoTriggerAI(false);
  };
  return {
    url,
    setUrl,
    file,
    setFile,
    extractedText,
    loading,
    error,
    setError,
    resumeFile,
    setResumeFile,
    resumeText,
    resumeLoading,
    resumeError,
    aiReviewResult,
    setAiReviewResult,
    handleUrlSubmit,
    handleFileUpload,
    handleFileChange,
    handleResumeFileChange,
    handleResumeUpload,
    handleSubmit,
    handleAIReviewSubmit,
    handleCompleteWorkflow,
    resetAllData,
  };
};
