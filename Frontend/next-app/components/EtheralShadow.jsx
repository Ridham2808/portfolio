'use client';

import { useRef, useId, useEffect, useMemo } from 'react';
import { animate, useMotionValue } from 'framer-motion';

/**
 * EtheralShadow — exact replica of friend's implementation.
 *
 * Key technique (from friend's source):
 *  1. Base BG: #1B211A
 *  2. A solid-color div masked with a Framer CDN organic-cloud PNG
 *     (mask-image: framerusercontent.com/…ceBGguIpUU8luwByxuQz79t7To.png)
 *  3. SVG feTurbulence + feDisplacementMap animates the mask organically
 *  4. Radial gradient overlays at top/bottom edges (rgba(235,213,171,0.15))
 *  5. Framer CDN noise PNG as overlay (g0QcWrxr87K0ufOxIUFBakwYA8.png)
 */

const mapRange = (value, fromLow, fromHigh, toLow, toHigh) => {
    if (fromLow === fromHigh) return toLow;
    return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
};

// Friend's exact call: color="rgba(139, 174, 102, 0.12)" animation={{ scale: 120, speed: 60 }} noise={{ opacity: 0.8, scale: 1.2 }} sizing="fill"
const COLOR = 'rgba(139, 174, 102, 0.12)';
const ANIM = { scale: 120, speed: 60 };
const NOISE = { opacity: 0.8, scale: 1.2 };

export default function EtheralShadow() {
    const rawId = useId();
    const id = useMemo(() => `es-${rawId.replace(/:/g, '')}`, [rawId]);
    const feRef = useRef(null);
    const hue = useMotionValue(0);

    const cfg = useMemo(() => {
        const scale = mapRange(ANIM.scale, 1, 100, 20, 100);
        const dur = mapRange(ANIM.speed, 1, 100, 1000, 50);
        const bf = `${mapRange(ANIM.scale, 0, 100, 0.001, 0.0005)},${mapRange(ANIM.scale, 0, 100, 0.004, 0.002)}`;
        return { enabled: true, scale, dur, bf };
    }, []);

    useEffect(() => {
        const ctrl = animate(hue, 360, {
            duration: cfg.dur / 25,
            repeat: Infinity,
            ease: 'linear',
            onUpdate: (v) => feRef.current?.setAttribute('values', String(v)),
        });
        return () => ctrl.stop();
    }, [cfg.dur, hue]);

    // Framer CDN URLs — same as friend's code uses
    const MASK_URL = 'https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png';
    const NOISE_URL = 'https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png';

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
                /* EXACT same as friend's body background */
                backgroundColor: '#1B211A',
            }}
        >
            {/* ── Inner wrapper — same containerStyle as friend's ── */}
            <div
                style={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    /* Friend's exact mask: soft fade at edges */
                    maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
                }}
            >
                {/* Displaced layer — same as friend's layerStyle */}
                <div
                    style={{
                        position: 'absolute',
                        inset: -cfg.scale,
                        filter: `url(#${id}) blur(4px)`,
                    }}
                >
                    {/* SVG turbulence filter — exact match */}
                    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                        <defs>
                            <filter id={id}>
                                <feTurbulence
                                    type="turbulence"
                                    baseFrequency={cfg.bf}
                                    numOctaves="2"
                                    seed="0"
                                    result="undulation"
                                />
                                <feColorMatrix
                                    ref={feRef}
                                    in="undulation"
                                    type="hueRotate"
                                    values="180"
                                />
                                <feColorMatrix
                                    in="dist"
                                    result="circulation"
                                    type="matrix"
                                    values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="circulation"
                                    scale={cfg.scale}
                                    result="dist"
                                />
                                <feDisplacementMap
                                    in="dist"
                                    in2="undulation"
                                    scale={cfg.scale}
                                    result="output"
                                />
                            </filter>
                        </defs>
                    </svg>

                    {/* Main color layer — masked with Framer CDN cloud shape */}
                    <div
                        style={{
                            backgroundColor: COLOR,
                            maskImage: `url('${MASK_URL}')`,
                            WebkitMaskImage: `url('${MASK_URL}')`,
                            maskSize: 'cover',
                            WebkitMaskSize: 'cover',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>

                {/* Overlay 1: subtle cream light at top & bottom edges — exact match */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        background: [
                            'radial-gradient(circle at 50% 0%,   rgba(235,213,171,0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 100%, rgba(235,213,171,0.15) 0%, transparent 50%)',
                        ].join(', '),
                        mixBlendMode: 'screen',
                    }}
                />

                {/* Overlay 2: Noise texture — same Framer CDN URL as friend's */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("${NOISE_URL}")`,
                        backgroundSize: `${NOISE.scale * 200}px`,
                        backgroundRepeat: 'repeat',
                        opacity: NOISE.opacity / 2,
                        mixBlendMode: 'overlay',
                    }}
                />
            </div>
        </div>
    );
}
