import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Database, Layout, Globe, Cpu, Server, BookOpen, Coffee, Rocket, FileDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const useTypingEffect = (texts, typingSpeed = 150, deletingSpeed = 150, pauseDuration = 1000) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (isTyping) {
      if (displayedText.length < texts[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedText(texts[currentIndex].slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, currentIndex, isTyping, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayedText;
};

const Home = () => {
  const [currentResume, setCurrentResume] = useState(0);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  const resumes = [
    {
      id: 0,
      src: "https://drive.google.com/file/d/1JoATE4tuEbd1hfz-ej8OG2IM-J8_SLU-/preview",
      downloadLink: "https://drive.google.com/file/d/1JoATE4tuEbd1hfz-ej8OG2IM-J8_SLU-/view?usp=sharing",
      title: "Professional Resume",
      description: "Take a look at my detailed professional background, skills, and achievements. Download my resume to learn more about my experience and qualifications."
    },
    {
      id: 1,
      src: "https://drive.google.com/file/d/1TVxPyIaDYcoEx7JKubw55pQF_k8AfcOa/preview",
      downloadLink: "https://drive.google.com/file/d/1TVxPyIaDYcoEx7JKubw55pQF_k8AfcOa/view?usp=sharing",
      title: "Minimalist Resume",
      description: "A clean and simple resume highlighting my skills, experience, and projects in a professional format. Download to explore my qualifications in a concise and ATS-friendly layout."
    },
    {
      id: 2,
      src: "https://drive.google.com/file/d/1nVgprcCwnf_pJmeUo7pBmaaNj-ftUIIh/preview",
      downloadLink: "https://drive.google.com/file/d/1nVgprcCwnf_pJmeUo7pBmaaNj-ftUIIh/view?usp=sharing",
      title: "UI/UX Designer Resume",
      description: "Explore my journey as a UI/UX designer, showcasing my skills, design principles, and user-centered approach. Download my resume to see my experience in crafting intuitive and engaging digital experiences."
    }
  ];

  const nextResume = () => {
    setCurrentResume((prev) => (prev + 1) % resumes.length);
  };

  const prevResume = () => {
    setCurrentResume((prev) => (prev - 1 + resumes.length) % resumes.length);
  };

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [resumeRef, resumeInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const texts = ["Full Stack Developer", "Web Developer", "UI/UX Designer"];
  const displayedText = useTypingEffect(texts);

  const skills = [
    {
      icon: <Code2 size={28} />,
      name: 'Frontend Development',
      description: 'Building responsive web applications with HTML, CSS, JavaScript, and React',
      color: '#6366f1'
    },
    {
      icon: <Server size={28} />,
      name: 'Backend Development',
      description: 'Creating server-side applications with Node.js',
      color: '#8b5cf6'
    },
    {
      icon: <Database size={28} />,
      name: 'Database Management',
      description: 'Working with MongoDB for database operations and management',
      color: '#ec4899'
    },
    {
      icon: <Layout size={28} />,
      name: 'UI Design',
      description: 'Designing user interfaces and prototypes using Figma',
      color: '#ef4444'
    },
    {
      icon: <Code2 size={28} />,
      name: 'Programming',
      description: 'Programming with C language',
      color: '#14b8a6'
    },
    {
      icon: <Github size={28} />,
      name: 'Version Control',
      description: 'Managing code using Git and GitHub for collaboration',
      color: '#f59e0b'
    }
  ];

  const experiences = [
    {
      icon: <BookOpen size={24} />,
      title: "Education",
      details: "B.Tech in Computer Science Engineering from Rai University"
    },
    {
      icon: <Coffee size={24} />,
      title: "Work Experience",
      details: "Full Stack Developer with expertise in MERN stack development"
    },
    {
      icon: <Rocket size={24} />,
      title: "Projects",
      details: "Built and deployed multiple web applications using modern technologies"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="home">
      <motion.section className="hero" style={{ y }}>
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-shapes">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="hero-shape"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span>Hi, I'm Ridham Patel</span>
            <motion.span
              className="highlight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {displayedText}
              <span className="cursor">|</span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Crafting beautiful and functional web experiences with modern technologies. Turning ideas into reality
            through clean and efficient code.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <button className="primary-button" onClick={() => navigate("/contact")}>
              Get in Touch
            </button>
            <button className="secondary-button" onClick={() => navigate("/projects")}>
              View Projects
            </button>
          </motion.div>

          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <motion.a
              href="https://github.com/Ridham2808"
              className="social-link"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/patel-ridham/"
              className="social-link"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin />
            </motion.a>
            <motion.a
              href="mailto:ridham.patel.cg@gmail.com"
              className="social-link"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="about-me"
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="about-container">
          <div className="about-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="section-divider"
              initial={{ width: 0 }}
              animate={aboutInView ? { width: "100px" } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>

          <div className="about-content-wrapper">
            <motion.div
              className="about-image-container"
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="image-wrapper">
                <img
                  src="https://res.cloudinary.com/dlqyrgblr/image/upload/v1739861780/a1npzwhwwxzunehdq50y.png"
                  alt="Profile"
                  className="profile-image"
                />
                <div className="image-overlay" />
                <div className="gradient-border" />
              </div>
            </motion.div>

            <div className="about-right-content">
              <motion.div
                className="about-text-content"
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="intro-text">
                  I'm a passionate full stack developer with a strong foundation in computer science and a keen eye for creating seamless, user-centric web applications.
                </p>
                <p className="secondary-text">
                  My journey in tech began at Rai University, where I honed my skills in various programming languages and software development methodologies.
                </p>
              </motion.div>

              <motion.div
                className="experience-grid"
                variants={containerVariants}
                initial="hidden"
                animate={aboutInView ? "visible" : "hidden"}
              >
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    className="experience-card"
                    variants={itemVariants}
                  >
                    <div className="experience-icon">
                      {exp.icon}
                    </div>
                    <h3>{exp.title}</h3>
                    <p>{exp.details}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="resume-section"
        ref={resumeRef}
        initial={{ opacity: 0, y: 50 }}
        animate={resumeInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="resume-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={resumeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2>Resume</h2>
            <p>View my professional experience and qualifications</p>
          </motion.div>

          <div className="resume-content-wrapper">
            <div className="resume-preview-container">
              <iframe
                src={resumes[currentResume].src}
                className="resume-preview-frame"
                title="Resume Preview"
              />
              <div className="resume-pagination">
                <button
                  onClick={prevResume}
                  className="pagination-button"
                  disabled={currentResume === 0}
                >
                  <ChevronLeft className="pagination-icon" />
                </button>
                <span className="pagination-text">
                  {currentResume + 1} / {resumes.length}
                </span>
                <button
                  onClick={nextResume}
                  className="pagination-button"
                  disabled={currentResume === resumes.length - 1}
                >
                  <ChevronRight className="pagination-icon" />
                </button>
              </div>
            </div>
            <div className="resume-info">
              <div className="resume-text">
                <h3>{resumes[currentResume].title}</h3>
                <p>{resumes[currentResume].description}</p>
              </div>
              <motion.a
                href={resumes[currentResume].downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-download-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileDown className="download-icon" />
                Download Resume
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="skills" ref={skillsRef}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Skills & Expertise</h2>
          <p>Transforming ideas into exceptional digital experiences</p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                transition: { duration: 0.3 }
              }}
            >
              <div
                className="skill-icon-wrapper"
                style={{ background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)` }}
              >
                {skill.icon}
              </div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;