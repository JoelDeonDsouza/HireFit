import { PieChart, Pie, Cell } from 'recharts';
import {
  OverlAllScoreContainer,
  ScoreTitle,
  ChartsContainer,
  ChartWrapper,
  ChartLabel,
  ScoreText,
} from './OverAllScoreStyled';

interface ChartData {
  name: string;
  value: number;
}

interface ScoreChartProps {
  title: string;
  data: Record<string, number>;
  colors?: Record<string, string>;
}

const OverallScore: React.FC<ScoreChartProps> = ({ title, data, colors }) => {
  const defaultColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  const getColor = (key: string, index: number): string => {
    if (colors && colors[key]) {
      return colors[key];
    }
    return defaultColors[index % defaultColors.length];
  };
  // Create chart data from the score //
  const createChartData = (score: number): ChartData[] => [
    { name: 'score', value: score },
    { name: 'remaining', value: 100 - score },
  ];
  const renderChart = (category: string, score: number, index: number) => {
    const chartData = createChartData(score);
    const primaryColor = getColor(category, index);
    const chartColors = [primaryColor, '#f0f0f0'];
    return (
      <ChartWrapper key={category}>
        <div style={{ position: 'relative' }}>
          <PieChart width={100} height={100}>
            <Pie
              data={chartData}
              cx={50}
              cy={50}
              innerRadius={30}
              outerRadius={40}
              startAngle={90}
              endAngle={450}
              dataKey="value"
            >
              {chartData.map((_entry, chartIndex) => (
                <Cell key={`cell-${chartIndex}`} fill={chartColors[chartIndex]} />
              ))}
            </Pie>
          </PieChart>
          <ScoreText>{score}%</ScoreText>
        </div>
        <ChartLabel>{category}</ChartLabel>
      </ChartWrapper>
    );
  };

  return (
    <OverlAllScoreContainer>
      <ScoreTitle>{title}</ScoreTitle>
      <ChartsContainer>
        {Object.entries(data).map(([category, score], index) =>
          renderChart(category, score, index),
        )}
      </ChartsContainer>
    </OverlAllScoreContainer>
  );
};

export default OverallScore;
