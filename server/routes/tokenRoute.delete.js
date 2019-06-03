
var express = require('express');
var randomstring = require("randomstring");
var mail = require('../services/mail/mail.js');

var app = express();

var Token = require('../models/token.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/', function (req, res)
{
  var desde = Number(req.query.desde) || 0;
  var hasta = Number(req.query.hasta) || 5;

  Token.find({})
    .skip(desde)
    .limit(hasta)
    .exec(
      function (err, tokens)
      {
        if (err)
        {
          return res.status(500).json({
            ok: false,
            message: 'Error retrieving tokens',
            errors: err
          });
        }
        else
        {
          return res.status(200).json({
            ok: true,
            users: tokens
          });
        }
      });
});


app.post('/', function (req, res)
{
  var token = generateToken();

  var token = new Token({
    token: token,
  });

  token.save(function (err, tokenSaved)
  {
    if (err)
    {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear user',
        errors: err
      });
    }
    else
    {
      mail.sendNewPasswordMail();

      return res.status(201).json({
        ok: true,
        document: tokenSaved
      });
    }
  });
});


function generateToken()
{
  try
  {
    var token = randomstring.generate({
      length: 12
    });;

    return token;
  }
  catch (error)
  {
    console.log('error at tokenRoute.js - generateToken: ' + error);
  }
}

module.exports = app;