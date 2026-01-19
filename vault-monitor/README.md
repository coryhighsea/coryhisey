# VAULT-MONITOR

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║  ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗    ███╗   ███╗ ██████╗ ███╗   ██╗  ║
║  ██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝    ████╗ ████║██╔═══██╗████╗  ██║  ║
║  ██║   ██║███████║██║   ██║██║     ██║       ██╔████╔██║██║   ██║██╔██╗ ██║  ║
║  ╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║       ██║╚██╔╝██║██║   ██║██║╚██╗██║  ║
║   ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║       ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║  ║
║    ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝       ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝  ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

A retro-futuristic system monitoring TUI (Terminal User Interface) inspired by the Fallout Pip-Boy and Silo TV series aesthetics. Built with [Ink](https://github.com/vadimdemedes/ink) (React for CLIs).

## Features

- **Real-time system monitoring** - CPU, memory, disk, and network statistics
- **Retro-futuristic design** - Amber/gold color scheme with vault-style UI elements
- **Animated boot sequence** - Terminal startup animation
- **Process monitoring** - Top processes by CPU usage
- **Network traffic graphs** - Live sparkline visualizations
- **Multiple views** - Switch between dashboard layouts
- **Cross-platform** - Works on macOS, Linux, and Windows

## Preview

```
┌─────────────────────────────────────────────────────────────┐
│  VAULT-MONITOR v1.0.0  ▪  SYSTEM DIAGNOSTICS TERMINAL       │
└─────────────────────────────────────────────────────────────┘
● HOST: WORKSTATION-01           UPTIME: 4:23:15           14:32:07 │ JAN 19, 2026

┌─[ CPU STATUS ]──────────────────┐  ┌─[ NETWORK STATUS ]───────────┐
│ Intel Core i7-12700K            │  │ ● en0 - 192.168.1.100        │
│ LOAD          [████████░░] 78%  │  │                              │
│ HISTORY       ▂▃▅▆▇█▇▆▅▄▃▂▃▄▅▆  │  │ ▼ RX        ▲ TX             │
│ CORES: 12    FREQ: 3.6GHz       │  │ 1.2 MB/s    256 KB/s         │
└─────────────────────────────────┘  └──────────────────────────────┘

┌─[ MEMORY ALLOCATION ]───────────┐  ┌─[ TOP PROCESSES ]────────────┐
│ RAM           [██████░░░░] 62%  │  │ NAME              PID   CPU% │
│ USED: 12.4GB    TOTAL: 20.0GB   │  │ node             1234   12.3 │
│ SWAP          [██░░░░░░░░] 18%  │  │ chrome           5678    8.7 │
└─────────────────────────────────┘  │ code             9012    4.2 │
                                     └──────────────────────────────┘
```

## Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Setup

```bash
# Navigate to the vault-monitor directory
cd vault-monitor

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Build for Production

```bash
# Compile TypeScript
npm run build

# Run compiled version
npm start
```

## Usage

### Starting the Monitor

```bash
# Normal start (with boot animation)
npm run dev

# Skip boot animation
npm run dev -- --skip-boot
```

### Keyboard Controls

| Key | Action |
|-----|--------|
| `1` | Switch to Dashboard view |
| `2` | Switch to Full Header view |
| `h` or `?` | Show help menu |
| `q` | Quit application |
| `Ctrl+C` | Force quit |

## Views

### Dashboard View (Default)

Compact layout showing all system metrics in a two-column grid:
- Left column: CPU, Memory, Disk
- Right column: Network, Processes

### Full Header View

Extended header with ASCII art banner and detailed system information, plus core metrics.

## Components

### CPU Status
- Current load percentage with color-coded progress bar
- Historical usage sparkline (last 30 seconds)
- Core count and frequency
- Temperature (when available)

### Memory Allocation
- RAM usage with progress bar
- Used/Total memory display
- Swap usage (when applicable)

### Storage Status
- Multiple disk monitoring
- Usage bars for each mounted volume
- Capacity information

### Network Status
- Active interface and IP address
- Real-time RX/TX speeds
- Traffic history sparklines
- Total data transferred

### Process List
- Top 8 processes by CPU usage
- PID, CPU%, and Memory% columns
- Color-coded by resource usage

## Color Scheme

The UI uses a consistent retro-futuristic color palette:

| Element | Color | Hex |
|---------|-------|-----|
| Primary accent | Amber | `#ffb000` |
| Secondary accent | Amber dim | `#b87a00` |
| Success/Online | Green | `#10f518` |
| Warning | Yellow | `#f0c808` |
| Error/Critical | Red | `#d90429` |
| Text | Cream | `#e8dcc4` |
| Text dim | Gray | `#8a8577` |
| Borders | Metal | `#3d405b` |

## Thresholds

Progress bars change color based on usage levels:

| Level | Color | Threshold |
|-------|-------|-----------|
| Normal | Green | 0-69% |
| Warning | Yellow | 70-89% |
| Critical | Red | 90-100% |

## Project Structure

```
vault-monitor/
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .gitignore           # Git ignore rules
├── README.md            # This file
└── src/
    ├── app.tsx          # Main application entry point
    └── components/
        ├── index.ts     # Component exports
        ├── Panel.tsx    # Bordered panel container
        ├── ProgressBar.tsx  # Progress bars and sparklines
        ├── Header.tsx   # Banner and system info
        ├── SystemStats.tsx  # CPU, Memory, Disk components
        ├── NetworkStats.tsx # Network monitoring
        └── ProcessList.tsx  # Process table
```

## Dependencies

| Package | Purpose |
|---------|---------|
| [ink](https://github.com/vadimdemedes/ink) | React for CLI rendering |
| [react](https://react.dev) | Component framework |
| [systeminformation](https://github.com/sebhildebrandt/systeminformation) | System metrics collection |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript execution |

## Development

### Running in Watch Mode

```bash
npm run dev
```

This uses `tsx watch` to automatically reload on file changes.

### Type Checking

The project uses TypeScript for type safety. Type errors will be shown during development and build.

### Adding New Components

1. Create a new component in `src/components/`
2. Export it from `src/components/index.ts`
3. Import and use in `src/app.tsx`

## Troubleshooting

### "Cannot find module 'ink'"

Run `npm install` to install dependencies.

### Temperature not showing

CPU temperature monitoring requires:
- macOS: No additional setup needed
- Linux: `lm-sensors` package installed
- Windows: May require admin privileges

### High CPU usage

The monitor updates every 1-2 seconds. If this causes issues on low-powered systems, you can modify the refresh intervals in the component files.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - See [LICENSE](LICENSE) for details.

## Credits

- Design inspired by Fallout Pip-Boy and Silo TV series
- Built with [Ink](https://github.com/vadimdemedes/ink) by Vadim Demedes
- System metrics via [systeminformation](https://github.com/sebhildebrandt/systeminformation)

---

```
┌─────────────────────────────────────────────┐
│  VAULT-TEC INDUSTRIES                       │
│  "Preparing for the Future"                 │
└─────────────────────────────────────────────┘
```
