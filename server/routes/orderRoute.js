var express = require('express');
var mail = require('../services/mail/mail.js');

var app = express();

var Order = require('../models/order.js');
var OrderItem = require('../models/orderItem.js');
var User = require('../models/user.js');
var Store = require('../models/store.js');
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

  var storesIds = [];

  let arrOrderItem = [];

  body.arrItem.forEach(element =>
  {
    arrOrderItem.push(new OrderItem({ item: element.item, quantity: element.quantity, total: element.total }));

    //get stores ids
    storesIds.push(element.item._storeId);
  });

  var order = new Order({
    whoReceives: body.whoReceives,
    comments: body.comments,
    date: new Date(),
    telephone: body.telephone,
    address: body.address,
    items: arrOrderItem,
    shippingCost: body.shippingCost,
    total: body.total,
    _userId: body.userId
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
      //mail
      var to = [];
      var user = null;
      var stores = [];

      //search for the user of the order and the stores
      User.findById(body.userId, (err, document) =>
      {
        if (err)
        {
          console.log('error at searching for the user in the order registration');
        }
        else
        {
          if (!document)
          {
            console.log('The user with id ' + body.userId + ' does not exist');
          }
          else
          {
            //add the user email to the 'to' variable of the mail
            user = document;

            //find stores to retrieve the emails to bcc
            Store.find({
              '_id': {
                $in: storesIds
              }
            }, (err, documents) =>
              {
                if (err)
                {
                  console.log('error at searching for the stores in the order registration');
                }
                else
                {
                  stores = documents;
                  var parameters = {
                    order: order,
                    user: user,
                    stores: stores
                  };

                  mail.sendOrderMail(parameters);
                }
              });
          }
        }
      });
      //\mail

      return res.status(200).json({
        ok: true,
        document: orderSaved
      });
    }
  });
});


module.exports = app;