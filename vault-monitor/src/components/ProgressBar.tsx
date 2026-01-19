import React from 'react';
import { Box, Text } from 'ink';
import { colors } from './Panel.js';

interface ProgressBarProps {
  label: string;
  value: number; // 0-100
  width?: number;
  showPercentage?: boolean;
  warningThreshold?: number;
  criticalThreshold?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  width = 30,
  showPercentage = true,
  warningThreshold = 70,
  criticalThreshold = 90,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const filledWidth = Math.round((clampedValue / 100) * width);
  const emptyWidth = width - filledWidth;

  // Determine color based on thresholds
  let barColor = colors.green;
  if (clampedValue >= criticalThreshold) {
    barColor = colors.red;
  } else if (clampedValue >= warningThreshold) {
    barColor = colors.yellow;
  }

  // Create the bar segments
  const filledChar = '█';
  const emptyChar = '░';

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box justifyContent="space-between" marginBottom={0}>
        <Text color={colors.text}>{label}</Text>
        {showPercentage && (
          <Text color={barColor} bold>
            {clampedValue.toFixed(1)}%
          </Text>
        )}
      </Box>
      <Box>
        <Text color={colors.amberDim}>[</Text>
        <Text color={barColor}>{filledChar.repeat(filledWidth)}</Text>
        <Text color={colors.metal}>{emptyChar.repeat(emptyWidth)}</Text>
        <Text color={colors.amberDim}>]</Text>
      </Box>
    </Box>
  );
};

// Vertical gauge for a more Pip-Boy feel
interface VerticalGaugeProps {
  label: string;
  value: number;
  height?: number;
  maxValue?: number;
  unit?: string;
}

export const VerticalGauge: React.FC<VerticalGaugeProps> = ({
  label,
  value,
  height = 8,
  maxValue = 100,
  unit = '',
}) => {
  const percentage = (value / maxValue) * 100;
  const filledHeight = Math.round((percentage / 100) * height);

  let barColor = colors.green;
  if (percentage >= 90) barColor = colors.red;
  else if (percentage >= 70) barColor = colors.yellow;

  const rows = [];
  for (let i = height - 1; i >= 0; i--) {
    const isFilled = i < filledHeight;
    rows.push(
      <Text key={i} color={isFilled ? barColor : colors.metal}>
        {isFilled ? '██' : '░░'}
      </Text>
    );
  }

  return (
    <Box flexDirection="column" alignItems="center" marginX={1}>
      <Text color={colors.amber} bold>
        {value.toFixed(0)}
        {unit}
      </Text>
      <Box flexDirection="column">{rows}</Box>
      <Text color={colors.textDim}>{label}</Text>
    </Box>
  );
};

// Mini sparkline for history
interface SparklineProps {
  data: number[];
  width?: number;
  label?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({ data, width = 20, label }) => {
  const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Take last 'width' items
  const displayData = data.slice(-width);

  const sparkline = displayData
    .map((val) => {
      const normalized = (val - min) / range;
      const index = Math.round(normalized * (chars.length - 1));
      return chars[index];
    })
    .join('');

  return (
    <Box flexDirection="column">
      {label && <Text color={colors.textDim}>{label}</Text>}
      <Text color={colors.amber}>{sparkline}</Text>
    </Box>
  );
};
