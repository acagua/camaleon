// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// -----------------------------------------------------------Get our API routes
const userRoute = require('./server/routes/userRoute');
const loginRoute = require('./server/routes/loginRoute');
const storeRoute = require('./server/routes/storeRoute');
const orderRoute = require('./server/routes/orderRoute');
const itemRoute = require('./server/routes/itemRoute');
const categoryRoute = require('./server/routes/categoryRoute');
const fileRoute = require('./server/routes/fileRoute');
const passwordRoute = require('./server/routes/passwordRoute');
const geoRoute = require('./server/routes/geoRoute');
const contactMessageRoute = require('./server/routes/contactMessageRoute');
const payuRoute = require('./server/routes/payuRoute');

const app = express();

//-----------------------------------------------------------------CORS
app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// -----------------------------------------------------------Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//------------------------------------------------------------Conexión a la base de datos
mongoose.connection.openUri('mongodb://camaleonUser:M3g4l0d0n2019!DBUser@ec2-3-89-143-123.compute-1.amazonaws.com:37017/camaleon', (err, res) =>
{
    if (err)
    {
        throw err;
    } else
    {
        console.log('Base de datos online');
    }
});

// -------------------------------------------------------------Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// -------------------------------------------------------------Set our api routes
app.use('/api/user', userRoute);
app.use('/api/login', loginRoute);
app.use('/api/store', storeRoute);
app.use('/api/order', orderRoute);
app.use('/api/item', itemRoute);
app.use('/api/category', categoryRoute);
app.use('/api/file', fileRoute);
app.use('/api/password', passwordRoute);
app.use('/api/geo', geoRoute);
app.use('/api/contactMessage', contactMessageRoute);
app.use('/api/payu', payuRoute);

// --------------------------------------------------------------Catch all other routes and return the index file
app.get('*', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'dist/index.html'));
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