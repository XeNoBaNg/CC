const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Abhi:Abhi0782%40@cluster0.m3h6jeq.mongodb.net/blogDB?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

app.post("/blogs", async (req, res) => {
    const blog = new Blog(req.body);
    await blog.save();
    res.json(blog);
});

app.get("/blogs", async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
});

app.delete("/blogs/:id", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});