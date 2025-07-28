import React from 'react';
import {
  SkillMatchScoreContainer,
  TextContainer,
  SubcardTitle,
  SubExplanation,
  CircularProgressContainer,
  CircularSVG,
  CircleBackground,
  CircleProgress,
  ProgressContent,
  ScoreNumber,
  GoalLabel,
} from './SkillsMatchScoreStyled';

interface SkillsMatchData {
  skills_match: {
    score: number;
  };
}

interface SkillsMatchScoreProps {
  data: SkillsMatchData;
}

const SkillsMatchScore: React.FC<SkillsMatchScoreProps> = ({ data }) => {
  const score = data.skills_match.score;
  const maxScore = 100;
  const percentage = (score / maxScore) * 100;
  return (
    <SkillMatchScoreContainer>
      <TextContainer>
        <SubcardTitle>Your Skills Fit Score:</SubcardTitle>
        <SubExplanation>
          Skill fit score is the total score measured by how well your resume matches the
          requirements listed in the job posting
        </SubExplanation>
      </TextContainer>
      <CircularProgressContainer>
        <CircularSVG>
          <CircleBackground cx="60" cy="60" r="45" />
          <CircleProgress cx="60" cy="60" r="45" $percentage={percentage} />
        </CircularSVG>
        <ProgressContent>
          <ScoreNumber>{score}</ScoreNumber>
          <GoalLabel>out of {maxScore}</GoalLabel>
        </ProgressContent>
      </CircularProgressContainer>
    </SkillMatchScoreContainer>
  );
};

export default SkillsMatchScore;
