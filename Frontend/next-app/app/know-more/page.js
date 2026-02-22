'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, X, ZoomIn,
} from 'lucide-react';

// ─── Photo Gallery Data ────────────────────────────────────────────
const GALLERIES = [
    {
        id: 'gym',
        label: 'Gym',
        emoji: '🏋️',
        color: '#8BAE66',
        glow: 'rgba(139,174,102,0.15)',
        caption: 'Iron never lies.',
        photos: [
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737666/Gym_1_h8suyt.jpg',
                title: 'Grind Mode',
                sub: 'Where discipline is built, not born.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737666/Gym_2_ccao8t.jpg',
                title: 'Stay Locked In',
                sub: 'The only bad workout is the one you skipped.',
            },
        ],
    },
    {
        id: 'run',
        label: 'Running',
        emoji: '🏃',
        color: '#9FBF6A',
        glow: 'rgba(159,191,106,0.13)',
        caption: 'Miles build character.',
        photos: [
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737697/Run_1_xgu8oi.jpg',
                title: 'Early Morning Miles',
                sub: 'Running clears the mind before the screen does.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737697/Run_2_suk6yi.jpg',
                title: 'Pace & Purpose',
                sub: 'Every km is a conversation with yourself.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737709/Run_3_e5gvez.jpg',
                title: 'Keep Running',
                sub: 'Best pace: 5:26/km — counting.',
            },
        ],
    },
    {
        id: 'navratri',
        label: 'Navratri',
        emoji: '🎉',
        color: '#D4A853',
        glow: 'rgba(212,168,83,0.12)',
        caption: 'Festivals are just vibes.',
        photos: [
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737666/Navratri_v6poy6.jpg',
                title: 'Garba Night',
                sub: 'Nine nights of pure energy.',
            },
        ],
    },
    {
        id: 'cricket',
        label: 'Cricket',
        emoji: '🏏',
        color: '#8BAE66',
        glow: 'rgba(139,174,102,0.12)',
        caption: 'Cricket is religion.',
        photos: [
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737664/Cricket_xorres.jpg',
                title: 'All-Rounder On Field',
                sub: 'Favourite idol: Virat Kohli. Role: All-rounder.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771741067/Cricket_2_qxnsjk.jpg',
                title: 'On The Ground',
                sub: 'Where every match is a lesson in composure.',
            },
        ],
    },
    {
        id: 'code',
        label: 'Coding',
        emoji: '💻',
        color: '#7BA85A',
        glow: 'rgba(123,168,90,0.12)',
        caption: 'In the zone.',
        photos: [
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737664/code_1_fdthv3.jpg',
                title: 'Deep Work',
                sub: 'When the code flows, time disappears.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737664/code_2_ehxpnw.jpg',
                title: 'Build Mode',
                sub: 'Every problem has an elegant solution.',
            },
        ],
    },
    {
        id: 'personal',
        label: 'Moments',
        emoji: '📸',
        color: '#A8C070',
        glow: 'rgba(168,192,112,0.12)',
        caption: 'Life outside the screen.',
        photos: [
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737666/personal_photo_cgmpnu.jpg',
                title: 'Just Me',
                sub: 'Gym rat. Dev. Always learning.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771738063/personal_photo_2_peom3z.jpg',
                title: 'Living It',
                sub: 'Code by day, vibes by night.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737666/Regular_1_g9hf7a.jpg',
                title: 'Regular Day',
                sub: 'The ordinary moments are the best story.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737667/Regular_2_lvw7fd.jpg',
                title: 'Candid',
                sub: 'Real life, unfiltered.',
            },
            {
                url: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1771737668/Regular_3_fzwc2o.jpg',
                title: 'Good Times',
                sub: 'Every day is a new rep.',
            },
        ],
    },
];



// ─── Lightbox ──────────────────────────────────────────────────────
function Lightbox({ photo, onClose, onPrev, onNext }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 9000,
                    background: 'rgba(6,9,6,0.92)',
                    backdropFilter: 'blur(16px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: 24, right: 24,
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'rgba(235,213,171,0.08)',
                        border: '1px solid rgba(235,213,171,0.12)',
                        color: '#EBD5AB', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer', zIndex: 10,
                    }}
                >
                    <X size={18} />
                </button>

                {/* Prev */}
                {onPrev && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        style={{
                            position: 'absolute', left: 24, top: '50%',
                            transform: 'translateY(-50%)',
                            width: 48, height: 48, borderRadius: '50%',
                            background: 'rgba(27,33,26,0.85)',
                            border: '1px solid rgba(139,174,102,0.2)',
                            color: '#EBD5AB', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer',
                        }}
                    >
                        <ChevronLeft size={22} />
                    </button>
                )}

                {/* Next */}
                {onNext && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        style={{
                            position: 'absolute', right: 24, top: '50%',
                            transform: 'translateY(-50%)',
                            width: 48, height: 48, borderRadius: '50%',
                            background: 'rgba(27,33,26,0.85)',
                            border: '1px solid rgba(139,174,102,0.2)',
                            color: '#EBD5AB', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer',
                        }}
                    >
                        <ChevronRight size={22} />
                    </button>
                )}

                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ textAlign: 'center', maxWidth: '85vw', maxHeight: '85vh' }}
                >
                    <img
                        src={photo.url}
                        alt={photo.title}
                        style={{
                            maxWidth: '80vw', maxHeight: '70vh',
                            borderRadius: 20,
                            boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,174,102,0.12)',
                            objectFit: 'contain',
                        }}
                    />
                    <p style={{
                        marginTop: 16, fontSize: 16, fontWeight: 700,
                        color: '#EBD5AB', fontFamily: 'Inter, sans-serif',
                    }}>{photo.title}</p>
                    <p style={{
                        marginTop: 6, fontSize: 13, color: 'rgba(235,213,171,0.45)',
                        fontFamily: 'Inter, sans-serif', fontWeight: 300,
                    }}>{photo.sub}</p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ─── Single Photo Card — Unique Flip + Spotlight Hover ─────────────
function PhotoCard({ photo, idx, onOpen, accentColor }) {
    const [hovered, setHovered] = useState(false);
    const [spotX, setSpotX] = useState(50);
    const [spotY, setSpotY] = useState(50);
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        setSpotX(((e.clientX - rect.left) / rect.width) * 100);
        setSpotY(((e.clientY - rect.top) / rect.height) * 100);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, rotate: idx % 2 === 0 ? -1.5 : 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, rotate: idx % 2 === 0 ? -1 : 1, scale: 1.03 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => onOpen(idx)}
            style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '3/4',
                boxShadow: hovered
                    ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1.5px ${accentColor}40`
                    : '0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(235,213,171,0.06)',
                transition: 'box-shadow 0.3s',
                flexShrink: 0,
            }}
        >
            {/* Image */}
            <img
                src={photo.url}
                alt={photo.title}
                style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                    filter: hovered ? 'saturate(1.1) brightness(0.85)' : 'saturate(0.9) brightness(0.75)',
                }}
            />

            {/* Spotlight effect */}
            {hovered && (
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: `radial-gradient(circle 160px at ${spotX}% ${spotY}%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
                    mixBlendMode: 'screen',
                }} />
            )}

            {/* Bottom gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(to top, rgba(10,15,10,0.88) 0%, rgba(10,15,10,0.3) 40%, transparent 75%)',
            }} />

            {/* Zoom icon on hover */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'absolute', top: 14, right: 14,
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(27,33,26,0.85)',
                    border: `1px solid ${accentColor}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: accentColor,
                }}
            >
                <ZoomIn size={16} />
            </motion.div>

            {/* Caption slide-up */}
            <motion.div
                animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0.65 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '20px 18px 18px',
                }}
            >
                <p style={{
                    fontSize: 13, fontWeight: 800, color: '#EBD5AB',
                    fontFamily: 'Inter, sans-serif', marginBottom: 4,
                }}>
                    {photo.title}
                </p>
                <motion.p
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    style={{
                        fontSize: 11, color: 'rgba(235,213,171,0.6)',
                        fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
                    }}
                >
                    {photo.sub}
                </motion.p>
            </motion.div>

            {/* Accent line at bottom on hover */}
            <motion.div
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute', bottom: 0, left: '10%',
                    width: '80%', height: 2,
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                    borderRadius: 2, transformOrigin: 'center',
                }}
            />
        </motion.div>
    );
}

// ─── Gallery Section ───────────────────────────────────────────────
function GallerySection({ gallery, idx }) {
    const [lightboxIdx, setLightboxIdx] = useState(null);

    const openLightbox = (i) => setLightboxIdx(i);
    const closeLightbox = () => setLightboxIdx(null);
    const prevPhoto = () => setLightboxIdx(i => (i - 1 + gallery.photos.length) % gallery.photos.length);
    const nextPhoto = () => setLightboxIdx(i => (i + 1) % gallery.photos.length);

    const isEven = idx % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ marginBottom: 100 }}
        >
            {/* Section header */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                marginBottom: 36,
                justifyContent: isEven ? 'flex-start' : 'flex-end',
            }}>
                {isEven && (
                    <div style={{
                        width: 48, height: 2,
                        background: `linear-gradient(90deg, ${gallery.color}, transparent)`,
                    }} />
                )}
                <span style={{ fontSize: 28 }}>{gallery.emoji}</span>
                <div>
                    <p style={{
                        fontSize: 10, fontWeight: 800, letterSpacing: '0.5em',
                        textTransform: 'uppercase', color: gallery.color,
                        fontFamily: 'Inter, sans-serif', marginBottom: 2,
                    }}>{gallery.caption}</p>
                    <h2 style={{
                        fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900,
                        letterSpacing: '-0.04em', color: '#EBD5AB',
                        fontFamily: 'Inter, sans-serif', lineHeight: 1,
                    }}>{gallery.label}</h2>
                </div>
                {!isEven && (
                    <div style={{
                        width: 48, height: 2,
                        background: `linear-gradient(270deg, ${gallery.color}, transparent)`,
                    }} />
                )}
            </div>

            {/* Photos grid — always 3 columns so all photos are same size */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
                margin: isEven ? '0' : '0 0 0 auto',
            }}>
                {gallery.photos.map((photo, i) => (
                    <PhotoCard
                        key={photo.url}
                        photo={photo}
                        idx={i}
                        onOpen={openLightbox}
                        accentColor={gallery.color}
                    />
                ))}
            </div>

            {/* Lightbox */}
            {lightboxIdx !== null && (
                <Lightbox
                    photo={gallery.photos[lightboxIdx]}
                    onClose={closeLightbox}
                    onPrev={gallery.photos.length > 1 ? prevPhoto : null}
                    onNext={gallery.photos.length > 1 ? nextPhoto : null}
                />
            )}
        </motion.div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function KnowMorePage() {
    return (
        <div style={{ minHeight: '100vh', padding: '60px 24px 100px', position: 'relative' }}>

            {/* Background decorative blobs */}
            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(47,68,38,0.14) 0%, transparent 60%)',
            }} />
            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(47,68,38,0.1) 0%, transparent 60%)',
            }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>

                {/* ══ HERO HEADER ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: 100, textAlign: 'center' }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        style={{
                            fontSize: 11, fontWeight: 800, letterSpacing: '0.6em',
                            textTransform: 'uppercase', color: '#8BAE66',
                            marginBottom: 20, fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        Beyond the code
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(48px, 8vw, 96px)',
                            fontWeight: 900, letterSpacing: '-0.05em',
                            color: '#EBD5AB', lineHeight: 1.0,
                            fontFamily: 'Inter, sans-serif', marginBottom: 24,
                        }}
                    >
                        Know me{' '}
                        <em style={{
                            fontStyle: 'italic', color: '#8BAE66',
                            fontFamily: 'Inter, sans-serif',
                        }}>better.</em>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        style={{
                            fontSize: 17, color: 'rgba(235,213,171,0.45)',
                            fontWeight: 300, maxWidth: 560, lineHeight: 1.85,
                            fontFamily: 'Inter, sans-serif', margin: '0 auto',
                        }}
                    >
                        I&apos;m more than just a developer. I&apos;m a gym rat, a runner, a cricket fan,
                        and a Navratri enthusiast. Here are the moments that shape who I am.
                    </motion.p>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            width: 80, height: 1, margin: '40px auto 0',
                            background: 'linear-gradient(90deg, transparent, #8BAE66, transparent)',
                        }}
                    />
                </motion.div>



                {/* ══ DIVIDER ══ */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 20,
                    marginBottom: 80,
                }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(235,213,171,0.06)' }} />
                    <p style={{
                        fontSize: 10, fontWeight: 800, letterSpacing: '0.5em',
                        textTransform: 'uppercase', color: 'rgba(139,174,102,0.5)',
                        fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
                    }}>
                        📷 My Moments
                    </p>
                    <div style={{ flex: 1, height: 1, background: 'rgba(235,213,171,0.06)' }} />
                </div>

                {/* ══ PHOTO GALLERIES ══ */}
                {GALLERIES.map((gallery, i) => (
                    <GallerySection key={gallery.id} gallery={gallery} idx={i} />
                ))}

                {/* ══ BOTTOM CTA ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{
                        marginTop: 40, textAlign: 'center',
                        padding: '60px 32px',
                        borderRadius: 32,
                        background: 'rgba(235,213,171,0.02)',
                        border: '1px solid rgba(235,213,171,0.06)',
                        position: 'relative', overflow: 'hidden',
                    }}
                >
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: 400, height: 200,
                        background: 'radial-gradient(ellipse, rgba(139,174,102,0.06) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    <p style={{
                        fontSize: 11, fontWeight: 800, letterSpacing: '0.5em',
                        textTransform: 'uppercase', color: '#8BAE66',
                        marginBottom: 16, fontFamily: 'Inter, sans-serif',
                    }}>
                        Want to connect?
                    </p>
                    <p style={{
                        fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: 900,
                        color: '#EBD5AB', letterSpacing: '-0.04em',
                        fontFamily: 'Inter, sans-serif', marginBottom: 32,
                        lineHeight: 1.1,
                    }}>
                        Let&apos;s talk gym,<br />code, or cricket.
                    </p>
                    <a
                        href="mailto:ridham.patel.cg@gmail.com"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            padding: '16px 40px', borderRadius: 100,
                            border: '1px solid rgba(139,174,102,0.3)',
                            background: 'rgba(139,174,102,0.08)',
                            color: '#EBD5AB', fontSize: 13, fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            textDecoration: 'none', backdropFilter: 'blur(8px)',
                            fontFamily: 'Inter, sans-serif',
                            transition: 'background 0.3s, border-color 0.3s, color 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(139,174,102,0.18)';
                            e.currentTarget.style.borderColor = 'rgba(139,174,102,0.55)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(139,174,102,0.08)';
                            e.currentTarget.style.borderColor = 'rgba(139,174,102,0.3)';
                        }}
                    >
                        Say Hello →
                    </a>
                </motion.div>
            </div>

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 900px) {
                    .facts-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .facts-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
