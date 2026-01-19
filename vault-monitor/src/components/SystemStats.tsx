import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import si from 'systeminformation';
import { Panel, colors, StatusIndicator } from './Panel.js';
import { ProgressBar, Sparkline } from './ProgressBar.js';

interface CpuData {
  usage: number;
  cores: number;
  speed: number;
  temp: number;
  model: string;
}

interface MemoryData {
  used: number;
  total: number;
  percentage: number;
  swapUsed: number;
  swapTotal: number;
}

interface DiskData {
  fs: string;
  used: number;
  size: number;
  percentage: number;
  mount: string;
}

export const CpuStats: React.FC = () => {
  const [cpu, setCpu] = useState<CpuData>({
    usage: 0,
    cores: 0,
    speed: 0,
    temp: 0,
    model: 'Loading...',
  });
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const fetchCpu = async () => {
      try {
        const [load, cpuInfo, temp] = await Promise.all([
          si.currentLoad(),
          si.cpu(),
          si.cpuTemperature(),
        ]);

        const usage = load.currentLoad;
        setCpu({
          usage,
          cores: cpuInfo.cores,
          speed: cpuInfo.speed,
          temp: temp.main || 0,
          model: `${cpuInfo.manufacturer} ${cpuInfo.brand}`.substring(0, 35),
        });

        setHistory((prev) => [...prev.slice(-29), usage]);
      } catch {
        // Silently handle errors
      }
    };

    fetchCpu();
    const interval = setInterval(fetchCpu, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Panel title="CPU STATUS">
      <Text color={colors.textDim}>{cpu.model}</Text>
      <Box marginTop={1}>
        <ProgressBar label="LOAD" value={cpu.usage} width={25} />
      </Box>
      <Box marginTop={1}>
        <Sparkline data={history} width={25} label="HISTORY" />
      </Box>
      <Box marginTop={1} justifyContent="space-between">
        <Text color={colors.textDim}>
          CORES: <Text color={colors.amber}>{cpu.cores}</Text>
        </Text>
        <Text color={colors.textDim}>
          FREQ: <Text color={colors.amber}>{cpu.speed.toFixed(1)}GHz</Text>
        </Text>
        {cpu.temp > 0 && (
          <Text color={colors.textDim}>
            TEMP: <Text color={cpu.temp > 80 ? colors.red : colors.amber}>{cpu.temp.toFixed(0)}°C</Text>
          </Text>
        )}
      </Box>
    </Panel>
  );
};

export const MemoryStats: React.FC = () => {
  const [memory, setMemory] = useState<MemoryData>({
    used: 0,
    total: 0,
    percentage: 0,
    swapUsed: 0,
    swapTotal: 0,
  });

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const mem = await si.mem();
        setMemory({
          used: mem.used,
          total: mem.total,
          percentage: (mem.used / mem.total) * 100,
          swapUsed: mem.swapused,
          swapTotal: mem.swaptotal,
        });
      } catch {
        // Silently handle errors
      }
    };

    fetchMemory();
    const interval = setInterval(fetchMemory, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number): string => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)}GB`;
  };

  return (
    <Panel title="MEMORY ALLOCATION">
      <ProgressBar label="RAM" value={memory.percentage} width={25} />
      <Box justifyContent="space-between" marginTop={1}>
        <Text color={colors.textDim}>
          USED: <Text color={colors.amber}>{formatBytes(memory.used)}</Text>
        </Text>
        <Text color={colors.textDim}>
          TOTAL: <Text color={colors.amber}>{formatBytes(memory.total)}</Text>
        </Text>
      </Box>
      {memory.swapTotal > 0 && (
        <Box marginTop={1}>
          <ProgressBar
            label="SWAP"
            value={(memory.swapUsed / memory.swapTotal) * 100}
            width={25}
          />
        </Box>
      )}
    </Panel>
  );
};

export const DiskStats: React.FC = () => {
  const [disks, setDisks] = useState<DiskData[]>([]);

  useEffect(() => {
    const fetchDisks = async () => {
      try {
        const fsSize = await si.fsSize();
        const filtered = fsSize
          .filter((d) => d.size > 0 && !d.mount.includes('/snap'))
          .slice(0, 3)
          .map((d) => ({
            fs: d.fs,
            used: d.used,
            size: d.size,
            percentage: d.use,
            mount: d.mount,
          }));
        setDisks(filtered);
      } catch {
        // Silently handle errors
      }
    };

    fetchDisks();
    const interval = setInterval(fetchDisks, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number): string => {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1000) {
      return `${(gb / 1024).toFixed(1)}TB`;
    }
    return `${gb.toFixed(0)}GB`;
  };

  return (
    <Panel title="STORAGE STATUS">
      {disks.length === 0 ? (
        <Text color={colors.textDim}>Scanning drives...</Text>
      ) : (
        disks.map((disk, i) => (
          <Box key={i} flexDirection="column" marginBottom={i < disks.length - 1 ? 1 : 0}>
            <Text color={colors.textDim}>
              {disk.mount.substring(0, 15)} ({formatBytes(disk.used)}/{formatBytes(disk.size)})
            </Text>
            <ProgressBar label="" value={disk.percentage} width={25} showPercentage={false} />
          </Box>
        ))
      )}
    </Panel>
  );
};
