require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const crypto = require('crypto'); // <-- FIXED

const app = express();

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
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

console.log('Loaded DB config:', config);

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

  console.log('Hashed input password:', hashedPassword);

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .query('SELECT * FROM supermarket.tbl_users WHERE UserName = @username AND password = @password');

    if (result.recordset.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Use dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
