const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '1212', // Replace with your MySQL password
    database: 'school_management'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

// Add Single School API
app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validate input
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ message: 'Invalid input. Ensure all fields are provided and correct.' });
    }

    // SQL Query
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error adding school.' });
        }
        res.status(201).json({ message: 'School added successfully!' });
    });
});

// Add Multiple Schools API
app.post('/addSchools', (req, res) => {
    const schools = req.body;

    // Validate input
    if (!Array.isArray(schools) || schools.length === 0) {
        return res.status(400).json({ message: 'Invalid input. Provide an array of schools.' });
    }

    // Prepare SQL Query and Values
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES ?';
    const values = schools.map(school => [
        school.name,
        school.address,
        school.latitude,
        school.longitude
    ]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error adding schools.' });
        }
        res.status(201).json({ message: 'Schools added successfully!' });
    });
});

// List Schools API
app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate input
    if (typeof latitude !== 'string' || typeof longitude !== 'string') {
        return res.status(400).json({ message: 'Invalid input. Ensure latitude and longitude are provided.' });
    }

    // SQL Query
    const sql = 'SELECT id, name, address, latitude, longitude, ' +
                '((POW(latitude - ?, 2) + POW(longitude - ?, 2)) * 100000) AS distance ' +
                'FROM schools ORDER BY distance ASC';

    db.query(sql, [parseFloat(latitude), parseFloat(longitude)], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Error retrieving schools.' });
        }
        res.status(200).json(results);
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
