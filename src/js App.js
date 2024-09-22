const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
const dotenv = require('dotenv'); 
dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

// Database Configuration
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    // Handle the error (e.g., exit the process gracefully)
  } else {
    console.log('Connected to MySQL!');
  }
});

// Example route to get expenses 
app.get('/expenses', (req, res) => {
  connection.query('SELECT * FROM expenses', (err, rows) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(rows);
    }
  });
});

// Other routes (for adding, updating, deleting expenses)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Expense tracker app listening at http://localhost:${port}`);
});