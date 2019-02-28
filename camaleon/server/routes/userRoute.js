var express = require('express');

var app = express();

var Usuario = require('../models/usuario.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/', function (req, res)
{
  var desde = Number(req.query.desde) || 0;
  var hasta = Number(req.query.hasta) || 5;

  Usuario.find({})
    .skip(desde)
    .limit(hasta)
    .exec(
      function (err, usuarios)
      {
        if (err)
        {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando usuarios',
            errors: err
          });
        }
        else
        {
          Usuario.count({}, (err, conteo) =>
          {
            return res.status(200).json({
              ok: true,
              total: conteo,
              usuarios: usuarios
            });
          });

        }
      });
});

module.exports = app;