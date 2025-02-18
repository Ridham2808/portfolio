import React from 'react';
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"
import { ExternalLink, Github, Figma } from "lucide-react"
import "../styles/Projects.css"

const Projects = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const projectCategories = [
    {
      title: "React Projects",
      projects: [
        {
          title: 'Ironcore Gym',
          description: 'A gym management platform providing users with gym details, membership plans, trainers information, wellness tools like BMI calculator & AI-based diet plans, and fitness blogs. Reduces the need for physical gym inquiries.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895481/uagv0dunqcqtqmmsqs6z.png',
          github: 'https://github.com/Ridham2808/ironcore_gym',
          preview: 'https://ironcore-gym-2.onrender.com/',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT']
        },
        {
          title: 'Data explorer',
          description: ' A data exploration app offering insights into meals, cocktails, Harry Potter universe, albums, sports teams, and banking details. Fetches real-time data from various APIs.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895464/fuda1jdna7g1acnzmpfc.png',
          github: 'https://github.com/Ridham2808/Data_explorer',
          preview: 'https://data-explorer-kn6w.onrender.com',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express']
        },
        {
          title: 'Youtube Clone',
          description: 'A YouTube-inspired platform allowing users to search, view, and filter videos dynamically based on categories and search queries. Implements video playback with suggestions and sidebar navigation.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895518/ifo9rhikhmexnxz2ygdv.png',
          github: 'https://github.com/Ridham2808/Youtube-React',
          preview: 'https://youtube-react-5nna.onrender.com',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express']
        },
        {
          title: 'Bamoka Industries clone',
          description: 'A full-stack e-commerce platform with real-time inventory management',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895450/tjsn0k7o7odxseqbsu7a.png',
          github: 'https://github.com/Ridham2808/Bamoka-Industries-React',
          preview: 'https://bamoka-industries-react.netlify.app/',
          technologies: ['React', 'Node.js']
        },
        {
          title: 'Spotify Clone',
          description: 'A collaborative task management application with real-time updates',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739895496/yriynva7qupk6gnhfcmj.png',
          github: 'https://github.com/Ridham2808/Spotify-React',
          technologies: ['React', 'Node.js']
        },
      ]
    },
    {
      title: "Figma Projects",
      projects: [
        {
          title: 'Ironcore Gym',
          description: ' A gym management platform providing users with gym details, membership plans, trainers information, wellness tools like BMI calculator & AI-based diet plans, and fitness blogs. Reduces the need for physical gym inquiries.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888624/rkkaw5ixxwkhg8tn4ckl.png',
          figma: 'https://www.figma.com/design/xx6t46xMZOAVmXsBXRbliP/Ironcore-Gym?node-id=0-1&t=zyhvbkLQATBEnchH-1',
          technologies: ['Figma', 'Prototyping', 'UI/UX']
        },
        {
          title: 'Codinggita',
          description: ' A website with fully animated pages like Home, Bootcamp, Contact Us, About Us, Privacy Policy, and Refund Policy, featuring scrollable overlays and hover effects.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888440/flnic7pnzmg1ofiizuml.png',
          figma: 'https://www.figma.com/design/RdZHGbiXDFn75Mc8cTC40K/CodingGita?node-id=0-1&t=N56lGfKvW4qEpRHW-1',
          technologies: ['Figma', 'Wireframing', 'Design System']
        },
        {
          title: 'Instagram clone',
          description: 'Featuring an intuitive layout, interactive story highlights, a dynamic feed, and a user-friendly profile section. Provides a seamless social media experience with modern design elements.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888593/swhcqzizianbpa5xvu80.png',
          figma: 'https://www.figma.com/design/hyb8A5mWFKgQToD7YWeGry/Instagram?node-id=0-1&t=hd4vtxYykRz2bNnS-1',
          technologies: ['Figma', 'Data Visualization', 'UI Design']
        },
        {
          title: 'Government Guidelines',
          description: 'Showcasing official policies, regulatory updates, and essential government services. Ensures easy access to important information with a structured and user-friendly layout.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888578/csi6mg5vuqcs3jwazimw.png',
          figma: 'https://www.figma.com/design/nRLnQDzhXVYpuq47RQCRN0/Guidelines?node-id=0-1&t=4kgsHUXgrQMTOVLl-1',
          technologies: ['Figma', 'Prototyping', 'UI/UX']
        },
        {
          title: 'Amazon clone',
          description: 'Featuring a seamless shopping experience with product listings, detailed pages, cart functionality, and user authentication. Optimized for intuitive navigation and modern e-commerce design.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888392/amnmqdoo1383wgsebyem.png',
          figma: 'https://www.figma.com/design/FROVsJRuptn0lvRybHFMV0/amazon?node-id=0-1&t=qoG4OhJv9jUkMG6s-1',
          technologies: ['Figma', 'Wireframing', 'Design System']
        },
        {
          title: 'Flipkart clone',
          description: ' A Flipkart-inspired design with an emphasis on responsive design and product page flow. ',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888526/drscwtolnjemuxtddwnc.png',
          figma: 'https://www.figma.com/design/WFDNmG8hEx4pObhRXyxckz/Flipcart?node-id=0-1&t=1gaPj9hWXr545tA9-1',
          technologies: ['Figma', 'Data Visualization', 'UI Design']
        },
        {
          title: 'Netflix clone',
          description: 'Featuring a sleek homepage, movie and show categories, interactive previews, and a user-friendly watchlist. Provides a modern streaming experience with a visually engaging design.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888670/fbzdibcpzdnvxm3t5xso.png',
          figma: 'https://www.figma.com/design/MDRkCvsN7P0eg1E7hxxuF3/Netflix?node-id=0-1&t=nVsiqQNVKpJ8usCQ-1',
          technologies: ['Figma', 'Prototyping', 'UI/UX']
        },
        {
          title: 'Ludo game',
          description: 'Featuring a colorful board and interactive elements for a visually appealing design.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888640/dairlinzjavipwt4nsbc.png',
          figma: 'https://www.figma.com/design/e1w4Eak2HT20xBeHH7UkSE/Ludo?node-id=0-1&t=Kcak5kiFQbDulmzK-1',
          technologies: ['Figma', 'Wireframing', 'Design System']
        },
        {
          title: 'Gaming Controleer',
          description: 'A simple gaming controller UI designed in Figma, featuring basic buttons and a clean layout for an intuitive user interface.',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739888554/xmtqju3dgrlh9iyygwmj.png',
          figma: 'https://www.figma.com/design/A9OlvzmiYcM6UxHBLkwfIN/Gaming-Controleer?node-id=0-1&t=28o7U9TeHf20jz1S-1',
          technologies: ['Figma', 'Data Visualization', 'UI Design']
        },
      ]
    },
    {
      title: "HTML/CSS Projects",
      projects: [
        {
          title: 'Godesi Website',
          description: 'A responsive personal portfolio website showcasing my skills and projects',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894688/vsly8jnuoryzbxr0b21g.png',
          github: 'https://github.com/Ridham2808/godesi',
          preview: 'https://godesi.netlify.app/',
          technologies: ['HTML5', 'CSS3', 'Responsive Design']
        },
        {
          title: 'Hourly Hotels',
          description: 'A visually appealing landing page for a local restaurant',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894704/zoy2wyoq8psfznqpeb0q.png',
          github: 'https://github.com/Ridham2808/hourly-hotels',
          preview: 'https://hourly-hotels.netlify.app',
          technologies: ['HTML5', 'CSS3']
        },
        {
          title: 'Multiday Tours',
          description: 'A customizable blog template for travel enthusiasts',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894797/oc38qchdbcppgj2s1hbq.png',
          github: 'https://github.com/Ridham2808/multiday-tours',
          preview: 'https://multiday-tours.netlify.app/',
          technologies: ['HTML5', 'CSS3']
        },
        {
          title: 'Netflix Clone',
          description: 'A responsive personal portfolio website showcasing my skills and projects',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894829/arklxwmzmqtstwbflwxz.png',
          github: 'https://github.com/Ridham2808/Clone/tree/main/netflix',
          technologies: ['HTML5', 'CSS3']
        },
        {
          title: 'Youtube Clone',
          description: 'A visually appealing landing page for a local restaurant',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894854/us2wifdyd3vwhgc00kjw.png',
          github: 'https://github.com/Ridham2808/Clone/tree/main/Youtube',
          technologies: ['HTML5', 'CSS3']
        },
        {
          title: 'Ludo Game',
          description: 'A customizable blog template for travel enthusiasts',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894715/j1k1zhkamjzu9itbkupi.png',
          github: 'https://github.com/Ridham2808/Clone/tree/main/ludo',
          technologies: ['HTML5', 'CSS3', 'Flexbox']
        },
        {
          title: 'Chess Game',
          description: 'A responsive personal portfolio website showcasing my skills and projects',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894652/a1sa17rdasr77a5ndo7j.png',
          github: 'https://github.com/Ridham2808/Clone/tree/main/Chess',
          technologies: ['HTML5', 'CSS3', 'Responsive Design']
        },
        {
          title: 'Leaderboard',
          description: 'A visually appealing landing page for a local restaurant',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894668/ubzlezgvyyofpdntmre7.png',
          github: 'https://github.com/Ridham2808/Clone/tree/main/Cricket',
          technologies: ['HTML5', 'CSS3']
        },
        {
          title: 'Calculator',
          description: 'A customizable blog template for travel enthusiasts',
          image: 'https://res.cloudinary.com/dlqyrgblr/image/upload/v1739894636/unwpoek85uyswuhh9axa.png',
          github: 'https://github.com/Ridham2808/Clone/tree/main/calculator',
          technologies: ['HTML5', 'CSS3', 'Javascript']
        },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Featured Projects</h2>
        <p>A showcase of my best work and technical expertise</p>
      </motion.div>

      {projectCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="project-category">
          <h3 className="category-title">{category.title}</h3>
          <motion.div
            className="projects-grid"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {category.projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="project-image">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.figma && (
                        <a href={project.figma} target="_blank" rel="noopener noreferrer">
                          <Figma size={24} />
                        </a>
                      )}
                      {project.preview && (
                        <a href={project.preview} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={24} />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <motion.span key={tech} className="technology-tag" whileHover={{ scale: 1.05 }}>
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </motion.div>
  )
}

export default Projects;