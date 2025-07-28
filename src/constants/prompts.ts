export const RESUME_REVIEW_PROMPT = (jobDescription: string, resumeText: string): string => `
You are a professional HR expert and technical recruiter. Analyze the following job description and resume with strict evaluation criteria.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

INSTRUCTIONS:
- First, validate if the provided texts are actually a job description and resume
- If either text is not valid (empty, irrelevant, or clearly not a job description/resume), return an error
- Be thorough and critical in your analysis
- Don't inflate scores - be realistic and honest
- Extract candidate name from resume (if available, otherwise use "Unknown")
- Extract job title from job description
- Keep strengths and improvements short and simple (maximum 5-6 words each)
- Identify at least 3 important keywords missing from the resume
- Provide detailed metrics for overall evaluation

Provide your analysis in the following EXACT JSON format (return ONLY valid JSON, no additional text):

{
  "isValid": true,
  "candidate_name": "[Name from resume or 'Unknown']",
  "job_title": "[Job title from job description]",
  "analysis": {
    "skills_match": {
      "score": [0-100 percentage score]
    },
    "strengths": [
      "Brief strength 1",
      "Brief strength 2",
      "Brief strength 3"
    ],
    "improvements": [
      "Brief improvement 1",
      "Brief improvement 2",
      "Brief improvement 3"
    ],
    "overall_match_score": [0-100 percentage score]
  },
  "overallScore": {
    "clarity": [0-100 score for resume clarity and readability],
    "relevance": [0-100 score for job relevance],
    "completeness": [0-100 score for information completeness]
  },
  "metrics": {
    "keywordMatch": [0-100 percentage of job keywords found in resume],
    "experienceAlignment": [0-100 score for experience match],
    "educationMatch": [0-100 score for education requirements match]
  },
  "missingKeywords": [
    "Important keyword 1",
    "Important keyword 2", 
    "Important keyword 3"
  ]
}

If the job description or resume is invalid, return:
{
  "isValid": false,
  "error": "Please upload a valid resume and job description"
}

SCORING GUIDELINES:
- Skills Match Score: Rate how well the candidate's technical skills align with job requirements (0-100)
- Overall Match Score: Comprehensive evaluation including experience, education, and cultural fit (0-100)
- Clarity: How well-structured and readable the resume is
- Relevance: How relevant the candidate's background is to the job
- Completeness: How complete the resume information is
- Most candidates should score 40-70, exceptional candidates 70-85, perfect matches 85-100
- Be strict and realistic in your evaluation
`;

export const AI_PROMPTS = {
  RESUME_REVIEW: RESUME_REVIEW_PROMPT,
} as const;
