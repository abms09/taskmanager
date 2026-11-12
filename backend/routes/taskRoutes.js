const express = require('express');
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All task routes require authentication
router.use(protect);

// @route   GET /api/tasks?status=all|pending|completed
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { user: req.user._id };

    if (status !== undefined && status !== 'all') {
      if (typeof status !== 'string' || !['pending', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status filter' });
      }
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ message: 'Task description must be a string' });
    }

    if (status !== undefined && !['pending', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid task status' });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status: status || 'pending',
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(error.name === 'ValidationError' ? 400 : 500).json({ message: error.message });
  }
});

// @route   PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    const { title, description, status } = req.body;

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ message: 'Task title cannot be empty' });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ message: 'Task description must be a string' });
    }

    if (status !== undefined && !['pending', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid task status' });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(error.name === 'ValidationError' ? 400 : 500).json({ message: error.message });
  }
});

// @route   DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
