import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';

const CONTACT_EMAIL = 'hudsonpm64@gmail.com';
const PIXEL_FONT = "'Press Start 2P', monospace";

const projectsData = [
  {
    id: 1,
    title: 'Bees vs Plants',
    subtitle: 'Tower-defense game • Unity • C#',
    description: 'A tower-defense project with custom AI and wave design. Hosted on itch.io.',
    role: 'Solo Project',
    highlights: [
      'Built the AI of the enemy units and created the wave-spawning logic for the game.',
      'Implemented tower targeting logic to ensure efficient defense against waves of enemies.',
      'Designed and balanced enemy waves to provide a challenging yet fair gameplay experience.'
    ],
    tags: ['Unity', 'C#', 'Custom AI', 'Wave design'],
    img: '/images/bees-vs-plants.jpg',
    gallery: ['/images/bees-vs-plants.jpg'],
    playUrl: 'https://hudsonm.itch.io/bees-vs-plants',
    codeUrl: '',
    length: 'Medium build'
  },
  {
    id: 2,
    title: 'NatureBoy (Game Jam)',
    subtitle: 'Rapid prototype • Unity • C#',
    description: 'A compact prototype that showcases rapid iteration under tight time constraints.',
    role: 'Solo Project',
    highlights: [
      'The game jam that it was built for was only a week long, requiring rapid prototyping and iteration.',
      'Created a procedural generation system for the game within the limited timeframe.',
      'With more time, I would add additional levels and gameplay mechanics to enhance replayability.'
    ],
    tags: ['Unity', 'C#', 'Game Jam', 'Rapid prototyping'],
    img: '/images/natureboy.jpg',
    gallery: ['/images/natureboy.jpg'],
    playUrl: 'https://hudsonm.itch.io/natureboy',
    codeUrl: '',
    length: 'Medium build'
  },
  {
    id: 3,
    title: 'Roguelike (WIP)',
    subtitle: 'Procedural Generation • Unity • C#',
    description: 'Early-access roguelike with procedural rooms. Ongoing development.',
    role: 'Solo Project',
    highlights: [
      'The procedural generation system creates varied room layouts for each playthrough, enhancing replayability.',
      'Will implement a time related ability with limited usage to add strategic depth to gameplay.',
      'The next milestone is to fully implement the procedural generation system for all room types.'
    ],
    tags: ['Unity', 'C#', 'Procedural generation'],
    img: '/images/rogue-project.jpg',
    gallery: ['/images/rogue-project.jpg'],
    playUrl: '',
    codeUrl: '',
    length: 'In progress',
    inProgress: true
  }
];

const MENU_ITEMS = [
  { key: 'about', label: 'ABOUT' },
  { key: 'projects', label: 'PROJECTS' },
  { key: 'games', label: 'PLAY GAMES' },
  { key: 'contact', label: 'CONTACT' }
];

const SOCIAL_LINKS = [
  { label: 'GH', name: 'GitHub', url: 'https://github.com/HudsonM64' },
  { label: 'IN', name: 'LinkedIn', url: 'https://www.linkedin.com/in/hudson-martin-978455266' },
  { label: 'IO', name: 'itch.io', url: 'https://hudsonm.itch.io' }
];

const SKILLS = {
  languages: ['Java', 'C++', 'C#', 'Python', 'SQL', 'HTML', 'CSS', 'JavaScript'],
  tools: ['Unity', 'GitHub', 'VS Code', 'GameMaker', 'WSL', 'Microsoft Azure']
};

const EDUCATION = {
  school: 'Louisiana State University (LSU)',
  degree: 'B.S. in Computer Science',
  concentration: 'Software Engineering concentration',
  minors: 'Minors: DMAET & IT Management',
  graduated: 'Graduated May 2026'
};

const TIMELINE_ITEMS = [
  {
    date: '2026–Present',
    title: 'Junior App Dev',
    subtitle: 'Performance Contractors',
    bullets: []
  },
  {
    date: '2025–2026',
    title: 'IT Help Desk',
    subtitle: 'LSU AgCenter',
    bullets: [
      'Resolved technical issues for 50+ faculty and staff weekly across phone, email, and walk-in channels, maintaining a high first-contact resolution rate.',
      'Logged, tracked, and documented service tickets in an internal ticketing system to ensure timely follow-up and accountability.',
      'Communicated complex technical issues in plain language to non-technical users, improving resolution speed and user satisfaction.'
    ]
  },
  {
    date: '2023–2025',
    title: 'Tutor',
    subtitle: 'EXCELD Program',
    bullets: [
      "Facilitated one-on-one and group tutoring sessions, supporting students' diverse learning styles.",
      'Participated in weekly tutor training sessions and peer evaluations to enhance teaching methodologies.',
      'Successfully balanced tutoring commitments with concurrent employment and full course load.'
    ]
  },
  {
    date: '2025–2025',
    title: 'UI/Design Contributor',
    subtitle: 'Apleona Ireland',
    bullets: [
      'Collaborated with a 5-person international team in an Agile/Scrum environment to improve the visual design.',
      'Conducted competitive research on industry platforms to identify UX trends and inform design decisions presented to stakeholders.',
      'Created workflow diagrams and data visualizations in Excel to communicate research findings.'
    ]
  }
];

/* ---------------- Hash routing helpers ---------------- */
function screenFromHash() {
  if (typeof window === 'undefined') return null;
  const key = window.location.hash.replace('#', '');
  return MENU_ITEMS.some((m) => m.key === key) ? key : null;
}

/* ---------------- Head setup: title, description, font, focus styles ---------------- */
function useSiteHead() {
  useEffect(() => {
    document.title = 'Hudson Martin — Software & Game Developer';

    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute(
      'content',
      'Portfolio of Hudson Martin: Unity and C# game projects, software development, and IT experience.'
    );

    if (!document.getElementById('press-start-font')) {
      const link = document.createElement('link');
      link.id = 'press-start-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
      document.head.appendChild(link);
    }

    if (!document.getElementById('portfolio-focus-style')) {
      const style = document.createElement('style');
      style.id = 'portfolio-focus-style';
      style.textContent =
        'a:focus-visible, button:focus-visible { outline: 2px solid #4DD9FF; outline-offset: 2px; }';
      document.head.appendChild(style);
    }
  }, []);
}

/* ---------------- Pixel-icon set (drawn, not emoji, so they match the cabinet look) ---------------- */
function PixelIcon({ name, className = 'w-6 h-6' }) {
  const cells = {
    about: ['.XX.', 'X..X', '.XX.', 'X..X'],
    projects: ['XXXX', 'X..X', 'X..X', 'XXXX'],
    games: ['.XX.', 'XXXX', 'X..X', '.XX.'],
    contact: ['XXXX', 'X..X', 'X..X', 'X..X']
  }[name] || [];

  return (
    <svg viewBox="0 0 4 4" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {cells.map((row, y) =>
        row.split('').map((c, x) =>
          c === 'X' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null
        )
      )}
    </svg>
  );
}

/* ---------------- Sound: tiny generated blips, off by default ---------------- */
function useBlip(muted) {
  const ctxRef = useRef(null);
  return useCallback(
    (freq = 440, duration = 0.05) => {
      if (muted) return;
      try {
        if (!ctxRef.current) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          ctxRef.current = new AudioCtx();
        }
        const ctx = ctxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {
        /* audio not available; fail silently */
      }
    },
    [muted]
  );
}

/* ---------------- Ambient CRT overlay ---------------- */
function CRTOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.06]"
      style={{
        backgroundImage: 'repeating-linear-gradient(rgba(255,255,255,0.6) 0px, transparent 1px, transparent 3px)'
      }}
    />
  );
}

/* ---------------- Persistent top bar: HUD + skip link + sound toggle ---------------- */
function TopBar({ score, achievementsCount, totalAchievements, onSkip, muted, onToggleMute }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-[#05070D]/80 backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center gap-4 text-[10px] sm:text-xs text-[#FFB84D]" style={{ fontFamily: PIXEL_FONT }}>
        <span>SCORE {String(score).padStart(6, '0')}</span>
        <span className="hidden sm:inline text-[#4DD9FF]">
          ACHV {achievementsCount}/{totalAchievements}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMute}
          aria-label={muted ? 'Enable sound' : 'Mute sound'}
          className="text-white/50 hover:text-white/90 text-xs px-2 py-1"
          style={{ fontFamily: PIXEL_FONT }}
        >
          {muted ? '♪ off' : '♪ on'}
        </button>
        <button
          onClick={onSkip}
          className="text-[10px] sm:text-xs text-white/70 hover:text-white underline underline-offset-4"
        >
          Skip to projects ▸
        </button>
      </div>
    </div>
  );
}

/* ---------------- Achievement toast ---------------- */
function AchievementToast({ text }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          role="status"
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0D1220] border border-[#FF5D8F]/60 px-4 py-2 rounded"
        >
          <div className="text-[10px] text-[#FF5D8F]" style={{ fontFamily: PIXEL_FONT }}>
            ACHIEVEMENT UNLOCKED
          </div>
          <div className="text-xs text-white/80 mt-1">{text}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Attract / start screen ---------------- */
function StartScreen({ onStart, blip }) {
  const reduceMotion = useReducedMotion();
  const [blinkOn, setBlinkOn] = useState(true);
  useEffect(() => {
    if (reduceMotion) {
      setBlinkOn(true);
      return undefined;
    }
    const id = setInterval(() => setBlinkOn((v) => !v), 650);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <motion.div
      key="start"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen flex flex-col items-center justify-center gap-10 px-4 text-center"
    >
      <div>
        <h1
          className="text-2xl sm:text-4xl text-[#FFB84D] leading-relaxed"
          style={{ fontFamily: PIXEL_FONT, textShadow: '0 0 12px rgba(255,184,77,0.5)' }}
        >
          HUDSON
          <br />
          MARTIN
        </h1>
        <p className="mt-5 text-white/50 text-sm">
          Software &amp; Game Developer — Unity &amp; Systems — C# / C++ / Python
        </p>
      </div>

      <button
        onClick={() => {
          blip(660, 0.08);
          onStart();
        }}
        className="text-[#4DD9FF] text-sm sm:text-base"
        style={{ fontFamily: PIXEL_FONT, opacity: blinkOn ? 1 : 0.25, transition: 'opacity 0.15s' }}
      >
        PRESS START
      </button>

      <p className="text-white/30 text-xs max-w-xs">
        Explore the menu below, or jump straight to the projects if you're short on time.
      </p>
    </motion.div>
  );
}

/* ---------------- Main menu (cabinet select) ---------------- */
function MainMenu({ onSelect, blip }) {
  return (
    <motion.div
      key="menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex flex-col items-center justify-center gap-10 px-4 pt-16"
    >
      <motion.div layoutId="site-title" transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }} className="text-center">
        <h2 className="text-lg sm:text-xl text-[#FFB84D]" style={{ fontFamily: PIXEL_FONT }}>
          SELECT A CABINET
        </h2>
      </motion.div>

      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
        {MENU_ITEMS.map((item) => (
          <motion.button
            key={item.key}
            layoutId={`card-${item.key}`}
            transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
            onClick={() => {
              blip(520, 0.06);
              onSelect(item.key);
            }}
            onMouseEnter={() => blip(300, 0.03)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-4 px-6 py-5 bg-[#0D1220] border-2 border-white/10 text-white rounded-t-2xl rounded-b-md hover:border-[#4DD9FF]/60 transition-colors"
          >
            <span className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#FFB84D] to-[#FF5D8F] opacity-70" />
            <PixelIcon name={item.key} className="w-7 h-7 text-[#4DD9FF]" />
            <span className="text-sm tracking-wide" style={{ fontFamily: PIXEL_FONT }}>
              {item.label}
            </span>
          </motion.button>
        ))}
      </nav>

      <a
        href="/Hudson Martin Resume2025.pdf"
        download
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 rounded bg-[#4DD9FF]/10 border border-[#4DD9FF]/40 text-[#4DD9FF] text-xs"
      >
        Download resume
      </a>
    </motion.div>
  );
}

/* ---------------- Screen wrapper for each section ---------------- */
function ScreenView({ screenKey, onBack, blip }) {
  const meta = MENU_ITEMS.find((item) => item.key === screenKey);
  return (
    <motion.div
      key={screenKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white/80 hover:text-white text-xs">
          ◂ Menu <span className="text-white/30 hidden sm:inline">(Esc)</span>
        </button>
        <motion.div
          layoutId={`card-${screenKey}`}
          transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
          className="flex items-center gap-3 px-5 py-3 bg-[#0D1220] border border-white/10 rounded-t-xl rounded-b-md"
        >
          <PixelIcon name={screenKey} className="w-5 h-5 text-[#4DD9FF]" />
          <h2 className="text-sm text-white" style={{ fontFamily: PIXEL_FONT }}>
            {meta.label}
          </h2>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.3 }}>
        {screenKey === 'about' && <AboutContent />}
        {screenKey === 'projects' && <ProjectsContent />}
        {screenKey === 'games' && <GamesContent blip={blip} />}
        {screenKey === 'contact' && <ContactContent />}
      </motion.div>
    </motion.div>
  );
}

/* Skill chips — small "loadout" style tags instead of a prose sentence */
function SkillGroup({ label, items }) {
  return (
    <div>
      <div className="text-[10px] text-[#FFB84D] mb-2" style={{ fontFamily: PIXEL_FONT }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="px-3 py-1 text-xs text-white/80 bg-white/5 border border-white/10 rounded">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Shared row of social icons + resume download, used on About and Contact */
function SocialLinksRow() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          aria-label={s.name}
          title={s.name}
          className="w-10 h-10 flex items-center justify-center text-[10px] text-[#4DD9FF] bg-[#4DD9FF]/10 border border-[#4DD9FF]/40 rounded hover:bg-[#4DD9FF]/20 transition-colors"
          style={{ fontFamily: PIXEL_FONT }}
        >
          {s.label}
        </a>
      ))}
      <a
        href="/Hudson Martin Resume2025.pdf"
        download
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 rounded bg-[#4DD9FF]/10 border border-[#4DD9FF]/40 text-[#4DD9FF] text-xs whitespace-nowrap"
      >
        Download resume
      </a>
    </div>
  );
}

/* Education block */
function Education() {
  return (
    <div className="mt-8">
      <div className="text-xs text-[#FFB84D] mb-3" style={{ fontFamily: PIXEL_FONT }}>
        EDUCATION
      </div>
      <div className="bg-[#05070D] border border-white/5 rounded p-4">
        <div className="text-sm text-white/90 font-semibold">{EDUCATION.school}</div>
        <div className="text-sm text-white/70 mt-1">
          {EDUCATION.degree} — {EDUCATION.concentration}
        </div>
        <div className="text-xs text-white/50 mt-1">
          {EDUCATION.minors} • {EDUCATION.graduated}
        </div>
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="bg-[#0D1220] border border-white/5 rounded-lg p-6">
      <p className="text-white/80 leading-relaxed">
        I'm a Computer Science graduate from LSU (Software Engineering concentration) who builds games and the
        systems behind them — Unity, tooling, and player-facing polish. Outside of solo projects, I've worked
        with an international design team and a software development team, which taught me a lot about
        communicating clearly and adapting to how different groups collaborate.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SkillGroup label="LANGUAGES" items={SKILLS.languages} />
        <SkillGroup label="TOOLS" items={SKILLS.tools} />
      </div>

      <Education />

      <Timeline items={TIMELINE_ITEMS} />

      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div
            className="w-16 h-16 flex items-center justify-center text-sm text-[#05070D] bg-[#4DD9FF] rounded flex-none"
            style={{ fontFamily: PIXEL_FONT }}
          >
            HM
          </div>
          <div>
            <div className="text-sm text-white/80">Player: Hudson Martin</div>
            <div className="text-xs text-white/50 mt-1">LSU • Graduated May 2026 • Major: Computer Science • Minor: DMAET &amp; IT Management</div>
          </div>
        </div>

        <SocialLinksRow />
      </div>
    </div>
  );
}

/* Vertical timeline for education/work history */
function Timeline({ items }) {
  return (
    <div className="mt-8">
      <div className="text-xs text-[#FFB84D] mb-4" style={{ fontFamily: PIXEL_FONT }}>
        TIMELINE
      </div>
      <ol className="relative border-l-2 border-white/10 pl-6 space-y-6">
        {items.map((item, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#4DD9FF] border-2 border-[#0D1220]" />
            <div className="text-[10px] text-[#4DD9FF]" style={{ fontFamily: PIXEL_FONT }}>
              {item.date}
            </div>
            <div className="text-sm text-white/90 font-semibold mt-1">{item.title}</div>
            <div className="text-xs text-white/50">{item.subtitle}</div>
            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {item.bullets.map((b, bi) => (
                  <li key={bi} className="text-sm text-white/70">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Arcade cabinet card — used for the two medium-length embedded games */
function ArcadeCabinet({ p, blip }) {
  const gallery = p.gallery && p.gallery.length ? p.gallery : [p.img];
  return (
    <article className="bg-[#0D1220] border border-white/10 rounded-t-3xl rounded-b-lg overflow-hidden">
      <div className="bg-[#05070D] px-5 py-3 border-b border-white/10">
        <div className="text-[11px] text-[#FFB84D]" style={{ fontFamily: PIXEL_FONT }}>
          {p.title}
        </div>
      </div>

      {/* screen bezel */}
      <div className="p-4">
        <div className="rounded border-4 border-black/60 bg-black overflow-hidden">
          <img src={p.img} alt={`${p.title} screenshot`} className="w-full h-48 object-cover opacity-90" />
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="text-xs text-white/50">{p.subtitle}</div>
        <p className="mt-2 text-sm text-white/70">{p.description}</p>

        <div className="mt-4 flex gap-2 items-center">
          {p.playUrl && (
            <a
              href={p.playUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => blip(400, 0.03)}
              onClick={() => blip(700, 0.08)}
              className="px-4 py-2 rounded bg-[#FFB84D] text-[#05070D] text-xs font-semibold"
              style={{ fontFamily: PIXEL_FONT }}
            >
              INSERT COIN
            </a>
          )}
          {p.codeUrl && (
            <a href={p.codeUrl} target="_blank" rel="noreferrer" className="px-3 py-2 rounded bg-white/5 text-white/80 text-xs">
              View code
            </a>
          )}
        </div>

        {gallery.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt={`${p.title} extra ${i + 1}`} className="h-20 w-32 flex-none object-cover rounded border border-white/10" />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function GamesContent({ blip }) {
  const playable = projectsData.filter((p) => p.playUrl);
  return (
    <div className="flex flex-col gap-8">
      <p className="text-white/60 text-sm">
        Playable in-browser builds are coming soon (WebGL embeds). For now, these open on itch.io in a new tab.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {playable.map((p) => (
          <ArcadeCabinet key={p.id} p={p} blip={blip || (() => {})} />
        ))}
      </div>
      <div className="mt-2 text-xs text-white/30 border-t border-white/5 pt-4">
        More, shorter games are on the way — future home for quick jam builds and one-off experiments.
      </div>
    </div>
  );
}

/* Gallery with a thumbnail strip and a click-to-enlarge lightbox. Accepts .jpg/.png/.gif. */
function ProjectGallery({ title, images }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [lightboxOpen]);

  return (
    <div className="w-full sm:w-56 flex-none">
      <button
        onClick={() => setLightboxOpen(true)}
        aria-label={`Enlarge ${title} screenshot`}
        className="block w-full h-36 sm:h-32 rounded overflow-hidden bg-black/40 border border-white/5"
      >
        <img src={images[active]} alt={`${title} screenshot ${active + 1}`} className="w-full h-full object-cover" />
      </button>

      {images.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-12 w-16 flex-none rounded overflow-hidden border ${i === active ? 'border-[#4DD9FF]' : 'border-white/10'}`}
            >
              <img src={src} alt={`${title} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <img src={images[active]} alt={`${title} enlarged`} className="max-w-full max-h-full rounded" />
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Project cards — with tags, "what I built" highlights, and a gallery, so each entry reads like a mini case study */
function ProjectCard({ p }) {
  const gallery = p.gallery && p.gallery.length ? p.gallery : [p.img];
  return (
    <article className="bg-[#0D1220] border border-white/5 rounded-lg p-6 flex flex-col sm:flex-row gap-5">
      <ProjectGallery title={p.title} images={gallery} />

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold text-white">{p.title}</h3>
          <span className="text-xs text-white/40">{p.length}</span>
        </div>
        <div className="text-xs text-white/50 mt-0.5">{p.subtitle}</div>
        {p.role && <div className="text-xs text-[#4DD9FF]/80 mt-1">{p.role}</div>}

        <p className="mt-3 text-sm text-white/70">{p.description}</p>

        {p.highlights && p.highlights.length > 0 && (
          <ul className="mt-3 space-y-1 list-disc list-inside">
            {p.highlights.map((h, i) => (
              <li key={i} className="text-sm text-white/70">
                {h}
              </li>
            ))}
          </ul>
        )}

        {p.tags && p.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-[11px] text-white/70 bg-white/5 border border-white/10 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {p.playUrl && (
            <a href={p.playUrl} target="_blank" rel="noreferrer" className="text-xs text-[#4DD9FF] underline underline-offset-4">
              Play
            </a>
          )}
          {p.codeUrl ? (
            <a href={p.codeUrl} target="_blank" rel="noreferrer" className="text-xs text-[#4DD9FF] underline underline-offset-4">
              Code
            </a>
          ) : (
            <span className="text-xs text-white/40">Code available on request</span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectsContent() {
  return (
    <div className="flex flex-col gap-6">
      {projectsData.map((p) => (
        <ProjectCard key={p.id} p={p} />
      ))}
    </div>
  );
}

function ContactContent() {
  const nowPlaying = projectsData.find((p) => p.inProgress);
  return (
    <div className="bg-[#0D1220] border border-white/5 rounded-lg p-6">
      <div className="text-xs text-[#4DD9FF] mb-4" style={{ fontFamily: PIXEL_FONT }}>
        CONTINUE?
      </div>
      <p className="text-white/80">
        Email:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#4DD9FF] underline underline-offset-4">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-4 text-white/60 text-sm">Open to work, and available for new opportunities.</p>

      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="text-xs text-white/40 mb-3">LINKS</div>
        <SocialLinksRow />
      </div>

      {nowPlaying && (
        <div className="mt-6 bg-[#05070D] border border-[#FF5D8F]/30 rounded p-4">
          <div className="text-[10px] text-[#FF5D8F] mb-2" style={{ fontFamily: PIXEL_FONT }}>
            NOW PLAYING
          </div>
          <div className="text-sm text-white/80">{nowPlaying.title}</div>
          <div className="text-xs text-white/50 mt-1">{nowPlaying.description}</div>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-8 text-center text-white/30 text-xs border-t border-white/5">
      © {new Date().getFullYear()} Hudson Martin — built with React, Tailwind &amp; Framer Motion
    </footer>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  useSiteHead();

  const initialScreen = screenFromHash();
  const [started, setStarted] = useState(initialScreen !== null);
  const [screen, setScreen] = useState(initialScreen);
  const [visited, setVisited] = useState(() => new Set());
  const [toast, setToast] = useState('');
  const [muted, setMuted] = useState(true);
  const blip = useBlip(muted);

  const allExplored = visited.size === MENU_ITEMS.length;

  /* Keep state in sync with the URL hash (back/forward buttons, shared links) */
  useEffect(() => {
    const sync = () => {
      const key = screenFromHash();
      setScreen(key);
      if (key) setStarted(true);
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const goToScreen = useCallback((key) => {
    setStarted(true);
    setScreen(key);
    if (window.location.hash !== `#${key}`) window.location.hash = key;
  }, []);

  const goToMenu = useCallback(() => {
    setScreen(null);
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  /* Record first visits and fire achievements (side effects live here, not in a state updater) */
  useEffect(() => {
    if (!screen || visited.has(screen)) return;
    const next = new Set(visited);
    next.add(screen);
    setVisited(next);
    const label = MENU_ITEMS.find((m) => m.key === screen)?.label || screen;
    setToast(next.size === MENU_ITEMS.length ? '100% COMPLETE — every cabinet explored!' : `Explored ${label}`);
  }, [screen, visited]);

  /* Auto-dismiss the toast; the cleanup clears the timer */
  useEffect(() => {
    if (!toast) return undefined;
    const id = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  /* Escape goes back to the menu */
  useEffect(() => {
    if (screen === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') goToMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, goToMenu]);

  const score = visited.size * 150 + (allExplored ? 500 : 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-gradient-to-b from-[#05070D] to-[#0A0F1E] text-white overflow-x-hidden">
        <CRTOverlay />
        <TopBar
          score={score}
          achievementsCount={visited.size}
          totalAchievements={MENU_ITEMS.length}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
          onSkip={() => goToScreen('projects')}
        />
        <AchievementToast text={toast} />

        <AnimatePresence mode="wait">
          {!started ? (
            <StartScreen key="start" onStart={() => setStarted(true)} blip={blip} />
          ) : screen === null ? (
            <MainMenu key="menu" onSelect={goToScreen} blip={blip} />
          ) : (
            <ScreenView key={screen} screenKey={screen} onBack={goToMenu} blip={blip} />
          )}
        </AnimatePresence>

        {started && screen !== null && <Footer />}
      </div>
    </MotionConfig>
  );
}