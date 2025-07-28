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
  TemplateContainer,
  UserDataContainer,
  AISuggestionsContainer,
  CandidateData,
  CandidateName,
  SubcardTitle,
  SkillStrengthList,
  SkillListText,
  RemarksList,
} from './MainStyled';
// Logo //
import logo from '/logo-bg.png';
import loadingGif from '/search.gif';
// Custom hooks //
import { useResumeAIReview } from '../hooks/useResumeAIReview';
// Charts //
import SkillsMatchScore from './charts/SkillsMatchScore';
import OverallScore from './charts/OverAllScore';

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
    resetAllData,
  } = useResumeAIReview(corsProxy);

  // File input refs //
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Combined loading state //
  const isLoading = loading || resumeLoading;

  // Handle form submission //
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (aiReviewResult) {
      resetAllData();
      return;
    }
    const hasJobPosting = url || file;
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
              {aiReviewResult ? (
                <UploadButton
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    resetAllData();
                  }}
                  disabled={isLoading}
                >
                  Reset
                </UploadButton>
              ) : (
                <UploadButton type="submit" disabled={isLoading}>
                  Upload
                </UploadButton>
              )}
              {error && <Subtitle style={{ color: 'red' }}>{error}</Subtitle>}
            </Form>
          </FormSection>
          {/* AI Review */}
          <AIResultsSection>
            {aiReviewResult ? (
              <TemplateContainer>
                {/* User Data */}
                <UserDataContainer>
                  <CandidateData>
                    <CandidateName>Hi 👋🏼, {aiReviewResult.candidate_name}</CandidateName>
                    <SubcardTitle>Job Role: {aiReviewResult.job_title}</SubcardTitle>
                  </CandidateData>
                  {/* Chart Skill */}
                  {aiReviewResult.analysis && <SkillsMatchScore data={aiReviewResult.analysis} />}
                  {/* List */}
                  <SkillStrengthList>
                    <SubcardTitle>Key strengths in your Resume:</SubcardTitle>
                    {aiReviewResult.analysis?.strengths?.slice(0, 3).map((strength, index) => (
                      <SkillListText key={index}>⭐️ {strength}</SkillListText>
                    ))}
                  </SkillStrengthList>
                  {/* Remarks */}
                  <RemarksList>
                    <SubcardTitle>Remarks:</SubcardTitle>
                    {aiReviewResult.analysis?.improvements
                      ?.slice(0, 3)
                      .map((improvement, index) => (
                        <SkillListText key={index}>❗️ {improvement}</SkillListText>
                      ))}
                  </RemarksList>
                </UserDataContainer>
                {/* AI Chart */}
                <AISuggestionsContainer>
                  <OverallScore
                    title="Effectiveness Rating"
                    data={
                      aiReviewResult.overallScore ?? {
                        clarity: 0,
                        relevance: 0,
                        completeness: 0,
                      }
                    }
                    colors={{
                      clarity: '#0088FE',
                      relevance: '#00C49F',
                      completeness: '#FFBB28',
                    }}
                  />
                  <OverallScore
                    title="Candidate Metrics"
                    data={
                      aiReviewResult.metrics ?? {
                        keywordMatch: 0,
                        experienceAlignment: 0,
                        educationMatch: 0,
                      }
                    }
                    colors={{
                      keywordMatch: '#FF6B6B',
                      experienceAlignment: '#4ECDC4',
                      educationMatch: '#45B7D1',
                    }}
                  />
                  <RemarksList>
                    <SubcardTitle>Boost with Keywords:</SubcardTitle>
                    {aiReviewResult.missingKeywords?.slice(0, 3).map((keyword, index) => (
                      <SkillListText key={index}>🔍 {keyword}</SkillListText>
                    ))}
                  </RemarksList>
                </AISuggestionsContainer>
              </TemplateContainer>
            ) : (
              <InitialOutputContainer>
                <AvatarImage src={logo} alt="logo" />
                <UploadTextDisplay>
                  Your job fit score, strengths, weaknesses, and improvements will appear here.
                  Please note: We don’t collect or store any data
                </UploadTextDisplay>
              </InitialOutputContainer>
            )}
          </AIResultsSection>
        </MainContainer>
      )}
    </HeroSection>
  );
};

export default Main;
