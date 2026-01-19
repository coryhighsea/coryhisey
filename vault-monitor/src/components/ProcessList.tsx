import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import si from 'systeminformation';
import { Panel, colors } from './Panel.js';

interface ProcessData {
  name: string;
  pid: number;
  cpu: number;
  mem: number;
}

export const ProcessList: React.FC = () => {
  const [processes, setProcesses] = useState<ProcessData[]>([]);

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const procs = await si.processes();
        const sorted = procs.list
          .sort((a, b) => b.cpu - a.cpu)
          .slice(0, 8)
          .map((p) => ({
            name: p.name.substring(0, 20),
            pid: p.pid,
            cpu: p.cpu,
            mem: p.mem,
          }));
        setProcesses(sorted);
      } catch {
        // Silently handle errors
      }
    };

    fetchProcesses();
    const interval = setInterval(fetchProcesses, 2000);
    return () => clearInterval(interval);
  }, []);

  const getCpuColor = (cpu: number): string => {
    if (cpu >= 50) return colors.red;
    if (cpu >= 20) return colors.yellow;
    return colors.green;
  };

  return (
    <Panel title="TOP PROCESSES">
      <Box marginBottom={1}>
        <Text color={colors.amberDim}>
          {'NAME'.padEnd(20)} {'PID'.padStart(6)} {'CPU%'.padStart(7)} {'MEM%'.padStart(7)}
        </Text>
      </Box>
      {processes.length === 0 ? (
        <Text color={colors.textDim}>Loading processes...</Text>
      ) : (
        processes.map((proc, i) => (
          <Box key={proc.pid}>
            <Text color={colors.text}>{proc.name.padEnd(20)}</Text>
            <Text color={colors.textDim}>{proc.pid.toString().padStart(6)}</Text>
            <Text color={getCpuColor(proc.cpu)}>{proc.cpu.toFixed(1).padStart(7)}</Text>
            <Text color={colors.amber}>{proc.mem.toFixed(1).padStart(7)}</Text>
          </Box>
        ))
      )}
    </Panel>
  );
};
