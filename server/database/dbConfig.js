import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DATABASE_URL, DATABASE_URL_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === 'test' ? DATABASE_URL_TEST : DATABASE_URL;


const pool = new Pool({
  connectionString,
});
pool.connect((err) => {
  if (err) {
    return console.log('Unable to access the database');
  }
  return console.log('Connected to the database');
});

export default pool;
