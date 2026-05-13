const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING_HERE')
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const Product = mongoose.model('Product', { name: String, price: Number });

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/purchase', (req, res) => {
  res.json({ message: "Purchase successful for " + req.body.name });
});

app.listen(5000, () => console.log("Backend running on port 5000"));