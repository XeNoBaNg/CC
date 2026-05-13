const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Abhi:Abhi0782%40@cluster0.m3h6jeq.mongodb.net/studentDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: String,
    department: String
});

const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.put("/students/:id", async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedStudent);
});

app.delete("/students/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});