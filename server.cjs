require('dotenv').config(); // Load .env first

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());



// ✅ Apply CORS with allowed origins
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://192.168.100.20:3000',
    'https://stock-well-ordering.vercel.app'
  ],
  credentials: true
}));

// ✅ Apply JSON parsing
app.use(express.json());

// ✅ DB config
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false, // for hosted databases like Render
  },
});


//console.log('Loaded DB config:', config);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// ✅ Login endpoint
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
  console.error('❌ Login error:', err); // log the full error stack
  res.status(500).json({ success: false, message: 'Server error' });
}
});


// ✅ Use dynamic port for Render
/*const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});*/
app.listen(5000, 'localhost', () => {
  console.log('✅ Server running on http://localhost:5000');
});
