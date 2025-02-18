import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitSuccess(false);
      }
    } catch (error) {
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="contact"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="section-header" variants={itemVariants}>
        <h2>Get in Touch</h2>
        <p>Let's collaborate and build something amazing together</p>
      </motion.div>

      <div className="contact-container">
        <motion.div
          className="contact-info"
          variants={containerVariants}
        >
          <motion.a
            href="mailto:ridham.patel.cg@gmail.com"
            className="contact-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-wrapper">
              <Mail className="contact-icon" />
            </div>
            <div className="contact-details">
              <h3>Email</h3>
              <p>ridham.patel.cg@gmail.com</p>
            </div>
          </motion.a>

          <motion.a
            href="https://github.com/Ridham2808"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-wrapper">
              <Github className="contact-icon" />
            </div>
            <div className="contact-details">
              <h3>GitHub</h3>
              <p>github.com/Ridham2808</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/patel-ridham/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-wrapper">
              <Linkedin className="contact-icon" />
            </div>
            <div className="contact-details">
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/patel-ridham</p>
            </div>
          </motion.a>

          <motion.div
            className="contact-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-wrapper">
              <MapPin className="contact-icon" />
            </div>
            <div className="contact-details">
              <h3>Location</h3>
              <p>Ahmedabad, Gujarat</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          className="contact-form"
          variants={containerVariants}
          onSubmit={handleSubmit}
        >
          <h3>Send a Message</h3>
          <motion.div variants={itemVariants}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="4"
              required
            ></textarea>
          </motion.div>

          <motion.button
            className="submit-button"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Send size={18} />
          </motion.button>

          {submitSuccess === false && (
            <p className="error-message">Failed to send the message. Please try again.</p>
          )}
          {submitSuccess && <p className="success-message">Message sent successfully!</p>}
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
