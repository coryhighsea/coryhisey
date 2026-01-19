import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import si from 'systeminformation';
import { colors, StatusIndicator } from './Panel.js';

// ASCII art banner
const banner = `
╔═══════════════════════════════════════════════════════════════════════════════╗
║  ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗    ███╗   ███╗ ██████╗ ███╗   ██╗  ║
║  ██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝    ████╗ ████║██╔═══██╗████╗  ██║  ║
║  ██║   ██║███████║██║   ██║██║     ██║       ██╔████╔██║██║   ██║██╔██╗ ██║  ║
║  ╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║       ██║╚██╔╝██║██║   ██║██║╚██╗██║  ║
║   ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║       ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║  ║
║    ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝       ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝  ║
╚═══════════════════════════════════════════════════════════════════════════════╝`;

const simpleBanner = `
┌─────────────────────────────────────────────────────────────┐
│  VAULT-MONITOR v1.0.0  ▪  SYSTEM DIAGNOSTICS TERMINAL       │
└─────────────────────────────────────────────────────────────┘`;

interface SystemInfo {
  hostname: string;
  platform: string;
  distro: string;
  kernel: string;
  uptime: string;
}

export const Header: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    hostname: 'UNKNOWN',
    platform: '',
    distro: '',
    kernel: '',
    uptime: '0:00:00',
  });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const [osInfo, timeInfo] = await Promise.all([si.osInfo(), si.time()]);

        const uptimeSec = timeInfo.uptime;
        const hours = Math.floor(uptimeSec / 3600);
        const minutes = Math.floor((uptimeSec % 3600) / 60);
        const seconds = Math.floor(uptimeSec % 60);

        setSystemInfo({
          hostname: osInfo.hostname.toUpperCase(),
          platform: osInfo.platform,
          distro: osInfo.distro,
          kernel: osInfo.kernel,
          uptime: `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        });
      } catch {
        // Silently handle errors
      }
    };

    fetchSystemInfo();

    // Update time every second
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Update system info every 10 seconds
    const sysInterval = setInterval(fetchSystemInfo, 10000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(sysInterval);
    };
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).toUpperCase();
  };

  if (compact) {
    return (
      <Box flexDirection="column" marginBottom={1}>
        <Text color={colors.amber}>{simpleBanner}</Text>
        <Box justifyContent="space-between" paddingX={2}>
          <Box>
            <StatusIndicator status="online" />
            <Text color={colors.text}>HOST: </Text>
            <Text color={colors.amber}>{systemInfo.hostname}</Text>
          </Box>
          <Box>
            <Text color={colors.textDim}>UPTIME: </Text>
            <Text color={colors.green}>{systemInfo.uptime}</Text>
          </Box>
          <Box>
            <Text color={colors.amber}>{formatTime(time)}</Text>
            <Text color={colors.textDim}> │ </Text>
            <Text color={colors.amber}>{formatDate(time)}</Text>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text color={colors.amber}>{banner}</Text>
      <Box justifyContent="space-between" paddingX={2} marginTop={1}>
        <Box flexDirection="column">
          <Box>
            <StatusIndicator status="online" />
            <Text color={colors.text}>SYSTEM STATUS: </Text>
            <Text color={colors.green} bold>OPERATIONAL</Text>
          </Box>
          <Text color={colors.textDim}>
            HOST: <Text color={colors.amber}>{systemInfo.hostname}</Text>
          </Text>
          <Text color={colors.textDim}>
            OS: <Text color={colors.amber}>{systemInfo.distro || systemInfo.platform}</Text>
          </Text>
          <Text color={colors.textDim}>
            KERNEL: <Text color={colors.amber}>{systemInfo.kernel}</Text>
          </Text>
        </Box>
        <Box flexDirection="column" alignItems="flex-end">
          <Text color={colors.amber} bold>
            {formatTime(time)}
          </Text>
          <Text color={colors.amberDim}>{formatDate(time)}</Text>
          <Text color={colors.textDim}>
            UPTIME: <Text color={colors.green}>{systemInfo.uptime}</Text>
          </Text>
          <Text color={colors.textDim}>
            CLEARANCE: <Text color={colors.yellow}>LEVEL 4</Text>
          </Text>
        </Box>
      </Box>
      <Box marginTop={1}>
        <Text color={colors.amberDim}>
          {'═'.repeat(80)}
        </Text>
      </Box>
    </Box>
  );
};
