const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');

const dbRouter = express.Router();

const db = new sqlite3.Database(path.join(__dirname, 'storeDB.db'), (err) => {
    if (err) {
        console.error('Database connection failed: ', err.message);
    } else {
        console.log('Connected to the database.');
    }
});


// Create users table if nonexistent.
db.serialize( () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL)`
    );
});

dbRouter.post('/submit', (req, res) => {
    const { username, password } = req.body;

    db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password],
        (err) => {
            if (err)
            {
                console.error(err.message);
                return res.status(500).send(`
                    <script>
                        alert('Error saving user to database.');
                        window.location.href = '/';
                    </script>
                `);
            }

            res.send(`
                <script>
                    alert('User ${username} registered successfully!');
                    window.location.href = '/';
                </script>
            `);
        }
    );
});

module.exports = dbRouter;