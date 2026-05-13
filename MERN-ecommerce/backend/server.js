const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Abhi:Abhi0782%40@cluster0.m3h6jeq.mongodb.net/?appName=Cluster0')
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const Product = mongoose.model('Product', { name: String, price: Number });

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.post('/api/purchase', (req, res) => {
  res.json({ message: "Purchase successful for " + req.body.name });
});

app.listen(5000, () => console.log("Backend running on port 5000"));