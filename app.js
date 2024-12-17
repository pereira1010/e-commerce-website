const express = require('express');
const path = require('path');
const staticRoutes = require('./js/staticPages.js');

const app = express();
const port = 3000;


app.use(express.json());
app.use(staticRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});