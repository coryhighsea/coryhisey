// page.tsx
// Retro-futuristic portfolio page inspired by Fallout/Silo aesthetics

'use client';
import React, { useState, useEffect } from 'react';

// Skill data with proficiency levels
const skills = [
  { name: 'QT/QML', level: 90 },
  { name: 'C++', level: 75 },
  { name: 'JavaScript', level: 80 },
  { name: 'Python', level: 88 },
  { name: 'AI Engineering', level: 75 },
  { name: 'ROS2', level: 43 },
  { name: 'Next.js', level: 78 },
  { name: 'TypeScript', level: 86 },
  { name: 'PostgreSQL', level: 79 },
  { name: 'Git', level: 92 },
  { name: 'Docker', level: 82 },
  { name: '3D Printing', level: 85 },
];

// Typing effect hook
const useTypingEffect = (text: string, speed: number = 50, startDelay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const startTyping = () => {
      let index = 0;
      const type = () => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};

// Progress Bar Component
const SkillBar: React.FC<{ name: string; level: number; delay: number }> = ({ name, level, delay }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(level);
    }, delay);
    return () => clearTimeout(timeout);
  }, [level, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-[#e8dcc4] text-sm uppercase tracking-wider">{name}</span>
        <span className="text-[#ffb000] text-sm font-bold">{level}%</span>
      </div>
      <div className="retro-progress">
        <div
          className="retro-progress-fill transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  const heroText = useTypingEffect("CORY HISEY", 100, 500);
  const subtitleText = useTypingEffect("EMBEDDED SOFTWARE DEVELOPER", 50, 1800);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBootComplete(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: 'HWSS Universe™ Web App',
      code: 'PROJECT-001',
      classification: 'ACTIVE',
      description: 'Production web application, hosting written chapters, AI companions and handling subscription tiers.',
      imageSrc: 'https://hwssuniverse.ca/images/house.jpeg',
      demoLink: 'https://hwssuniverse.ca',
      linkText: 'Access Site',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Translation Validation AI',
      code: 'PROJECT-002',
      classification: 'COMPLETE',
      description: 'Validation tool using LLMs, built in Python to validate and improve translations in real-time.',
      imageSrc: 'https://placehold.co/600x400/1b263b/ffb000?text=TRANSLATION+AI',
      demoLink: 'https://www.youtube.com/@coryhisey8431',
      linkText: 'View Demo',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Mobile Robot Simulation',
      code: 'PROJECT-003',
      classification: 'COMPLETE',
      description: 'A simulation of a mobile drive robot using ROS2 and Gazebo, showcasing path planning and obstacle avoidance.',
      imageSrc: '/ros2.png',
      demoLink: 'https://www.youtube.com/watch?v=eMkwDfn32QA&t=1s&ab_channel=CoryHisey',
      linkText: 'View Demo',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'ESP32 Embedded Screen UI',
      code: 'PROJECT-004',
      classification: 'COMPLETE',
      description: 'An embedded screen UI developed with ESP32, featuring a responsive design and real-time sensor data via ESPNOW.',
      imageSrc: '/Screen.jpeg',
      demoLink: 'https://www.youtube.com/@coryhisey8431',
      linkText: 'View Demo',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Heltec LoRa32 Meshtastic',
      code: 'PROJECT-005',
      classification: 'ACTIVE',
      description: 'Meshtastic firmware flashed on Heltec LoRa32 with 3D printed enclosures. Long-range communication system.',
      imageSrc: '/meshtastic.jpg',
      demoLink: 'https://youtu.be/dKr2ze8ixjE?si=OnVvvoIgl9QhbolE',
      linkText: 'View Demo',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Odoo ERP AI-Agent',
      code: 'PROJECT-006',
      classification: 'COMPLETE',
      description: 'A custom-built plugin for Odoo featuring an AI assistant that connects to an LLM to read and write from the Odoo PostgreSQL database.',
      imageSrc: 'https://placehold.co/600x400/1b263b/ffb000?text=ODOO+AI+AGENT',
      demoLink: 'https://youtu.be/09OrhxvnLjM?si=C_tNg7nMu3c2Z2zL',
      linkText: 'View Demo',
      githubLink: 'https://github.com/coryhighsea/odoo-erp-ai-agent',
    },
  ];

  return (
    <div className={`min-h-screen bg-[#0d1b2a] text-[#e8dcc4] font-mono ${bootComplete ? 'crt-flicker' : ''}`}>
      {/* CRT Effects Overlays */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />
      <div className="noise-overlay" />

      {/* Navbar */}
      <nav className="fixed w-full bg-[#0d1b2a]/95 z-50 border-b-2 border-[#b87a00]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-3 h-3 rounded-full bg-[#10f518] shadow-[0_0_10px_#10f518] animate-transmit" />
            <span className="text-xl font-bold text-[#ffb000] tracking-wider font-[Orbitron] hover:text-[#ffc832] transition-colors">
              C.HISEY
            </span>
          </a>
          <div className="flex items-center space-x-8">
            {['ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#e8dcc4] hover:text-[#ffb000] transition-all duration-300 text-sm tracking-widest relative group"
              >
                <span className="opacity-50 group-hover:opacity-100">[</span>
                {item}
                <span className="opacity-50 group-hover:opacity-100">]</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="hero-bg">
          {/* Grid pattern */}
          <div className="hero-grid" />

          {/* Radar sweep effect */}
          <div className="hero-radar" />

          {/* Concentric rings */}
          <div className="hero-rings">
            <div className="hero-ring" />
            <div className="hero-ring" />
            <div className="hero-ring" />
            <div className="hero-ring" />
          </div>

          {/* Floating particles */}
          <div className="hero-particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="particle" />
            ))}
          </div>

          {/* Horizontal scan line */}
          <div className="hero-scanline" />

          {/* Data streams */}
          <div className="hero-datastream hero-datastream-left">
            <div className="datastream-text" style={{ animationDelay: '0s' }}>
              0x4F 0x4E 0x4C 0x49 0x4E 0x45<br />
              SYS_INIT: OK<br />
              MEM_CHECK: PASS<br />
              NET_STATUS: ACTIVE<br />
              ENCRYPTION: AES-256<br />
              USER_AUTH: VERIFIED<br />
              CLEARANCE: LVL_4<br />
              0x52 0x45 0x41 0x44 0x59
            </div>
          </div>
          <div className="hero-datastream hero-datastream-right">
            <div className="datastream-text" style={{ animationDelay: '7s' }}>
              PING: 12ms<br />
              CPU: 23%<br />
              RAM: 4.2GB<br />
              UPTIME: 99.9%<br />
              TEMP: 42°C<br />
              VOLTAGE: 5.1V<br />
              FREQ: 2.4GHz<br />
              STATUS: NOMINAL
            </div>
          </div>

          {/* Corner brackets */}
          <div className="hero-corner hero-corner-tl" />
          <div className="hero-corner hero-corner-tr" />
          <div className="hero-corner hero-corner-bl" />
          <div className="hero-corner hero-corner-br" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Terminal Header */}
          <div className="mb-8 text-left inline-block">
            <div className="bg-[#0d1b2a]/90 border-2 border-[#b87a00] p-1 mb-4">
              <div className="flex items-center gap-2 px-2 py-1 border-b border-[#3d405b]">
                <div className="w-2 h-2 rounded-full bg-[#d90429]" />
                <div className="w-2 h-2 rounded-full bg-[#f0c808]" />
                <div className="w-2 h-2 rounded-full bg-[#10f518]" />
                <span className="text-[#b87a00] text-xs ml-2 tracking-wider">SYSTEM TERMINAL v2.77</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <p className="text-[#10f518] mb-1">&gt; INITIALIZING SYSTEM...</p>
                <p className="text-[#10f518] mb-1">&gt; LOADING PERSONNEL FILE...</p>
                <p className="text-[#ffb000]">&gt; STATUS: <span className="text-[#10f518]">ONLINE</span></p>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="vault-frame bg-[#0d1b2a]/80 backdrop-blur-sm p-8 md:p-12">
            <p className="text-[#b87a00] text-sm tracking-[0.3em] mb-4 uppercase">Personnel Identification</p>
            <h1 className="text-5xl md:text-7xl font-bold text-[#ffb000] mb-4 font-[Orbitron] tracking-wider text-glow">
              {heroText.displayedText}
              {!heroText.isComplete && <span className="animate-pulse">_</span>}
            </h1>
            <div className="h-8 mb-6">
              <p className="text-xl md:text-2xl text-[#e8dcc4] tracking-[0.2em]">
                {subtitleText.displayedText}
                {heroText.isComplete && !subtitleText.isComplete && <span className="animate-pulse">_</span>}
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="status-indicator status-online" />
              <span className="text-[#10f518] text-sm tracking-wider">SYSTEM OPERATIONAL</span>
            </div>
            <a
              href="#projects"
              className="retro-button inline-block mt-8 animate-fade-in-up delay-600"
            >
              Access Projects
            </a>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute bottom-8 left-8 text-[#b87a00] text-xs tracking-wider opacity-60 z-10">
          LAT: 52.2686° N<br />
          LONG: 8.0505° W
        </div>
        <div className="absolute bottom-8 right-8 text-[#b87a00] text-xs tracking-wider opacity-60 text-right z-10">
          SECTOR: 7G<br />
          CLEARANCE: LEVEL 4
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#0d1b2a] to-[#1b263b]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#ffb000] mb-12 section-header text-glow">
            Personnel File
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Profile Image - Vault Window Style */}
            <div className="lg:w-1/3">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-[#b87a00] p-2 mx-auto relative">
                  {/* Inner decorative ring */}
                  <div className="absolute inset-2 rounded-full border-2 border-[#3d405b]" />
                  {/* Image container */}
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#ffb000] shadow-[0_0_30px_rgba(255,176,0,0.3)]">
                    <img
                      src="/cory_hisey.jpg"
                      alt="Cory Hisey"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Corner markers */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#ffb000]" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#ffb000]" />
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#ffb000]" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#ffb000]" />
                </div>
                {/* ID Badge */}
                <div className="mt-4 text-center">
                  <div className="inline-block bg-[#0d1b2a] border-2 border-[#b87a00] px-4 py-2">
                    <p className="text-[#ffb000] text-xs tracking-[0.3em]">EMPLOYEE ID</p>
                    <p className="text-[#e8dcc4] text-lg tracking-wider">CH-2024-001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Content - Dossier Style */}
            <div className="lg:w-2/3">
              <div className="retro-card p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#3d405b]">
                  <span className="text-[#b87a00] text-xs tracking-wider">FILE STATUS:</span>
                  <span className="text-[#10f518] text-xs tracking-wider">DECLASSIFIED</span>
                </div>

                <div className="space-y-4 text-[#e8dcc4] leading-relaxed">
                  <p>
                    <span className="text-[#ffb000]">&gt;</span> Dedicated embedded software developer with a strong passion for creating robust and efficient embedded systems. Journey began with a mechanical engineering degree, followed by a Master&apos;s in mechatronics engineering.
                  </p>
                  <p>
                    <span className="text-[#ffb000]">&gt;</span> Specializes in front-end embedded development, with a keen eye for user experience and responsive design. Brings ideas to life through clean, maintainable code. Always learning new technologies and solving complex problems.
                  </p>
                  <p>
                    <span className="text-[#ffb000]">&gt;</span> Off-duty activities include: spending time with spouse and feline companions, literature consumption, and international exploration. Always open to new challenges and collaborations.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#3d405b] grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#b87a00]">EDUCATION:</span>
                    <p className="text-[#e8dcc4]">M.Eng Mechatronics</p>
                  </div>
                  <div>
                    <span className="text-[#b87a00]">SPECIALIZATION:</span>
                    <p className="text-[#e8dcc4]">Embedded Systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-[#0d1b2a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#ffb000] mb-4 section-header text-glow">
            Technical Proficiencies
          </h2>
          <p className="text-center text-[#b87a00] mb-12 tracking-wider text-sm">SKILL ASSESSMENT MATRIX</p>

          <div className="max-w-4xl mx-auto">
            <div className="retro-card p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#3d405b]">
                <span className="status-indicator status-online" />
                <span className="text-[#10f518] text-xs tracking-wider">DIAGNOSTICS COMPLETE</span>
              </div>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 100 + 500}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-[#0d1b2a] to-[#1b263b]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#ffb000] mb-4 section-header text-glow">
            Mission Archives
          </h2>
          <p className="text-center text-[#b87a00] mb-12 tracking-wider text-sm">PROJECT DATABASE</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="retro-card overflow-hidden group hover:border-[#ffb000] transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-transparent to-transparent" />

                  {/* Classification Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2 py-1 tracking-wider border ${
                      project.classification === 'ACTIVE'
                        ? 'border-[#10f518] text-[#10f518] bg-[#10f518]/10'
                        : 'border-[#b87a00] text-[#b87a00] bg-[#b87a00]/10'
                    }`}>
                      {project.classification}
                    </span>
                  </div>

                  {/* Project Code */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[#ffb000] text-xs tracking-wider bg-[#0d1b2a]/80 px-2 py-1">
                      {project.code}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#ffb000] mb-2 tracking-wide font-[Orbitron]">
                    {project.title}
                  </h3>
                  <p className="text-[#e8dcc4] text-sm mb-4 leading-relaxed opacity-80">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-[#3d405b]">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffb000] hover:text-[#ffc832] text-sm tracking-wider transition-colors flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-[#ffb000] rounded-full" />
                      {project.linkText}
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e8dcc4] hover:text-[#ffb000] text-sm tracking-wider transition-colors opacity-60 hover:opacity-100"
                    >
                      [SOURCE]
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#0d1b2a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ffb000] mb-4 section-header text-glow">
            Establish Contact
          </h2>
          <p className="text-center text-[#b87a00] mb-8 tracking-wider text-sm">COMMUNICATION CHANNELS</p>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="retro-card p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="status-indicator status-online" />
                <span className="text-[#10f518] text-sm tracking-wider">TRANSMISSION LINK ACTIVE</span>
              </div>
              <p className="text-[#e8dcc4] leading-relaxed">
                Open to new opportunities, collaborations, or friendly communications.
                Select a channel below to initiate contact.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:&#099;&#106;&#104;&#105;&#115;&#101;&#121;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;"
              className="retro-button"
            >
              ✉ Email
            </a>
            <a
              href="https://www.youtube.com/@coryhisey8431"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button"
            >
              ▶ YouTube
            </a>
            <a
              href="https://www.linkedin.com/in/cory-hisey-730a8a59/"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button"
            >
              ◆ LinkedIn
            </a>
            <a
              href="https://github.com/coryhighsea"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button"
            >
              ⌂ GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f0d] border-t-2 border-[#b87a00] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#10f518] shadow-[0_0_5px_#10f518]" />
              <span className="text-[#b87a00] text-sm tracking-wider">SYSTEM UPTIME: 99.9%</span>
            </div>
            <p className="text-[#e8dcc4] text-sm tracking-wider">
              &copy; {new Date().getFullYear()} CORY HISEY // ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
