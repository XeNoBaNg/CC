const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB string (use %40 for @ in password)
const mongoURI = 'mongodb+srv://Abhi:Abhi0782%40@cluster0.m3h6jeq.mongodb.net/taskdb?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected for Task Manager"))
    .catch(err => console.log("DB Error:", err));

// Task Schema
const Task = mongoose.model('Task', {
    title: String,
    description: String,
    completed: { type: Boolean, default: false }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Create a task
app.post('/api/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// Update a task (Toggle complete or edit text)
app.put('/api/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
});

app.listen(5000, () => console.log("Task Backend running on port 5000"));