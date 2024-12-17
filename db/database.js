const sqlite3 = require('sqlite3').verbose();
const path = requite('path');

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

module.exports = db;