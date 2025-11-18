
import React, { useState } from 'react';

const projectsData = [
  {
    id: 1,
    title: 'Bees vs Plants',
    subtitle: 'Tower-defense game • Unity • C#',
    description: 'A polished tower-defense project with custom AI and wave design. Hosted on itch.io.',
    img: '/images/bees-vs-plants.jpg', // replace with your path or CDN
    playUrl: 'https://hudsonm.itch.io/bees-vs-plants',
    codeUrl: 'https://github.com/yourgithub/bees-vs-plants'
  },
  {
    id: 2,
    title: 'NatureBoy (Game Jam)',
    subtitle: 'Rapid prototype • Unity • C#',
    description: 'A compact prototype that showcases rapid iteration and polish under tight time constraints.',
    img: '/images/natureboy.jpg',
    playUrl: 'https://hudsonm.itch.io/natureboy',
    codeUrl: 'https://github.com/yourgithub/natureboy'
  },
  {
    id: 3,
    title: 'Roguelike (WIP)',
    subtitle: 'Procedural Generation • Unity • C#',
    description: 'Early-access roguelike with procedural rooms and item systems. Ongoing development.',
    img: '/images/rogue-project.jpg',
    playUrl: '',
    codeUrl: 'https://github.com/yourgithub/rogue-project'
  }
];

function Nav({ onOpenMobile }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-black/40 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-gold font-extrabold tracking-wide">HUDSON MARTIN</div>
            <div className="hidden md:flex items-center gap-4 text-sm text-white/80">
              <a href="#about" className="hover:text-white">About</a>
              <a href="#projects" className="hover:text-white">Projects</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/Hudson Martin Resume2025.pdf" className="hidden sm:inline-block px-3 py-1 rounded bg-sky-600 text-white text-sm font-semibold">Resume</a>
            <button onClick={onOpenMobile} aria-label="Open menu" className="md:hidden p-2 rounded bg-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 transform ${open ? 'translate-x-0' : 'translate-x-full'} transition-transform`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <nav className="absolute right-0 top-0 w-64 h-full bg-[#071226] p-6 shadow-lg">
        <button onClick={onClose} className="mb-6 p-2 bg-white/5 rounded">Close</button>
        <ul className="flex flex-col gap-4 text-white/90">
          <li><a href="#about" onClick={onClose}>About</a></li>
          <li><a href="#projects" onClick={onClose}>Projects</a></li>
          <li><a href="#contact" onClick={onClose}>Contact</a></li>
          <li><a href="https://github.com/yourgithub" target="_blank" rel="noreferrer">GitHub</a></li>
        </ul>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center pt-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">Hudson Martin</h1>
        <p className="mt-3 text-lg text-white/80">Game Developer • Unity & Systems • C# / C++ / Python</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="#projects" className="px-4 py-2 rounded bg-sky-600 text-white font-semibold">View Projects</a>
          <a href="https://www.linkedin.com/in/hudson-martin-978455266" target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-white/5 text-white">LinkedIn</a>
        </div>

        <div className="mt-8 w-full">
          <div className="mx-auto max-w-xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded p-4 text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-600 to-indigo-600 rounded-lg flex items-center justify-center text-2xl font-bold">HM</div>
              <div>
                <div className="text-sm text-white/80">Level 21 • Game Developer</div>
                <div className="text-xs text-white/60">LSU • Graduating May 2026 • Minor: DMAET & IT Management</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ p, onOpen }) {
  return (
    <article className="project-card bg-[#0f1724] rounded-xl border border-white/5 overflow-hidden shadow-md">
      <div className="w-full h-44 bg-gray-800 flex items-center justify-center">
        {/* Replace with <img> for production */}
        <img src={p.img} alt={`${p.title} thumbnail`} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{p.title}</h3>
        <div className="text-sm text-white/70 mt-1">{p.subtitle}</div>
        <p className="mt-3 text-sm text-white/70">{p.description}</p>
        <div className="mt-4 flex gap-2 items-center">
          {p.playUrl ? (
            <a href={p.playUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-sky-600 text-white text-sm font-semibold">Play</a>
          ) : (
            <button onClick={() => onOpen(p)} className="px-3 py-1 rounded bg-white/5 text-white text-sm">Details</button>
          )}

          <a href={p.codeUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-white/5 text-white text-sm">Code</a>
        </div>
      </div>
    </article>
  );
}

function Projects({ onOpen }) {
  return (
    <section id="projects" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-white">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map(p => (
            <ProjectCard key={p.id} p={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-white">Contact</h2>
        <div className="bg-[#071226] border border-white/5 rounded-lg p-6">
          <p className="text-white/80">Email: <a href="mailto:h8009916@gmail.com" className="text-sky-300">h8009916@gmail.com</a></p>
          <p className="mt-2 text-white/80">LinkedIn: <a href="https://www.linkedin.com/in/hudson-martin-978455266" target="_blank" rel="noreferrer" className="text-sky-300">Hudson Martin</a></p>
          <p className="mt-4 text-white/70">Available for internships and freelance projects. I can provide playable builds, demos, or source code on request.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 text-center text-white/60 border-t border-white/5">
      © {new Date().getFullYear()} Hudson Martin — Built with React + Tailwind
    </footer>
  );
}

function Modal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative z-60 max-w-3xl w-full mx-4 bg-[#08121a] border border-white/6 rounded-lg p-6">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 bg-white/5 rounded">Close</button>
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-white/70 mt-2">{project.description}</p>
        <div className="mt-4">
          <img src={project.img} alt={project.title} className="w-full h-64 object-cover rounded" />
        </div>
        <div className="mt-4 flex gap-2">
          {project.playUrl && (
            <a href={project.playUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-sky-600 text-white">Play</a>
          )}
          <a href={project.codeUrl} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-white/5 text-white">Code</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061025] to-[#081226] text-white">
      <Nav onOpenMobile={() => setMobileOpen(true)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="pt-20">
        <Hero />
        <section id="about" className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-[#071226] border border-white/5 rounded-lg p-6">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-3 text-white/80">I build games, tools, and systems — with a focus on Unity, OpenGL, and low-level systems. I enjoy procedural generation, gameplay programming, and polishing user experiences.</p>
          </div>
        </section>

        <Projects onOpen={(p) => setModalProject(p)} />

        <Contact />

        <Footer />
      </main>

      <Modal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
}
