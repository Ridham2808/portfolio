'use client';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Play, X, ChevronLeft, ChevronRight, GitPullRequest, AlertCircle, FileText, Code2, Figma as FigmaIcon } from 'lucide-react';
import { PROJECTS, TABS } from './data';

const A = '#8BAE66', C = '#EBD5AB', BG = '#1B211A';

const CAT = {
    'Full Stack': { color: '#8BAE66', bg: 'rgba(139,174,102,0.12)', border: 'rgba(139,174,102,0.35)' },
    'Hackathon': { color: '#FBB724', bg: 'rgba(251,183,36,0.12)', border: 'rgba(251,183,36,0.35)' },
    'Open Source': { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)' },
    'Figma / UI Design': { color: '#F472B6', bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.35)' },
    'HTML & CSS': { color: '#FB923C', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.35)' },
};

// Extract YouTube embed URL
function getEmbed(url) {
    if (!url) return null;
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1`;
    const gd = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (gd) return `https://drive.google.com/file/d/${gd[1]}/preview`;
    return null;
}

// ── Modal ─────────────────────────────────────────────────────────────
function Modal({ project, onClose }) {
    const [tab, setTab] = useState('video');
    const col = CAT[project.category] || CAT['Full Stack'];
    const videoLink = project.links.find(l => l.type === 'video');
    const embedUrl = videoLink ? getEmbed(videoLink.url) : null;
    const imgs = project.images || [];
    const nonVideoLinks = project.links.filter(l => l.type !== 'video');

    useEffect(() => {
        const esc = e => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', esc);
        document.body.style.overflow = 'hidden';
        return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
    }, [onClose]);

    useEffect(() => { if (!embedUrl && imgs.length) setTab(0); }, []);

    const LinkBtn = ({ link }) => {
        const icons = { github: Github, live: ExternalLink, docs: FileText, pr: GitPullRequest, issue: AlertCircle, figma: FigmaIcon };
        const Icon = icons[link.type] || ExternalLink;
        const isPrimary = link.type === 'live';
        return (
            <a href={link.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 100, fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer', flexShrink: 0, background: isPrimary ? A : 'rgba(139,174,102,0.07)', color: isPrimary ? BG : A, border: `1px solid ${isPrimary ? 'transparent' : 'rgba(139,174,102,0.25)'}` }}
                onMouseEnter={e => { if (!isPrimary) { e.currentTarget.style.background = 'rgba(139,174,102,0.15)'; e.currentTarget.style.borderColor = A; } }}
                onMouseLeave={e => { if (!isPrimary) { e.currentTarget.style.background = 'rgba(139,174,102,0.07)'; e.currentTarget.style.borderColor = 'rgba(139,174,102,0.25)'; } }}
            ><Icon size={14} />{link.label}</a>
        );
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(4,8,4,0.95)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>

            <motion.div initial={{ opacity: 0, scale: 0.88, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                onClick={e => e.stopPropagation()}
                style={{ width: '100%', maxWidth: '96vw', height: '92vh', borderRadius: 28, background: 'rgba(14,22,14,0.99)', border: '1px solid rgba(139,174,102,0.18)', boxShadow: '0 60px 160px rgba(0,0,0,0.9), 0 0 0 1px rgba(139,174,102,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

                {/* Top accent bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, transparent 0%, ${col.color} 40%, ${col.color} 60%, transparent 100%)`, flexShrink: 0 }} />

                {/* Header bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid rgba(235,213,171,0.06)', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: col.color, padding: '4px 12px', borderRadius: 100, background: col.bg, border: `1px solid ${col.border}`, fontFamily: 'Inter, sans-serif' }}>{project.category}</span>
                        {project.badge && <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(235,213,171,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{project.badge}</span>}
                    </div>
                    <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(235,213,171,0.06)', border: '1px solid rgba(235,213,171,0.12)', color: C, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(235,213,171,0.12)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(235,213,171,0.06)'}><X size={16} /></button>
                </div>

                {/* Main — splits horizontally */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                    {/* LEFT — large media */}
                    <div style={{ flex: '0 0 62%', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(235,213,171,0.06)', background: '#080e08', overflow: 'hidden' }}>

                        {/* Big media area */}
                        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
                            <AnimatePresence mode="wait">
                                {tab === 'video' && embedUrl ? (
                                    <motion.div key="vid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: '100%', height: '100%' }}>
                                        <iframe src={embedUrl} width="100%" height="100%" style={{ border: 'none', display: 'block' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen title={project.title} />
                                    </motion.div>
                                ) : typeof tab === 'number' && imgs[tab] ? (
                                    <motion.div key={`img${tab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} style={{ width: '100%', height: '100%', position: 'relative' }}>
                                        <img src={imgs[tab]} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', background: '#060c06' }} />
                                        {imgs.length > 1 && (
                                            <>
                                                <button onClick={e => { e.stopPropagation(); setTab(t => (t - 1 + imgs.length) % imgs.length); }} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: `1px solid rgba(139,174,102,0.3)`, color: A, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}><ChevronLeft size={18} /></button>
                                                <button onClick={e => { e.stopPropagation(); setTab(t => (t + 1) % imgs.length); }} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: `1px solid rgba(139,174,102,0.3)`, color: A, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}><ChevronRight size={18} /></button>
                                            </>
                                        )}
                                    </motion.div>
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: 'rgba(235,213,171,0.12)' }}>
                                        <Code2 size={52} /><p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Open Source Contribution</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Thumbnail strip */}
                        {(embedUrl || imgs.length > 0) && (
                            <div style={{ display: 'flex', gap: 8, padding: '10px 14px', background: '#060c06', borderTop: '1px solid rgba(235,213,171,0.05)', flexShrink: 0, overflowX: 'auto' }}>
                                {embedUrl && (
                                    <button onClick={() => setTab('video')}
                                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 10, flexShrink: 0, border: `1.5px solid ${tab === 'video' ? A : 'rgba(235,213,171,0.08)'}`, background: tab === 'video' ? 'rgba(139,174,102,0.12)' : 'transparent', color: tab === 'video' ? A : 'rgba(235,213,171,0.3)', fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <Play size={11} fill={tab === 'video' ? A : 'none'} />Video
                                    </button>
                                )}
                                {imgs.map((src, i) => (
                                    <button key={i} onClick={() => setTab(i)}
                                        style={{ width: 64, height: 44, borderRadius: 10, overflow: 'hidden', border: `2px solid ${tab === i ? A : 'rgba(235,213,171,0.06)'}`, flexShrink: 0, padding: 0, cursor: 'pointer', opacity: tab === i ? 1 : 0.45, transition: 'all 0.2s', background: '#060c06' }}>
                                        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT — details */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {/* Title */}
                        <div>
                            <h2 style={{ fontSize: 28, fontWeight: 900, color: C, letterSpacing: '-0.03em', marginBottom: 6, fontFamily: 'Inter, sans-serif', lineHeight: 1.15 }}>{project.title}</h2>
                            <p style={{ fontSize: 12, color: A, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>{project.tagline}</p>
                        </div>

                        {/* Overview */}
                        <div>
                            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.22)', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Overview</p>
                            <p style={{ fontSize: 14, color: 'rgba(235,213,171,0.58)', lineHeight: 1.82, fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>{project.description}</p>
                        </div>

                        {/* Key Features */}
                        {project.features?.length > 0 && (
                            <div>
                                <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.22)', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Key Features</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {project.features.map((f, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'rgba(235,213,171,0.6)', fontFamily: 'Inter, sans-serif', lineHeight: 1.55 }}>
                                            <span style={{ color: A, flexShrink: 0, marginTop: 2 }}>▸</span>{f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tech */}
                        <div>
                            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.22)', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Technologies</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {project.technologies.map(t => (
                                    <span key={t} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: A, padding: '6px 13px', borderRadius: 100, background: 'rgba(139,174,102,0.08)', border: '1px solid rgba(139,174,102,0.2)', fontFamily: 'Inter, sans-serif' }}>{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.22)', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Links</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {nonVideoLinks.map(l => <LinkBtn key={l.type + l.url} link={l} />)}
                                {videoLink && <LinkBtn link={{ ...videoLink, label: 'Watch Demo' }} />}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Project Card ──────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }) {
    const col = CAT[project.category] || CAT['Full Stack'];
    const [hov, setHov] = useState(false);
    const hasVideo = project.links.some(l => l.type === 'video');

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            onHoverStart={() => setHov(true)}
            onHoverEnd={() => setHov(false)}
            onClick={() => onClick(project)}
            style={{ borderRadius: 22, overflow: 'hidden', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', background: 'rgba(16,24,16,0.8)', border: `1px solid ${hov ? col.border : 'rgba(235,213,171,0.06)'}`, transform: hov ? 'translateY(-10px) scale(1.01)' : 'translateY(0) scale(1)', transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s, box-shadow 0.4s', boxShadow: hov ? `0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px ${col.border}` : '0 4px 20px rgba(0,0,0,0.2)' }}>

            {/* Image */}
            <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative', background: '#0a100a' }}>
                {project.images?.[0] ? (
                    <img src={project.images[0]} alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transform: hov ? 'scale(1.08)' : 'scale(1)', filter: hov ? 'brightness(0.45)' : 'brightness(0.85) saturate(0.9)', transition: 'transform 0.6s ease, filter 0.4s' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(139,174,102,0.04) 0%, transparent 100%)' }}>
                        <Code2 size={36} color="rgba(139,174,102,0.18)" />
                    </div>
                )}

                {/* Hover CTA */}
                <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.25 }}
                    style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, pointerEvents: hov ? 'auto' : 'none' }}>
                    <motion.div animate={{ scale: hov ? 1 : 0.7, y: hov ? 0 : 12 }} transition={{ duration: 0.3, ease: 'backOut' }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: A, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${A}60` }}>
                            {hasVideo ? <Play size={22} color={BG} fill={BG} /> : <ExternalLink size={20} color={BG} />}
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C, fontFamily: 'Inter, sans-serif', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>View Project</span>
                        {hasVideo && <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: A, fontFamily: 'Inter, sans-serif' }}>▶ Includes Demo Video</span>}
                    </motion.div>
                </motion.div>

                {/* Category pill */}
                <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 8, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: col.color, padding: '4px 11px', borderRadius: 100, background: 'rgba(10,14,10,0.85)', border: `1px solid ${col.border}`, backdropFilter: 'blur(8px)', fontFamily: 'Inter, sans-serif' }}>{project.category}</div>

                {/* Video badge */}
                {hasVideo && !hov && (
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, fontSize: 8, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: C, padding: '4px 10px', borderRadius: 100, background: 'rgba(10,14,10,0.85)', border: '1px solid rgba(235,213,171,0.12)', backdropFilter: 'blur(8px)', fontFamily: 'Inter, sans-serif' }}>
                        <Play size={8} fill={C} />Demo
                    </div>
                )}

                {/* Gradient bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top, rgba(14,20,14,0.9), transparent)' }} />
            </div>

            {/* Content */}
            <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                    <h3 style={{ fontSize: 15.5, fontWeight: 800, color: C, letterSpacing: '-0.01em', fontFamily: 'Inter, sans-serif', lineHeight: 1.3, marginBottom: 3 }}>{project.title}</h3>
                    {project.badge && <p style={{ fontSize: 9, fontWeight: 700, color: col.color, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{project.badge}</p>}
                </div>
                <p style={{ fontSize: 12, color: 'rgba(235,213,171,0.42)', lineHeight: 1.7, fontWeight: 300, fontFamily: 'Inter, sans-serif', flex: 1 }}>{(project.description || '').slice(0, 100)}…</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
                    {project.technologies.slice(0, 4).map(t => (
                        <span key={t} style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(139,174,102,0.7)', padding: '3px 9px', borderRadius: 100, background: 'rgba(139,174,102,0.07)', border: '1px solid rgba(139,174,102,0.14)', fontFamily: 'Inter, sans-serif' }}>{t}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ProjectsPage() {
    const [active, setActive] = useState('All');
    const [selected, setSelected] = useState(null);

    const counts = useMemo(() => {
        const c = { All: PROJECTS.length };
        PROJECTS.forEach(p => { c[p.category] = (c[p.category] || 0) + 1; });
        return c;
    }, []);

    const filtered = useMemo(() => active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active), [active]);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: 120, position: 'relative', overflow: 'hidden' }}>
            {/* Ambient orbs */}
            <div style={{ position: 'fixed', top: '-5%', right: '-8%', width: 450, height: 450, borderRadius: '50%', background: 'rgba(139,174,102,0.045)', filter: 'blur(110px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '10%', left: '-6%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(139,174,102,0.03)', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', paddingTop: 12, marginBottom: 60 }}>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.55em', textTransform: 'uppercase', color: A, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>What I've Built</motion.p>
                    <h1 style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 900, letterSpacing: '-0.045em', color: C, lineHeight: 1.0, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
                        Selected{' '}
                        <em style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', color: A }}>Works</em>.
                    </h1>
                    <p style={{ fontSize: 15, color: 'rgba(235,213,171,0.42)', maxWidth: 480, margin: '0 auto', lineHeight: 1.82, fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>
                        Full stack apps, hackathon builds, open‑source contributions, Figma designs, and web experiments — {PROJECTS.length} projects total.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 56 }}>
                    {TABS.map(({ id, label }) => {
                        const c = CAT[id];
                        const on = active === id;
                        return (
                            <motion.button key={id} onClick={() => setActive(id)} whileTap={{ scale: 0.94 }}
                                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 100, border: `1px solid ${on ? (c?.border || 'rgba(139,174,102,0.35)') : 'rgba(235,213,171,0.08)'}`, background: on ? (c?.bg || 'rgba(139,174,102,0.12)') : 'transparent', color: on ? (c?.color || A) : 'rgba(235,213,171,0.38)', fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'all 0.25s' }}>
                                {label}
                                <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 7px', borderRadius: 100, background: on ? (c?.border || A) : 'rgba(235,213,171,0.06)', color: on ? (c?.color || A) : 'rgba(235,213,171,0.28)' }}>{counts[id] || 0}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }} className="proj-grid">
                        {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onClick={setSelected} />)}
                    </motion.div>
                </AnimatePresence>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    style={{ textAlign: 'center', color: 'rgba(235,213,171,0.18)', fontSize: 10, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 52, fontFamily: 'Inter, sans-serif' }}>
                    {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                </motion.p>
            </div>

            <AnimatePresence>{selected && <Modal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>

            <style>{`
        @media (max-width: 960px) { .proj-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 540px) { .proj-grid { grid-template-columns: 1fr !important; gap: 14px !important; } }
      `}</style>
        </div>
    );
}
