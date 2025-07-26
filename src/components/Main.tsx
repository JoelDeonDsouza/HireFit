import { useRef, type FormEvent } from 'react';
// Styles //
import {
  HeroSection,
  MainContainer,
  FormSection,
  AIResultsSection,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Input,
  ResumeUpload,
  ResumeTextUpload,
  UploadInput,
  UploadButton,
  InitialOutputContainer,
  AvatarImage,
  UploadTextDisplay,
} from './MainStyled';
// Logo //
import logo from '/logo-bg.png';
// Custom hooks //
import { useResumeAIReview } from '../hooks/useResumeAIReview';

const Main = () => {
  // CORS proxy  //
  const corsProxy = import.meta.env.VITE_PROXY_URL as string;
  const {
    url,
    setUrl,
    file,
    setFile,
    loading,
    resumeFile,
    // resumeText,
    // extractedText,
    resumeLoading,
    handleFileChange,
    handleResumeFileChange,
    handleResumeUpload,
    handleSubmit,
  } = useResumeAIReview(corsProxy);

  // File input refs //
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Combined loading state //
  const isLoading = loading || resumeLoading;

  // Handle form submission //
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if we have a job posting (URL or file)
    const hasJobPosting = url || file;
    // Check if we have a resume //
    const hasResume = resumeFile;
    if (!hasJobPosting || !hasResume) {
      console.log('Please provide both a job posting and a resume');
      return;
    }
    await handleSubmit(e);
    await handleResumeUpload();
  };

  return (
    <HeroSection>
      <MainContainer>
        {/* Form */}
        <FormSection>
          <Title>Begin Resume Review!</Title>
          <Subtitle>
            Upload a job link, image, or PDF to get your resume fit score and improvement tips
          </Subtitle>
          <Form onSubmit={handleFormSubmit}>
            <InputGroup>
              {/* Url */}
              <Input
                id="url-input"
                name="url"
                type="url"
                placeholder="Enter application URL here"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (e.target.value) setFile(null);
                }}
                disabled={!!file || isLoading}
              />
            </InputGroup>
            {/* file / img */}
            <UploadInput
              ref={fileInputRef}
              id="file-input"
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleFileChange}
              disabled={!!url || isLoading}
            />
            {/* Resume */}
            <ResumeUpload>
              <ResumeTextUpload>Upload Resume below*</ResumeTextUpload>
            </ResumeUpload>
            <UploadInput
              ref={resumeInputRef}
              id="file-resume"
              type="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleResumeFileChange}
              disabled={isLoading}
            />
            {/* Button upload */}
            <UploadButton type="submit">Upload</UploadButton>
          </Form>
        </FormSection>
        {/* AI Review */}
        <AIResultsSection>
          <InitialOutputContainer>
            <AvatarImage src={logo} alt="logo" />
            <UploadTextDisplay>
              Your job fit score, strengths, weaknesses, and improvements will appear here. Please
              note: We don’t collect or store any data
            </UploadTextDisplay>
          </InitialOutputContainer>
        </AIResultsSection>
      </MainContainer>
    </HeroSection>
  );
};

export default Main;
