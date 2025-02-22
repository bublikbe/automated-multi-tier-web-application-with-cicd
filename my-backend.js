const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // Cloud SQL Private IP
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.use(express.json());

// Sample Route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Backend is running!', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Dockerfile for Cloud Run
define(`Dockerfile`, `
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 8080
`);

// Environment Variables (.env file for local development)
define(`.env`, `
DB_USER=app_user
DB_PASSWORD=your_secure_password
DB_NAME=myappdb
DB_HOST=10.x.x.x  # Replace with Cloud SQL Private IP
PORT=8080
`);
