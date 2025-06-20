// page.tsx
// This file defines the main landing page component for a Next.js personal portfolio.

'use client';
import React from 'react';
import Image from 'next/image';
import Counter from '@/components/counter/counter';

// Main App component for the landing page
const App: React.FC = () => {
  const projects = [
    {
      title: 'Smart Cockpit Centerconsole',
      description: 'Developed the centerconsole of the Smart Cockpit with QT/QML and MQTT protocol to communicate with the other screens.',
      imageSrc: 'https://placehold.co/600x400/2d3748/a0aec0?text=Smart+Cockpit',
      youtubeLink: 'https://www.auo.com/en-global/products/index/Mobility/Smart_Cockpit',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Translation validation AI tool',
      description: 'Validation tool using LLMs, built in Python to validate and improve translations in real-time.',
      imageSrc: 'https://placehold.co/600x400/2d3748/a0aec0?text=Translation+Validation+AI',
      youtubeLink: 'https://www.youtube.com/@coryhisey8431',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Mobile drive robot simulation',
      description: 'A simulation of a mobile drive robot using ROS2 and Gazebo, showcasing path planning and obstacle avoidance.',
      imageSrc: '/ros2.png',
      youtubeLink: 'https://www.youtube.com/watch?v=eMkwDfn32QA&t=1s&ab_channel=CoryHisey',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Embedded screen UI with ESP32',
      description: 'An embedded screen UI developed with ESP32, featuring a responsive design and real-time sensor data via ESPNOW.',
      imageSrc: '/Screen.jpeg',
      youtubeLink: 'https://www.youtube.com/@coryhisey8431',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Heltec LoRa32 Meshtastic',
      description: 'Meshtastic firmware flashed on Heltec LoRa32 with 3D printed enclosures. This project showcases long-range communication capabilities.',
      imageSrc: '/meshtastic.jpg',
      youtubeLink: 'https://youtu.be/dKr2ze8ixjE?si=OnVvvoIgl9QhbolE',
      githubLink: 'https://github.com/coryhighsea',
    },
    {
      title: 'Odoo ERP AI-Agent',
      description: 'A custom-built plugin for Odoo featuring an AI assistant that connects to an LLM to read and write from the Odoo PostgreSQL database.',
      imageSrc: 'https://placehold.co/600x400/2d3748/a0aec0?text=Odoo+AI+Agent',
      youtubeLink: 'https://youtu.be/09OrhxvnLjM?si=C_tNg7nMu3c2Z2zL',
      githubLink: 'https://github.com/coryhighsea/odoo-erp-ai-agent',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-800 bg-opacity-90 z-10 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-300">
            Cory Hisey
          </a>
          <div className="space-x-6">
            <a href="#about" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">About</a>
            <a href="#skills" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero2.jpeg"
            alt="Hero Background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 p-8 rounded-lg shadow-2xl bg-black/60 backdrop-blur-lg max-w-3xl mx-auto transform transition-all duration-500 hover:scale-105">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 animate-fade-in-up">
            Hi, I&#39;m <span className="text-teal-300">Cory Hisey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up delay-200">
            A passionate <span className="font-semibold text-teal-200">Embedded Software Developer</span> building engaging systems.
          </p>
          <a href="#projects" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
            View My Work
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-800 to-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">About Me</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <img
                src="/cory_hisey.jpg"
                alt="Cory Hisey"
                className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover mx-auto shadow-xl border-4 border-teal-500 object-top"
              />
            </div>
            <div className="md:w-2/3 text-lg text-gray-300 leading-relaxed">
              <p className="mb-4">
                Hello! I&#39;m a dedicated embedded software developer with a strong passion for creating robust and efficient embedded systems. My journey began with earning a mechanical engineering degree, followed by a Master&#39;s in mechatronics engineering. Leading me to dive deep into various programming languages and hardware.
              </p>
              <p className="mb-4">
                I specialize in front-end embedded development, with a keen eye for user experience and responsive design. I love bringing ideas to life through clean, maintainable code. Beyond coding, I enjoy learning new technologies and solving complex problems.
              </p>
              <p>
                When I&#39;m not at my keyboard, I like to spend time with my wife and cats, reading books, and travelling to new countries. I&#39;m always open to new challenges and collaborations!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {['QT/QML', 'C++', 'JavaScript', 'Python', 'AI Engineering', 'ROS2', 'Next.js', 'TypeScript', 'PostgreSQL', 'Git', 'Docker', '3D Printing'].map((skill, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/20">
                <p className="text-xl font-semibold text-gray-200">{skill}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Counter />
          </div>
        </div>
      </section>

{/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => ( // Mapping over the new projects array
              <div key={index} className="bg-gray-900 rounded-lg shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-sky-500/20">
                <img
                  src={project.imageSrc} // Use project.imageSrc
                  alt={project.title} // Use project.title for alt text
                  className="w-full h-48 object-cover shadow-lg"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3> {/* Use project.title */}
                  <p className="text-gray-400 text-base mb-4">
                    {project.description} {/* Use project.description */}
                  </p>
                  <div className="flex justify-between items-center">
                    <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors duration-300">
                      YouTube
                    </a>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-teal-400 mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            I&#39;m always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-6">
            <a
              href="mailto:&#099;&#106;&#104;&#105;&#115;&#101;&#121;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Email Me
            </a>
            <a
              href="https://www.youtube.com/@coryhisey8431"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              YouTube
            </a>
            <a
              href="https://www.linkedin.com/in/cory-hisey-730a8a59/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/coryhighsea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Cory Hisey. All rights reserved.</p>
          <p className="text-sm mt-2">Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>

      {/* Custom CSS for animations - You would typically put this in a global CSS file */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }

        .animate-fade-in-up.delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default App;
