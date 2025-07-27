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
  LoadingBlock,
  LoadingGif,
} from './MainStyled';
// Logo //
import logo from '/logo-bg.png';
import loadingGif from '/search.gif';
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
    resumeLoading,
    handleFileChange,
    handleResumeFileChange,
    handleCompleteWorkflow,
    aiReviewResult,
    error,
    setError,
  } = useResumeAIReview(corsProxy);

  // File input refs //
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Combined loading state //
  const isLoading = loading || resumeLoading;

  // Handle form submission //
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // job posting (URL or file) //
    const hasJobPosting = url || file;
    // resume //
    const hasResume = resumeFile;
    if (!hasJobPosting || !hasResume) {
      setError('Please provide both a job posting and a resume');
      return;
    }
    await handleCompleteWorkflow(e);
  };

  return (
    <HeroSection>
      {isLoading ? (
        <LoadingBlock>
          <LoadingGif src={loadingGif} alt="Loading..." />
        </LoadingBlock>
      ) : (
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
              {!aiReviewResult ? (
                <UploadButton type="submit" disabled={isLoading}>
                  Upload
                </UploadButton>
              ) : null}
              {error && <Subtitle style={{ color: 'red' }}>{error}</Subtitle>}
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
      )}
    </HeroSection>
  );
};

export default Main;
