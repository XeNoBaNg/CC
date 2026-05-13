const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const mongoURI = 'mongodb+srv://Abhi:Abhi0782%40@cluster0.m3h6jeq.mongodb.net/eventDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI).then(() => console.log("Event DB Connected"));

// Registration Schema
const Registration = mongoose.model('Registration', {
    name: String,
    email: String,
    event: String,
    date: { type: Date, default: Date.now }
});

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const reg = new Registration(req.body);
        await reg.save();
        res.status(201).json({ message: "Registration Successful!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to register" });
    }
});

app.get('/api/participants', async (req, res) => {
    const list = await Registration.find().sort({ date: -1 });
    res.json(list);
});

app.listen(5000, () => console.log("Event Backend running on 5000"));