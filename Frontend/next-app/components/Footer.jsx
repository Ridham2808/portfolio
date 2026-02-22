'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/constants';

// ── Social SVG icons ──────────────────────────────────────────────
function SocialIcon({ name }) {
    const s = { width: 20, height: 20, fill: 'currentColor', display: 'block' };
    switch (name) {
        case 'Github':
            return <svg style={s} viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
        case 'LinkedIn':
            return <svg style={s} viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
        case 'Twitter':
            return <svg style={s} viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
        case 'YouTube':
            return <svg style={s} viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
        default: return null;
    }
}

const SOCIALS = [
    { name: 'Github', url: PORTFOLIO_DATA.contact.github },
    { name: 'LinkedIn', url: PORTFOLIO_DATA.contact.linkedin },
    { name: 'Twitter', url: PORTFOLIO_DATA.contact.twitter },
    { name: 'YouTube', url: PORTFOLIO_DATA.contact.youtube },
];

export default function Footer() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
    const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const blobY = useTransform(smooth, [0, 1], [80, -80]);
    const blobYRev = useTransform(smooth, [0, 1], [-80, 80]);
    const gridY = useTransform(smooth, [0, 1], [25, -25]);
    const contentY = useTransform(smooth, [0, 1], [40, 0]);
    const cardY = useTransform(smooth, [0, 1], [60, 0]);

    return (
        <footer
            ref={ref}
            style={{
                background: '#1B211A',
                borderTop: '1px solid rgba(235,213,171,0.05)',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 100,
                paddingBottom: 80,
            }}
        >
            {/* Background blobs */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <motion.div style={{
                    y: blobY,
                    position: 'absolute', top: '20%', right: -100,
                    width: 520, height: 520, borderRadius: '50%',
                    background: 'rgba(139,174,102,0.055)', filter: 'blur(130px)',
                }} />
                <motion.div style={{
                    y: blobYRev,
                    position: 'absolute', bottom: 0, left: -80,
                    width: 360, height: 360, borderRadius: '50%',
                    background: 'rgba(235,213,171,0.03)', filter: 'blur(100px)',
                }} />
                <motion.div style={{
                    y: gridY,
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(235,213,171,1) 1px, transparent 1px), linear-gradient(90deg, rgba(235,213,171,1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.022,
                }} />
            </div>

            {/* Top glow */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(circle at 50% 0%, rgba(235,213,171,0.06) 0%, transparent 55%)',
            }} />

            {/* Content */}
            <div style={{
                maxWidth: 1400, margin: '0 auto',
                padding: '0 24px',
                position: 'relative', zIndex: 10,
            }}>
                {/* Main 2-col grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '38fr 62fr',
                    gap: 40,
                    alignItems: 'center',
                }} className="footer-grid">

                    {/* LEFT */}
                    <motion.div style={{ y: contentY }}>
                        <p style={{
                            fontSize: 11, fontWeight: 800, letterSpacing: '0.5em',
                            textTransform: 'uppercase', color: '#8BAE66',
                            marginBottom: 24, fontFamily: 'Inter, sans-serif',
                        }}>
                            The Dialogue
                        </p>

                        <h3 className="footer-heading" style={{
                            fontSize: 'clamp(36px, 4.5vw, 60px)',
                            fontWeight: 800, letterSpacing: '-0.035em',
                            lineHeight: 1.1, color: '#EBD5AB',
                            marginBottom: 22, fontFamily: 'Inter, sans-serif',
                        }}>
                            Let&apos;s initiate a{' '}
                            <em style={{
                                fontFamily: '"Playfair Display", Georgia, serif',
                                fontStyle: 'italic', fontWeight: 700, color: '#8BAE66',
                            }}>
                                collaboration.
                            </em>
                        </h3>

                        <p style={{
                            color: 'rgba(235,213,171,0.45)',
                            fontSize: 15, lineHeight: 1.8,
                            fontWeight: 300, marginBottom: 40,
                            maxWidth: 420, fontFamily: 'Inter, sans-serif',
                        }}>
                            Always open to discussing new frontiers, emerging technologies,
                            and organic design systems.
                        </p>

                        <a
                            href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                            className="footer-email footer-email-wrap"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 20, textDecoration: 'none' }}
                        >
                            <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                                <div className="email-glow" style={{
                                    position: 'absolute', inset: 0,
                                    background: '#8BAE66', borderRadius: 16,
                                    filter: 'blur(10px)', opacity: 0, transition: 'opacity 0.5s',
                                }} />
                                <div style={{
                                    position: 'relative', width: '100%', height: '100%',
                                    borderRadius: 16,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1px solid rgba(139,174,102,0.3)',
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EBD5AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                            </div>
                            <span className="email-text" style={{
                                fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em',
                                color: '#EBD5AB', fontFamily: 'Inter, sans-serif', transition: 'color 0.3s',
                            }}>
                                {PORTFOLIO_DATA.contact.email}
                            </span>
                        </a>
                    </motion.div>

                    {/* RIGHT: Connected Networks */}
                    <motion.div style={{ y: cardY, marginLeft: 'auto', width: '100%' }}>
                        <div
                            className="networks-card"
                            style={{
                                position: 'relative',
                                background: 'rgba(20,28,20,0.85)',
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                padding: '48px 52px',
                                borderRadius: 44,
                                border: '1px solid rgba(139,174,102,0.1)',
                                overflow: 'hidden',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.45)',
                                transition: 'border-color 0.7s',
                            }}
                        >
                            <div style={{
                                position: 'absolute', top: -40, right: -40,
                                width: 240, height: 240,
                                background: 'rgba(139,174,102,0.07)',
                                filter: 'blur(70px)', borderRadius: '50%', pointerEvents: 'none',
                            }} />

                            <div style={{
                                position: 'relative', zIndex: 10,
                                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36,
                            }}>
                                <p style={{
                                    fontSize: 10, fontWeight: 800, letterSpacing: '0.45em',
                                    textTransform: 'uppercase', color: '#8BAE66',
                                    fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
                                }}>
                                    Connected Networks
                                </p>
                                <span style={{ height: 1, flex: 1, background: 'rgba(139,174,102,0.2)' }} />
                            </div>

                            <div style={{
                                position: 'relative', zIndex: 10,
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                            }} className="social-grid">
                                {SOCIALS.map(({ name, url }) => (
                                    <a
                                        key={name}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-item"
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 16,
                                            padding: '18px 22px', borderRadius: 20,
                                            border: '1px solid transparent',
                                            textDecoration: 'none',
                                            transition: 'background 0.3s, border-color 0.3s',
                                        }}
                                    >
                                        <div className="social-icon-wrap" style={{
                                            width: 42, height: 42, borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: 'rgba(235,213,171,0.06)',
                                            color: 'rgba(235,213,171,0.5)', flexShrink: 0,
                                            transition: 'background 0.3s, color 0.3s',
                                        }}>
                                            <SocialIcon name={name} />
                                        </div>
                                        <span style={{
                                            fontSize: 12, fontWeight: 800,
                                            letterSpacing: '0.2em', textTransform: 'uppercase',
                                            color: 'rgba(235,213,171,0.35)',
                                            fontFamily: 'Inter, sans-serif', transition: 'color 0.3s',
                                        }}>
                                            {name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    marginTop: 72, paddingTop: 32,
                    borderTop: '1px solid rgba(235,213,171,0.05)',
                    display: 'flex', flexWrap: 'wrap',
                    alignItems: 'center', justifyContent: 'space-between', gap: 12,
                }}>
                    <p style={{
                        fontSize: 12, fontWeight: 700, letterSpacing: '0.25em',
                        textTransform: 'uppercase', color: 'rgba(235,213,171,0.28)',
                        fontFamily: 'Inter, sans-serif',
                    }}>
                        © {new Date().getFullYear()}
                    </p>
                    <span className="footer-bottom-name" style={{
                        fontSize: 'clamp(60px, 7vw, 96px)',
                        fontFamily: '"Dancing Script", cursive',
                        fontWeight: 700, color: '#EBD5AB',
                        letterSpacing: '0.01em', lineHeight: 1, opacity: 0.9,
                    }}>
                        Ridham Patel
                    </span>
                </div>
            </div>

            <style>{`
        .footer-email:hover .email-glow { opacity: 0.3 !important; }
        .footer-email:hover .email-text { color: #8BAE66 !important; }
        .social-item:hover { background: rgba(255,255,255,0.04) !important; border-color: rgba(235,213,171,0.08) !important; }
        .social-item:hover .social-icon-wrap { background: rgba(139,174,102,0.2) !important; color: #EBD5AB !important; }
        .social-item:hover span { color: rgba(235,213,171,0.75) !important; }
        .networks-card:hover { border-color: rgba(139,174,102,0.22) !important; }

        @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr !important; }
            .footer-heading { font-size: clamp(28px, 8vw, 44px) !important; word-break: break-word; }
            .footer-email-wrap { flex-wrap: wrap !important; gap: 12px !important; }
            .email-text { font-size: 14px !important; word-break: break-all !important; }
            .networks-card { padding: 28px 20px !important; border-radius: 24px !important; }
            .social-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
            .social-item { padding: 12px 10px !important; gap: 10px !important; }
            .social-icon-wrap { width: 34px !important; height: 34px !important; }
            .footer-bottom-name { font-size: clamp(40px, 10vw, 72px) !important; }
        }

        @media (max-width: 480px) {
            .footer-heading { font-size: clamp(24px, 7vw, 36px) !important; }
            .social-grid { grid-template-columns: 1fr !important; }
            .networks-card { padding: 24px 16px !important; }
        }
      `}</style>
        </footer>
    );
}
