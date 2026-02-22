'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import {
    GraduationCap, Zap, Globe, MapPin,
    Dumbbell, BookOpen, Lightbulb, Terminal, Star,
    Code2, Cpu, Layers, Wifi
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/constants';

// ── Global styles injected once ───────────────────────────────────
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700;1,800&display=swap');

        .about-hero-title {
            font-size: clamp(42px, 6.5vw, 84px);
            font-weight: 900;
            letter-spacing: -0.03em;
            line-height: 1.05;
            color: #EBD5AB;
            font-family: 'Inter', sans-serif;
        }
        .about-hero-title em {
            font-style: italic;
            font-family: 'Playfair Display', Georgia, serif;
            color: #8BAE66;
            font-weight: 700;
        }

        /* Scan-line shimmer on status card */
        @keyframes scan {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(400%); }
        }
        @keyframes blink-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.25; }
        }
        @keyframes float-y {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
        }
        @keyframes badge-glow {
            0%, 100% { box-shadow: 0 0 8px rgba(139,174,102,0.3); }
            50%       { box-shadow: 0 0 20px rgba(139,174,102,0.7); }
        }

        /* Education card glow on hover */
        .edu-card:hover {
            border-color: rgba(139,174,102,0.35) !important;
            background: rgba(139,174,102,0.05) !important;
        }

        /* Persona card – exploding gradient border on hover */
        .persona-card { transition: background 0.4s, box-shadow 0.4s; }
        .persona-card:hover {
            box-shadow: 0 0 0 1px rgba(139,174,102,0.4), 0 20px 60px rgba(0,0,0,0.4);
            background: rgba(139,174,102,0.055) !important;
        }
        .persona-icon { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s; }
        .persona-card:hover .persona-icon {
            transform: rotate(12deg) scale(1.15);
            background: rgba(139,174,102,0.22) !important;
        }

        @media (max-width: 860px) {
            .hero-split { flex-direction: column !important; }
            .status-card { width: 100% !important; max-width: 100% !important; }
            .stats-strip { grid-template-columns: repeat(2, 1fr) !important; }
            .persona-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .timeline-grid { grid-template-columns: 1fr !important; }
            .timeline-grid .edu-left,
            .timeline-grid .edu-right { padding: 0 !important; }
        }
        @media (max-width: 640px) {
            .persona-grid { grid-template-columns: 1fr !important; }
            .stats-strip { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
            .stats-strip { grid-template-columns: repeat(2, 1fr) !important; }
            .status-card > div:nth-child(1),
            .status-card > div:nth-child(2) { display: none !important; }
        }
    `}</style>
);

// ── System Status Card (right panel in hero) ──────────────────────
const STATUS_ROWS = [
    { icon: Code2, label: 'Class', value: 'Full Stack Dev' },
    { icon: Layers, label: 'Stack', value: 'MERN + Next.js' },
    { icon: MapPin, label: 'Location', value: 'Ahmedabad, IN 🇮🇳' },
    { icon: Star, label: 'CGPA', value: '9.27 / 10' },
    { icon: Zap, label: 'Current Focus', value: 'Full Stack + UI/UX' },
    { icon: Globe, label: 'Availability', value: 'Open to Opportunities' },
];

function SystemStatusCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            style={{
                position: 'relative',
                flexShrink: 0,
                width: 360,
                animation: 'float-y 5s ease-in-out infinite',
            }}
            className="status-card"
        >
            {/* ── Offset box behind (layered depth effect like friend's portfolio) ── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 24,
                border: '1px solid rgba(139,174,102,0.12)',
                background: 'rgba(139,174,102,0.02)',
                transform: 'translate(10px, 10px)',
                zIndex: 0,
            }} />

            {/* ── Second offset layer (triple depth) ── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 24,
                border: '1px solid rgba(139,174,102,0.06)',
                transform: 'translate(20px, 20px)',
                zIndex: 0,
            }} />

            {/* ── Main card ── */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 24,
                background: 'rgba(27,33,26,0.82)',
                border: '1px solid rgba(235,213,171,0.1)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(235,213,171,0.06)',
                overflow: 'hidden',
            }}>
                {/* Scan line shimmer */}
                <div style={{
                    position: 'absolute', left: 0, right: 0, height: 80,
                    background: 'linear-gradient(to bottom, transparent, rgba(139,174,102,0.06), transparent)',
                    animation: 'scan 6s linear infinite',
                    pointerEvents: 'none', zIndex: 2,
                }} />

                {/* ── 4 Corner Bracket markers (exactly like friend's portfolio) ── */}
                {[
                    { top: 12, left: 12, borderTop: '2px solid', borderLeft: '2px solid' },
                    { top: 12, right: 12, borderTop: '2px solid', borderRight: '2px solid' },
                    { bottom: 12, left: 12, borderBottom: '2px solid', borderLeft: '2px solid' },
                    { bottom: 12, right: 12, borderBottom: '2px solid', borderRight: '2px solid' },
                ].map((s, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: 18, height: 18,
                        borderColor: 'rgba(139,174,102,0.35)',
                        ...s,
                        zIndex: 3,
                        pointerEvents: 'none',
                    }} />
                ))}

                {/* Top accent line */}
                <div style={{ height: 2, width: '100%', background: 'linear-gradient(90deg, transparent, #8BAE66, transparent)' }} />

                {/* Header */}
                <div style={{
                    padding: '18px 24px 14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(235,213,171,0.06)',
                }}>
                    <p style={{
                        fontSize: 9, fontWeight: 800, letterSpacing: '0.5em',
                        textTransform: 'uppercase', color: 'rgba(235,213,171,0.35)',
                        fontFamily: 'Inter, sans-serif',
                    }}>
                        System Status
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                            width: 7, height: 7, borderRadius: '50%', background: '#8BAE66',
                            animation: 'blink-dot 1.8s ease-in-out infinite, badge-glow 2s ease-in-out infinite',
                        }} />
                        <span style={{
                            fontSize: 8, fontWeight: 800, letterSpacing: '0.35em',
                            textTransform: 'uppercase', color: 'rgba(139,174,102,0.6)',
                            fontFamily: 'Inter, sans-serif',
                        }}>ONLINE</span>
                    </div>
                </div>

                {/* Profile row */}
                <div style={{
                    padding: '18px 24px',
                    display: 'flex', alignItems: 'center', gap: 14,
                    borderBottom: '1px solid rgba(235,213,171,0.05)',
                }}>
                    <div style={{
                        width: 54, height: 54, borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid rgba(139,174,102,0.35)',
                        boxShadow: '0 0 20px rgba(139,174,102,0.22)',
                        flexShrink: 0,
                    }}>
                        <img
                            src={PORTFOLIO_DATA.image}
                            alt="Ridham Patel"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                    </div>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 800, color: '#EBD5AB', fontFamily: 'Inter, sans-serif', lineHeight: 1.2 }}>
                            Ridham Patel
                        </p>
                        <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(139,174,102,0.7)', fontFamily: 'Inter, sans-serif', marginTop: 3 }}>
                            Full Stack Developer
                        </p>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            border: '1.5px dashed rgba(139,174,102,0.35)',
                            animation: 'spin-slow 8s linear infinite',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <div style={{ width: 7, height: 7, background: '#8BAE66', borderRadius: '50%' }} />
                        </div>
                    </div>
                </div>

                {/* Status rows */}
                <div style={{ padding: '12px 18px 18px' }}>
                    {STATUS_ROWS.map(({ icon: Icon, label, value }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.07 }}
                            whileHover={{ background: 'rgba(139,174,102,0.07)', borderColor: 'rgba(139,174,102,0.2)' }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '10px 12px', borderRadius: 12, marginBottom: 5,
                                background: 'rgba(235,213,171,0.03)',
                                border: '1px solid rgba(235,213,171,0.05)',
                                cursor: 'default',
                                transition: 'background 0.25s, border-color 0.25s',
                            }}
                        >
                            <div style={{
                                width: 30, height: 30, borderRadius: 9,
                                background: 'rgba(139,174,102,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#8BAE66', flexShrink: 0,
                            }}>
                                <Icon size={14} />
                            </div>
                            <div>
                                <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.28)', fontFamily: 'Inter, sans-serif' }}>
                                    {label}
                                </p>
                                <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(235,213,171,0.78)', fontFamily: 'Inter, sans-serif' }}>
                                    {value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '10px 24px 16px',
                    borderTop: '1px solid rgba(235,213,171,0.05)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <span style={{
                        fontSize: 9, fontFamily: '"JetBrains Mono", monospace',
                        color: 'rgba(139,174,102,0.35)', fontWeight: 600, letterSpacing: '0.08em',
                    }}>ID: RIDHAM-2808</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(139,174,102,0.25)' }} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ── Education Timeline ────────────────────────────────────────────
const EDUCATION = [
    {
        id: 1,
        institution: 'Rai University',
        location: 'Ahmedabad',
        degree: 'Bachelor of Technology',
        field: 'Computer Science Engineering',
        period: '2024 – 2028',
        status: 'current',
        highlight: 'CGPA 9.27',
        highlightSub: '(3 Semesters)',
        icon: GraduationCap,
        tag: 'B.Tech',
        description: 'Pursuing CSE with deep focus on full-stack development, data structures, and system design. Consistently top performer across all semesters.',
    },
    {
        id: 2,
        institution: 'Shivam Vidhyalaya',
        location: 'Ahmedabad',
        degree: 'Higher Secondary Education',
        field: 'Science Stream',
        period: '2022 – 2024',
        status: 'done',
        icon: BookOpen,
        tag: 'HSC',
        description: 'Completed Higher Secondary with a strong foundation in Mathematics, Physics, and Computer Science.',
    },
    {
        id: 3,
        institution: 'Sankalp International School',
        location: 'Ahmedabad',
        degree: 'Secondary Education',
        field: 'School Education',
        period: '2020 – 2022',
        status: 'done',
        icon: Star,
        tag: 'SSC',
        description: 'Completed secondary education, building the academic base and igniting a passion for technology and problem-solving.',
    },
];

function EduCard({ edu, index }) {
    const isRight = index % 2 === 0; // Rai = right, Shivam = left, Sankalp = right

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'start', gap: 0, marginBottom: 64 }} className="timeline-grid">

            {/* Left cell */}
            {!isRight ? (
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.1 }}
                    className="edu-left"
                    style={{ paddingRight: 32 }}
                >
                    <EduCardInner edu={edu} />
                </motion.div>
            ) : <div />}

            {/* Center spine node */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 280, delay: index * 0.1 + 0.1 }}
                    style={{ position: 'relative' }}
                >
                    {edu.status === 'current' && (
                        <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                            style={{
                                position: 'absolute', inset: -8, borderRadius: '50%',
                                background: 'rgba(139,174,102,0.2)',
                            }}
                        />
                    )}
                    <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: edu.status === 'current' ? 'rgba(139,174,102,0.18)' : 'rgba(235,213,171,0.06)',
                        border: `2px solid ${edu.status === 'current' ? '#8BAE66' : 'rgba(235,213,171,0.14)'}`,
                        color: edu.status === 'current' ? '#8BAE66' : 'rgba(235,213,171,0.35)',
                        boxShadow: edu.status === 'current' ? '0 0 24px rgba(139,174,102,0.3)' : 'none',
                    }}>
                        <edu.icon size={18} />
                    </div>
                </motion.div>

                {/* Tag */}
                <div style={{
                    marginTop: 8,
                    padding: '3px 10px',
                    borderRadius: 100,
                    fontSize: 8, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                    background: edu.status === 'current' ? 'rgba(139,174,102,0.14)' : 'rgba(235,213,171,0.05)',
                    color: edu.status === 'current' ? '#8BAE66' : 'rgba(235,213,171,0.3)',
                    border: `1px solid ${edu.status === 'current' ? 'rgba(139,174,102,0.25)' : 'rgba(235,213,171,0.07)'}`,
                }}>
                    {edu.tag}
                </div>
            </div>

            {/* Right cell */}
            {isRight ? (
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.1 }}
                    className="edu-right"
                    style={{ paddingLeft: 32 }}
                >
                    <EduCardInner edu={edu} />
                </motion.div>
            ) : <div />}
        </div>
    );
}

function EduCardInner({ edu }) {
    return (
        <div
            className="edu-card"
            style={{
                padding: '24px',
                borderRadius: 20,
                background: 'rgba(235,213,171,0.025)',
                border: '1px solid rgba(235,213,171,0.08)',
                backdropFilter: 'blur(10px)',
                transition: 'background 0.35s, border-color 0.35s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Glow blob */}
            {edu.status === 'current' && (
                <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 120, height: 120, borderRadius: '50%',
                    background: 'rgba(139,174,102,0.08)', filter: 'blur(40px)',
                    pointerEvents: 'none',
                }} />
            )}

            {/* Period badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{
                    fontSize: 8, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: 100,
                    background: edu.status === 'current' ? 'rgba(139,174,102,0.14)' : 'rgba(235,213,171,0.05)',
                    color: edu.status === 'current' ? '#8BAE66' : 'rgba(235,213,171,0.3)',
                    border: `1px solid ${edu.status === 'current' ? 'rgba(139,174,102,0.2)' : 'rgba(235,213,171,0.07)'}`,
                    fontFamily: 'Inter, sans-serif',
                }}>
                    {edu.period}
                </span>
                {edu.status === 'current' && (
                    <span style={{
                        fontSize: 7, fontWeight: 900, padding: '3px 8px', borderRadius: 100,
                        background: 'rgba(139,174,102,0.2)', color: '#8BAE66',
                        letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
                    }}>
                        Current
                    </span>
                )}
            </div>

            <h3 style={{ fontSize: 17, fontWeight: 900, color: '#EBD5AB', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 4 }}>
                {edu.institution}
            </h3>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(139,174,102,0.65)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                {edu.location}
            </p>
            <p style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(235,213,171,0.6)', marginBottom: 4 }}>
                {edu.degree}
            </p>
            <p style={{ fontSize: 11, color: 'rgba(235,213,171,0.35)', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
                {edu.field}
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(235,213,171,0.42)', fontWeight: 300, marginBottom: edu.highlight ? 14 : 0, fontFamily: 'Inter, sans-serif' }}>
                {edu.description}
            </p>

            {edu.highlight && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(139,174,102,0.14) 0%, rgba(139,174,102,0.04) 100%)',
                    border: '1px solid rgba(139,174,102,0.2)',
                }}>
                    <div style={{
                        width: 30, height: 30, borderRadius: 10,
                        background: 'rgba(139,174,102,0.18)', color: '#8BAE66',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                        <Star size={13} />
                    </div>
                    <div>
                        <p style={{ fontSize: 18, fontWeight: 900, color: '#8BAE66', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>
                            {edu.highlight}
                        </p>
                        {edu.highlightSub && (
                            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(139,174,102,0.5)', fontFamily: 'Inter, sans-serif' }}>
                                {edu.highlightSub}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Persona Cards ─────────────────────────────────────────────────
const PERSONAS = [
    { icon: Terminal, no: '01', title: 'The Builder', desc: "I don't just write code — I build systems. From database schema to pixel-perfect frontend, I own the full product lifecycle. Ship fast, ship right." },
    { icon: Dumbbell, no: '02', title: 'The Gym Guy', desc: "5–6 days a week, no excuses. The iron builds discipline — the same discipline that keeps me debugging at 2am. Consistency over everything." },
    { icon: Lightbulb, no: '03', title: 'The Designer', desc: "Clean UI isn't optional — it's a standard. I Figma before I code. Every spacing decision, every color, every hover state. Design separates good from great." },
    { icon: Zap, no: '04', title: 'The Learner', desc: "Self-taught full-stack dev. DSA every morning, new frameworks every sprint, projects every weekend. Curiosity is my biggest unfair advantage." },
];

function PersonaCard({ item, index }) {
    const [pos, setPos] = useState({ x: 50, y: 50 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            className="persona-card"
            style={{
                padding: '28px 26px',
                borderRadius: 22,
                background: 'rgba(235,213,171,0.025)',
                border: '1px solid rgba(235,213,171,0.07)',
                backdropFilter: 'blur(10px)',
                cursor: 'default', position: 'relative', overflow: 'hidden',
            }}
        >
            {/* Mouse spotlight */}
            <div style={{
                position: 'absolute',
                width: 220, height: 220, borderRadius: '50%',
                background: `radial-gradient(circle, rgba(139,174,102,0.1) 0%, transparent 70%)`,
                left: `calc(${pos.x}% - 110px)`, top: `calc(${pos.y}% - 110px)`,
                pointerEvents: 'none', transition: 'left 0.06s, top 0.06s',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between', marginBottom: 18,
                }}>
                    <div
                        className="persona-icon"
                        style={{
                            width: 44, height: 44, borderRadius: 13,
                            background: 'rgba(139,174,102,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#8BAE66',
                        }}
                    >
                        <item.icon size={19} />
                    </div>
                    <span style={{
                        fontSize: 28, fontWeight: 900, color: 'rgba(139,174,102,0.1)',
                        fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em', lineHeight: 1,
                    }}>
                        {item.no}
                    </span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#EBD5AB', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', marginBottom: 10 }}>
                    {item.title}
                </h3>
                <p style={{ fontSize: 13.5, color: 'rgba(235,213,171,0.48)', lineHeight: 1.72, fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>
                    {item.desc}
                </p>
            </div>
        </motion.div>
    );
}

// ── Main ──────────────────────────────────────────────────────────
export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

    return (
        <div ref={containerRef} style={{ minHeight: '100vh', padding: '0 24px 100px', position: 'relative', overflow: 'hidden' }}>
            <GlobalStyles />

            {/* Ambient blobs */}
            <div style={{ position: 'absolute', top: '5%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(139,174,102,0.03)', filter: 'blur(140px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '15%', right: '-12%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(139,174,102,0.04)', filter: 'blur(120px)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 10 }}>

                {/* ══ HERO — Split layout ══ */}
                <div style={{ paddingTop: 16, marginBottom: 92 }}>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: 10, fontWeight: 800, letterSpacing: '0.6em',
                            textTransform: 'uppercase', color: '#8BAE66',
                            fontFamily: 'Inter, sans-serif', marginBottom: 28,
                        }}
                    >
                        The Persona
                    </motion.p>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 48 }} className="hero-split">

                        {/* Left — headline + bio */}
                        <div style={{ flex: 1 }}>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.75, delay: 0.1 }}
                                className="about-hero-title"
                                style={{ marginBottom: 28 }}
                            >
                                Blending{' '}
                                <em>logic</em>{' '}
                                with<br />
                                visual{' '}
                                <em>storytelling</em>.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.25 }}
                                style={{
                                    fontSize: 16, color: 'rgba(235,213,171,0.52)',
                                    fontWeight: 300, lineHeight: 1.85, maxWidth: 500,
                                    fontFamily: 'Inter, sans-serif', marginBottom: 28,
                                }}
                            >
                                I'm <strong style={{ color: 'rgba(235,213,171,0.82)', fontWeight: 700 }}>Ridham Patel</strong> — a full-stack developer and UI designer from Ahmedabad, pursuing B.Tech CSE at Rai University. I build end-to-end MERN apps with clean interfaces and thoughtful UX.
                            </motion.p>

                            {/* Italic quote block */}
                            <motion.div
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                style={{
                                    paddingLeft: 16,
                                    borderLeft: '2px solid rgba(139,174,102,0.3)',
                                    marginBottom: 36,
                                }}
                            >
                                <p style={{
                                    fontSize: 14.5,
                                    fontStyle: 'italic',
                                    fontFamily: '"Playfair Display", Georgia, serif',
                                    color: 'rgba(235,213,171,0.5)',
                                    lineHeight: 1.7,
                                    marginBottom: 8,
                                }}>
                                    "I believe the best products are born where clean code meets intentional design — where every pixel and every function earns its place."
                                </p>
                                <span style={{
                                    fontSize: 10, fontWeight: 700,
                                    letterSpacing: '0.25em', textTransform: 'uppercase',
                                    color: 'rgba(139,174,102,0.5)',
                                    fontFamily: 'Inter, sans-serif',
                                }}>
                                    ~ Ridham Patel
                                </span>
                            </motion.div>

                            {/* Quick stats row */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}
                                className="stats-strip"
                            >
                                {[
                                    { num: '9.27', sub: 'CGPA' },
                                    { num: '15+', sub: 'Projects' },
                                    { num: '2+', sub: 'Yrs Building' },
                                    { num: '1', sub: 'Paid Client' },
                                ].map(({ num, sub }) => (
                                    <motion.div
                                        key={sub}
                                        whileHover={{ y: -3, scale: 1.04 }}
                                        transition={{ type: 'spring', stiffness: 320 }}
                                        style={{
                                            padding: '16px 12px', borderRadius: 16, textAlign: 'center',
                                            background: 'rgba(235,213,171,0.03)',
                                            border: '1px solid rgba(235,213,171,0.07)',
                                            backdropFilter: 'blur(8px)',
                                            cursor: 'default',
                                        }}
                                    >
                                        <p style={{ fontSize: 26, fontWeight: 900, color: '#8BAE66', lineHeight: 1, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em' }}>{num}</p>
                                        <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.32)', marginTop: 6, fontFamily: 'Inter, sans-serif' }}>{sub}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right — System Status Card */}
                        <SystemStatusCard />
                    </div>
                </div>

                {/* ══ PERSONA CARDS ══ */}
                <div style={{ marginBottom: 100 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: 44 }}
                    >
                        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#8BAE66', fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>
                            Who I Am
                        </p>
                        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#EBD5AB', fontFamily: 'Inter, sans-serif', lineHeight: 1.1 }}>
                            Four words that define me.{' '}
                            <em style={{ fontStyle: 'italic', color: '#8BAE66', fontFamily: '"Playfair Display", Georgia, serif' }}>
                                Fully.
                            </em>
                        </h2>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }} className="persona-grid">
                        {PERSONAS.map((item, i) => (
                            <PersonaCard key={item.title} item={item} index={i} />
                        ))}
                    </div>
                </div>

                {/* ══ EDUCATION TIMELINE ══ */}
                <div style={{ marginBottom: 80 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: 56, textAlign: 'center' }}
                    >
                        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#8BAE66', fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>
                            Academic Path
                        </p>
                        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#EBD5AB', fontFamily: 'Inter, sans-serif' }}>
                            My Education{' '}
                            <em style={{ fontStyle: 'italic', color: '#8BAE66', fontFamily: '"Playfair Display", Georgia, serif' }}>
                                Journey
                            </em>
                            .
                        </h2>
                    </motion.div>

                    {/* Spine */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute', left: '50%', top: 0, bottom: 0,
                            width: 1, transform: 'translateX(-50%)',
                            background: 'linear-gradient(to bottom, rgba(139,174,102,0.4), rgba(139,174,102,0.08), transparent)',
                            pointerEvents: 'none',
                        }} />
                        {EDUCATION.map((edu, i) => (
                            <EduCard key={edu.id} edu={edu} index={i} />
                        ))}
                    </div>
                </div>

                {/* ══ TECH SNAPSHOT ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        padding: '44px 40px',
                        borderRadius: 28,
                        background: 'rgba(235,213,171,0.02)',
                        border: '1px solid rgba(235,213,171,0.07)',
                        backdropFilter: 'blur(16px)',
                        position: 'relative', overflow: 'hidden',
                    }}
                >
                    <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,174,102,0.35), transparent)' }} />

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                        <div>
                            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#8BAE66', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
                                Current Stack
                            </p>
                            <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 900, color: '#EBD5AB', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
                                MERN + Next.js + Tailwind
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'Figma', 'Git'].map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04 }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    style={{
                                        padding: '6px 13px', borderRadius: 100,
                                        fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                        fontFamily: 'Inter, sans-serif',
                                        background: 'rgba(139,174,102,0.08)',
                                        border: '1px solid rgba(139,174,102,0.18)',
                                        color: '#8BAE66', cursor: 'default',
                                    }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(235,213,171,0.06)', paddingTop: 22, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                        {[
                            { icon: MapPin, label: 'Location', value: 'Ahmedabad, Gujarat 🇮🇳' },
                            { icon: GraduationCap, label: 'University', value: 'Rai University' },
                            { icon: Globe, label: 'Focus', value: 'Full Stack + UI/UX' },
                            { icon: Zap, label: 'Status', value: 'Open to Opportunities' },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(139,174,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8BAE66', flexShrink: 0 }}>
                                    <Icon size={14} />
                                </div>
                                <div>
                                    <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.28)', fontFamily: 'Inter, sans-serif' }}>{label}</p>
                                    <p style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(235,213,171,0.72)', fontFamily: 'Inter, sans-serif' }}>{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
