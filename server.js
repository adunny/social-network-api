const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/social-network");

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Live at http://localhost:${PORT}/`));