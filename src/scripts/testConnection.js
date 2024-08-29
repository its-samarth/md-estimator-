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

app.get('/api/data/estimator', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM estimator'); // Replace with your table name
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data', error: error.message });
  }
});
app.get('/api/data/rough-table', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM rgh_data'); // Replace with your table name
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data', error: error.message });
  }
});

app.get('/api/data/rough-table-singledata', async (req, res) => {
  const lotNo = req.query.lotNo;
  
  if (!lotNo) {
    return res.status(400).json({ message: 'LOT NO is required' });
  }
  
  try {
    const result = await client.query('SELECT * FROM rgh_data WHERE "LOT NO" = $1', [lotNo]);
    
    if (result.rows.length > 0) {
      // Send the result as an array
      res.json(result.rows[0]); // Send as a single object, but ensure the front end handles it correctly
    } else {
      res.json([]); // Send an empty array if no data found
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data', error: error.message });
  }
});


app.get('/api/data/lot-numbers', async (req, res) => {
  try {
    // Replace 'LOT_NO' with the actual column name if it's different
    const result = await client.query('SELECT DISTINCT "LOT NO" FROM rgh_data ORDER BY "LOT NO"');
    
    // Extract the LOT NOs from the result rows
    const lotNumbers = result.rows.map(row => row["LOT NO"]); // Ensure 'lot_no' matches your column name
    
    res.json(lotNumbers);
  } catch (error) {
    console.error('Error fetching LOT NOs:', error);
    res.status(500).json({ message: 'Failed to fetch LOT NOs', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
