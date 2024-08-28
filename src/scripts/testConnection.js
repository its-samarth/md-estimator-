import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());

// Create and configure the PostgreSQL client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',  // Ensure the database name is correct
  password: 'root',
  port: 5432,
});

// Connect to the database once when the server starts
client.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

app.get('/api/test-connection', async (req, res) => {
  try {
    // Attempt to execute a simple query
    await client.query('SELECT NOW()');
    res.json({ message: 'Database connection successful' });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ message: 'Database connection failed', error: 'Query execution failed' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM rgh_data'); // Replace with your table name
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
