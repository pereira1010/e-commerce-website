const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static HTML files
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/register.html'));
});

router.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/payment.html'));
});

router.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/success.html'));
});

router.get('/hoodies', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/hoodies.html'));
});

router.get('/tshirts', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/tshirts.html'));
});

router.get('/sweatpants', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/sweatpants.html'));
});

router.get('/shorts', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/shorts.html'));
});

router.get('/details', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/static/details.html'));
});

module.exports = router;