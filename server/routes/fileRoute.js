var express = require('express');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

var app = express();

var User = require('../models/user.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/politicas', function (req, res)
{
  res.send('hola!');
});


module.exports = app;