require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

// Middleware
const cors = require('cors');

// Router
const router = require('./router.js');

app.use(express.json());
app.use(cors());
app.use(router)

app.listen(port, () => {
  console.log(`API Service - listening on port: ${port}`);
});