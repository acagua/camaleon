var express = require('express');

var app = express();

var User = require('../models/user.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/', function (req, res)
{
  var desde = Number(req.query.desde) || 0;
  var hasta = Number(req.query.hasta) || 5;

  User.find({})
    .skip(desde)
    .limit(hasta)
    .exec(
      function (err, users)
      {
        if (err)
        {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando users',
            errors: err
          });
        }
        else
        {
          User.count({}, (err, conteo) =>
          {
            return res.status(200).json({
              ok: true,
              total: conteo,
              users: users
            });
          });
        }
      });
});

app.post('/', function (req, res)
{
  var body = req.body;

  var user = new User({
    name: body.name,
    email: body.email,
    password: body.password
  });

  user.save(function (err, userSaved)
  {
    if (err)
    {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear user',
        errors: err
      });
    }
    else
    {
      return res.status(201).json({
        ok: true,
        user: userSaved
      });
    }
  });
});

module.exports = app;