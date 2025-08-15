// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Pool } = require('pg');

const app = express();

// Allow frontend access
app.use(cors({
  origin: [
    'http://localhost:3000', // local frontend
    'https://stock-well-ordering.vercel.app' // deployed frontend
  ],
  credentials: true
}));

app.use(express.json()); // Parse JSON bodies

// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false, // Required for Render and most hosted PostgreSQL
  },
});

// Debug: Confirm DB config loaded (optional)
console.log('Connected to Postgres at:', process.env.DB_SERVER);

// Health check route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Hash the input password using MD5 (match your DB logic)
  const hashedPassword = crypto
    .createHash('md5') // Or use 'sha256' if your DB stores that
    .update(password)
    .digest('hex');

  try {
    const result = await pool.query(
      'SELECT * FROM supermarket.tbl_users WHERE username = $1 AND password = $2',
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

// Listen on Render's dynamic port or local port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
