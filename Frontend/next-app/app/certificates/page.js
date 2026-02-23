'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy, Code2, BookOpen, Star, Laptop,
    ExternalLink, Github, Eye, Award, Folder,
} from 'lucide-react';
import TabButton from '@/components/TabButton';

// ─── Helpers ────────────────────────────────────────
const driveThumb = (id) => `https://lh3.googleusercontent.com/d/${id}=w800`;
const driveView = (id) => `https://drive.google.com/file/d/${id}/view`;
const microlink = (url) => `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`;

// ─── Certificate Data ─────────────────────────────────────────────
const CERTS = {
    hackathon: [
        {
            title: 'Indradhanu',
            issuer: 'Hackathon',
            year: '2026',
            desc: 'Won a certificate for building Clima Predict — an AI-powered climate & weather prediction web app at a competitive hackathon.',
            tags: ['React', 'Node.js', 'ML', 'MongoDB'],
            certUrl: driveView('1hoV8Q_8xq8CAVRxo8CWeDTyej61K221L'),
            img: driveThumb('1hoV8Q_8xq8CAVRxo8CWeDTyej61K221L'),
            links: [
                { label: 'Certificate', icon: Award, url: driveView('1hoV8Q_8xq8CAVRxo8CWeDTyej61K221L') },
                { label: 'GitHub', icon: Github, url: 'https://github.com/Ridham2808/clima_predict' },
                { label: 'Glimpses', icon: Folder, url: 'https://drive.google.com/drive/folders/1yAyLBC_1w892G37QqqTW-n-KRdyzmNuP' },
            ],
        },
        {
            title: "Hackatron (Infotsav'25)",
            issuer: 'Hackathon',
            year: '2025',
            desc: 'Certificate for building SmartReq AI — a tool that uses AI to auto-generate and validate software requirement specifications.',
            tags: ['React', 'AI', 'Node.js', 'Express'],
            certUrl: driveView('1Sdz99JAe39lNdFvFaKDm9CsFEFTxdZId'),
            img: driveThumb('1Sdz99JAe39lNdFvFaKDm9CsFEFTxdZId'),
            links: [
                { label: 'Certificate', icon: Award, url: driveView('1Sdz99JAe39lNdFvFaKDm9CsFEFTxdZId') },
                { label: 'GitHub', icon: Github, url: 'https://github.com/Ridham2808/SmartReq-AI' },
            ],
        },
        {
            title: 'Wreckathon',
            issuer: 'Hackathon',
            year: '2025',
            desc: 'Participated and delivered a working project in a competitive hackathon, showcasing full-stack development skills under time constraints.',
            tags: ['Full Stack', 'Teamwork', 'Problem Solving'],
            certUrl: driveView('1xPCa_z2s4fmpY0YVDSQWBI1cvmkpOuoX'),
            img: driveThumb('1xPCa_z2s4fmpY0YVDSQWBI1cvmkpOuoX'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1xPCa_z2s4fmpY0YVDSQWBI1cvmkpOuoX') }],
        },
        {
            title: 'Ideathon',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['Innovation', 'Tech', 'Development'],
            certUrl: driveView('1l4fSyAomolNFB4ryCDSFRs2qDb5TZ07H'),
            img: driveThumb('1l4fSyAomolNFB4ryCDSFRs2qDb5TZ07H'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1l4fSyAomolNFB4ryCDSFRs2qDb5TZ07H') }],
        },
        {
            title: 'Troubleshoot Ideathon',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['Rapid Dev', 'Collaboration'],
            certUrl: driveView('1h7B6lr60pLjO7X8vwksRygi50fiV75kX'),
            img: driveThumb('1h7B6lr60pLjO7X8vwksRygi50fiV75kX'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1h7B6lr60pLjO7X8vwksRygi50fiV75kX') }],
        },
        {
            title: 'Hackground India 2K25',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['Web Dev', 'Competition'],
            certUrl: driveView('10J0il0KL8kF4aq54a8dw9i0VCUN1Dvsl'),
            img: driveThumb('10J0il0KL8kF4aq54a8dw9i0VCUN1Dvsl'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('10J0il0KL8kF4aq54a8dw9i0VCUN1Dvsl') }],
        },
        {
            title: 'Code Crucible 5.0 Hackathon',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['MERN', 'UI/UX'],
            certUrl: driveView('1fdq0Ivx3Zbe2gTmK6tj7eh_X31-H1bop'),
            img: driveThumb('1fdq0Ivx3Zbe2gTmK6tj7eh_X31-H1bop'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1fdq0Ivx3Zbe2gTmK6tj7eh_X31-H1bop') }],
        },
        {
            title: "Hackout'25",
            issuer: 'Hackathon',
            year: '2025',
            tags: ['Prototype', 'Execution'],
            certUrl: driveView('19jNouLJAhRE08yQXOsqqEv72coNiYELV'),
            img: driveThumb('19jNouLJAhRE08yQXOsqqEv72coNiYELV'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('19jNouLJAhRE08yQXOsqqEv72coNiYELV') }],
        },
        {
            title: 'HackShastra',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['React', 'Node.js'],
            certUrl: driveView('1KfdrXqbHT5wq2bgjhN16i3O5nRl7-D-h'),
            img: driveThumb('1KfdrXqbHT5wq2bgjhN16i3O5nRl7-D-h'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1KfdrXqbHT5wq2bgjhN16i3O5nRl7-D-h') }],
        },
        {
            title: 'Paranox 2.0',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['Innovation', 'MERN Stack'],
            certUrl: driveView('1UD2pqCZWgZxQ1RWZayYafmLYJ1qE3f6R'),
            img: driveThumb('1UD2pqCZWgZxQ1RWZayYafmLYJ1qE3f6R'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1UD2pqCZWgZxQ1RWZayYafmLYJ1qE3f6R') }],
        },
        {
            title: 'ThrizlI-BuiId to Bond',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['Tech Competition', 'Web App'],
            certUrl: driveView('1jQpzqoFH3MB8j7Jn47GNOIZt59lrP-sJ'),
            img: driveThumb('1jQpzqoFH3MB8j7Jn47GNOIZt59lrP-sJ'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1jQpzqoFH3MB8j7Jn47GNOIZt59lrP-sJ') }],
        },
        {
            title: 'Ctrl+Space',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['Frontend', 'Backend', 'API'],
            certUrl: driveView('13JO5VKnl5Z4c7t0h1Bax_aHgyaT-CeYm'),
            img: driveThumb('13JO5VKnl5Z4c7t0h1Bax_aHgyaT-CeYm'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('13JO5VKnl5Z4c7t0h1Bax_aHgyaT-CeYm') }],
        },
        {
            title: 'A2hackfest',
            issuer: 'Hackathon',
            year: '2025',
            tags: ['Development', 'Competition'],
            certUrl: driveView('1wtY6IHgCd4vBJxoRhK0cRwuBxSe8IYxA'),
            img: driveThumb('1wtY6IHgCd4vBJxoRhK0cRwuBxSe8IYxA'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1wtY6IHgCd4vBJxoRhK0cRwuBxSe8IYxA') }],
        },
    ],

    hackerrank: [
        { title: 'Frontend Developer (React)', issuer: 'HackerRank', year: '2025', desc: 'Certified as a Frontend Developer specialising in React — covers React, CSS, and JavaScript in a role-based certification test.', tags: ['React', 'CSS', 'JavaScript'], certUrl: 'https://www.hackerrank.com/certificates/b7ddc71a33fe', img: microlink('https://www.hackerrank.com/certificates/b7ddc71a33fe'), links: [{ label: 'Verify', icon: ExternalLink, url: 'https://www.hackerrank.com/certificates/b7ddc71a33fe' }] },
        { title: 'Problem Solving (Intermediate)', issuer: 'HackerRank', year: '2025', desc: 'Certified in Problem Solving — covers HashMaps, Stacks, Queues, and algorithmic optimal solutions.', tags: ['DSA', 'Algorithms', 'Data Structures'], certUrl: 'https://www.hackerrank.com/certificates/8b24696f9144', img: microlink('https://www.hackerrank.com/certificates/8b24696f9144'), links: [{ label: 'Verify', icon: ExternalLink, url: 'https://www.hackerrank.com/certificates/8b24696f9144' }] },
        { title: 'JavaScript (Intermediate)', issuer: 'HackerRank', year: '2025', desc: 'Certified in JavaScript — covers Design Patterns, Memory Management, Concurrency Model, and Event Loops.', tags: ['JavaScript', 'Design Patterns', 'Concurrency'], certUrl: 'https://www.hackerrank.com/certificates/051116f7ebec', img: microlink('https://www.hackerrank.com/certificates/051116f7ebec'), links: [{ label: 'Verify', icon: ExternalLink, url: 'https://www.hackerrank.com/certificates/051116f7ebec' }] },
        { title: 'React (Basic)', issuer: 'HackerRank', year: '2025', desc: 'Certified in React Basics — covers Routing, Rendering, State Management, Event Handling, ES6, and Form Validation.', tags: ['React', 'ES6', 'JSX'], certUrl: 'https://www.hackerrank.com/certificates/a2de1fde147e', img: microlink('https://www.hackerrank.com/certificates/a2de1fde147e'), links: [{ label: 'Verify', icon: ExternalLink, url: 'https://www.hackerrank.com/certificates/a2de1fde147e' }] },
        { title: 'Node.js (Intermediate)', issuer: 'HackerRank', year: '2025', desc: 'Certified in Node.js — covers Event-Driven Architecture, Concurrency Model, and async execution patterns.', tags: ['Node.js', 'Backend', 'Event Loop'], certUrl: 'https://www.hackerrank.com/certificates/3833612f5634', img: microlink('https://www.hackerrank.com/certificates/3833612f5634'), links: [{ label: 'Verify', icon: ExternalLink, url: 'https://www.hackerrank.com/certificates/3833612f5634' }] },
        { title: 'REST API (Intermediate)', issuer: 'HackerRank', year: '2025', desc: 'Certified in REST API — covers fetching data, pagination, filtering, and processing API responses efficiently.', tags: ['REST API', 'HTTP', 'JSON'], certUrl: 'https://www.hackerrank.com/certificates/ebb50d86aec2', img: microlink('https://www.hackerrank.com/certificates/ebb50d86aec2'), links: [{ label: 'Verify', icon: ExternalLink, url: 'https://www.hackerrank.com/certificates/ebb50d86aec2' }] },
        { title: 'SQL (Advanced)', issuer: 'HackerRank', year: '2025', desc: 'Certified in Advanced SQL — covers query optimisation, data modelling, indexing, window functions, and pivots.', tags: ['SQL', 'Query Optimization', 'Databases'], certUrl: 'https://www.hackerrank.com/certificates/18720126d40a', img: microlink('https://www.hackerrank.com/certificates/18720126d40a'), links: [{ label: 'Verify', icon: ExternalLink, url: 'https://www.hackerrank.com/certificates/18720126d40a' }] },
        { title: 'CSS (Basic)', issuer: 'HackerRank', year: '2025', desc: 'Certified in CSS Basics — covers Cascading & Inheritance, text styling, layouts, and the CSS box model.', tags: ['CSS', 'Layouts', 'Box Model'], certUrl: 'https://www.hackerrank.com/certificates/70221f07ea81', img: microlink('https://www.hackerrank.com/certificates/70221f07ea81'), links: [{ label: 'Verify', icon: ExternalLink, url: 'https://www.hackerrank.com/certificates/70221f07ea81' }] },
    ],

    simplilearn: [
        {
            title: 'Azure Fundamentals',
            issuer: 'SimpliLearn SkillUp',
            year: '2025',
            desc: 'Completed the Azure Fundamentals course — covers core Microsoft Azure cloud concepts, services, and deployment models.',
            tags: ['Azure', 'Cloud', 'Microsoft'],
            certUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzI4IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQyMDIzNl84Njk5NTM0MTc0ODg3NDQ5MDEwOS5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion',
            img: 'https://certificates.simplicdn.net/share/8420236_86995341748874490109.png',
            links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzI4IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQyMDIzNl84Njk5NTM0MTc0ODg3NDQ5MDEwOS5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion' }],
        },
        {
            title: 'GitHub Copilot Fundamentals',
            issuer: 'SimpliLearn SkillUp',
            year: '2025',
            desc: 'Completed GitHub Copilot Fundamentals — covers AI-assisted code generation, coding principles, and human-AI collaboration.',
            tags: ['GitHub Copilot', 'AI Coding', 'Productivity'],
            certUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0ODc2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQyMzgyNF84Njk5NTM0MTc0ODk1NjgyNDcwMS5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion',
            img: 'https://certificates.simplicdn.net/share/8423824_86995341748956824701.png',
            links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0ODc2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQyMzgyNF84Njk5NTM0MTc0ODk1NjgyNDcwMS5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion' }],
        },
        {
            title: 'Deep Dive on Container Security',
            issuer: 'SimpliLearn SkillUp',
            year: '2025',
            desc: 'Completed a deep dive on container security — covers Docker container security best practices, threat models, and secure deployment.',
            tags: ['Docker', 'Security', 'DevOps'],
            certUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDk1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzNDYyNF84Njk5NTM0MTc0OTE5NTE1OTk4MC5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion',
            img: 'https://certificates.simplicdn.net/share/8434624_86995341749195159980.png',
            links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDk1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzNDYyNF84Njk5NTM0MTc0OTE5NTE1OTk4MC5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion' }],
        },
        {
            title: 'Getting Started with Gateway Load Balancer',
            issuer: 'SimpliLearn SkillUp',
            year: '2025',
            desc: 'Completed the AWS Gateway Load Balancer course — covers traffic distribution, high availability, and cloud load balancing.',
            tags: ['AWS', 'Cloud', 'Networking'],
            certUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NTg2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzNDYyN184Njk5NTM0MTc0OTE5NTI0NTA5Ny5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion',
            img: 'https://certificates.simplicdn.net/share/8434627_86995341749195245097.png',
            links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NTg2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzNDYyN184Njk5NTM0MTc0OTE5NTI0NTA5Ny5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion' }],
        },
        {
            title: 'Getting Started with Amazon DocumentDB',
            issuer: 'SimpliLearn SkillUp',
            year: '2025',
            desc: 'Completed the Amazon DocumentDB (with MongoDB compatibility) course — covers NoSQL databases on AWS cloud.',
            tags: ['AWS', 'MongoDB', 'NoSQL', 'Database'],
            certUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDkwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzNDYxNF84Njk5NTM0MTc0OTE5NDk5OTQyOS5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion',
            img: 'https://certificates.simplicdn.net/share/8434614_86995341749194999429.png',
            links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDkwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzNDYxNF84Njk5NTM0MTc0OTE5NDk5OTQyOS5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion' }],
        },
        {
            title: 'Introduction to the Basics of Azure Services',
            issuer: 'SimpliLearn SkillUp',
            year: '2025',
            desc: 'Completed introduction to Azure cloud services — covers compute, storage, networking, and core Azure building blocks.',
            tags: ['Azure', 'Cloud', 'Services'],
            certUrl: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIyMDEwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQyMzQ3MF84Njk5NTM0MTc0ODk0NzYyNzg2NS5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion',
            img: 'https://certificates.simplicdn.net/share/8423470_86995341748947627865.png',
            links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIyMDEwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQyMzQ3MF84Njk5NTM0MTc0ODk0NzYyNzg2NS5wbmciLCJ1c2VybmFtZSI6IlJpZGhhbSBQYXRlbCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion' }],
        },
    ],

    sololearn: [
        { title: 'Introduction to C', issuer: 'SoloLearn', year: '2025', desc: 'Completed the C programming fundamentals course — variables, control flow, functions, pointers, and memory management.', tags: ['C', 'Programming', 'Fundamentals'], certUrl: 'https://www.sololearn.com/certificates/CC-W86NEPD6', img: microlink('https://www.sololearn.com/certificates/CC-W86NEPD6'), links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.sololearn.com/certificates/CC-W86NEPD6' }] },
        { title: 'Introduction to HTML', issuer: 'SoloLearn', year: '2025', desc: 'Completed HTML fundamentals — semantic structure, forms, tables, media elements, and building web page foundations.', tags: ['HTML', 'Web', 'Frontend'], certUrl: 'https://www.sololearn.com/certificates/CC-KKAA6DPI', img: microlink('https://www.sololearn.com/certificates/CC-KKAA6DPI'), links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.sololearn.com/certificates/CC-KKAA6DPI' }] },
        { title: 'Introduction to CSS', issuer: 'SoloLearn', year: '2025', desc: 'Completed CSS course — styling, selectors, flexbox, grid, animations, and responsive design techniques.', tags: ['CSS', 'Styling', 'Responsive'], certUrl: 'https://www.sololearn.com/certificates/CC-CAC0BRIF', img: microlink('https://www.sololearn.com/certificates/CC-CAC0BRIF'), links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.sololearn.com/certificates/CC-CAC0BRIF' }] },
        { title: 'Introduction to JavaScript', issuer: 'SoloLearn', year: '2025', desc: 'Completed JavaScript course — variables, functions, DOM manipulation, events, and ES6+ concepts.', tags: ['JavaScript', 'ES6', 'DOM'], certUrl: 'https://www.sololearn.com/certificates/CC-1HDZE1F1', img: microlink('https://www.sololearn.com/certificates/CC-1HDZE1F1'), links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.sololearn.com/certificates/CC-1HDZE1F1' }] },
        { title: 'Introduction to C++', issuer: 'SoloLearn', year: '2025', desc: 'Completed C++ fundamentals — OOP concepts, classes, inheritance, templates, and STL containers.', tags: ['C++', 'OOP', 'STL'], certUrl: 'https://www.sololearn.com/certificates/CC-QNWQQ47S', img: microlink('https://www.sololearn.com/certificates/CC-QNWQQ47S'), links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.sololearn.com/certificates/CC-QNWQQ47S' }] },
        { title: 'Web Development', issuer: 'SoloLearn', year: '2025', desc: 'Completed the full Web Development course — HTML, CSS, JavaScript integrated into building complete web applications.', tags: ['HTML', 'CSS', 'JavaScript', 'Web Dev'], certUrl: 'https://www.sololearn.com/certificates/CC-LTUKJ7LW', img: microlink('https://www.sololearn.com/certificates/CC-LTUKJ7LW'), links: [{ label: 'Certificate', icon: ExternalLink, url: 'https://www.sololearn.com/certificates/CC-LTUKJ7LW' }] },
    ],

    internship: [
        {
            title: 'AI-ML Virtual Internship',
            issuer: 'Virtual Internship Program',
            year: '2025',
            desc: 'Completed a virtual internship — applied web development skills in a real-world project environment, building features end-to-end.',
            tags: ['Web Dev', 'Internship', 'Real World'],
            certUrl: driveView('1rQlaBc9ycyUbd-aCo5vTitDf5Eug2fu2'),
            img: driveThumb('1rQlaBc9ycyUbd-aCo5vTitDf5Eug2fu2'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1rQlaBc9ycyUbd-aCo5vTitDf5Eug2fu2') }],
        },
        {
            title: 'Generative AI Virtual Internship',
            issuer: 'Virtual Internship Program',
            year: '2025',
            desc: 'Successfully completed a virtual internship program, demonstrating professional-level development skills in a team environment.',
            tags: ['Development', 'Teamwork', 'Professional'],
            certUrl: driveView('1j27QuCzFZ6k-F9i6RXJ6wqFcUabBHZ_1'),
            img: driveThumb('1j27QuCzFZ6k-F9i6RXJ6wqFcUabBHZ_1'),
            links: [{ label: 'Certificate', icon: Award, url: driveView('1j27QuCzFZ6k-F9i6RXJ6wqFcUabBHZ_1') }],
        },
    ],
};

const TABS = [
    { id: 'hackathon', label: 'Hackathon', icon: Trophy, count: CERTS.hackathon.length },
    { id: 'hackerrank', label: 'HackerRank', icon: Code2, count: CERTS.hackerrank.length },
    { id: 'simplilearn', label: 'SimpliLearn', icon: BookOpen, count: CERTS.simplilearn.length },
    { id: 'sololearn', label: 'SoloLearn', icon: Star, count: CERTS.sololearn.length },
    { id: 'internship', label: 'Virtual Internship', icon: Laptop, count: CERTS.internship.length },
];

// ─── Platform colour accents ──────────────────────────────────────
const PLATFORM_COLOR = {
    hackathon: '#F5A623',
    hackerrank: '#2EC866',
    simplilearn: '#FF6B35',
    sololearn: '#149FBF',
    internship: '#8BAE66',
};

// ─── Image with proper error fallback ───────────────────────────
function CertImg({ src, alt, accent, issuer }) {
    const [failed, setFailed] = useState(false);
    if (!src || failed) {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={28} style={{ color: accent, opacity: 0.7 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: `${accent}60`, fontFamily: 'Inter, sans-serif' }}>{issuer}</span>
            </div>
        );
    }
    return (
        <>
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} onError={() => setFailed(true)} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,33,26,0.7) 10%, transparent 70%)' }} />
        </>
    );
}

// ─── Unique hover: card reveals back with details, links, tags ────
function CertCard({ cert, index, platform }) {
    const [flipped, setFlipped] = useState(false);
    const accent = PLATFORM_COLOR[platform] ?? '#8BAE66';

    return (
        <div
            style={{ perspective: 1000, height: 320 }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                style={{
                    width: '100%', height: '100%',
                    position: 'relative', transformStyle: 'preserve-3d',
                    transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
                }}
            >
                {/* ─ FRONT ─ */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 24,
                    background: 'rgba(235,213,171,0.03)',
                    border: `1px solid rgba(235,213,171,0.09)`,
                    overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                }}>
                    {/* Top image */}
                    <div style={{
                        height: 160, flexShrink: 0, position: 'relative',
                        background: cert.img ? 'rgba(27,33,26,0.9)' : `linear-gradient(135deg, ${accent}12 0%, rgba(27,33,26,0.95) 100%)`,
                        overflow: 'hidden',
                    }}>
                        <CertImg src={cert.img} alt={cert.title} accent={accent} issuer={cert.issuer} />

                        {/* Accent badge top-right */}
                        <div style={{
                            position: 'absolute', top: 12, right: 12,
                            padding: '3px 10px', borderRadius: 100,
                            background: `${accent}22`,
                            border: `1px solid ${accent}40`,
                            fontSize: 9, fontWeight: 800,
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: accent, fontFamily: 'Inter, sans-serif',
                        }}>{cert.year}</div>
                    </div>

                    {/* Bottom text */}
                    <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: `${accent}80`, fontFamily: 'Inter, sans-serif', marginBottom: 6 }}>
                            {cert.issuer}
                        </p>
                        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#EBD5AB', lineHeight: 1.3, fontFamily: 'Inter, sans-serif', marginBottom: 0 }}>
                            {cert.title}
                        </h3>
                    </div>

                    {/* Bottom accent line */}
                    <div style={{ height: 2, background: `linear-gradient(90deg, ${accent}60, transparent)` }} />
                </div>

                {/* ─ BACK ─ */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: 24,
                    background: `linear-gradient(145deg, rgba(27,33,26,0.98) 0%, ${accent}0F 100%)`,
                    border: `1px solid ${accent}35`,
                    padding: '24px 22px',
                    display: 'flex', flexDirection: 'column', gap: 14,
                    boxShadow: `0 0 0 1px ${accent}10, 0 20px 60px rgba(0,0,0,0.4)`,
                    overflow: 'hidden',
                }}>
                    {/* Glow */}
                    <div style={{
                        position: 'absolute', top: -30, right: -30, width: 120, height: 120,
                        borderRadius: '50%', background: `${accent}15`, filter: 'blur(40px)',
                        pointerEvents: 'none',
                    }} />

                    <div>
                        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', color: `${accent}80`, fontFamily: 'Inter, sans-serif', marginBottom: 6 }}>
                            {cert.issuer} · {cert.year}
                        </p>
                        <h3 style={{ fontSize: 13, fontWeight: 800, color: '#EBD5AB', lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>
                            {cert.title}
                        </h3>
                    </div>

                    <p style={{ fontSize: 12, color: 'rgba(235,213,171,0.5)', lineHeight: 1.7, fontWeight: 300, fontFamily: 'Inter, sans-serif', flex: 1 }}>
                        {cert.desc}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {cert.tags.map(t => (
                            <span key={t} style={{
                                fontSize: 9, fontWeight: 700, letterSpacing: '0.15em',
                                textTransform: 'uppercase', padding: '3px 10px',
                                borderRadius: 100, background: `${accent}12`,
                                border: `1px solid ${accent}25`, color: accent,
                                fontFamily: 'Inter, sans-serif',
                            }}>{t}</span>
                        ))}
                    </div>

                    {/* Links row */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {cert.links.map(({ label, icon: Icon, url }) => (
                            <a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '7px 14px', borderRadius: 10,
                                    background: label === cert.links[0].label ? accent : 'rgba(235,213,171,0.05)',
                                    border: `1px solid ${label === cert.links[0].label ? accent : 'rgba(235,213,171,0.1)'}`,
                                    color: label === cert.links[0].label ? '#1B211A' : 'rgba(235,213,171,0.6)',
                                    fontSize: 10, fontWeight: 800,
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                    textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <Icon size={11} />
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function CertificatesPage() {
    const [active, setActive] = useState('hackathon');
    const certs = CERTS[active] ?? [];
    const accent = PLATFORM_COLOR[active] ?? '#8BAE66';

    return (
        <div style={{ minHeight: '100vh', padding: '60px 24px 100px', position: 'relative' }}>

            {/* Background glow shifts with tab */}
            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accent}12 0%, transparent 65%)`,
                transition: 'background 0.5s',
            }} />

            <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>

                {/* ══ HEADER ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: 72, textAlign: 'center' }}
                >
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#8BAE66', marginBottom: 18, fontFamily: 'Inter, sans-serif' }}>
                        Verified Credentials
                    </p>
                    <h1 style={{ fontSize: 'clamp(44px, 7vw, 86px)', fontWeight: 900, letterSpacing: '-0.05em', color: '#EBD5AB', lineHeight: 1.0, fontFamily: 'Inter, sans-serif', marginBottom: 20 }}>
                        My <em style={{ fontStyle: 'italic', color: '#8BAE66' }}>Certificates.</em>
                    </h1>
                    <p style={{ fontSize: 17, color: 'rgba(235,213,171,0.42)', fontWeight: 300, maxWidth: 480, lineHeight: 1.85, fontFamily: 'Inter, sans-serif', margin: '0 auto' }}>
                        Hover any card to see the details, skills, and links — certificates earned across hackathons, competitive platforms, and online courses.
                    </p>
                </motion.div>

                {/* ══ TABS ══ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 64 }}
                >
                    {TABS.map(({ id, label, icon: Icon, count }) => (
                        <TabButton
                            key={id}
                            id={id}
                            label={label}
                            count={count}
                            active={active}
                            color={PLATFORM_COLOR[id]}
                            icon={Icon}
                            onClick={() => setActive(id)}
                        />
                    ))}
                </motion.div>

                {/* ══ CARDS GRID ══ */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 20,
                        }}
                        className="certs-grid"
                    >
                        {certs.map((cert, i) => (
                            <CertCard key={cert.title + i} cert={cert} index={i} platform={active} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ textAlign: 'center', marginTop: 48, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(235,213,171,0.2)', fontFamily: 'Inter, sans-serif' }}
                >
                    {certs.length} certificate{certs.length !== 1 ? 's' : ''} — {TABS.find(t => t.id === active)?.label}
                </motion.p>
            </div>

            <style>{`
                @media (max-width: 960px) { .certs-grid { grid-template-columns: repeat(2,1fr) !important; } }
                @media (max-width: 600px) { .certs-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </div>
    );
}
