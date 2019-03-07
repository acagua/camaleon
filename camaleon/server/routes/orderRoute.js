var express = require('express');
var bcrypt = require('bcrypt');

var app = express();

var Order = require('../models/order.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.post('/', function (req, res)
{
  var body = req.body;

  var order = new Order({
    date: new Date(),
    telephone: body.telephone,
    address: body.address,
    _userId: body.userId,
    items: []
  });

  order.save(function (err, orderSaved)
  {
    if (err)
    {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error saving order',
        errors: err
      });
    }
    else
    {
      return res.status(201).json({
        ok: true,
        order: orderSaved
      });
    }
  });
});


module.exports = app;