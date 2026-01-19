# Cory Hisey - Portfolio

Personal portfolio website with a retro-futuristic aesthetic inspired by Fallout and Silo.

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Runtime**: Bun

## Features

- Retro-futuristic UI with CRT effects, scanlines, and amber glow
- Animated hero section with radar sweep and floating particles
- Terminal-style typing animations
- Skill progress bars with animated gauges
- Project showcase styled as "Mission Archives"
- Fully responsive design

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine

### Installation

```bash
# Clone the repository
git clone https://github.com/coryhighsea/coryhisey.git
cd coryhisey

# Install dependencies
bun install

# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create production build
bun run build

# Start production server
bun run start
```

## Project Structure

```
├── app/
│   ├── page.tsx        # Main portfolio page
│   ├── layout.tsx      # Root layout
│   ├── globals.css     # Global styles and theme
│   └── icon.svg        # Favicon
├── public/             # Static assets
└── vault-monitor/      # Bonus: Retro TUI system monitor
```

## Vault Monitor (Bonus)

Included is a terminal-based system monitor TUI with the same retro-futuristic styling. See [vault-monitor/README.md](vault-monitor/README.md) for details.

```bash
cd vault-monitor
bun install
bun run dev
```

## License

MIT

## Contact

- Email: cjhisey@gmail.com
- LinkedIn: [cory-hisey](https://www.linkedin.com/in/cory-hisey-730a8a59/)
- GitHub: [coryhighsea](https://github.com/coryhighsea)
- YouTube: [@coryhisey8431](https://www.youtube.com/@coryhisey8431)
