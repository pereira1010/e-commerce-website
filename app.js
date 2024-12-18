const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const db = new sqlite3.Database('./db/users.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create Users Table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Root route: Serve the index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/static/index.html'));
});

// API routes for products
app.get('/api/products/tshirts', (req, res) => {
  res.json([
    { name: 'Short Sleeve', price: 35, img: '/img/wshirt.jpg' },
    { name: 'Long Sleeve', price: 40, img: '/img/bshirt.jpeg' }
  ]);
});

app.get('/api/products/hoodies', (req, res) => {
  res.json([
    { name: 'Short Hoodie', price: 35, img: '/img/whoodie.png' },
    { name: 'Long Hoodie', price: 40, img: '/img/bhoodie.png' }
  ]);
});

app.get('/api/products/sweatpants', (req, res) => {
  res.json([
    { name: 'Black Sweats', price: 35, img: '/img/bsweats.png' },
    { name: 'Red Sweats', price: 40, img: '/img/rsweats.png' }
  ]);
});

app.get('/api/products/shorts', (req, res) => {
  res.json([
    { name: 'Black Shorts', price: 35, img: '/img/bshorts.png' },
    { name: 'Red Shorts', price: 40, img: '/img/rshorts.png' }
  ]);
});

// User Registration Route
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], function (err) {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(400).json({ message: "Username already exists." });
        }
        res.json({ message: "User registered successfully." });
    });
});

// User Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], (err, user) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ message: "Server error." });
        }

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid username or password." });
        }

        res.json({ message: "Login successful." });
    });
});

// Adding Items

app.post('/cart/add', (req, res) => {
    const { product_name, price, img, quantity } = req.body;

    if (!product_name || !price || !img || !quantity) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = `INSERT INTO cart (product_name, price, quantity, img) VALUES (?, ?, ?, ?)`;
    db.run(query, [product_name, price, quantity, img], function (err) {
        if (err) {
            console.error("Error adding to cart:", err.message);
            return res.status(500).json({ message: "Failed to add item to cart." });
        }
        res.json({ message: "Item added to cart successfully.", itemId: this.lastID });
    });
});

//Post Items to cart

app.post('/cart/add', (req, res) => {
    const { product_name, price, img, quantity } = req.body;

    if (!product_name || !price || !img || !quantity) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = `INSERT INTO cart (product_name, price, quantity, img) VALUES (?, ?, ?, ?)`;
    db.run(query, [product_name, price, quantity, img], function (err) {
        if (err) {
            console.error("Error adding to cart:", err.message);
            return res.status(500).json({ message: "Failed to add item to cart." });
        }
        res.json({ message: "Item added successfully.", itemId: this.lastID });
    });
});

//GET Items from cart

// Route to retrieve all cart items
app.get('/cart', (req, res) => {
    const db = new sqlite3.Database(path.join(__dirname, 'db', 'users.db')); // Ensure database connection
    const query = `SELECT * FROM cart`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching cart:", err.message);
            return res.status(500).json({ message: "Failed to fetch cart items." });
        }
        res.json(rows); // Return cart items as JSON
    });

    db.close();
});

//DELETE ITEMS IN CART

app.delete('/cart/delete/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM cart WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            console.error("Error deleting item:", err.message);
            return res.status(500).json({ message: "Failed to delete item." });
        }
        res.json({ message: "Item deleted successfully." });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});