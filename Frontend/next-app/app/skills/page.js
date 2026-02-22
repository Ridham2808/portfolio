'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Layers, Code2, Database, Shield, Cloud, BookOpen, Cpu } from 'lucide-react';

// ── Skill Data ─────────────────────────────────────────────────────
const CATEGORIES = [
    { id: 'all', label: 'All', icon: Layers, accent: '#8BAE66' },
    { id: 'languages', label: 'Languages', icon: Code2, accent: '#F7DF1E' },
    { id: 'frontend', label: 'Frontend', icon: Cpu, accent: '#61DAFB' },
    { id: 'backend', label: 'Backend', icon: Terminal, accent: '#339933' },
    { id: 'database', label: 'Database', icon: Database, accent: '#47A248' },
    { id: 'tools', label: 'Tools', icon: Zap, accent: '#F05032' },
    { id: 'auth', label: 'Auth', icon: Shield, accent: '#FB015B' },
    { id: 'cloud', label: 'Cloud & AI', icon: Cloud, accent: '#8B5CF6' },
    { id: 'cs', label: 'CS Fundamentals', icon: BookOpen, accent: '#F59E0B' },
];

const SKILLS = [
    { id: 'js', name: 'JavaScript', cat: 'languages', color: '#F7DF1E', bg: 'rgba(247,223,30,0.08)', abbr: 'JS', desc: 'ES6+, async, DOM manipulation, event handling' },
    { id: 'cpp', name: 'C++', cat: 'languages', color: '#00589C', bg: 'rgba(0,88,156,0.1)', abbr: 'C++', desc: 'OOP, DSA, competitive programming' },

    { id: 'react', name: 'React.js', cat: 'frontend', color: '#61DAFB', bg: 'rgba(97,218,251,0.08)', abbr: '⚛', desc: 'Hooks, context, component architecture, state management' },
    { id: 'nextjs', name: 'Next.js', cat: 'frontend', color: '#EFEFEF', bg: 'rgba(255,255,255,0.05)', abbr: 'N↑', desc: 'SSR, SSG, App Router, API routes, middleware' },
    { id: 'tailwind', name: 'Tailwind CSS', cat: 'frontend', color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', abbr: 'TW', desc: 'Utility-first CSS, responsive design systems' },
    { id: 'html', name: 'HTML5', cat: 'frontend', color: '#E34F26', bg: 'rgba(227,79,38,0.08)', abbr: 'H5', desc: 'Semantic markup, accessibility, SEO-first structure' },
    { id: 'css', name: 'CSS3', cat: 'frontend', color: '#1572B6', bg: 'rgba(21,114,182,0.08)', abbr: 'C3', desc: 'Animations, flexbox, grid, custom properties' },

    { id: 'nodejs', name: 'Node.js', cat: 'backend', color: '#339933', bg: 'rgba(51,153,51,0.08)', abbr: 'N◉', desc: 'Server-side JS, event loop, streams, npm ecosystem' },
    { id: 'express', name: 'Express.js', cat: 'backend', color: '#AAAAAA', bg: 'rgba(160,160,160,0.07)', abbr: 'Ex', desc: 'REST API design, middleware, routing, error handling' },
    { id: 'rest', name: 'REST APIs', cat: 'backend', color: '#FF6B35', bg: 'rgba(255,107,53,0.08)', abbr: 'API', desc: 'API architecture, CRUD, status codes, Postman testing' },

    { id: 'mongodb', name: 'MongoDB', cat: 'database', color: '#47A248', bg: 'rgba(71,162,72,0.08)', abbr: 'M◉', desc: 'NoSQL, Mongoose ODM, aggregations, Atlas cloud' },

    { id: 'git', name: 'Git', cat: 'tools', color: '#F05032', bg: 'rgba(240,80,50,0.08)', abbr: '⎇', desc: 'Version control, branching strategies, merge/rebase' },
    { id: 'github', name: 'GitHub', cat: 'tools', color: '#EFEFEF', bg: 'rgba(229,229,229,0.05)', abbr: 'GH', desc: 'Repositories, PRs, Actions, collaboration workflows' },
    { id: 'postman', name: 'Postman', cat: 'tools', color: '#FF6C37', bg: 'rgba(255,108,55,0.08)', abbr: 'PM', desc: 'API testing, collections, environments, automation' },
    { id: 'vercel', name: 'Vercel', cat: 'tools', color: '#FFFFFF', bg: 'rgba(255,255,255,0.05)', abbr: '▲', desc: 'Frontend deployments, preview URLs, CI/CD pipelines' },
    { id: 'netlify', name: 'Netlify', cat: 'tools', color: '#00C7B7', bg: 'rgba(0,199,183,0.08)', abbr: 'NT', desc: 'Static hosting, form handling, edge CDN' },
    { id: 'hostinger', name: 'Hostinger', cat: 'tools', color: '#674BFF', bg: 'rgba(103,75,255,0.08)', abbr: 'Ho', desc: 'Shared/VPS hosting, domain management, cPanel' },
    { id: 'render', name: 'Render', cat: 'tools', color: '#46E3B7', bg: 'rgba(70,227,183,0.08)', abbr: 'Rn', desc: 'Backend deployment, auto-scaling, managed DBs' },

    { id: 'jwt', name: 'JWT Auth', cat: 'auth', color: '#FB015B', bg: 'rgba(251,1,91,0.08)', abbr: 'JWT', desc: 'Token-based auth, refresh tokens, secure sessions' },
    { id: 'oauth', name: 'OAuth 2.0', cat: 'auth', color: '#4285F4', bg: 'rgba(66,133,244,0.08)', abbr: 'OA', desc: 'Google/Social login integration, authorization flows' },
    { id: 'bcrypt', name: 'Bcrypt', cat: 'auth', color: '#2ECC71', bg: 'rgba(46,204,113,0.08)', abbr: 'BC', desc: 'Password hashing, salt rounds, secure credential storage' },

    { id: 'cloudinary', name: 'Cloudinary', cat: 'cloud', color: '#3448C5', bg: 'rgba(52,72,197,0.08)', abbr: '☁', desc: 'Image/video upload, transformation, CDN delivery' },
    { id: 'gemini', name: 'Gemini AI', cat: 'cloud', color: '#A855F7', bg: 'rgba(168,85,247,0.08)', abbr: '✦', desc: 'Google Gemini API, AI-powered feature integration' },

    { id: 'oops', name: 'OOP Concepts', cat: 'cs', color: '#8BAE66', bg: 'rgba(139,174,102,0.08)', abbr: 'OOP', desc: 'Classes, inheritance, polymorphism, abstraction' },
    { id: 'dbms', name: 'DBMS', cat: 'cs', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', abbr: 'DB', desc: 'Normalization, transactions, indexing, ER diagrams' },
    { id: 'dsa', name: 'DSA', cat: 'cs', color: '#60A5FA', bg: 'rgba(96,165,250,0.08)', abbr: '∑', desc: 'Arrays, trees, graphs, sorting, time complexity' },
];

const LEARNING = [
    { name: 'NestJS', color: '#E0234E', bg: 'rgba(224,35,78,0.07)', abbr: 'Ns', desc: 'Structured Node.js framework' },
    { name: 'AWS', color: '#FF9900', bg: 'rgba(255,153,0,0.07)', abbr: '☁', desc: 'Cloud infrastructure & services' },
    { name: 'Docker', color: '#2496ED', bg: 'rgba(36,150,237,0.07)', abbr: '◻', desc: 'Containerization & images' },
    { name: 'React Native', color: '#61DAFB', bg: 'rgba(97,218,251,0.07)', abbr: 'RN', desc: 'Cross-platform mobile development' },
];

// ── Big Skill Card ─────────────────────────────────────────────────
function SkillCard({ skill, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{
                position: 'relative',
                padding: '22px 20px',
                borderRadius: 20,
                background: hovered ? skill.bg : 'rgba(235,213,171,0.02)',
                border: `1px solid ${hovered ? `${skill.color}35` : 'rgba(235,213,171,0.07)'}`,
                cursor: 'default',
                overflow: 'hidden',
                transition: 'background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${skill.color}15` : 'none',
            }}
        >
            {/* Left glowing bar */}
            <div style={{
                position: 'absolute', left: 0, top: '15%', bottom: '15%', width: 3,
                borderRadius: '0 4px 4px 0',
                background: hovered ? `linear-gradient(to bottom, ${skill.color}00, ${skill.color}, ${skill.color}00)` : 'transparent',
                transition: 'background 0.35s',
            }} />

            {/* Corner glow */}
            <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 100, height: 100, borderRadius: '50%',
                background: skill.color,
                filter: 'blur(50px)',
                opacity: hovered ? 0.12 : 0,
                transition: 'opacity 0.35s',
                pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon + Name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: hovered ? 12 : 0 }}>
                    {/* Big icon box */}
                    <div style={{
                        width: 58, height: 58, borderRadius: 16, flexShrink: 0,
                        background: skill.bg,
                        border: `1px solid ${skill.color}${hovered ? '45' : '20'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 13, fontWeight: 900, color: skill.color,
                        letterSpacing: '-0.02em',
                        boxShadow: hovered ? `0 0 20px ${skill.color}25, inset 0 0 12px ${skill.color}10` : 'none',
                        transition: 'box-shadow 0.3s, border-color 0.3s',
                    }}>
                        {skill.abbr}
                    </div>

                    <div>
                        <p style={{
                            fontSize: 15, fontWeight: 800,
                            color: hovered ? '#EBD5AB' : 'rgba(235,213,171,0.72)',
                            fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em',
                            lineHeight: 1.2,
                            transition: 'color 0.3s',
                        }}>
                            {skill.name}
                        </p>
                        <span style={{
                            fontSize: 9, fontWeight: 800, letterSpacing: '0.25em',
                            textTransform: 'uppercase', color: `${skill.color}80`,
                            fontFamily: 'Inter, sans-serif',
                        }}>
                            {CATEGORIES.find(c => c.id === skill.cat)?.label}
                        </span>
                    </div>
                </div>

                {/* Description slides in */}
                <AnimatePresence>
                    {hovered && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            style={{
                                fontSize: 12.5, color: 'rgba(235,213,171,0.45)',
                                fontFamily: 'Inter, sans-serif', fontWeight: 400,
                                lineHeight: 1.65, overflow: 'hidden',
                                paddingLeft: 72,
                            }}
                        >
                            {skill.desc}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// ── Category filter pill ────────────────────────────────────────────
function FilterPill({ cat, isActive, onClick, count }) {
    const Icon = cat.icon;
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '10px 18px', borderRadius: 100,
                border: `1px solid ${isActive ? cat.accent : 'rgba(235,213,171,0.1)'}`,
                background: isActive ? `${cat.accent}18` : 'rgba(235,213,171,0.03)',
                color: isActive ? cat.accent : 'rgba(235,213,171,0.42)',
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.05em', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.25s',
                boxShadow: isActive ? `0 0 20px ${cat.accent}20` : 'none',
            }}
        >
            <Icon size={13} />
            {cat.label}
            <span style={{
                fontSize: 10, fontWeight: 900,
                background: isActive ? `${cat.accent}25` : 'rgba(235,213,171,0.07)',
                color: isActive ? cat.accent : 'rgba(235,213,171,0.3)',
                padding: '1px 7px', borderRadius: 100, marginLeft: 2,
            }}>
                {count}
            </span>
        </motion.button>
    );
}

// ── Section Label ───────────────────────────────────────────────────
function SectionLabel({ cat, count }) {
    const Icon = cat.icon;
    const accent = cat.accent;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 16, borderBottom: `1px solid ${accent}12` }}>
            <div style={{
                width: 36, height: 36, borderRadius: 11,
                background: `${accent}15`, color: accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <Icon size={16} />
            </div>
            <div>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#EBD5AB', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
                    {cat.label}
                </p>
                <p style={{ fontSize: 10, fontWeight: 700, color: `${accent}70`, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    {count} technologies
                </p>
            </div>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accent}25, transparent)` }} />
        </div>
    );
}

// ── Main ────────────────────────────────────────────────────────────
export default function SkillsPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = activeFilter === 'all' ? SKILLS : SKILLS.filter(s => s.cat === activeFilter);

    const grouped = CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
        cat,
        skills: SKILLS.filter(s => s.cat === cat.id),
    })).filter(g => g.skills.length > 0);

    const counts = Object.fromEntries(
        CATEGORIES.filter(c => c.id !== 'all').map(c => [c.id, SKILLS.filter(s => s.cat === c.id).length])
    );

    return (
        <div style={{ minHeight: '100vh', padding: '0 24px 100px', position: 'relative', overflow: 'hidden' }}>
            <style>{`
                @keyframes pulse-ring {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(139,174,102,0.5); }
                    60% { box-shadow: 0 0 0 10px rgba(139,174,102,0); }
                }
                @keyframes shimmer-bar {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .bg-dots {
                    background-image: radial-gradient(rgba(139,174,102,0.1) 1px, transparent 1px);
                    background-size: 30px 30px;
                }
                @media (max-width: 720px) {
                    .filter-wrap { flex-wrap: wrap !important; }
                    .skill-grid   { grid-template-columns: 1fr !important; }
                    .learn-grid   { flex-direction: column !important; }
                }
            `}</style>

            {/* Blobs */}
            <div style={{ position: 'absolute', top: 0, left: '-8%', width: 550, height: 550, borderRadius: '50%', background: 'rgba(139,174,102,0.025)', filter: 'blur(160px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '5%', right: '-10%', width: 450, height: 450, borderRadius: '50%', background: 'rgba(139,174,102,0.035)', filter: 'blur(130px)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 10 }}>

                {/* ── HEADER ── */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: 44, paddingTop: 16 }}>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 22, padding: '7px 16px', borderRadius: 100, background: 'rgba(139,174,102,0.08)', border: '1px solid rgba(139,174,102,0.18)' }}>
                        <Terminal size={12} style={{ color: '#8BAE66' }} />
                        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 600, color: '#8BAE66', letterSpacing: '0.06em' }}>
                            ~/arsenal <span style={{ opacity: 0.5 }}>$</span> ls -la
                        </span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(44px, 6.5vw, 82px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#EBD5AB', fontFamily: 'Inter, sans-serif', marginBottom: 18 }}>
                        The Tech{' '}
                        <em style={{ fontStyle: 'italic', color: '#8BAE66', fontFamily: '"Playfair Display", Georgia, serif' }}>Arsenal</em>.
                    </h1>

                    <p style={{ fontSize: 16, color: 'rgba(235,213,171,0.45)', fontWeight: 300, maxWidth: 520, lineHeight: 1.8, fontFamily: 'Inter, sans-serif', marginBottom: 32 }}>
                        Tools, frameworks, and technologies I use to build full-stack products — from database schema to deployed frontend.
                    </p>

                    {/* Stat row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {[
                            { n: SKILLS.length, l: 'Total Skills' },
                            { n: CATEGORIES.length - 1, l: 'Categories' },
                            { n: LEARNING.length, l: 'Learning' },
                            { n: '2+', l: 'Years Active' },
                        ].map(({ n, l }) => (
                            <motion.div key={l} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }} style={{ padding: '14px 24px', borderRadius: 16, background: 'rgba(235,213,171,0.03)', border: '1px solid rgba(235,213,171,0.07)', textAlign: 'center', minWidth: 100 }}>
                                <p style={{ fontSize: 28, fontWeight: 900, color: '#8BAE66', lineHeight: 1, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em' }}>{n}</p>
                                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.3)', marginTop: 7, fontFamily: 'Inter, sans-serif' }}>{l}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── FILTER BAR ── */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }} className="filter-wrap">
                    <FilterPill cat={{ id: 'all', label: 'All Skills', icon: Layers, accent: '#8BAE66' }} isActive={activeFilter === 'all'} onClick={() => setActiveFilter('all')} count={SKILLS.length} />
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                        <FilterPill key={cat.id} cat={cat} isActive={activeFilter === cat.id} onClick={() => setActiveFilter(cat.id)} count={counts[cat.id] || 0} />
                    ))}
                </motion.div>

                {/* ── DOT GRID PANEL ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-dots"
                    style={{ borderRadius: 28, border: '1px solid rgba(235,213,171,0.07)', padding: '28px', marginBottom: 24, background: 'rgba(27,33,26,0.45)', backdropFilter: 'blur(12px)', minHeight: 200 }}
                >
                    {/* ALL — grouped by category */}
                    {activeFilter === 'all' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                            {grouped.map(({ cat, skills }) => (
                                <div key={cat.id}>
                                    <SectionLabel cat={cat} count={skills.length} />
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }} className="skill-grid">
                                        <AnimatePresence>
                                            {skills.map((sk, i) => <SkillCard key={sk.id} skill={sk} index={i} />)}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* SINGLE category */
                        <div>
                            {(() => { const c = CATEGORIES.find(x => x.id === activeFilter); return c && <SectionLabel cat={c} count={filtered.length} />; })()}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }} className="skill-grid">
                                <AnimatePresence mode="popLayout">
                                    {filtered.map((sk, i) => <SkillCard key={sk.id} skill={sk} index={i} />)}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* ── CURRENTLY LOADING ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ padding: '28px 28px 32px', borderRadius: 28, border: '1.5px dashed rgba(139,174,102,0.2)', background: 'rgba(139,174,102,0.01)', position: 'relative', overflow: 'hidden' }}
                >
                    {/* shimmer top border */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #8BAE66, #8BAE6660, transparent)', backgroundSize: '200% auto', animation: 'shimmer-bar 3s linear infinite' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#8BAE66', animation: 'pulse-ring 2.2s infinite', flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(139,174,102,0.55)', fontFamily: '"JetBrains Mono", monospace', marginBottom: 4 }}>
                                currently_loading...
                            </p>
                            <h3 style={{ fontSize: 20, fontWeight: 900, color: '#EBD5AB', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
                                Expanding Horizons
                            </h3>
                        </div>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(139,174,102,0.15), transparent)', marginLeft: 8 }} />
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }} className="learn-grid">
                        {LEARNING.map((tech, i) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -5, scale: 1.03 }}
                                style={{
                                    flex: '1 1 180px',
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '16px 20px', borderRadius: 18,
                                    border: '1px dashed rgba(235,213,171,0.1)',
                                    background: tech.bg, cursor: 'default',
                                    transition: 'all 0.3s',
                                }}
                            >
                                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${tech.color}18`, border: `1px solid ${tech.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 900, color: tech.color, flexShrink: 0 }}>
                                    {tech.abbr}
                                </div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 800, color: 'rgba(235,213,171,0.75)', fontFamily: 'Inter, sans-serif', marginBottom: 3 }}>
                                        {tech.name}
                                    </p>
                                    <p style={{ fontSize: 11, color: 'rgba(235,213,171,0.32)', fontFamily: 'Inter, sans-serif' }}>
                                        {tech.desc}
                                    </p>
                                </div>
                                <div style={{ marginLeft: 'auto', padding: '3px 9px', borderRadius: 100, background: `${tech.color}15`, color: tech.color, fontSize: 9, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
                                    WIP
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
