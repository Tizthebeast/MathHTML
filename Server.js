require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// DB connection
const connector = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connector.connect(err => {
    if (err) throw err;
    console.log("Connected to DB!");
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { Username, Password } = req.body;
    connector.query(
        "INSERT INTO info (Username, Password) VALUES (?, ?)",
        [Username, Password],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error inserting user");
            }
            res.send("User signed up successfully!");
        }
    );
});

app.listen(3000, () => console.log("Server running on port 3000"));
