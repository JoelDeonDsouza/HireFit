import styled from 'styled-components';

export const OverlAllScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 27px 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-bottom: 15px;
`;

export const ScoreTitle = styled.span`
  font-size: 16px;
  color: #4c585b;
  opacity: 0.8;
  margin-bottom: 20px;
  line-height: 1.6;
`;

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ChartLabel = styled.span`
  font-size: 12px;
  color: #4c585b;
  margin-top: 10px;
  text-transform: capitalize;
  font-weight: 500;
`;

export const ScoreText = styled.div`
  position: absolute;
  top: 56px;
  left: 56px;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: bold;
  color: #16404d;
  pointer-events: none;
  z-index: 1;
`;
