const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    github: { type: String },
    preview: { type: String },
    figma: { type: String },
    technologies: [{ type: String }],
    category: {
        type: String,
        enum: ['React / Full Stack', 'Figma / UI Design', 'HTML & CSS'],
        required: true,
    },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
