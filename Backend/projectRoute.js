const express = require('express');
const router = express.Router();
const Project = require('./projectModel');

// GET all projects
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const projects = await Project.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, data: projects });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

// GET single project by id
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
        res.json({ success: true, data: project });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

module.exports = router;
