var express = require('express');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

var app = express();

var User = require('../models/user.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/politicas', function (req, res)
{
  var file = 'server/docs/politicaDatos.pdf';
  res.download(file);
});


module.exports = app;