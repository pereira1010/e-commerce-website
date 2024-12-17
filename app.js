const express = require('express');
const path = require('path');
const staticRoutes = require('./js/staticPages.js');
const dbRoutes = require('./db/database.js');

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(staticRoutes);
app.use('/database', dbRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});