'use client';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
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

// ── Magnetic 3D tilt tab button with cursor-tracking spotlight ─────────────
function TabButton({ id, label, count, active, color, bg, onClick }) {
    const ref = useRef(null);
    const [hov, setHov] = useState(false);
    const [spot, setSpot] = useState({ x: 50, y: 50 });
    const on = active === id;
    const clr = color || A;

    // Raw mouse pos inside button (0-100 percent)
    const handleMove = useCallback((e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        setSpot({ x, y });
    }, []);

    // 3D tilt values
    const rotX = hov ? ((spot.y / 100) - 0.5) * -18 : 0;
    const rotY = hov ? ((spot.x / 100) - 0.5) * 26 : 0;

    return (
        <div style={{ perspective: '600px', display: 'inline-block' }}>
            <motion.button
                ref={ref}
                onClick={onClick}
                onMouseMove={handleMove}
                onHoverStart={() => setHov(true)}
                onHoverEnd={() => { setHov(false); setSpot({ x: 50, y: 50 }); }}
                whileTap={{ scale: 0.93 }}
                animate={{
                    rotateX: rotX,
                    rotateY: rotY,
                    scale: hov && !on ? 1.08 : 1,
                    y: hov && !on ? -4 : 0,
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                className={on ? 'tab-btn tab-btn--on' : 'tab-btn'}
                style={{
                    position: 'relative',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', borderRadius: 100,
                    border: `1px solid ${on ? clr + '70' : hov ? 'rgba(235,213,171,0.25)' : 'rgba(235,213,171,0.09)'}`,
                    background: on
                        ? `linear-gradient(135deg, ${clr}22 0%, ${clr}08 100%)`
                        : hov ? `radial-gradient(ellipse at ${spot.x}% ${spot.y}%, rgba(139,174,102,0.1) 0%, rgba(8,14,8,0.6) 60%)` : 'rgba(8,14,8,0.55)',
                    color: on ? clr : hov ? 'rgba(235,213,171,0.85)' : 'rgba(235,213,171,0.35)',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', cursor: on ? 'default' : 'pointer',
                    backdropFilter: 'blur(12px)',
                    boxShadow: on
                        ? `0 0 0 1px ${clr}30, 0 8px 32px ${clr}18, inset 0 1px 0 ${clr}18`
                        : hov ? `0 8px 28px rgba(0,0,0,0.45), 0 0 0 1px rgba(235,213,171,0.15)` : '0 2px 8px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                    transition: 'color 0.2s, border-color 0.2s, background 0.18s, box-shadow 0.2s',
                }}
            >
                {/* ── Cursor spotlight inside button ── */}
                {hov && !on && (
                    <div style={{
                        position: 'absolute',
                        width: 90, height: 90,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${clr}30 0%, transparent 70%)`,
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                        transition: 'left 0.06s linear, top 0.06s linear',
                    }} />
                )}

                {/* ── Active tab shimmer sweep ── */}
                {on && (
                    <motion.div
                        initial={{ x: '-130%' }}
                        animate={{ x: '230%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', top: 0, bottom: 0, left: 0, width: '45%',
                            background: `linear-gradient(90deg, transparent, ${clr}30, transparent)`,
                            pointerEvents: 'none',
                        }}
                    />
                )}

                {/* ── Active pulsing outer ring ── */}
                {on && (
                    <motion.div
                        animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.18, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', inset: -3,
                            borderRadius: 100,
                            border: `1px solid ${clr}55`,
                            pointerEvents: 'none',
                        }}
                    />
                )}

                {/* Glowing dot on active */}
                {on && (
                    <motion.div layoutId="tab-live-dot"
                        style={{ width: 6, height: 6, borderRadius: '50%', background: clr, flexShrink: 0, boxShadow: `0 0 8px ${clr}, 0 0 20px ${clr}80` }}
                    />
                )}

                <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>

                <span style={{
                    fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 100,
                    background: on ? `${clr}28` : hov ? 'rgba(235,213,171,0.1)' : 'rgba(235,213,171,0.06)',
                    color: on ? clr : hov ? 'rgba(235,213,171,0.7)' : 'rgba(235,213,171,0.22)',
                    border: on ? `1px solid ${clr}35` : '1px solid transparent',
                    transition: 'all 0.2s',
                    position: 'relative', zIndex: 1,
                }}>
                    {count}
                </span>
            </motion.button>
        </div>
    );
}

function getEmbed(url) {
    if (!url) return null;
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([-\w]+)/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1`;
    const gd = url.match(/drive\.google\.com\/file\/d\/([-\w]+)/);
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
            className="modal-backdrop"
            style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(4,8,4,0.95)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>

            <motion.div initial={{ opacity: 0, scale: 0.88, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                onClick={e => e.stopPropagation()}
                className="modal-inner"
                style={{ width: '100%', maxWidth: '96vw', height: '92vh', borderRadius: 28, background: 'rgba(14,22,14,0.99)', border: '1px solid rgba(139,174,102,0.18)', boxShadow: '0 60px 160px rgba(0,0,0,0.9), 0 0 0 1px rgba(139,174,102,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

                {/* Top accent bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, transparent 0%, ${col.color} 40%, ${col.color} 60%, transparent 100%)`, flexShrink: 0 }} />

                {/* Header bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid rgba(235,213,171,0.06)', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: col.color, padding: '4px 12px', borderRadius: 100, background: col.bg, border: `1px solid ${col.border}`, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{project.category}</span>
                        {project.badge && <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(235,213,171,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.badge}</span>}
                    </div>
                    <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(235,213,171,0.06)', border: '1px solid rgba(235,213,171,0.12)', color: C, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', flexShrink: 0 }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(235,213,171,0.12)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(235,213,171,0.06)'}><X size={16} /></button>
                </div>

                {/* Main body */}
                <div className="modal-body" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                    {/* LEFT / TOP — media */}
                    <div className="modal-media" style={{ flex: '0 0 62%', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(235,213,171,0.06)', background: '#080e08', overflow: 'hidden' }}>

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
                                                <button onClick={e => { e.stopPropagation(); setTab(t => (t - 1 + imgs.length) % imgs.length); }} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: `1px solid rgba(139,174,102,0.3)`, color: A, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', zIndex: 10 }}><ChevronLeft size={16} /></button>
                                                <button onClick={e => { e.stopPropagation(); setTab(t => (t + 1) % imgs.length); }} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: `1px solid rgba(139,174,102,0.3)`, color: A, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', zIndex: 10 }}><ChevronRight size={16} /></button>
                                            </>
                                        )}
                                    </motion.div>
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: 'rgba(235,213,171,0.12)' }}>
                                        <Code2 size={48} /><p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Open Source Contribution</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {(embedUrl || imgs.length > 0) && (
                            <div style={{ display: 'flex', gap: 8, padding: '8px 12px', background: '#060c06', borderTop: '1px solid rgba(235,213,171,0.05)', flexShrink: 0, overflowX: 'auto' }}>
                                {embedUrl && (
                                    <button onClick={() => setTab('video')}
                                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 10, flexShrink: 0, border: `1.5px solid ${tab === 'video' ? A : 'rgba(235,213,171,0.08)'}`, background: tab === 'video' ? 'rgba(139,174,102,0.12)' : 'transparent', color: tab === 'video' ? A : 'rgba(235,213,171,0.3)', fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <Play size={11} fill={tab === 'video' ? A : 'none'} />Video
                                    </button>
                                )}
                                {imgs.map((src, i) => (
                                    <button key={i} onClick={() => setTab(i)}
                                        style={{ width: 56, height: 40, borderRadius: 10, overflow: 'hidden', border: `2px solid ${tab === i ? A : 'rgba(235,213,171,0.06)'}`, flexShrink: 0, padding: 0, cursor: 'pointer', opacity: tab === i ? 1 : 0.45, transition: 'all 0.2s', background: '#060c06' }}>
                                        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT / BOTTOM — details */}
                    <div className="modal-details" style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <h2 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 900, color: C, letterSpacing: '-0.03em', marginBottom: 6, fontFamily: 'Inter, sans-serif', lineHeight: 1.15 }}>{project.title}</h2>
                            <p style={{ fontSize: 12, color: A, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em' }}>{project.tagline}</p>
                        </div>

                        <div>
                            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.22)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Overview</p>
                            <p style={{ fontSize: 14, color: 'rgba(235,213,171,0.58)', lineHeight: 1.82, fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>{project.description}</p>
                        </div>

                        {project.features?.length > 0 && (
                            <div>
                                <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.22)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Key Features</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                                    {project.features.map((f, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'rgba(235,213,171,0.6)', fontFamily: 'Inter, sans-serif', lineHeight: 1.55 }}>
                                            <span style={{ color: A, flexShrink: 0, marginTop: 2 }}>▸</span>{f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div>
                            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.22)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Technologies</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {project.technologies.map(t => (
                                    <span key={t} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: A, padding: '6px 13px', borderRadius: 100, background: 'rgba(139,174,102,0.08)', border: '1px solid rgba(139,174,102,0.2)', fontFamily: 'Inter, sans-serif' }}>{t}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.22)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Links</p>
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
function ProjectCard({ project, index, onClick, featured = false }) {
    const col = CAT[project.category] || CAT['Full Stack'];
    const [hov, setHov] = useState(false);
    const hasVideo = project.links.some(l => l.type === 'video');
    const num = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHov(true)}
            onHoverEnd={() => setHov(false)}
            onClick={() => onClick(project)}
            className={featured ? 'proj-card proj-card--featured' : 'proj-card'}
            style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer',
                height: featured ? 420 : 340,
                background: '#080e08',
                boxShadow: hov
                    ? `0 30px 80px rgba(0,0,0,0.65), 0 0 0 1.5px ${col.color}55, 0 0 60px ${col.color}18`
                    : '0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(235,213,171,0.05)',
                transform: hov ? 'translateY(-6px) scale(1.008)' : 'translateY(0) scale(1)',
                transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s cubic-bezier(0.22,1,0.36,1)',
            }}
        >
            {/* ── Full-bleed image ── */}
            <div style={{ position: 'absolute', inset: 0 }}>
                {project.images?.[0] ? (
                    <img
                        src={project.images[0]}
                        alt={project.title}
                        style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover', objectPosition: 'top',
                            display: 'block',
                            transform: hov ? 'scale(1.06)' : 'scale(1)',
                            filter: hov ? 'brightness(0.22) saturate(0.6)' : 'brightness(0.88) saturate(0.95)',
                            transition: 'transform 0.65s cubic-bezier(0.22,1,0.36,1), filter 0.45s ease',
                        }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${col.bg} 0%, rgba(8,14,8,0.9) 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Code2 size={48} color={col.color} style={{ opacity: 0.2 }} />
                    </div>
                )}
                {/* Dark gradient — just enough so text is readable */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,8,4,0.82) 0%, rgba(4,8,4,0.28) 40%, rgba(4,8,4,0.0) 72%)' }} />
            </div>

            {/* ── Giant project number watermark ── */}
            <div style={{
                position: 'absolute', top: -10, right: 12,
                fontSize: featured ? 130 : 110,
                fontWeight: 900,
                fontFamily: '"Inter", sans-serif',
                letterSpacing: '-0.06em',
                lineHeight: 1,
                color: col.color,
                opacity: hov ? 0.06 : 0.035,
                userSelect: 'none',
                pointerEvents: 'none',
                transition: 'opacity 0.4s',
                zIndex: 1,
            }}>
                {num}
            </div>

            {/* ── Top badges ── */}
            <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 4 }}>
                <span style={{
                    fontSize: 8, fontWeight: 800, letterSpacing: '0.32em', textTransform: 'uppercase',
                    color: col.color, padding: '5px 13px', borderRadius: 100,
                    background: 'rgba(4,8,4,0.8)',
                    border: `1px solid ${col.color}50`,
                    backdropFilter: 'blur(12px)',
                    fontFamily: 'Inter, sans-serif',
                }}>
                    {project.category}
                </span>
                {hasVideo && (
                    <span style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        fontSize: 8, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                        color: C, padding: '5px 11px', borderRadius: 100,
                        background: 'rgba(4,8,4,0.8)',
                        border: '1px solid rgba(235,213,171,0.15)',
                        backdropFilter: 'blur(12px)',
                        fontFamily: 'Inter, sans-serif',
                    }}>
                        <Play size={8} fill={C} />Demo
                    </span>
                )}
            </div>

            {/* ── Always-visible minimal info at bottom ── */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '0 22px 20px',
                zIndex: 3,
                opacity: hov ? 0 : 1,
                transition: 'opacity 0.22s ease',
                pointerEvents: 'none',
            }}>
                <h3 style={{
                    fontSize: featured ? 22 : 17,
                    fontWeight: 800, color: C,
                    letterSpacing: '-0.025em',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.2,
                    marginBottom: 4,
                    textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                }}>
                    {project.title}
                </h3>
                <p style={{ fontSize: 11, color: A, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', opacity: 0.8 }}>
                    {project.tagline}
                </p>
            </div>

            {/* ── Glass reveal panel — slides up on hover ── */}
            <motion.div
                animate={{ y: hov ? 0 : '100%', opacity: hov ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '22px 22px 20px',
                    background: 'rgba(6,12,6,0.94)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    borderTop: `1px solid ${col.color}28`,
                    zIndex: 5,
                }}
            >
                {/* Accent line */}
                <div style={{ height: 2, background: `linear-gradient(90deg, ${col.color}, transparent)`, marginBottom: 13, borderRadius: 2, width: '50%' }} />

                <h3 style={{ fontSize: featured ? 19 : 15, fontWeight: 900, color: C, letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif', marginBottom: 4, lineHeight: 1.2 }}>
                    {project.title}
                </h3>
                <p style={{ fontSize: 11, color: 'rgba(235,213,171,0.5)', fontFamily: 'Inter, sans-serif', marginBottom: 13, lineHeight: 1.5, fontWeight: 300 }}>
                    {project.tagline}
                </p>

                {/* Tech pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                    {project.technologies.slice(0, featured ? 5 : 4).map(t => (
                        <span key={t} style={{
                            fontSize: 8.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                            color: col.color, padding: '3px 9px', borderRadius: 100,
                            background: col.bg, border: `1px solid ${col.color}30`,
                            fontFamily: 'Inter, sans-serif',
                        }}>{t}</span>
                    ))}
                </div>

                {/* CTA row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                        fontSize: 9.5, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: col.color, fontFamily: 'Inter, sans-serif',
                        display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        {hasVideo ? <><Play size={10} fill={col.color} />Watch Demo</> : <><ExternalLink size={10} />Open Project</>}
                    </span>
                    {project.badge && (
                        <span style={{ fontSize: 9, color: 'rgba(235,213,171,0.3)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                            {project.badge}
                        </span>
                    )}
                </div>
            </motion.div>

            {/* ── Colored glow border on hover ── */}
            <div style={{
                position: 'absolute', inset: 0,
                borderRadius: 20,
                pointerEvents: 'none',
                opacity: hov ? 1 : 0,
                transition: 'opacity 0.4s',
                boxShadow: `inset 0 0 0 1.5px ${col.color}55`,
                zIndex: 6,
            }} />
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
        <div style={{ minHeight: '100vh', paddingBottom: 140, position: 'relative', overflow: 'hidden' }}>
            {/* Ambient orbs */}
            <div style={{ position: 'fixed', top: '-5%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'rgba(139,174,102,0.04)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '8%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(139,174,102,0.03)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', paddingTop: 12, marginBottom: 64 }}
                >
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.55em', textTransform: 'uppercase', color: A, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
                        What I've Built
                    </motion.p>
                    <h1 style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 900, letterSpacing: '-0.045em', color: C, lineHeight: 1.0, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
                        Selected{' '}
                        <em style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', color: A }}>Works</em>.
                    </h1>
                    <p style={{ fontSize: 15, color: 'rgba(235,213,171,0.42)', maxWidth: 480, margin: '0 auto', lineHeight: 1.82, fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>
                        Full stack apps, hackathon builds, open‑source contributions, Figma designs, and web experiments — {PROJECTS.length} projects total.
                    </p>
                </motion.div>

                {/* ── Filter Tabs ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 60 }}
                >
                    {TABS.map(({ id, label }) => {
                        const c = CAT[id];
                        return (
                            <TabButton
                                key={id}
                                id={id}
                                label={label}
                                count={counts[id] || 0}
                                active={active}
                                color={c?.color}
                                bg={c?.bg}
                                onClick={() => setActive(id)}
                            />
                        );
                    })}
                </motion.div>

                {/* ── Project Grid ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.28 }}
                        className="proj-grid-wrap"
                    >
                        {filtered.map((p, i) => (
                            <ProjectCard
                                key={p.id}
                                project={p}
                                index={i}
                                onClick={setSelected}
                                featured={i === 0}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <motion.p
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    style={{ textAlign: 'center', color: 'rgba(235,213,171,0.14)', fontSize: 10, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 56, fontFamily: 'Inter, sans-serif' }}
                >
                    {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                </motion.p>
            </div>

            <AnimatePresence>{selected && <Modal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>

            <style>{`
        /* ── Filter tab hover — CSS handles colour, framer handles transform ── */
        .tab-btn { transition: color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s; }
        .tab-btn:not(.tab-btn--on):hover {
          color: rgba(235,213,171,0.75) !important;
          border-color: rgba(235,213,171,0.22) !important;
          background: rgba(139,174,102,0.07) !important;
          box-shadow: 0 4px 18px rgba(0,0,0,0.35) !important;
        }
        .tab-btn--on { cursor: default; }

        /* ── Project grid ── */
        .proj-grid-wrap {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        /* First card spans 2 columns — featured */
        .proj-grid-wrap > div:first-child {
          grid-column: span 2;
        }

        @media (max-width: 1024px) {
          .proj-grid-wrap { grid-template-columns: repeat(2, 1fr); }
          .proj-grid-wrap > div:first-child { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .proj-grid-wrap { grid-template-columns: 1fr; gap: 14px; }
          .proj-grid-wrap > div:first-child { grid-column: span 1; }
          .proj-card--featured { height: 300px !important; }
          .proj-card { height: 270px !important; }
        }

        /* ── Modal mobile ── */
        @media (max-width: 768px) {
          .modal-backdrop { padding: 0 !important; align-items: flex-end !important; }
          .modal-inner {
            max-width: 100% !important; width: 100% !important;
            height: 90vh !important; border-radius: 20px 20px 0 0 !important;
            overflow-y: auto !important; overflow-x: hidden !important;
            margin-top: 60px !important;
          }
          .modal-body { flex-direction: column !important; overflow: visible !important; flex: 0 0 auto !important; }
          .modal-media {
            flex: 0 0 auto !important; width: 100% !important;
            height: 70vw !important; min-height: 280px !important; max-height: 400px !important;
            border-right: none !important; border-bottom: 1px solid rgba(235,213,171,0.08) !important;
          }
          .modal-details { flex: 0 0 auto !important; overflow-y: visible !important; padding: 20px 18px 48px !important; gap: 18px !important; }
        }
        @media (max-width: 480px) {
          .modal-inner { height: 92vh !important; margin-top: 80px !important; }
          .modal-media { height: 85vw !important; min-height: 320px !important; max-height: 480px !important; }
        }
      `}</style>
        </div>
    );
}
