#!/usr/bin/env node

import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import {
  Header,
  CpuStats,
  MemoryStats,
  DiskStats,
  NetworkStats,
  ProcessList,
  colors,
} from './components/index.js';

// Main dashboard view
const Dashboard: React.FC = () => {
  return (
    <Box flexDirection="column">
      <Header compact />

      <Box>
        {/* Left column */}
        <Box flexDirection="column" width="50%">
          <CpuStats />
          <MemoryStats />
          <DiskStats />
        </Box>

        {/* Right column */}
        <Box flexDirection="column" width="50%">
          <NetworkStats />
          <ProcessList />
        </Box>
      </Box>
    </Box>
  );
};

// Full header view
const FullHeaderView: React.FC = () => {
  return (
    <Box flexDirection="column">
      <Header compact={false} />

      <Box>
        <Box flexDirection="column" width="50%">
          <CpuStats />
          <MemoryStats />
        </Box>
        <Box flexDirection="column" width="50%">
          <NetworkStats />
          <DiskStats />
        </Box>
      </Box>
    </Box>
  );
};

// Help overlay
const HelpOverlay: React.FC = () => {
  return (
    <Box
      flexDirection="column"
      borderStyle="double"
      borderColor={colors.amber}
      paddingX={2}
      paddingY={1}
    >
      <Text color={colors.amber} bold>
        [ VAULT-MONITOR CONTROLS ]
      </Text>
      <Text> </Text>
      <Text color={colors.text}>
        <Text color={colors.amber}>1</Text> - Dashboard view
      </Text>
      <Text color={colors.text}>
        <Text color={colors.amber}>2</Text> - Full header view
      </Text>
      <Text color={colors.text}>
        <Text color={colors.amber}>h</Text> - Toggle this help
      </Text>
      <Text color={colors.text}>
        <Text color={colors.amber}>q</Text> - Quit application
      </Text>
      <Text> </Text>
      <Text color={colors.textDim}>Press any key to close</Text>
    </Box>
  );
};

// Main App
const App: React.FC = () => {
  const { exit } = useApp();
  const [view, setView] = useState<'dashboard' | 'full'>('dashboard');
  const [showHelp, setShowHelp] = useState(false);

  useInput((input, key) => {
    if (showHelp) {
      setShowHelp(false);
      return;
    }

    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit();
    } else if (input === 'h' || input === '?') {
      setShowHelp(true);
    } else if (input === '1') {
      setView('dashboard');
    } else if (input === '2') {
      setView('full');
    }
  });

  if (showHelp) {
    return (
      <Box flexDirection="column" padding={1}>
        <Header compact />
        <Box justifyContent="center" marginTop={2}>
          <HelpOverlay />
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      {view === 'dashboard' && <Dashboard />}
      {view === 'full' && <FullHeaderView />}

      {/* Footer */}
      <Box marginTop={1} justifyContent="space-between" paddingX={1}>
        <Text color={colors.textDim}>
          Press <Text color={colors.amber}>h</Text> for help │{' '}
          <Text color={colors.amber}>q</Text> to quit
        </Text>
        <Text color={colors.textDim}>
          View: <Text color={colors.amber}>{view.toUpperCase()}</Text>
        </Text>
      </Box>
    </Box>
  );
};

// Startup sequence
const StartupSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  const bootMessages = [
    '> INITIALIZING VAULT-MONITOR v1.0.0...',
    '> LOADING SYSTEM MODULES...',
    '> SCANNING HARDWARE COMPONENTS...',
    '> ESTABLISHING NETWORK CONNECTION...',
    '> CALIBRATING SENSORS...',
    '> RUNNING DIAGNOSTICS...',
    '> ALL SYSTEMS NOMINAL',
    '> BOOT SEQUENCE COMPLETE',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootMessages.length) {
        setLines((prev) => [...prev, bootMessages[index]]);
        index++;
      } else {
        setComplete(true);
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Box flexDirection="column" padding={2}>
      <Text color={colors.amber}>
        ┌─────────────────────────────────────────┐
      </Text>
      <Text color={colors.amber}>
        │         VAULT-TEC INDUSTRIES            │
      </Text>
      <Text color={colors.amber}>
        │      SYSTEM MONITORING TERMINAL         │
      </Text>
      <Text color={colors.amber}>
        └─────────────────────────────────────────┘
      </Text>
      <Text> </Text>
      {lines.map((line, i) => (
        <Text key={i} color={i === lines.length - 1 && complete ? colors.green : colors.amber}>
          {line}
        </Text>
      ))}
      {!complete && (
        <Text color={colors.amber}>
          {'█'}
        </Text>
      )}
    </Box>
  );
};

// Root component with startup sequence
const Root: React.FC = () => {
  const [booted, setBooted] = useState(false);

  // Skip boot sequence if --skip-boot flag is passed
  const skipBoot = process.argv.includes('--skip-boot');

  if (skipBoot || booted) {
    return <App />;
  }

  return <StartupSequence onComplete={() => setBooted(true)} />;
};

// Clear screen and render
console.clear();
render(<Root />);
