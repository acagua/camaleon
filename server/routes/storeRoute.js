var express = require('express');
var mongoose = require('mongoose');

var app = express();

var Store = require('../models/store.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/', function (req, res)
{
    var desde = Number(req.query.desde) || 0;
    var hasta = Number(req.query.hasta) || 5;

    Store.find({})
        .skip(desde)
        .limit(hasta)
        .exec(
            function (err, stores)
            {
                if (err)
                {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error retrieving stores',
                        errors: err
                    });
                }
                else
                {
                    return res.status(200).json({
                        ok: true,
                        documents: stores
                    });
                }
            });
});


app.get('/:id', function (req, res)
{
    var id = req.params.id;

    Store.findById(id, (err, store) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error searching store',
                errors: err
            });
        }
        else
        {
            if (!store)
            {
                return res.status(400).json({
                    ok: false,
                    message: 'The store with id: ' + id + 'does not exist',
                    errors: { message: 'Store with id does not exist' }
                });
            }
            else
            {
                return res.status(200).json({
                    ok: true,
                    document: store
                });
            }
        }
    });
});


app.get('/name/:name', function (req, res)
{
    var storeName = req.params.name;

    Store.findOne({ codeName: storeName }, (err, store) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error searching store',
                errors: err
            });
        }
        else
        {
            if (!store)
            {
                return res.status(400).json({
                    ok: false,
                    message: 'The store with name: ' + storeName + 'does not exist',
                    errors: { message: 'The store with name: ' + storeName + 'does not exist' }
                });
            }
            else
            {
                return res.status(200).json({
                    ok: true,
                    document: store
                });
            }
        }
    });
});


app.get('/random/normal', function (req, res)
{
    var limit = Number(req.query.limit) || 5;

    var filter = {};
    var fields = {};
    var options = { limit: limit };
    Store.findRandom(filter, fields, options, function (err, documents)
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error retrieving stores',
                errors: err
            });
        }
        else
        {
            return res.status(200).json({
                title: 'random stores',
                ok: true,
                documents: documents
            });
        }
    });
});


app.get('/random/category/:categoryId', function (req, res)
{
    var categoryId = req.params.categoryId;

    var limit = Number(req.query.limit) || 5;

    var filter = { _categoryId: categoryId };
    var fields = {};
    var options = { limit: limit };
    Store.findRandom(filter, fields, options, function (err, items)
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error retrieving stores',
                errors: err
            });
        }
        else
        {
            return res.status(200).json({
                title: 'random by category',
                ok: true,
                documents: items
            });
        }
    });
});


app.get('/monda/monda2/monda3', function (req, res)
{
    Store.find({
        '_id': {
            $in: [
                '5c849e8475aaf01cf0f8439a',
                '5c849e8475aaf01cf0f8439a'
            ]
        }
    }).exec(
        function (err, stores)
        {
            if (err)
            {
                return res.status(500).json({
                    ok: false,
                    message: 'Error retrieving stores',
                    errors: err
                });
            }
            else
            {
                return res.status(200).json({
                    ok: true,
                    documents: stores
                });
            }
        });
});


module.exports = app;