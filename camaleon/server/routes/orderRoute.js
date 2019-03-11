var express = require('express');
var bcrypt = require('bcrypt');

var app = express();

var Order = require('../models/order.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/', function (req, res)
{
  var since = Number(req.query.since) || 0;
  var until = Number(req.query.until) || 5;

  Order.find({})
    .skip(since)
    .limit(until)
    .exec(
      function (err, orders)
      {
        if (err)
        {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error retrieving orders',
            errors: err
          });
        }
        else
        {
          return res.status(200).json({
            ok: true,
            orders: orders
          });
        }
      });
});

app.post('/', function (req, res)
{
  const body = req.body;

  //console.log(JSON.stringify(body.arrItem));

  let arrOrderItem = [];

  body.arrItem.forEach(element =>
  {
    console.log('element:::' + JSON.stringify(element) + '\n');
    arrOrderItem.push({ _itemId: element.item._id, quantity: element.quantity });
  });

  var order = new Order({
    whoReceives: body.whoReceives,
    comments: body.comments,
    date: new Date(),
    telephone: body.telephone,
    address: body.address,
    _userId: body.userId,
    items: arrOrderItem,
    shippingCost: body.shippingCost,
    total: body.total,
  });

  console.log('order:::' + JSON.stringify(order) + '\n');

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