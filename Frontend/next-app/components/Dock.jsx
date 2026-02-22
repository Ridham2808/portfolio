'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import {
    Home, User, Zap, FolderOpen, Briefcase, Award, Mail, Heart,
} from 'lucide-react';

// ── Nav items ─────────────────────────────────────────────────────
const NAV_ITEMS = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/about', icon: User, label: 'About' },
    { href: '/skills', icon: Zap, label: 'Skills' },
    { href: '/projects', icon: FolderOpen, label: 'Projects' },
    { href: '/freelance', icon: Briefcase, label: 'Freelance' },
    { href: '/certificates', icon: Award, label: 'Certificates' },
    { href: '/contact', icon: Mail, label: 'Contact' },
    { href: '/know-more', icon: Heart, label: 'Know More' },
];

// ── Live Clock ────────────────────────────────────────────────────
function LiveClock() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');
            setTime(`${hh}:${mm}:${ss}`);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
        }}>
            {/* Blinking dot */}
            <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: '#8BAE66', boxShadow: '0 0 6px #8BAE66',
                    flexShrink: 0,
                }}
            />
            <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 12, fontWeight: 600,
                color: 'rgba(235,213,171,0.45)',
                letterSpacing: '0.05em',
                minWidth: 70,
            }}>
                {time}
            </span>
            <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'rgba(139,174,102,0.4)',
                fontFamily: 'Inter, sans-serif',
            }}>IST</span>
        </div>
    );
}

// ── Single Nav Icon ───────────────────────────────────────────────
function NavIcon({ href, icon: Icon, label, active }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href} style={{ textDecoration: 'none', position: 'relative' }}>
            <motion.div
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                whileTap={{ scale: 0.88 }}
                className="dock-icon"
                style={{
                    position: 'relative',
                    width: 48, height: 48,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 14,
                    background: active
                        ? 'rgba(139,174,102,0.15)'
                        : hovered ? 'rgba(235,213,171,0.06)' : 'transparent',
                    color: active ? '#8BAE66' : 'rgba(235,213,171,0.45)',
                    transition: 'background 0.2s, color 0.2s',
                    cursor: 'pointer',
                }}
            >
                <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />

                {/* Active dot */}
                {active && (
                    <motion.div
                        layoutId="active-dot"
                        style={{
                            position: 'absolute', bottom: 3, left: '50%',
                            transform: 'translateX(-50%)',
                            width: 4, height: 4, borderRadius: '50%',
                            background: '#8BAE66', boxShadow: '0 0 6px #8BAE66',
                        }}
                    />
                )}

                {/* Tooltip */}
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: 'absolute', top: 'calc(100% + 10px)',
                            left: '50%', transform: 'translateX(-50%)',
                            background: 'rgba(27,33,26,0.95)',
                            border: '1px solid rgba(139,174,102,0.2)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: 8,
                            padding: '4px 10px',
                            whiteSpace: 'nowrap',
                            fontSize: 10, fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: '#EBD5AB',
                            fontFamily: 'Inter, sans-serif',
                            pointerEvents: 'none',
                            zIndex: 100,
                        }}
                    >
                        {label}
                        {/* Arrow */}
                        <div style={{
                            position: 'absolute', top: -4, left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)',
                            width: 6, height: 6,
                            background: 'rgba(27,33,26,0.95)',
                            borderTop: '1px solid rgba(139,174,102,0.2)',
                            borderLeft: '1px solid rgba(139,174,102,0.2)',
                        }} />
                    </motion.div>
                )}
            </motion.div>
        </Link>
    );
}

// ── Main Dock ─────────────────────────────────────────────────────
export default function Dock() {
    const pathname = usePathname();
    const y = useMotionValue(0);
    const springY = useSpring(y, { stiffness: 60, damping: 20 });

    // Gentle float animation
    useEffect(() => {
        let up = true;
        const id = setInterval(() => {
            y.set(up ? -4 : 0);
            up = !up;
        }, 1800);
        return () => clearInterval(id);
    }, [y]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 18,
                left: '50%',
                translateX: '-50%',
                y: springY,
                zIndex: 1000,
            }}
        >
            <div className="dock-outer" style={{
                display: 'flex', alignItems: 'center',
                gap: 0,
                background: 'rgba(27,33,26,0.82)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(235,213,171,0.08)',
                borderRadius: 100,
                padding: '8px 20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,174,102,0.04)',
            }}>

                {/* Nav Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="dock-icons-wrap">
                    {NAV_ITEMS.map(({ href, icon, label }) => (
                        <NavIcon
                            key={href}
                            href={href}
                            icon={icon}
                            label={label}
                            active={pathname === href}
                        />
                    ))}
                </div>

                {/* Divider */}
                <div className="dock-divider" style={{
                    width: 1, height: 22,
                    background: 'rgba(235,213,171,0.1)',
                    marginInline: 12,
                    flexShrink: 0,
                }} />

                {/* Live Clock */}
                <div className="dock-clock"><LiveClock /></div>
            </div>
        </motion.div>
    );
}

/* ── Dock responsive styles ── */
const dockStyles = `
    .dock-icon { width: 48px; height: 48px; border-radius: 14px; }
    .dock-icon svg { width: 22px; height: 22px; }

    @media (max-width: 640px) {
        .dock-clock  { display: none !important; }
        .dock-divider { display: none !important; }
        .dock-outer  { padding: 6px 10px !important; }
        .dock-icons-wrap { gap: 1px !important; }
        .dock-icon   { width: 40px !important; height: 40px !important; border-radius: 11px !important; }
        .dock-icon svg { width: 18px !important; height: 18px !important; }
    }

    @media (max-width: 380px) {
        .dock-outer  { padding: 5px 8px !important; }
        .dock-icon   { width: 34px !important; height: 34px !important; border-radius: 9px !important; }
        .dock-icon svg { width: 16px !important; height: 16px !important; }
    }
`;

/* Inject once into <head> */
if (typeof window !== 'undefined' && !document.getElementById('dock-responsive-styles')) {
    const el = document.createElement('style');
    el.id = 'dock-responsive-styles';
    el.textContent = dockStyles;
    document.head.appendChild(el);
}
