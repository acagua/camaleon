// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get our API routes
const userRoute = require('./server/routes/userRoute');
const loginRoute = require('./server/routes/loginRoute');
const storeRoute = require('./server/routes/storeRoute');
const orderRoute = require('./server/routes/orderRoute');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//------------------------------------------------------------Conexión a la base de datos
mongoose.connection.openUri('mongodb://camaleonUser:M3g4l0d0n2019!DBUser@ec2-3-89-143-123.compute-1.amazonaws.com:37017/camaleon', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos online');
    }
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/camaleon')));

// Set our api routes
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/store', storeRoute);
app.use('/order', orderRoute);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/camaleon/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));