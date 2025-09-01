// lib/db.js
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required by Render's Postgres
  },
});

client.connect();

export default client;
