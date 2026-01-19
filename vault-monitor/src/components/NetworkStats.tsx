import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import si from 'systeminformation';
import { Panel, colors, StatusIndicator } from './Panel.js';
import { Sparkline } from './ProgressBar.js';

interface NetworkData {
  interface: string;
  ip: string;
  rx: number;
  tx: number;
  rxSec: number;
  txSec: number;
}

export const NetworkStats: React.FC = () => {
  const [network, setNetwork] = useState<NetworkData>({
    interface: 'Loading...',
    ip: '0.0.0.0',
    rx: 0,
    tx: 0,
    rxSec: 0,
    txSec: 0,
  });
  const [rxHistory, setRxHistory] = useState<number[]>([]);
  const [txHistory, setTxHistory] = useState<number[]>([]);

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const [netStats, netInterfaces] = await Promise.all([
          si.networkStats(),
          si.networkInterfaces(),
        ]);

        // Find the primary interface (not loopback)
        const primaryInterface = (netInterfaces as si.Systeminformation.NetworkInterfacesData[]).find(
          (iface) => !iface.internal && iface.ip4
        );
        const stats = netStats.find((s) => s.iface === primaryInterface?.iface) || netStats[0];

        if (stats) {
          const rxSec = stats.rx_sec || 0;
          const txSec = stats.tx_sec || 0;

          setNetwork({
            interface: stats.iface || 'Unknown',
            ip: primaryInterface?.ip4 || 'N/A',
            rx: stats.rx_bytes || 0,
            tx: stats.tx_bytes || 0,
            rxSec,
            txSec,
          });

          setRxHistory((prev) => [...prev.slice(-19), rxSec / 1024]);
          setTxHistory((prev) => [...prev.slice(-19), txSec / 1024]);
        }
      } catch {
        // Silently handle errors
      }
    };

    fetchNetwork();
    const interval = setInterval(fetchNetwork, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB`;
    } else if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(1)}KB`;
    }
    return `${bytes}B`;
  };

  const formatSpeed = (bytesPerSec: number): string => {
    if (bytesPerSec >= 1024 * 1024) {
      return `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s`;
    } else if (bytesPerSec >= 1024) {
      return `${(bytesPerSec / 1024).toFixed(1)} KB/s`;
    }
    return `${bytesPerSec.toFixed(0)} B/s`;
  };

  return (
    <Panel title="NETWORK STATUS">
      <Box marginBottom={1}>
        <StatusIndicator status={network.ip !== 'N/A' ? 'online' : 'offline'} />
        <Text color={colors.textDim}>
          {network.interface} - <Text color={colors.amber}>{network.ip}</Text>
        </Text>
      </Box>

      <Box justifyContent="space-between" marginBottom={1}>
        <Box flexDirection="column">
          <Text color={colors.green}>▼ RX</Text>
          <Text color={colors.amber}>{formatSpeed(network.rxSec)}</Text>
          <Text color={colors.textDim}>{formatBytes(network.rx)}</Text>
        </Box>
        <Box flexDirection="column">
          <Text color={colors.yellow}>▲ TX</Text>
          <Text color={colors.amber}>{formatSpeed(network.txSec)}</Text>
          <Text color={colors.textDim}>{formatBytes(network.tx)}</Text>
        </Box>
      </Box>

      <Box flexDirection="column">
        <Text color={colors.textDim}>TRAFFIC:</Text>
        <Box>
          <Text color={colors.green}>▼ </Text>
          <Sparkline data={rxHistory} width={15} />
        </Box>
        <Box>
          <Text color={colors.yellow}>▲ </Text>
          <Sparkline data={txHistory} width={15} />
        </Box>
      </Box>
    </Panel>
  );
};
