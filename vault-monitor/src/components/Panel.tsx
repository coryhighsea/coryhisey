import React from 'react';
import { Box, Text } from 'ink';

// Color palette matching the web theme
export const colors = {
  amber: '#ffb000',
  amberDim: '#b87a00',
  amberBright: '#ffc832',
  green: '#10f518',
  greenDim: '#0a8f0f',
  red: '#d90429',
  yellow: '#f0c808',
  metal: '#3d405b',
  concrete: '#2a2d2e',
  text: '#e8dcc4',
  textDim: '#8a8577',
};

interface PanelProps {
  title?: string;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderColor?: string;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  width,
  height,
  borderColor = colors.amberDim,
}) => {
  return (
    <Box
      flexDirection="column"
      width={width}
      height={height}
      borderStyle="single"
      borderColor={borderColor}
      paddingX={1}
    >
      {title && (
        <Box marginBottom={1}>
          <Text color={colors.amber}>[ </Text>
          <Text color={colors.amber} bold>
            {title}
          </Text>
          <Text color={colors.amber}> ]</Text>
        </Box>
      )}
      {children}
    </Box>
  );
};

// Horizontal divider
export const Divider: React.FC<{ char?: string }> = ({ char = '─' }) => {
  return (
    <Box marginY={0}>
      <Text color={colors.metal}>{char.repeat(40)}</Text>
    </Box>
  );
};

// Status indicator dot
interface StatusIndicatorProps {
  status: 'online' | 'warning' | 'error' | 'offline';
  label?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label }) => {
  const statusColors = {
    online: colors.green,
    warning: colors.yellow,
    error: colors.red,
    offline: colors.metal,
  };

  const statusSymbols = {
    online: '●',
    warning: '●',
    error: '●',
    offline: '○',
  };

  return (
    <Box>
      <Text color={statusColors[status]}>{statusSymbols[status]} </Text>
      {label && <Text color={colors.text}>{label}</Text>}
    </Box>
  );
};
