'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase, Calendar, CheckCircle2, Globe, Play,
    ExternalLink, Youtube, FileText, ThumbsUp,
    ChevronLeft, ChevronRight, Zap, Users, BookOpen,
    MessageSquare, LayoutDashboard, Shield, Sparkles,
} from 'lucide-react';

// ─── Project Data ──────────────────────────────────────────────────
const PROJECT = {
    title: 'JustForTeachers',
    tagline: 'Creating Fearless Teachers & Making Schools Great',
    client: 'Dushyant Das (Founder, justforteachers.in)',
    duration: '15 Oct 2025 – 10 Nov 2025',
    type: 'Paid Freelance Project',
    status: 'Live & Delivered',
    liveUrl: 'https://justforteachers.in/',
    heroImg: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771751901/Screenshot_2026-02-22_144756_nzbqpi.png',

    overview: `JustForTeachers is a full-stack web platform built for India's teaching community — a space where educators come to read, learn, and grow. The platform hosts a curated blog ecosystem covering teaching methodologies, classroom management, and personal development for teachers. Beyond content, it features a rich training section where the founder — a seasoned IIM-Raipur alumnus and passionate educator — shares workshop programs, parenting insights, and counselling resources. The site also showcases real success stories from educators who've attended training, community-driven article browsing, and a contact/enquiry system so teachers and school leaders can directly reach out for workshops or collaborations. Built to scale from a blog base to a full-featured teacher-empowerment platform, the entire solution was designed, developed, and deployed within a month.`,

    keyFeatures: [
        { icon: BookOpen, text: 'Content-rich blog with categorised education articles' },
        { icon: Users, text: 'Teacher training programs & workshop showcase' },
        { icon: MessageSquare, text: 'Success stories & testimonials from real educators' },
        { icon: LayoutDashboard, text: 'Mission, Vision & Philosophy pages with rich layout' },
        { icon: Globe, text: 'Responsive & SEO-optimised for educators across India' },
        { icon: Shield, text: 'Contact & enquiry system with EmailJS integration' },
        { icon: Zap, text: 'Image management via Cloudinary CDN' },
        { icon: Sparkles, text: 'Supabase-powered backend with secure data layer' },
    ],

    tech: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Supabase', 'Tailwind CSS', 'Cloudinary', 'EmailJS'],

    links: [
        { label: 'Live Website', icon: Globe, url: 'https://justforteachers.in/', accent: '#8BAE66' },
        { label: 'Project Demo', icon: Youtube, url: 'https://youtu.be/masDEhRtEcg?si=q-Ydp2qWq0klgj24', accent: '#FF4444' },
        { label: 'API Documentation', icon: FileText, url: 'https://documenter.getpostman.com/view/39189278/2sB3dVLmFd', accent: '#FF6B35' },
        { label: 'Client Appreciation', icon: ThumbsUp, url: 'https://www.linkedin.com/posts/patel-ridham_freelance-webdeveloper-firstproject-activity-7396430600083091456-G2xS', accent: '#0077B5' },
    ],

    gallery: [
        'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771754536/Screenshot_2026-02-22_152931_om59bf.png',
        'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771754543/Screenshot_2026-02-22_152950_zqciqi.png',
        'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771754536/Screenshot_2026-02-22_153012_sd04yj.png',
        'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771754537/Screenshot_2026-02-22_153103_mvrcap.png',
        'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771754537/Screenshot_2026-02-22_153053_dgoqgx.png',
    ],
};

const ACCENT = '#8BAE66';

// ─── Gallery Component ─────────────────────────────────────────────
function Gallery() {
    const [active, setActive] = useState(0);
    const prev = () => setActive(i => (i - 1 + PROJECT.gallery.length) % PROJECT.gallery.length);
    const next = () => setActive(i => (i + 1) % PROJECT.gallery.length);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Main image */}
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', background: 'rgba(27,33,26,0.9)' }}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={active}
                        src={PROJECT.gallery[active]}
                        alt={`Screenshot ${active + 1}`}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.35 }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </AnimatePresence>
                {/* Nav arrows */}
                {[{ fn: prev, Icon: ChevronLeft, side: 'left' }, { fn: next, Icon: ChevronRight, side: 'right' }].map(({ fn, Icon, side }) => (
                    <button
                        key={side}
                        onClick={fn}
                        style={{
                            position: 'absolute', top: '50%', [side]: 12,
                            transform: 'translateY(-50%)',
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'rgba(27,33,26,0.85)',
                            border: `1px solid rgba(139,174,102,0.3)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: ACCENT,
                        }}
                    >
                        <Icon size={18} />
                    </button>
                ))}
                {/* Counter */}
                <div style={{ position: 'absolute', bottom: 12, right: 14, fontSize: 11, fontWeight: 700, color: 'rgba(235,213,171,0.6)', fontFamily: 'Inter,sans-serif' }}>
                    {active + 1} / {PROJECT.gallery.length}
                </div>
            </div>
            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 8 }}>
                {PROJECT.gallery.map((src, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        style={{
                            flex: 1, aspectRatio: '16/9', borderRadius: 10, overflow: 'hidden',
                            border: `2px solid ${i === active ? ACCENT : 'transparent'}`,
                            opacity: i === active ? 1 : 0.45,
                            transition: 'all 0.2s', cursor: 'pointer', padding: 0, background: 'none',
                        }}
                    >
                        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Video Embed ───────────────────────────────────────────────────
function VideoEmbed() {
    const [playing, setPlaying] = useState(false);
    const videoId = 'masDEhRtEcg';

    return (
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
            {playing ? (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="JustForTeachers Project Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 'none' }}
                />
            ) : (
                <>
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                    <button
                        onClick={() => setPlaying(true)}
                        style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)',
                            width: 72, height: 72, borderRadius: '50%',
                            background: 'rgba(255,68,68,0.92)',
                            border: '3px solid rgba(255,255,255,0.25)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 8px 40px rgba(255,68,68,0.5)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1)'; }}
                    >
                        <Play size={26} fill="white" color="white" style={{ marginLeft: 4 }} />
                    </button>
                    <div style={{ position: 'absolute', bottom: 16, left: 16, color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter,sans-serif', fontSize: 12, fontWeight: 700 }}>
                        ▶ Project Demo Video
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function FreelancePage() {
    const [activeMedia, setActiveMedia] = useState('video'); // 'video' | 'gallery'

    return (
        <div style={{ minHeight: '100vh', padding: '0 24px 120px', position: 'relative', overflow: 'hidden' }}>

            {/* Ambient glows */}
            <div style={{ position: 'fixed', top: '20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: `${ACCENT}07`, filter: 'blur(100px)', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '10%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: `${ACCENT}05`, filter: 'blur(80px)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                {/* ── HEADER ───────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 56, textAlign: 'center' }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '6px 18px', borderRadius: 100, background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}>
                        <Briefcase size={13} color={ACCENT} />
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, fontFamily: 'Inter,sans-serif' }}>Freelance Client Work</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#EBD5AB', lineHeight: 1.05, fontFamily: 'Inter,sans-serif', marginBottom: 16 }}>
                        Real Client.{' '}
                        <span style={{ color: ACCENT }}>Real Impact.</span>
                    </h1>
                    <p style={{ color: 'rgba(235,213,171,0.45)', fontSize: 18, fontWeight: 300, maxWidth: 520, margin: '0 auto', fontFamily: 'Inter,sans-serif', lineHeight: 1.7 }}>
                        Beyond side projects — a paid engagement, shipped on time, running in production.
                    </p>
                </motion.div>

                {/* ── HERO SPLIT ───────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32,
                        marginBottom: 32,
                        background: 'rgba(235,213,171,0.025)',
                        border: '1px solid rgba(235,213,171,0.08)',
                        borderRadius: 32, overflow: 'hidden',
                        padding: 0,
                    }}
                    className="freelance-hero-grid"
                >
                    {/* Left: hero image + title */}
                    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 340 }}>
                        <img
                            src={PROJECT.heroImg}
                            alt="JustForTeachers"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.75 }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(27,33,26,0.85) 0%, transparent 60%, rgba(27,33,26,0.4) 100%)' }} />
                        <div style={{ position: 'relative', padding: 36, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} />
                                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4ade80', fontFamily: 'Inter,sans-serif' }}>Live & In Production</span>
                            </div>
                            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#EBD5AB', fontFamily: 'Inter,sans-serif', marginBottom: 4, letterSpacing: '-0.02em' }}>{PROJECT.title}</h2>
                            <p style={{ fontSize: 13, color: 'rgba(235,213,171,0.55)', fontFamily: 'Inter,sans-serif', fontWeight: 400, lineHeight: 1.5 }}>{PROJECT.tagline}</p>
                        </div>
                    </div>

                    {/* Right: metadata */}
                    <div style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
                        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: `${ACCENT}80`, fontFamily: 'Inter,sans-serif', marginBottom: 4 }}>Project Details</p>
                        {[
                            { label: 'Client', value: PROJECT.client, icon: Users },
                            { label: 'Duration', value: PROJECT.duration, icon: Calendar },
                            { label: 'Type', value: PROJECT.type, icon: Briefcase },
                            { label: 'Status', value: PROJECT.status, icon: CheckCircle2 },
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 12, background: `${ACCENT}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                                    <Icon size={15} color={ACCENT} />
                                </div>
                                <div>
                                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.3)', fontFamily: 'Inter,sans-serif', marginBottom: 2 }}>{label}</p>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#EBD5AB', fontFamily: 'Inter,sans-serif', lineHeight: 1.4 }}>{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── MEDIA SECTION ────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    style={{ marginBottom: 32 }}
                >
                    {/* Toggle */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, padding: 4, background: 'rgba(235,213,171,0.04)', border: '1px solid rgba(235,213,171,0.08)', borderRadius: 16, width: 'fit-content' }}>
                        {[
                            { key: 'video', label: '▶ Demo Video', icon: Play },
                            { key: 'gallery', label: '⊞ Screenshots', icon: LayoutDashboard },
                        ].map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setActiveMedia(key)}
                                style={{
                                    padding: '8px 20px', borderRadius: 12, fontSize: 12,
                                    fontWeight: 700, fontFamily: 'Inter,sans-serif',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    background: activeMedia === key ? ACCENT : 'transparent',
                                    color: activeMedia === key ? '#1B211A' : 'rgba(235,213,171,0.5)',
                                    border: 'none',
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Media content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMedia}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeMedia === 'video' ? <VideoEmbed /> : <Gallery />}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* ── OVERVIEW + FEATURES ──────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}
                    className="freelance-detail-grid"
                >
                    {/* Overview */}
                    <div style={{ background: 'rgba(235,213,171,0.02)', border: '1px solid rgba(235,213,171,0.07)', borderRadius: 28, padding: 36 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 12, background: `${ACCENT}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BookOpen size={16} color={ACCENT} />
                            </div>
                            <h3 style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, fontFamily: 'Inter,sans-serif' }}>Project Overview</h3>
                        </div>
                        <p style={{ fontSize: 13.5, color: 'rgba(235,213,171,0.6)', lineHeight: 1.85, fontWeight: 300, fontFamily: 'Inter,sans-serif' }}>
                            {PROJECT.overview}
                        </p>
                    </div>

                    {/* Key Features */}
                    <div style={{ background: 'rgba(235,213,171,0.02)', border: '1px solid rgba(235,213,171,0.07)', borderRadius: 28, padding: 36 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 12, background: `${ACCENT}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Zap size={16} color={ACCENT} />
                            </div>
                            <h3 style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, fontFamily: 'Inter,sans-serif' }}>Key Features</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {PROJECT.keyFeatures.map(({ icon: Icon, text }) => (
                                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `${ACCENT}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                        <Icon size={13} color={ACCENT} />
                                    </div>
                                    <p style={{ fontSize: 13, color: 'rgba(235,213,171,0.65)', fontFamily: 'Inter,sans-serif', fontWeight: 400, lineHeight: 1.5 }}>{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── TECH STACK ───────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    style={{ background: 'rgba(235,213,171,0.02)', border: '1px solid rgba(235,213,171,0.07)', borderRadius: 28, padding: '28px 36px', marginBottom: 32 }}
                >
                    <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: `${ACCENT}80`, fontFamily: 'Inter,sans-serif', marginBottom: 18 }}>Technologies Used</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {PROJECT.tech.map(t => (
                            <span
                                key={t}
                                style={{
                                    padding: '7px 16px', borderRadius: 100,
                                    fontSize: 12, fontWeight: 700, fontFamily: 'Inter,sans-serif',
                                    background: `${ACCENT}10`,
                                    border: `1px solid ${ACCENT}30`,
                                    color: '#EBD5AB',
                                }}
                            >{t}</span>
                        ))}
                    </div>
                </motion.div>

                {/* ── ACTION LINKS ─────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                >
                    <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.35)', fontFamily: 'Inter,sans-serif', marginBottom: 16 }}>Links</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }} className="freelance-links-grid">
                        {PROJECT.links.map(({ label, icon: Icon, url, accent }) => (
                            <a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    gap: 12, padding: '24px 16px', borderRadius: 24, textDecoration: 'none',
                                    background: 'rgba(235,213,171,0.025)',
                                    border: `1px solid rgba(235,213,171,0.08)`,
                                    transition: 'all 0.25s', cursor: 'pointer',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = `${accent}12`;
                                    e.currentTarget.style.border = `1px solid ${accent}40`;
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(235,213,171,0.025)';
                                    e.currentTarget.style.border = '1px solid rgba(235,213,171,0.08)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={20} color={accent} />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: '#EBD5AB', fontFamily: 'Inter,sans-serif', marginBottom: 2 }}>{label}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: `${accent}80` }}>
                                        <ExternalLink size={10} />
                                        <span style={{ fontSize: 10, fontFamily: 'Inter,sans-serif', fontWeight: 500 }}>Open</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* Responsive grid CSS */}
            <style>{`
                @media (max-width: 768px) {
                    .freelance-hero-grid { grid-template-columns: 1fr !important; }
                    .freelance-detail-grid { grid-template-columns: 1fr !important; }
                    .freelance-links-grid { grid-template-columns: repeat(2,1fr) !important; }
                }
            `}</style>
        </div>
    );
}
