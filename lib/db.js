// lib/db.js
import dotenv from 'dotenv'
import sql from 'mssql'

// Load environment variables
dotenv.config()

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
  },
}

export async function query(sqlQuery, params = {}) {
  try {
    const pool = await sql.connect(config)
    const request = pool.request()

    for (const key in params) {
      request.input(key, params[key])
    }

    const result = await request.query(sqlQuery)
    return result.recordset
  } catch (err) {
    console.error('Database query error:', err)
    throw err
  }
}
