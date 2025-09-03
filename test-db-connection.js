// test-db-connection.js
import dotenv from 'dotenv'
dotenv.config()

import { query } from './lib/db.js'

console.log('✅ ENV DEBUG:', {
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_SERVER: process.env.DB_SERVER,
  DB_NAME: process.env.DB_NAME,
  DB_ENCRYPT: process.env.DB_ENCRYPT,
  DB_TRUST_CERT: process.env.DB_TRUST_CERT
})

async function test() {
  try {
    const result = await query('SELECT TOP 1 * FROM Users')
    console.log('✅ Connected. Sample data:', result)
  } catch (err) {
    console.error('❌ Connection failed:', err.message)
  }
}

test()
