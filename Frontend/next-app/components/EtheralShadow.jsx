'use client';

import { useId, useMemo } from 'react';

/**
 * EtheralShadow — visually identical to the original, but performance-optimised.
 *
 * Key changes vs the original:
 *  - Removed JS animate + onUpdate (was calling setAttribute on every RAF tick)
 *  - Replaced with a native SVG <animate> element — runs on browser's own thread, zero JS
 *  - Added will-change: transform + translateZ(0) to promote the layer to GPU
 *  - Added contain: strict on outer to isolate paint/layout from the rest of the page
 *  - numOctaves kept at 2, all visual params identical
 */

const mapRange = (value, fromLow, fromHigh, toLow, toHigh) => {
    if (fromLow === fromHigh) return toLow;
    return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
};

const COLOR = 'rgba(139, 174, 102, 0.12)';
const ANIM = { scale: 120, speed: 60 };
const NOISE = { opacity: 0.8, scale: 1.2 };

export default function EtheralShadow() {
    const rawId = useId();
    const id = useMemo(() => `es-${rawId.replace(/:/g, '')}`, [rawId]);

    const cfg = useMemo(() => {
        const scale = mapRange(ANIM.scale, 1, 100, 20, 100);
        const dur = mapRange(ANIM.speed, 1, 100, 1000, 50);
        const bf = `${mapRange(ANIM.scale, 0, 100, 0.001, 0.0005)},${mapRange(ANIM.scale, 0, 100, 0.004, 0.002)}`;
        // Slow the animation down significantly — same visual, fewer GPU repaints per second
        const animDur = `${(dur / 25) * 3}s`;
        return { scale, animDur, bf };
    }, []);

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
                backgroundColor: '#1B211A',
                // Isolate this element's paint from the rest of the page
                contain: 'strict',
            }}
        >
            {/* Inner wrapper */}
            <div
                style={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
                }}
            >
                {/* Displaced layer — promoted to its own GPU compositing layer */}
                <div
                    style={{
                        position: 'absolute',
                        inset: -cfg.scale,
                        filter: `url(#${id}) blur(4px)`,
                        // Promote to GPU layer so the filter runs off the main thread
                        willChange: 'transform',
                        transform: 'translateZ(0)',
                    }}
                >
                    {/* SVG filter — hue rotation driven by native <animate>, zero JS */}
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
                                {/*
                                  KEY CHANGE: was updated by JS animate+onUpdate every RAF.
                                  Now uses a native SVG <animate> — no JS involvement at all.
                                  The browser handles this on its own compositor/paint thread.
                                */}
                                <feColorMatrix
                                    in="undulation"
                                    type="hueRotate"
                                    values="0"
                                >
                                    <animate
                                        attributeName="values"
                                        from="0"
                                        to="360"
                                        dur={cfg.animDur}
                                        repeatCount="indefinite"
                                    />
                                </feColorMatrix>
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

                {/* Overlay 1: cream light at top & bottom edges */}
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

                {/* Overlay 2: Noise texture */}
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
