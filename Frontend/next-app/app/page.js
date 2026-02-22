'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Github, Linkedin, Youtube, Twitter, Download, ArrowRight,
  ExternalLink, Code2, Layers, Globe,
} from 'lucide-react';
import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/constants';

// ─── LeetCode Icon ──────────────────────────────────────────────
const LeetCodeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.353 1.353 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

// ─── Typing Hook ─────────────────────────────────────────────────
function useTypingEffect(texts, typingSpeed = 75, deletingSpeed = 45, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timer;
    if (typing) {
      if (displayed.length < texts[idx].length) {
        timer = setTimeout(() => setDisplayed(texts[idx].slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timer = setTimeout(() => setTyping(false), pauseMs);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
      } else {
        setIdx((i) => (i + 1) % texts.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timer);
  }, [displayed, idx, typing, texts, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

// ─── Infinite Tech Marquee ────────────────────────────────────────
const TECH_STACK = [
  'React.js', '·', 'Next.js', '·', 'Node.js', '·', 'MongoDB', '·',
  'Express.js', '·', 'Tailwind CSS', '·', 'HTML5', '·', 'CSS3', '·',
  'JavaScript', '·', 'Figma', '·', 'Git', '·', 'GitHub', '·',
  'REST APIs', '·', 'JWT Auth', '·', 'Postman', '·',
  'Render', '·', 'Vercel', '·', 'Netlify',
];

// ─── Pure CSS Marquee (no Framer Motion) ─────────────────────────
function TechMarquee() {
  // Duplicate for seamless infinite scroll
  const all = [...TECH_STACK, ...TECH_STACK];
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 90, zIndex: 2,
        background: 'linear-gradient(to right, #1B211A, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 90, zIndex: 2,
        background: 'linear-gradient(to left, #1B211A, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Scrolling track */}
      <div style={{
        display: 'flex',
        gap: 28,
        whiteSpace: 'nowrap',
        paddingBlock: 12,
        animation: 'marquee-scroll 38s linear infinite',
        width: 'max-content',
      }}>
        {all.map((tech, i) => (
          <span
            key={i}
            style={{
              fontSize: 11,
              fontWeight: tech === '·' ? 400 : 700,
              letterSpacing: tech === '·' ? 0 : '0.2em',
              textTransform: 'uppercase',
              color: tech === '·' ? 'rgba(139,174,102,0.3)' : 'rgba(235,213,171,0.35)',
              fontFamily: 'Inter, sans-serif',
              flexShrink: 0,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── What I Do cards ─────────────────────────────────────────────
const SERVICES = [
  {
    icon: Globe,
    title: 'Full Stack Dev',
    desc: 'End-to-end MERN apps — from REST API to deployed product.',
    color: '#8BAE66',
  },
  {
    icon: Layers,
    title: 'UI / UX Design',
    desc: 'Pixel-perfect Figma designs with real interaction logic.',
    color: '#8BAE66',
  },
  {
    icon: Code2,
    title: 'Problem Solving',
    desc: 'Clean architecture, DSA thinking, optimised code.',
    color: '#8BAE66',
  },
];

// ─── Social links ─────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { icon: Github, href: PORTFOLIO_DATA.contact.github, label: 'GitHub' },
  { icon: Linkedin, href: PORTFOLIO_DATA.contact.linkedin, label: 'LinkedIn' },
  { icon: LeetCodeIcon, href: PORTFOLIO_DATA.contact.leetcode, label: 'LeetCode' },
  { icon: Youtube, href: PORTFOLIO_DATA.contact.youtube, label: 'YouTube' },
  { icon: Twitter, href: PORTFOLIO_DATA.contact.twitter, label: 'Twitter' },
];

const TYPING_TEXTS = [
  'Full Stack Developer',
  'UI/UX Designer',
  'MERN Stack Engineer',
  'Problem Solver',
  'Gym Rat & Coder',
];

// ─── Floating dots ────────────────────────────────────────────────
function FloatingDots() {
  const dots = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: 10 + Math.floor(i * 6.5) % 85,
    y: 5 + Math.floor(i * 11.3) % 90,
    size: 1.5 + (i % 3) * 0.7,
    delay: (i * 0.47) % 4,
    dur: 3.5 + (i % 4),
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {dots.map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: 'absolute',
            left: `${d.x}%`, top: `${d.y}%`,
            width: d.size, height: d.size,
            borderRadius: '50%',
            background: 'rgba(139,174,102,0.45)',
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function HomePage() {
  const containerRef = useRef(null);
  const typedText = useTypingEffect(TYPING_TEXTS);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const handleResume = () => {
    const a = document.createElement('a');
    a.href = PORTFOLIO_DATA.resumeUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="hero-section" style={{
        minHeight: 'calc(100vh - 5rem)',
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: '5vh',
        padding: '5vh 40px 0',
        position: 'relative',
      }}>
        <FloatingDots />

        <motion.div style={{ y: bgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '10%', left: '55%',
            width: 420, height: 420, borderRadius: '50%',
            background: 'rgba(47,68,38,0.12)', filter: 'blur(100px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '15%', left: '5%',
            width: 300, height: 300, borderRadius: '50%',
            background: 'rgba(47,68,38,0.08)', filter: 'blur(80px)',
          }} />
        </motion.div>

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 80,
            alignItems: 'center',
          }} className="hero-grid">

            {/* ── LEFT ── */}
            <div>

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#8BAE66', boxShadow: '0 0 10px #8BAE66',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                <span style={{
                  fontSize: 11, fontWeight: 800, letterSpacing: '0.55em',
                  textTransform: 'uppercase', color: '#8BAE66',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Welcome to my world
                </span>
              </motion.div>

              {/* Name — split: "Hi, I'm" on top, "Ridham Patel." huge below */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                style={{ marginBottom: 20 }}
              >
                <p style={{
                  fontSize: 'clamp(16px, 2vw, 26px)',
                  fontWeight: 300,
                  color: 'rgba(235,213,171,0.45)',
                  letterSpacing: '0.08em',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}>
                  Hi, I&apos;m
                </p>
                <h1 style={{ margin: 0, padding: 0, lineHeight: 1.0 }}>
                  <span style={{
                    display: 'block',
                    fontSize: 'clamp(52px, 7.5vw, 96px)',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.0,
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    <span style={{ color: '#EBD5AB' }}>Ridham </span>
                    <span style={{ color: '#8BAE66', fontStyle: 'normal' }}>Patel.</span>
                  </span>
                </h1>
              </motion.div>

              {/* Typing role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}
              >
                <div style={{ width: 36, height: 1, background: 'rgba(139,174,102,0.35)' }} />
                <p style={{
                  fontSize: 17, color: 'rgba(235,213,171,0.5)',
                  fontWeight: 400, fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: '0.02em',
                }}>
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.85, repeat: Infinity }}
                    style={{ color: '#8BAE66', fontWeight: 700, marginLeft: 1 }}
                  >|</motion.span>
                </p>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                style={{
                  fontSize: 16, lineHeight: 1.85,
                  color: 'rgba(235,213,171,0.48)',
                  fontWeight: 300, maxWidth: 510,
                  marginBottom: 30,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Building{' '}
                <strong style={{ color: 'rgba(235,213,171,0.78)', fontWeight: 600 }}>
                  fast, scalable MERN apps
                </strong>{' '}
                with clean UI — from zero to deployed.{' '}
                B.Tech CSE&nbsp;@&nbsp;Rai University. Gym grind by night, DSA by morning.
              </motion.p>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 30 }}
                className="hero-cta-row"
              >
                {/* View Projects — green slide-fill on hover */}
                <Link href="/projects" style={{ textDecoration: 'none' }}>
                  <motion.div
                    initial="rest" whileHover="hover" whileTap={{ scale: 0.96 }}
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    style={{
                      position: 'relative', display: 'inline-flex', alignItems: 'center',
                      gap: 10, padding: '15px 32px', borderRadius: 100, overflow: 'hidden',
                      border: '1px solid rgba(139,174,102,0.4)',
                      background: 'rgba(139,174,102,0.08)',
                      color: '#EBD5AB', fontSize: 14, fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      backdropFilter: 'blur(8px)', fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                    }}
                  >
                    <motion.span
                      variants={{
                        rest: { x: '-101%' },
                        hover: { x: '0%', transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
                      }}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 0,
                        background: 'rgba(139,174,102,0.72)', borderRadius: 100,
                      }}
                    />
                    <span style={{ position: 'relative', zIndex: 1 }}>View Projects</span>
                    <motion.span
                      variants={{ rest: { x: 0 }, hover: { x: 4, transition: { duration: 0.2 } } }}
                      style={{ position: 'relative', zIndex: 1, display: 'flex' }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </motion.div>
                </Link>

                {/* Resume — cream slide-fill on hover */}
                <motion.button
                  initial="rest" whileHover="hover" whileTap={{ scale: 0.96 }}
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  onClick={handleResume}
                  style={{
                    position: 'relative', display: 'inline-flex', alignItems: 'center',
                    gap: 10, padding: '15px 32px', borderRadius: 100, overflow: 'hidden',
                    border: '1px solid rgba(235,213,171,0.15)',
                    background: 'transparent', color: 'rgba(235,213,171,0.65)',
                    fontSize: 14, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <motion.span
                    variants={{
                      rest: { x: '-101%' },
                      hover: { x: '0%', transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
                    }}
                    style={{
                      position: 'absolute', inset: 0, zIndex: 0,
                      background: 'rgba(235,213,171,0.1)', borderRadius: 100,
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1, display: 'flex' }}><Download size={16} /></span>
                  <span style={{ position: 'relative', zIndex: 1 }}>Resume</span>
                </motion.button>
              </motion.div>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
                className="hero-social-row"
              >
                <span className="hero-social-label" style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.45em',
                  textTransform: 'uppercase', color: 'rgba(235,213,171,0.25)',
                  marginRight: 6, fontFamily: 'Inter, sans-serif',
                }}>
                  Find me on
                </span>
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="hero-social-icon"
                    whileHover={{ y: -3, scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    style={{
                      width: 42, height: 42, borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(235,213,171,0.04)',
                      border: '1px solid rgba(235,213,171,0.08)',
                      color: 'rgba(139,174,102,0.6)',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139,174,102,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(139,174,102,0.3)';
                      e.currentTarget.style.color = '#EBD5AB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(235,213,171,0.04)';
                      e.currentTarget.style.borderColor = 'rgba(235,213,171,0.08)';
                      e.currentTarget.style.color = 'rgba(139,174,102,0.6)';
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </motion.div>
            </div>


            {/* ── RIGHT — Profile Image ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
              style={{ position: 'relative', flexShrink: 0 }}
            >
              {/* Glow orb */}
              <div style={{
                position: 'absolute', inset: -30, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,174,102,0.12) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />

              {/* Outer dashed spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -16, borderRadius: '50%',
                  border: '1px dashed rgba(139,174,102,0.2)',
                }}
              />

              {/* Middle ring */}
              <div style={{
                position: 'absolute', inset: -6, borderRadius: '50%',
                border: '1px solid rgba(139,174,102,0.1)',
              }} />

              {/* Image */}
              <div className="hero-photo-wrap" style={{
                position: 'relative',
                width: 320, height: 320,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(139,174,102,0.25)',
                boxShadow: '0 0 60px rgba(139,174,102,0.1), 0 0 0 1px rgba(139,174,102,0.06)',
              }}>
                <img
                  src={PORTFOLIO_DATA.image}
                  alt="Ridham Patel"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'saturate(0.9) contrast(1.04)' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(27,33,26,0.4) 0%, transparent 55%)',
                }} />
              </div>

              {/* ── Floating Info Pills (replace old stat boxes) ── */}

              {/* Open to work pill — replaces "Available for work" */}
              <motion.div
                className="hero-pill-status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  bottom: -20, left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 18px',
                  borderRadius: 100,
                  background: 'rgba(27,33,26,0.92)',
                  border: '1px solid rgba(139,174,102,0.2)',
                  backdropFilter: 'blur(16px)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#8BAE66', boxShadow: '0 0 8px #8BAE66' }}
                />
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8BAE66', fontFamily: 'Inter, sans-serif' }}>
                  Open to Opportunities
                </span>
              </motion.div>

              {/* Location pill — top-left */}
              <motion.div
                className="hero-pill-location"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.25, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  top: '15%', left: -100,
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px',
                  borderRadius: 12,
                  background: 'rgba(27,33,26,0.88)',
                  border: '1px solid rgba(235,213,171,0.08)',
                  backdropFilter: 'blur(12px)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: 13 }}>📍</span>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.5)', fontFamily: 'Inter, sans-serif' }}>
                  Ahmedabad, IN
                </span>
              </motion.div>

              {/* Projects pill — top-right */}
              <motion.div
                className="hero-pill-projects"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.35, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  top: '12%', right: -90,
                  padding: '10px 16px',
                  borderRadius: 14,
                  background: 'rgba(27,33,26,0.88)',
                  border: '1px solid rgba(139,174,102,0.15)',
                  backdropFilter: 'blur(12px)',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: 20, fontWeight: 900, color: '#8BAE66', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>15+</p>
                <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.45)', marginTop: 3, fontFamily: 'Inter, sans-serif' }}>Projects</p>
              </motion.div>
            </motion.div>
          </div>
        </div>


      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — TECH MARQUEE STRIP
      ══════════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: '1px solid rgba(235,213,171,0.05)',
        borderBottom: '1px solid rgba(235,213,171,0.05)',
        paddingBlock: 4,
        position: 'relative', zIndex: 10,
      }}>
        <TechMarquee />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — WHAT I DO
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}
          >
            <div>
              <p style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '0.5em',
                textTransform: 'uppercase', color: '#8BAE66', marginBottom: 12,
                fontFamily: 'Inter, sans-serif',
              }}>What I Do</p>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900,
                letterSpacing: '-0.04em', color: '#EBD5AB',
                fontFamily: 'Inter, sans-serif', lineHeight: 1.1,
              }}>
                Craft. Ship. <span style={{ color: '#8BAE66' }}>Repeat.</span>
              </h2>
            </div>
            <Link href="/projects" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(139,174,102,0.7)',
                  fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                }}
              >
                See all work <ExternalLink size={13} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Service cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }} className="service-grid">
            {SERVICES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                style={{
                  padding: '36px 32px',
                  borderRadius: 28,
                  background: 'rgba(235,213,171,0.025)',
                  border: '1px solid rgba(235,213,171,0.07)',
                  backdropFilter: 'blur(10px)',
                  transition: 'border-color 0.3s, background 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139,174,102,0.2)';
                  e.currentTarget.style.background = 'rgba(139,174,102,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(235,213,171,0.07)';
                  e.currentTarget.style.background = 'rgba(235,213,171,0.025)';
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(139,174,102,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24, color: '#8BAE66',
                }}>
                  <Icon size={20} />
                </div>
                <h3 style={{
                  fontSize: 14, fontWeight: 800, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#EBD5AB',
                  marginBottom: 12, fontFamily: 'Inter, sans-serif',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize: 14, color: 'rgba(235,213,171,0.42)',
                  lineHeight: 1.7, fontWeight: 300, fontFamily: 'Inter, sans-serif',
                }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — QUICK STATS / NUMBERS
      ══════════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          padding: '64px 24px',
          position: 'relative', zIndex: 10,
          borderTop: '1px solid rgba(235,213,171,0.05)',
          borderBottom: '1px solid rgba(235,213,171,0.05)',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8, textAlign: 'center',
        }} className="stats-grid">
          {[
            { num: '15+', label: 'Projects Shipped', sub: 'React · HTML · Figma' },
            { num: '2+', label: 'Years of Building', sub: 'Self-taught & counting' },
            { num: '5', label: 'Tech Categories', sub: 'Full-stack breadth' },
            { num: '1', label: 'Paid Freelance', sub: 'Real world delivery' },
          ].map(({ num, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ padding: '28px 16px' }}
            >
              <p style={{
                fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900,
                letterSpacing: '-0.04em', color: '#8BAE66',
                lineHeight: 1, fontFamily: 'Inter, sans-serif',
              }}>{num}</p>
              <p style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(235,213,171,0.6)',
                marginTop: 10, marginBottom: 4, fontFamily: 'Inter, sans-serif',
              }}>{label}</p>
              <p style={{
                fontSize: 11, color: 'rgba(235,213,171,0.25)',
                fontWeight: 300, fontFamily: 'Inter, sans-serif',
              }}>{sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Responsive styles */}
      <style>{`
        .hero-grid { grid-template-columns: 1fr auto !important; }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: center;
          }
          .hero-cta-row  { justify-content: center !important; }
          .hero-social-row { justify-content: center !important; flex-wrap: nowrap !important; gap: 6px !important; }
          .hero-social-label { display: none !important; }
          .hero-social-icon { width: 36px !important; height: 36px !important; }
          .service-grid { grid-template-columns: 1fr !important; }
          .stats-grid   { grid-template-columns: repeat(2, 1fr) !important; }

          /* Show image column on mobile, centered */
          .hero-grid > div:last-child {
            display: flex !important;
            justify-content: center !important;
            order: -1;
          }

          /* Shrink the circular image on mobile */
          .hero-photo-wrap {
            width: 200px !important;
            height: 200px !important;
          }

          /* Hide absolute-positioned floating pills — they overflow on mobile */
          .hero-pill-status,
          .hero-pill-location,
          .hero-pill-projects { display: none !important; }

          /* Section bottom padding so marquee doesn't chipakke */
          .hero-section { padding-bottom: 48px !important; }
        }

        @media (max-width: 640px) {
          .service-grid { grid-template-columns: 1fr !important; }
          .stats-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-photo-wrap {
            width: 160px !important;
            height: 160px !important;
          }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        .cta-primary:hover { background: rgba(139,174,102,0.85) !important; color: #1B211A !important; border-color: transparent !important; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
