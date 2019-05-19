var express = require('express');
var mail = require('../services/mail/mail.js');

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
            message: 'Error retrieving orders',
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
  var userId = req.query.userId;

  Order.findOne({ _id: id, _userId: userId })
    .exec(
      function (err, document)
      {
        if (err)
        {
          return res.status(500).json({
            ok: false,
            message: 'Error retrieving orders',
            errors: err
          });
        }
        else
        {
          return res.status(200).json({
            ok: true,
            document: document
          });
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
            message: 'Error retrieving orders',
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
    arrOrderItem.push(new OrderItem({ item: element.item, quantity: element.quantity, total: element.total }));
  });

  var order = new Order({
    whoReceives: body.whoReceives,
    comments: body.comments,
    date: new Date(),
    telephone: body.telephone,
    address: body.address,
    _userId: body.userId,
    _userEmail: body.userEmail,
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
        message: 'Error saving order',
        errors: err
      });
    }
    else
    {
      mail.sendOrderMail({ email: order._userEmail, orderNumber: order.number });

      return res.status(200).json({
        ok: true,
        document: orderSaved
      });
    }
  });
});


module.exports = app;