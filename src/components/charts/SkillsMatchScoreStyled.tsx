import styled from 'styled-components';

interface CircularProgressProps {
  $percentage: number;
}

export const SkillMatchScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  gap: 15px;
  margin-bottom: 15px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

export const SubcardTitle = styled.span`
  font-size: 18px;
  color: #4c585b;
  opacity: 0.9;
  line-height: 1.6;
`;

export const SubExplanation = styled.span`
  font-size: 13px;
  color: #4c585b;
  opacity: 0.6;
  line-height: 1.6;
  margin-top: 5px;
`;

export const CircularProgressContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircularSVG = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

export const CircleBackground = styled.circle`
  fill: none;
  stroke: #f0f0f0;
  stroke-width: 8;
`;

export const CircleProgress = styled.circle<CircularProgressProps>`
  fill: none;
  stroke: #ff6b35;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: ${2 * Math.PI * 45};
  stroke-dashoffset: ${(props) => 2 * Math.PI * 45 * (1 - props.$percentage / 100)};
  transition: stroke-dashoffset 0.5s ease-in-out;
`;

export const ProgressContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ScoreNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  line-height: 1;
`;

export const GoalLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;
