const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./projectModel');

dotenv.config();

const PROJECTS = [
    // ─── React / Full Stack ───────────────────────────────────────
    {
        title: 'Ironcore Gym',
        description: 'A gym management platform providing users with gym details, membership plans, trainers information, wellness tools like BMI calculator & AI-based diet plans, and fitness blogs. Reduces the need for physical gym inquiries.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895481/uagv0dunqcqtqmmsqs6z.png',
        github: 'https://github.com/Ridham2808/ironcore_gym',
        preview: 'https://ironcore-gym-2.onrender.com/',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
        category: 'React / Full Stack',
        featured: true,
    },
    {
        title: 'Data Explorer',
        description: 'A data exploration app offering insights into meals, cocktails, Harry Potter universe, albums, sports teams, and banking details. Fetches real-time data from various APIs.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895464/fuda1jdna7g1acnzmpfc.png',
        github: 'https://github.com/Ridham2808/Data_explorer',
        preview: 'https://data-explorer-kn6w.onrender.com',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        category: 'React / Full Stack',
        featured: true,
    },
    {
        title: 'YouTube Clone',
        description: 'A YouTube-inspired platform allowing users to search, view, and filter videos dynamically based on categories and search queries.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895518/ifo9rhikhmexnxz2ygdv.png',
        github: 'https://github.com/Ridham2808/Youtube-React',
        preview: 'https://youtube-react-5nna.onrender.com',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        category: 'React / Full Stack',
    },
    {
        title: 'Bamoka Industries Clone',
        description: 'A Bamoka Industries UI clone built in React, featuring a professional layout, product showcase, and responsive design.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895450/tjsn0k7o7odxseqbsu7a.png',
        github: 'https://github.com/Ridham2808/Bamoka-Industries-React',
        preview: 'https://bamoka-industries-react.netlify.app/',
        technologies: ['React', 'Node.js'],
        category: 'React / Full Stack',
    },
    {
        title: 'Spotify Clone',
        description: 'A static Spotify UI clone built in React, featuring a modern dark-themed design, playlist sections, and a responsive music player layout.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895496/yriynva7qupk6gnhfcmj.png',
        github: 'https://github.com/Ridham2808/Spotify-React',
        technologies: ['React', 'Node.js'],
        category: 'React / Full Stack',
    },
    // ─── Figma / UI Design ────────────────────────────────────────
    {
        title: 'Ironcore Gym (Figma)',
        description: 'A gym management platform UI design with membership plans, BMI tools, fitness blogs and a complete design system.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888624/rkkaw5ixxwkhg8tn4ckl.png',
        figma: 'https://www.figma.com/design/xx6t46xMZOAVmXsBXRbliP/Ironcore-Gym?node-id=0-1',
        technologies: ['Figma', 'Prototyping', 'UI/UX'],
        category: 'Figma / UI Design',
        featured: true,
    },
    {
        title: 'DocuMorph',
        description: 'Document scanning and comparison platform with similarity highlighting, bulk processing, and secure handling.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1741255758/Screenshot_2025-03-06_153758_tcuw5i.png',
        figma: 'https://www.figma.com/design/dDZOorjYWbhPg7yKGxtpic/DocuMorph?node-id=0-1',
        technologies: ['Figma', 'Prototyping', 'UI/UX'],
        category: 'Figma / UI Design',
    },
    {
        title: 'CodingGita',
        description: 'Fully animated website design with pages like Home, Bootcamp, Contact, About, featuring scrollable overlays and hover effects.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888440/flnic7pnzmg1ofiizuml.png',
        figma: 'https://www.figma.com/design/RdZHGbiXDFn75Mc8cTC40K/CodingGita?node-id=0-1',
        technologies: ['Figma', 'Wireframing', 'Design System'],
        category: 'Figma / UI Design',
    },
    {
        title: 'Instagram Clone',
        description: 'Instagram UI clone with story highlights, dynamic feed, and user-friendly profile section.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888593/swhcqzizianbpa5xvu80.png',
        figma: 'https://www.figma.com/design/hyb8A5mWFKgQToD7YWeGry/Instagram?node-id=0-1',
        technologies: ['Figma', 'UI Design'],
        category: 'Figma / UI Design',
    },
    {
        title: 'Amazon Clone',
        description: 'Amazon shopping experience design — product listings, cart, user auth, optimized for intuitive e-commerce navigation.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888392/amnmqdoo1383wgsebyem.png',
        figma: 'https://www.figma.com/design/FROVsJRuptn0lvRybHFMV0/amazon?node-id=0-1',
        technologies: ['Figma', 'Wireframing', 'Design System'],
        category: 'Figma / UI Design',
    },
    {
        title: 'Netflix Clone (Figma)',
        description: 'Netflix UI design — homepage, categories, interactive previews, and watchlist. Visual streaming experience.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888670/fbzdibcpzdnvxm3t5xso.png',
        figma: 'https://www.figma.com/design/MDRkCvsN7P0eg1E7hxxuF3/Netflix?node-id=0-1',
        technologies: ['Figma', 'Prototyping', 'UI/UX'],
        category: 'Figma / UI Design',
    },
    {
        title: 'Flipkart Clone',
        description: 'A Flipkart-inspired design with emphasis on responsive design and product page flow.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888526/drscwtolnjemuxtddwnc.png',
        figma: 'https://www.figma.com/design/WFDNmG8hEx4pObhRXyxckz/Flipcart?node-id=0-1',
        technologies: ['Figma', 'UI Design'],
        category: 'Figma / UI Design',
    },
    // ─── HTML & CSS ───────────────────────────────────────────────
    {
        title: 'Godesi Website',
        description: 'A static Godesi website clone with auto-scrolling sidebar, hover effects, and traditional design.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894688/vsly8jnuoryzbxr0b21g.png',
        github: 'https://github.com/Ridham2808/godesi',
        preview: 'https://godesi.netlify.app/',
        technologies: ['HTML5', 'CSS3', 'Responsive Design'],
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
        title: 'Netflix Clone (HTML/CSS)',
        description: 'A static Netflix UI clone with dark-themed design, movie categories, and responsive layout.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894829/arklxwmzmqtstwbflwxz.png',
        github: 'https://github.com/Ridham2808/Clone/tree/main/netflix',
        preview: 'https://ridhamnet2.netlify.app/',
        technologies: ['HTML5', 'CSS3'],
        category: 'HTML & CSS',
    },
    {
        title: 'Chess Game UI',
        description: 'A static Chess board UI with accurate piece layout built in HTML/CSS.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894652/a1sa17rdasr77a5ndo7j.png',
        github: 'https://github.com/Ridham2808/Clone/tree/main/Chess',
        preview: 'https://ridhamchess.netlify.app/',
        technologies: ['HTML5', 'CSS3', 'Responsive Design'],
        category: 'HTML & CSS',
    },
    {
        title: 'Calculator',
        description: 'A functional calculator with arithmetic operations and clean UI.',
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
    {
        title: 'Leaderboard / Cricket Score',
        description: 'A static Cricket scoreboard UI displaying team scores, overs, and player stats with a clean structured design.',
        image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894668/ubzlezgvyyofpdntmre7.png',
        github: 'https://github.com/Ridham2808/Clone/tree/main/Cricket',
        preview: 'https://ridhamleader.netlify.app/',
        technologies: ['HTML5', 'CSS3'],
        category: 'HTML & CSS',
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ MongoDB connected');

        await Project.deleteMany({});
        console.log('🗑️  Cleared existing projects');

        const inserted = await Project.insertMany(PROJECTS);
        console.log(`✅ Inserted ${inserted.length} projects successfully!`);

        await mongoose.disconnect();
        console.log('✅ Done — MongoDB disconnected');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err);
        process.exit(1);
    }
}

seed();
