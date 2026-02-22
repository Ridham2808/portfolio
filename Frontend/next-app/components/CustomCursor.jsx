'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Bigger dumbbell, no outer ring — just the icon + dot
const DumbbellSVG = ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left weight plates */}
        <rect x="1" y="11" width="6" height="10" rx="2" fill="#8BAE66" opacity="0.9" />
        <rect x="7" y="9" width="3" height="14" rx="1.5" fill="#8BAE66" opacity="0.8" />
        {/* Bar */}
        <rect x="10" y="14.5" width="12" height="3" rx="1.5" fill="#8BAE66" />
        {/* Right weight plates */}
        <rect x="22" y="9" width="3" height="14" rx="1.5" fill="#8BAE66" opacity="0.8" />
        <rect x="25" y="11" width="6" height="10" rx="2" fill="#8BAE66" opacity="0.9" />
    </svg>
);

export default function CustomCursor() {
    const outerRef = useRef(null);
    const dotRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const rafId = useRef(null);

    useEffect(() => {
        const outer = outerRef.current;
        const dot = dotRef.current;

        const onMouseMove = (e) => {
            targetPos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
            // Dot: instant
            if (dot) {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }
        };

        const animate = () => {
            // Outer: smooth lag
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1;
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1;
            if (outer) {
                outer.style.left = currentPos.current.x + 'px';
                outer.style.top = currentPos.current.y + 'px';
            }
            rafId.current = requestAnimationFrame(animate);
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);
        const onEnter = () => setIsVisible(true);
        const onLeave = () => setIsVisible(false);

        const onHover = (e) => {
            const el = e.target;
            setIsHovering(
                el.tagName === 'A' || el.tagName === 'BUTTON' ||
                !!el.closest('a') || !!el.closest('button')
            );
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousemove', onHover);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.documentElement.addEventListener('mouseenter', onEnter);
        document.documentElement.addEventListener('mouseleave', onLeave);
        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousemove', onHover);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.documentElement.removeEventListener('mouseenter', onEnter);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    if (typeof window === 'undefined') return null;

    return (
        <>
            {/* Outer dumbbell icon — smooth lag follow, NO ring */}
            <div
                ref={outerRef}
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'left, top',
                    transition: 'opacity 0.2s',
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 1.35 : isClicking ? 0.75 : 1,
                        rotate: isHovering ? 15 : 0,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.18 }}
                >
                    <DumbbellSVG size={isHovering ? 26 : 22} />
                </motion.div>
            </div>

            {/* Inner dot — instant follow */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'left, top',
                    width: isClicking ? 9 : 5,
                    height: isClicking ? 9 : 5,
                    borderRadius: '50%',
                    background: isHovering ? '#EBD5AB' : '#8BAE66',
                    boxShadow: '0 0 8px rgba(139,174,102,0.9)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'width 0.1s, height 0.1s, background 0.15s, opacity 0.2s',
                }}
            />
        </>
    );
}
