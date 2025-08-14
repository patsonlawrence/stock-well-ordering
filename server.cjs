require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB config
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false, // true if using Azure
    trustServerCertificate: true
  }
};
console.log('Loaded DB config:', config);

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Hash the input password
  const hashedPassword = crypto
    .createHash('md5') // or 'sha256', depending on what you used
    .update(password)
    .digest('hex');

  console.log('Hashed input password:', hashedPassword); // Debug

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

const PORT = 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:5000');
});
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://192.168.100.20:3000',
    'https://stock-well-ordering.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());