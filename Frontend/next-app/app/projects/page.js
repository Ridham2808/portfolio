'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Figma as FigmaIcon, Search, Filter } from 'lucide-react';

const TABS = ['All', 'React / Full Stack', 'Figma / UI Design', 'HTML & CSS'];

const ALL_PROJECTS = [
    // React / Full Stack
    {
        title: 'Ironcore Gym',
        description: 'A gym management platform with gym details, membership plans, trainer info, BMI calculator, AI-based diet plans, and fitness blogs. Full MERN stack.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895481/uagv0dunqcqtqmmsqs6z.png',
        github: 'https://github.com/Ridham2808/ironcore_gym',
        preview: 'https://ironcore-gym-2.onrender.com/',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
        category: 'React / Full Stack',
    },
    {
        title: 'Data Explorer',
        description: 'A data exploration app with insights on meals, cocktails, Harry Potter universe, albums, sports teams, and banking data via multiple real-time APIs.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895464/fuda1jdna7g1acnzmpfc.png',
        github: 'https://github.com/Ridham2808/Data_explorer',
        preview: 'https://data-explorer-kn6w.onrender.com',
        technologies: ['React', 'Node.js', 'REST API', 'MongoDB'],
        category: 'React / Full Stack',
    },
    {
        title: 'YouTube Clone',
        description: 'A YouTube-inspired platform with search, video filtering by categories, playback with suggestions and sidebar navigation.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895518/ifo9rhikhmexnxz2ygdv.png',
        github: 'https://github.com/Ridham2808/Youtube-React',
        preview: 'https://youtube-react-5nna.onrender.com',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        category: 'React / Full Stack',
    },
    {
        title: 'Bamoka Industries Clone',
        description: 'A Bamoka Industries UI clone in React with professional layout, product showcase, and responsive design.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895450/tjsn0k7o7odxseqbsu7a.png',
        github: 'https://github.com/Ridham2808/Bamoka-Industries-React',
        preview: 'https://bamoka-industries-react.netlify.app/',
        technologies: ['React', 'Node.js', 'Responsive Design'],
        category: 'React / Full Stack',
    },
    {
        title: 'Spotify Clone',
        description: 'A Spotify UI clone with dark-themed design, playlist sections, and responsive music player layout.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895496/yriynva7qupk6gnhfcmj.png',
        github: 'https://github.com/Ridham2808/Spotify-React',
        technologies: ['React', 'Node.js', 'CSS'],
        category: 'React / Full Stack',
    },
    // Figma / UI Design
    {
        title: 'Ironcore Gym (Figma)',
        description: 'UI/UX design for the Ironcore Gym platform — membership plans, BMI tools, fitness blogs. Full design system.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888624/rkkaw5ixxwkhg8tn4ckl.png',
        figma: 'https://www.figma.com/design/xx6t46xMZOAVmXsBXRbliP/Ironcore-Gym?node-id=0-1',
        technologies: ['Figma', 'Prototyping', 'UI/UX'],
        category: 'Figma / UI Design',
    },
    {
        title: 'DocuMorph',
        description: 'Document scanning & comparison platform design with similarity highlighting, bulk processing, and clean UI.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1741255758/Screenshot_2025-03-06_153758_tcuw5i.png',
        figma: 'https://www.figma.com/design/dDZOorjYWbhPg7yKGxtpic/DocuMorph?node-id=0-1',
        technologies: ['Figma', 'Prototyping', 'UI/UX'],
        category: 'Figma / UI Design',
    },
    {
        title: 'CodingGita',
        description: 'Fully animated Figma design — Home, Bootcamp, Contact, About, with scrollable overlays and hover effects.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888440/flnic7pnzmg1ofiizuml.png',
        figma: 'https://www.figma.com/design/RdZHGbiXDFn75Mc8cTC40K/CodingGita?node-id=0-1',
        technologies: ['Figma', 'Wireframing', 'Design System'],
        category: 'Figma / UI Design',
    },
    {
        title: 'Instagram Clone',
        description: 'Instagram UI clone — story highlights, dynamic feed, user profiles, modern social media design.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888593/swhcqzizianbpa5xvu80.png',
        figma: 'https://www.figma.com/design/hyb8A5mWFKgQToD7YWeGry/Instagram?node-id=0-1',
        technologies: ['Figma', 'UI Design'],
        category: 'Figma / UI Design',
    },
    {
        title: 'Amazon Clone',
        description: 'Amazon shopping experience design — product listings, cart, user auth. Optimized for intuitive e-commerce navigation.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888392/amnmqdoo1383wgsebyem.png',
        figma: 'https://www.figma.com/design/FROVsJRuptn0lvRybHFMV0/amazon?node-id=0-1',
        technologies: ['Figma', 'Wireframing', 'Design System'],
        category: 'Figma / UI Design',
    },
    {
        title: 'Netflix Clone',
        description: 'Netflix UI design — homepage, categories, interactive previews, watchlist. Modern streaming experience.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888670/fbzdibcpzdnvxm3t5xso.png',
        figma: 'https://www.figma.com/design/MDRkCvsN7P0eg1E7hxxuF3/Netflix?node-id=0-1',
        technologies: ['Figma', 'Prototyping', 'UI/UX'],
        category: 'Figma / UI Design',
    },
    // HTML / CSS
    {
        title: 'Godesi Website',
        description: 'A Godesi website clone using HTML/CSS with auto-scrolling sidebar, hover effects, and traditional design.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894688/vsly8jnuoryzbxr0b21g.png',
        github: 'https://github.com/Ridham2808/godesi',
        preview: 'https://godesi.netlify.app/',
        technologies: ['HTML5', 'CSS3', 'Responsive'],
        category: 'HTML & CSS',
    },
    {
        title: 'Hourly Hotels',
        description: 'A static hotel listing website with clean layout, hotel cards, and responsive design.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894704/zoy2wyoq8psfznqpeb0q.png',
        github: 'https://github.com/Ridham2808/hourly-hotels',
        preview: 'https://hourly-hotels.netlify.app',
        technologies: ['HTML5', 'CSS3'],
        category: 'HTML & CSS',
    },
    {
        title: 'Chess Game UI',
        description: 'A classic Chess board UI with accurate piece layout built purely in HTML/CSS.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894652/a1sa17rdasr77a5ndo7j.png',
        github: 'https://github.com/Ridham2808/Clone/tree/main/Chess',
        preview: 'https://ridhamchess.netlify.app/',
        technologies: ['HTML5', 'CSS3', 'Responsive'],
        category: 'HTML & CSS',
    },
    {
        title: 'Calculator',
        description: 'A functional calculator with arithmetic operations, clean UI, and keyboard support.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894636/unwpoek85uyswuhh9axa.png',
        github: 'https://github.com/Ridham2808/Clone/tree/main/calculator',
        preview: 'https://ridhamcalc.netlify.app/',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        category: 'HTML & CSS',
    },
    {
        title: 'Ludo Game UI',
        description: 'A colorful Ludo board UI with player tokens and visually appealing static design.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894715/j1k1zhkamjzu9itbkupi.png',
        github: 'https://github.com/Ridham2808/Clone/tree/main/ludo',
        preview: 'https://ridhamludo.netlify.app/',
        technologies: ['HTML5', 'CSS3', 'Flexbox'],
        category: 'HTML & CSS',
    },
];

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-[28px] overflow-hidden flex flex-col h-full"
            style={{
                background: 'rgba(235,213,171,0.03)',
                border: '1px solid rgba(235,213,171,0.07)',
                transition: 'border-color 0.4s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(139,174,102,0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(235,213,171,0.07)'}
        >
            {/* Image */}
            <div className="relative overflow-hidden h-52">
                <div className="absolute inset-0 bg-[#1B211A]/20 z-10 group-hover:bg-transparent transition-all duration-500" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Overlay with links */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(27,33,26,0.7)', backdropFilter: 'blur(4px)' }}>
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1B211A] border border-[#8BAE66]/40 text-[#8BAE66] hover:bg-[#8BAE66] hover:text-[#1B211A] transition-all">
                            <Github size={18} />
                        </a>
                    )}
                    {project.preview && (
                        <a href={project.preview} target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1B211A] border border-[#8BAE66]/40 text-[#8BAE66] hover:bg-[#8BAE66] hover:text-[#1B211A] transition-all">
                            <ExternalLink size={18} />
                        </a>
                    )}
                    {project.figma && (
                        <a href={project.figma} target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1B211A] border border-[#8BAE66]/40 text-[#8BAE66] hover:bg-[#8BAE66] hover:text-[#1B211A] transition-all">
                            <FigmaIcon size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
                            style={{ background: 'rgba(139,174,102,0.1)', border: '1px solid rgba(139,174,102,0.2)', color: '#8BAE66' }}>
                            {t}
                        </span>
                    ))}
                </div>
                <h3 className="text-lg font-bold text-[#EBD5AB] mb-2 leading-tight">{project.title}</h3>
                <p className="text-sm text-[#EBD5AB]/55 leading-relaxed font-light flex-1">{project.description}</p>
            </div>
        </motion.div>
    );
}

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState('All');
    const filtered = useMemo(
        () => activeTab === 'All' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.category === activeTab),
        [activeTab]
    );

    return (
        <div className="min-h-screen px-6 pb-32">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 text-center"
                >
                    <p className="section-eyebrow mb-4">What I've Built</p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#EBD5AB] mb-6">
                        Selected <span className="text-[#8BAE66]">Works</span>.
                    </h1>
                    <p className="text-[#EBD5AB]/50 text-lg font-light max-w-xl mx-auto">
                        A collection of projects spanning full-stack apps, UI/UX designs, and web experiments.
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-14"
                >
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="relative px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                            style={{
                                background: activeTab === tab ? '#8BAE66' : 'rgba(235,213,171,0.05)',
                                color: activeTab === tab ? '#1B211A' : 'rgba(235,213,171,0.5)',
                                border: `1px solid ${activeTab === tab ? '#8BAE66' : 'rgba(235,213,171,0.1)'}`,
                            }}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="tabIndicator"
                                    className="absolute inset-0 rounded-full -z-10"
                                    style={{ background: '#8BAE66' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Projects grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.title} project={project} index={i} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-[#EBD5AB]/25 text-xs font-bold tracking-widest uppercase mt-12"
                >
                    {filtered.length} project{filtered.length !== 1 ? 's' : ''} shown
                </motion.p>
            </div>
        </div>
    );
}
