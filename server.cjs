require('dotenv').config();
const { Pool } = require('pg');
const crypto = require('crypto');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://192.168.100.20:3000',
    'https://stock-well-ordering.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false, 
  },
});
app.get("/", (req, res) => {
  res.send("Backend API is running");
});
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = crypto
    .createHash('md5')
    .update(password)
    .digest('hex');
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, hashedPassword]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});