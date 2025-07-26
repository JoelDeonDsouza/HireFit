import { useState, type FormEvent, type ChangeEvent } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import { load } from 'cheerio';
import 'pdfjs-dist/build/pdf.worker.entry';

// Types //
interface UseInterviewGeneratorReturn {
  url: string;
  setUrl: (url: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  extractedText: string;
  loading: boolean;
  error: string;
  userInput: string;
  setUserInput: (input: string) => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  resumeText: string;
  resumeLoading: boolean;
  resumeError: string;
  handleUrlSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleFileUpload: () => Promise<void>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleResumeFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleResumeUpload: () => Promise<void>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const useResumeAIReview = (corsProxy: string): UseInterviewGeneratorReturn => {
  // State //
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [resumeLoading, setResumeLoading] = useState<boolean>(false);
  const [resumeError, setResumeError] = useState<string>('');

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
      if (fileExtension === 'pdf') {
        const text = await processPdf(file);
        setExtractedText(text);
      } else if (['jpg', 'jpeg', 'png'].includes(fileExtension || '')) {
        const text = await processImage(file);
        setExtractedText(text);
      } else {
        setError('Unsupported file format. Please upload a PDF or image file.');
      }
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
    }
  };

  // Handle resume file input change //
  const handleResumeFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setResumeFile(e.target.files[0]);
      setResumeError('');
    }
  };

  // Handle resume file upload //
  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    setResumeLoading(true);
    setResumeError('');
    try {
      const fileExtension = resumeFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'pdf') {
        const text = await processPdf(resumeFile);
        setResumeText(text);
      } else {
        setResumeError('Unsupported resume file format. Please upload a PDF or image file.');
      }
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

  return {
    url,
    setUrl,
    file,
    setFile,
    extractedText,
    loading,
    error,
    userInput,
    setUserInput,
    resumeFile,
    setResumeFile,
    resumeText,
    resumeLoading,
    resumeError,
    handleUrlSubmit,
    handleFileUpload,
    handleFileChange,
    handleResumeFileChange,
    handleResumeUpload,
    handleSubmit,
  };
};
