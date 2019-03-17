var express = require('express');
var bcrypt = require('bcrypt');

var app = express();

var Order = require('../models/order.js');
var OrderItem = require('../models/orderItem.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/', function (req, res)
{
  Order.find({})
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
            documents: orders
          });
        }
      });
});


app.get('/:id', function (req, res)
{
  var id = req.params.id;

  Order.findById(id, (err, order) =>
  {
    if (err)
    {
      return res.status(500).json({
        ok: false,
        message: 'Error searching order',
        errors: err
      });
    }
    else
    {
      if (!order)
      {
        return res.status(400).json({
          ok: false,
          message: 'The order with id: ' + id + 'does not exist'
        });
      }
      else
      {
        return res.status(200).json({
          ok: true,
          document: order
        });
      }
    }
  });
});


app.get('/user/:userId', function (req, res)
{

  var userId = req.params.userId;

  var since = Number(req.query.since) || 0;
  var until = Number(req.query.until) || 20;

  Order.find({ _userId: userId })
    .sort({ date: 'descending' })
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
            documents: orders
          });
        }
      });
});


app.post('/', function (req, res)
{
  const body = req.body;

  let arrOrderItem = [];

  body.arrItem.forEach(element =>
  {
    arrOrderItem.push(new OrderItem({ _itemId: element.item._id, quantity: element.quantity }));
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
        document: orderSaved
      });
    }
  });
});


module.exports = app;