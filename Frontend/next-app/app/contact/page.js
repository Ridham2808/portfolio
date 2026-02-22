'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Github, Linkedin, MapPin, Send,
    CheckCircle, AlertCircle, Twitter, Youtube,
    Clock, MessageSquare, Sparkles,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PORTFOLIO_DATA } from '@/lib/constants';

const EMAILJS_SERVICE_ID = 'service_wwbizap';
const EMAILJS_TEMPLATE_ID = 'template_yyt63yh';
const EMAILJS_PUBLIC_KEY = 'TejvEzakF_JvseZFz';

// ─── How did you find me options ─────────────────────────────────
const FOUND_OPTIONS = [
    'GitHub', 'LinkedIn', 'Twitter / X', 'YouTube',
    'Google Search', 'Referral / Friend', 'Other',
];

// ─── Contact side info ───────────────────────────────────────────
const CONTACT_INFO = [
    { icon: Mail, label: 'Email', value: 'ridham.patel.cg@gmail.com', href: 'mailto:ridham.patel.cg@gmail.com' },
    { icon: Github, label: 'GitHub', value: 'github.com/Ridham2808', href: PORTFOLIO_DATA.contact.github },
    { icon: Linkedin, label: 'LinkedIn', value: 'patel-ridham', href: PORTFOLIO_DATA.contact.linkedin },
    { icon: Twitter, label: 'Twitter', value: '@RidhamPatel28', href: PORTFOLIO_DATA.contact.twitter },
    { icon: Youtube, label: 'YouTube', value: '@ridhampatel2808', href: PORTFOLIO_DATA.contact.youtube },
    { icon: MapPin, label: 'Location', value: 'Ahmedabad, Gujarat, IN', href: null },
];

// ─── Small stat pills ────────────────────────────────────────────
const STATS = [
    { icon: Clock, label: 'Response time', value: 'Within 24 hrs' },
    { icon: MessageSquare, label: 'Open to', value: 'Freelance · Collab · Jobs' },
    { icon: Sparkles, label: 'Available', value: 'Yes, right now' },
];

// ─── Fancy labelled input ────────────────────────────────────────
function Field({ label, id, type = 'text', name, value, onChange, required, rows, placeholder }) {
    const [focused, setFocused] = useState(false);
    const filled = value && value.length > 0;

    const base = {
        width: '100%',
        background: focused ? 'rgba(235,213,171,0.055)' : 'rgba(235,213,171,0.025)',
        border: `1px solid ${focused ? 'rgba(139,174,102,0.45)' : 'rgba(235,213,171,0.09)'}`,
        borderRadius: 14,
        color: '#EBD5AB',
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 300,
        outline: 'none',
        transition: 'border-color 0.25s, background 0.25s',
        padding: '14px 16px',
        resize: 'none',
        boxShadow: focused ? '0 0 0 3px rgba(139,174,102,0.08)' : 'none',
    };

    return (
        <div style={{ position: 'relative' }}>
            <label
                htmlFor={id}
                style={{
                    position: 'absolute',
                    left: 14,
                    top: filled || focused ? -10 : 14,
                    fontSize: filled || focused ? 10 : 13,
                    fontWeight: 700,
                    letterSpacing: filled || focused ? '0.25em' : '0.05em',
                    textTransform: filled || focused ? 'uppercase' : 'none',
                    color: focused ? '#8BAE66' : filled ? 'rgba(139,174,102,0.6)' : 'rgba(235,213,171,0.3)',
                    transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
                    pointerEvents: 'none',
                    fontFamily: 'Inter, sans-serif',
                    background: filled || focused ? 'transparent' : 'transparent',
                    paddingInline: 2,
                    zIndex: 1,
                }}
            >
                {label}{required && <span style={{ color: '#8BAE66' }}> *</span>}
            </label>

            {rows ? (
                <textarea
                    id={id} name={name} value={value} onChange={onChange}
                    rows={rows} required={required}
                    placeholder={focused ? placeholder || '' : ''}
                    style={base}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            ) : (
                <input
                    id={id} type={type} name={name} value={value}
                    onChange={onChange} required={required}
                    placeholder={focused ? placeholder || '' : ''}
                    style={base}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            )}
        </div>
    );
}

// ─── Select field ────────────────────────────────────────────────
function SelectField({ label, id, name, value, onChange, options, required }) {
    const [focused, setFocused] = useState(false);
    const filled = value && value.length > 0;

    return (
        <div style={{ position: 'relative' }}>
            <label
                htmlFor={id}
                style={{
                    position: 'absolute',
                    left: 14,
                    top: filled || focused ? -10 : 14,
                    fontSize: filled || focused ? 10 : 13,
                    fontWeight: 700,
                    letterSpacing: filled || focused ? '0.25em' : '0.05em',
                    textTransform: filled || focused ? 'uppercase' : 'none',
                    color: focused ? '#8BAE66' : filled ? 'rgba(139,174,102,0.6)' : 'rgba(235,213,171,0.3)',
                    transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
                    pointerEvents: 'none',
                    fontFamily: 'Inter, sans-serif',
                    zIndex: 1,
                    paddingInline: 2,
                }}
            >
                {label}{required && <span style={{ color: '#8BAE66' }}> *</span>}
            </label>
            <select
                id={id} name={name} value={value}
                onChange={onChange} required={required}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: '100%',
                    background: focused ? 'rgba(235,213,171,0.055)' : 'rgba(235,213,171,0.025)',
                    border: `1px solid ${focused ? 'rgba(139,174,102,0.45)' : 'rgba(235,213,171,0.09)'}`,
                    borderRadius: 14,
                    color: value ? '#EBD5AB' : 'rgba(235,213,171,0.3)',
                    fontSize: 14,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    outline: 'none',
                    padding: '14px 16px',
                    appearance: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s, background 0.25s',
                    boxShadow: focused ? '0 0 0 3px rgba(139,174,102,0.08)' : 'none',
                }}
            >
                <option value="" disabled style={{ background: '#1B211A' }}>—</option>
                {options.map(opt => (
                    <option key={opt} value={opt} style={{ background: '#1B211A', color: '#EBD5AB' }}>{opt}</option>
                ))}
            </select>
            {/* Arrow */}
            <div style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                color: 'rgba(235,213,171,0.3)', pointerEvents: 'none', fontSize: 12,
            }}>▾</div>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function ContactPage() {
    const formRef = useRef(null);
    const [form, setForm] = useState({
        name: '', email: '', contact_back: '', found_via: '', subject: '', message: '',
    });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
                formRef.current, { publicKey: EMAILJS_PUBLIC_KEY }
            );
            setStatus('success');
            setForm({ name: '', email: '', contact_back: '', found_via: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 6000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <div style={{ minHeight: '100vh', padding: '60px 24px 100px', position: 'relative', overflowX: 'hidden' }}>

            {/* Background glows */}
            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(ellipse 70% 55% at 10% 10%, rgba(47,68,38,0.16) 0%, transparent 65%)',
            }} />
            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(ellipse 50% 40% at 90% 90%, rgba(47,68,38,0.1) 0%, transparent 60%)',
            }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>

                {/* ══ HEADER ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: 80, textAlign: 'center' }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        style={{
                            fontSize: 11, fontWeight: 800, letterSpacing: '0.6em',
                            textTransform: 'uppercase', color: '#8BAE66',
                            marginBottom: 18, fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        Let&apos;s Talk
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900,
                            letterSpacing: '-0.05em', color: '#EBD5AB',
                            lineHeight: 1.0, fontFamily: 'Inter, sans-serif', marginBottom: 22,
                        }}
                    >
                        Get In{' '}
                        <em style={{ fontStyle: 'italic', color: '#8BAE66' }}>Touch.</em>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        style={{
                            fontSize: 17, color: 'rgba(235,213,171,0.42)',
                            fontWeight: 300, maxWidth: 500, lineHeight: 1.85,
                            fontFamily: 'Inter, sans-serif', margin: '0 auto 36px',
                        }}
                    >
                        Have a project, a collab idea, or just want to say hi?
                        I read every message and reply within a day.
                    </motion.p>

                    {/* Stat pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.6 }}
                        style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}
                    >
                        {STATS.map(({ icon: Icon, label, value }) => (
                            <div key={label} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '8px 16px', borderRadius: 100,
                                background: 'rgba(235,213,171,0.04)',
                                border: '1px solid rgba(235,213,171,0.08)',
                                backdropFilter: 'blur(8px)',
                            }}>
                                <Icon size={13} style={{ color: '#8BAE66', flexShrink: 0 }} />
                                <span style={{
                                    fontSize: 11, fontFamily: 'Inter, sans-serif',
                                    color: 'rgba(235,213,171,0.5)', fontWeight: 500,
                                }}>
                                    <span style={{ color: 'rgba(235,213,171,0.25)', marginRight: 6, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ══ MAIN TWO-COL ══ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.55fr',
                    gap: 40,
                    alignItems: 'start',
                }} className="contact-grid">

                    {/* ── LEFT — Contact info ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <p style={{
                            fontSize: 10, fontWeight: 800, letterSpacing: '0.45em',
                            textTransform: 'uppercase', color: 'rgba(139,174,102,0.55)',
                            fontFamily: 'Inter, sans-serif', marginBottom: 16,
                        }}>Reach out directly</p>
                        <h2 style={{
                            fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900,
                            letterSpacing: '-0.03em', color: '#EBD5AB',
                            lineHeight: 1.15, fontFamily: 'Inter, sans-serif', marginBottom: 10,
                        }}>
                            Let&apos;s build something{' '}
                            <span style={{ color: '#8BAE66', fontStyle: 'italic' }}>great</span>{' '}
                            together.
                        </h2>
                        <p style={{
                            fontSize: 14, color: 'rgba(235,213,171,0.38)',
                            fontWeight: 300, lineHeight: 1.8,
                            fontFamily: 'Inter, sans-serif', marginBottom: 36,
                        }}>
                            Always open to interesting projects, freelance work,
                            internship opportunities, and tech conversations.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {CONTACT_INFO.map(({ icon: Icon, label, value, href }, i) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                                    whileHover={{ x: 5 }}
                                >
                                    {href ? (
                                        <a
                                            href={href}
                                            target={href.startsWith('mailto') ? undefined : '_blank'}
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 14,
                                                padding: '12px 16px', borderRadius: 16, textDecoration: 'none',
                                                background: 'rgba(235,213,171,0.025)',
                                                border: '1px solid rgba(235,213,171,0.07)',
                                                transition: 'all 0.22s',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = 'rgba(139,174,102,0.06)';
                                                e.currentTarget.style.borderColor = 'rgba(139,174,102,0.2)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'rgba(235,213,171,0.025)';
                                                e.currentTarget.style.borderColor = 'rgba(235,213,171,0.07)';
                                            }}
                                        >
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                                background: 'rgba(139,174,102,0.1)',
                                                display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', color: '#8BAE66',
                                            }}>
                                                <Icon size={16} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.28)', fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>{label}</p>
                                                <p style={{ fontSize: 13, fontWeight: 500, color: '#EBD5AB', fontFamily: 'Inter, sans-serif' }}>{value}</p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: 14,
                                            padding: '12px 16px', borderRadius: 16,
                                            background: 'rgba(235,213,171,0.025)',
                                            border: '1px solid rgba(235,213,171,0.07)',
                                        }}>
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                                background: 'rgba(139,174,102,0.1)',
                                                display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', color: '#8BAE66',
                                            }}>
                                                <Icon size={16} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.28)', fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>{label}</p>
                                                <p style={{ fontSize: 13, fontWeight: 500, color: '#EBD5AB', fontFamily: 'Inter, sans-serif' }}>{value}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── RIGHT — Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        style={{
                            position: 'relative', borderRadius: 32, padding: '40px 38px',
                            background: 'rgba(235,213,171,0.025)',
                            border: '1px solid rgba(235,213,171,0.08)',
                            backdropFilter: 'blur(12px)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Corner glows */}
                        <div style={{
                            position: 'absolute', top: -40, right: -40, width: 160, height: 160,
                            borderRadius: '50%', background: 'rgba(139,174,102,0.07)', filter: 'blur(50px)',
                            pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: -30, left: -30, width: 120, height: 120,
                            borderRadius: '50%', background: 'rgba(139,174,102,0.05)', filter: 'blur(40px)',
                            pointerEvents: 'none',
                        }} />

                        {/* Form header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 12,
                                background: 'rgba(139,174,102,0.12)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#8BAE66', flexShrink: 0,
                            }}>
                                <Send size={16} />
                            </div>
                            <div>
                                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(139,174,102,0.6)', fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>Drop a message</p>
                                <p style={{ fontSize: 14, fontWeight: 700, color: '#EBD5AB', fontFamily: 'Inter, sans-serif' }}>I reply within 24 hours ✦</p>
                            </div>
                            <div style={{ flex: 1, height: 1, background: 'rgba(235,213,171,0.06)' }} />
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                            {/* Row 1: Name + Email */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                                <Field label="Full Name" id="name" name="name" value={form.name} onChange={handleChange} required />
                                <Field label="Email Address" id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
                            </div>

                            {/* Row 2: Contact back + Found via */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                                <Field
                                    label="Where can I contact you back?"
                                    id="contact_back" name="contact_back"
                                    value={form.contact_back} onChange={handleChange}
                                    placeholder="e.g. LinkedIn, WhatsApp, same email…"
                                />
                                <SelectField
                                    label="How did you find me?"
                                    id="found_via" name="found_via"
                                    value={form.found_via} onChange={handleChange}
                                    options={FOUND_OPTIONS}
                                />
                            </div>

                            {/* Subject */}
                            <Field
                                label="Subject / What's this about?"
                                id="subject" name="subject"
                                value={form.subject} onChange={handleChange}
                                placeholder="e.g. Freelance project, Job opportunity, Collab idea…"
                                required
                            />

                            {/* Message */}
                            <Field
                                label="Your Message"
                                id="message" name="message"
                                value={form.message} onChange={handleChange}
                                required rows={5}
                                placeholder="Tell me everything — the more detail, the better I can help."
                            />

                            {/* Submit */}
                            <AnimatePresence mode="wait">
                                <motion.button
                                    key={status}
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                                    whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.22 }}
                                    style={{
                                        width: '100%', padding: '16px 28px',
                                        borderRadius: 16, border: 'none',
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', gap: 10,
                                        fontSize: 13, fontWeight: 800,
                                        letterSpacing: '0.15em', textTransform: 'uppercase',
                                        fontFamily: 'Inter, sans-serif',
                                        cursor: status === 'idle' ? 'pointer' : 'default',
                                        background: status === 'success'
                                            ? 'rgba(98,129,65,0.9)'
                                            : status === 'error'
                                                ? 'rgba(180,50,40,0.8)'
                                                : status === 'sending'
                                                    ? 'rgba(139,174,102,0.5)'
                                                    : '#8BAE66',
                                        color: status === 'error' ? '#EBD5AB' : '#1B211A',
                                        boxShadow: status === 'idle' ? '0 8px 30px rgba(139,174,102,0.2)' : 'none',
                                        transition: 'background 0.3s, box-shadow 0.3s',
                                    }}
                                >
                                    {status === 'sending' && (
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                                            style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(27,33,26,0.3)', borderTop: '2px solid #1B211A', display: 'inline-block' }}
                                        />
                                    )}
                                    {status === 'success' && <CheckCircle size={17} />}
                                    {status === 'error' && <AlertCircle size={17} />}
                                    {status === 'idle' && <Send size={16} />}
                                    {status === 'idle' && 'Send Message'}
                                    {status === 'sending' && 'Sending…'}
                                    {status === 'success' && 'Message Sent — I\'ll be in touch!'}
                                    {status === 'error' && 'Failed — Please Try Again'}
                                </motion.button>
                            </AnimatePresence>

                            <p style={{
                                fontSize: 11, color: 'rgba(235,213,171,0.22)',
                                fontFamily: 'Inter, sans-serif', textAlign: 'center',
                                fontWeight: 400,
                            }}>
                                Your details are never shared or stored externally. Just between us ✦
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .contact-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 580px) {
                    .form-row { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
