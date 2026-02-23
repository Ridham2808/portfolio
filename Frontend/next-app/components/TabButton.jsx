'use client';
import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * TabButton — Magnetic 3D tilt + cursor-tracking spotlight
 *
 * Props:
 *   id        : string  — unique tab id
 *   label     : string  — display text
 *   count     : number  — badge count (optional)
 *   active    : string  — currently active tab id
 *   color     : string  — accent hex color  e.g. '#8BAE66'
 *   icon      : React component (optional) — lucide icon
 *   onClick   : () => void
 */
export default function TabButton({ id, label, count, active, color = '#8BAE66', icon: Icon, onClick }) {
    const ref = useRef(null);
    const [hov, setHov] = useState(false);
    const [spot, setSpot] = useState({ x: 50, y: 50 });
    const on = active === id;
    const clr = color;

    const handleMove = useCallback((e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setSpot({
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
        });
    }, []);

    // 3-D tilt angles based on cursor position within button
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
                style={{
                    position: 'relative',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', borderRadius: 100,
                    border: `1px solid ${on ? clr + '70' : hov ? 'rgba(235,213,171,0.25)' : 'rgba(235,213,171,0.09)'}`,
                    background: on
                        ? `linear-gradient(135deg, ${clr}22 0%, ${clr}08 100%)`
                        : hov
                            ? `radial-gradient(ellipse at ${spot.x}% ${spot.y}%, ${clr}18 0%, rgba(8,14,8,0.65) 60%)`
                            : 'rgba(8,14,8,0.55)',
                    color: on ? clr : hov ? 'rgba(235,213,171,0.88)' : 'rgba(235,213,171,0.38)',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif', cursor: on ? 'default' : 'pointer',
                    backdropFilter: 'blur(12px)',
                    boxShadow: on
                        ? `0 0 0 1px ${clr}30, 0 8px 32px ${clr}18, inset 0 1px 0 ${clr}18`
                        : hov
                            ? `0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(235,213,171,0.16)`
                            : '0 2px 8px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                    transition: 'color 0.18s, border-color 0.18s, background 0.16s, box-shadow 0.18s',
                }}
            >
                {/* ── Cursor spotlight ── */}
                {hov && !on && (
                    <div style={{
                        position: 'absolute',
                        width: 90, height: 90, borderRadius: '50%',
                        background: `radial-gradient(circle, ${clr}35 0%, transparent 70%)`,
                        left: `${spot.x}%`, top: `${spot.y}%`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                        transition: 'left 0.05s linear, top 0.05s linear',
                    }} />
                )}

                {/* ── Active shimmer sweep ── */}
                {on && (
                    <motion.div
                        initial={{ x: '-130%' }}
                        animate={{ x: '230%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', top: 0, bottom: 0, left: 0, width: '45%',
                            background: `linear-gradient(90deg, transparent, ${clr}32, transparent)`,
                            pointerEvents: 'none',
                        }}
                    />
                )}

                {/* ── Active pulsing outer ring ── */}
                {on && (
                    <motion.div
                        animate={{ opacity: [0.45, 0, 0.45], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute', inset: -3, borderRadius: 100,
                            border: `1px solid ${clr}55`, pointerEvents: 'none',
                        }}
                    />
                )}

                {/* ── Glowing live dot (active only) ── */}
                {on && (
                    <motion.div layoutId={`tab-dot-${id.slice(0, 8)}`}
                        style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: clr, flexShrink: 0,
                            boxShadow: `0 0 8px ${clr}, 0 0 20px ${clr}80`,
                        }}
                    />
                )}

                {/* Icon (optional) */}
                {Icon && <Icon size={13} style={{ flexShrink: 0, position: 'relative', zIndex: 1 }} />}

                <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>

                {count !== undefined && (
                    <span style={{
                        fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 100,
                        background: on ? `${clr}28` : hov ? 'rgba(235,213,171,0.1)' : 'rgba(235,213,171,0.06)',
                        color: on ? clr : hov ? 'rgba(235,213,171,0.72)' : 'rgba(235,213,171,0.22)',
                        border: on ? `1px solid ${clr}35` : '1px solid transparent',
                        transition: 'all 0.18s',
                        position: 'relative', zIndex: 1,
                    }}>
                        {count}
                    </span>
                )}
            </motion.button>
        </div>
    );
}
