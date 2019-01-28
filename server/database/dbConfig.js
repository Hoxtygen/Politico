import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

pool.connect((err) => {
  if (err) {
    return console.log('Unable to access the database');
  }
  console.log('Connected to the database');
});

export default pool;
