const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Update this with your specific connection string
const mongoURI = 'mongodb+srv://Abhi:Abhi0782%40@cluster0.m3h6jeq.mongodb.net/taskdb?retryWrites=true&w=majority';

mongoose.connect(mongoURI).then(() => console.log("DB Connected"));

const Task = mongoose.model('Task', {
    title: String,
    completed: { type: Boolean, default: false }
});

app.get('/api/tasks', async (req, res) => {
    res.json(await Task.find());
});

app.post('/api/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// The Toggle Route
app.put('/api/tasks/:id/toggle', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));