export const RESUME_REVIEW_PROMPT = (jobDescription: string, resumeText: string): string => `
You are a professional HR expert and technical recruiter. Analyze the following job description and resume with strict evaluation criteria.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

INSTRUCTIONS:
- Be thorough and critical in your analysis
- Don't inflate scores - be realistic and honest
- Extract candidate name from resume (if available, otherwise use "Unknown")
- Extract job title from job description
- Keep strengths and improvements short and simple (maximum 5-6 words each)

Provide your analysis in the following EXACT JSON format (return ONLY valid JSON, no additional text):

{
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
  }
}

SCORING GUIDELINES:
- Skills Match Score: Rate how well the candidate's technical skills align with job requirements (0-100)
- Overall Match Score: Comprehensive evaluation including experience, education, and cultural fit (0-100)
- Most candidates should score 40-70, exceptional candidates 70-85, perfect matches 85-100
- Be strict and realistic in your evaluation
`;

export const AI_PROMPTS = {
  RESUME_REVIEW: RESUME_REVIEW_PROMPT,
} as const;
