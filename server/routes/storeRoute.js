var express = require('express');

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
                        mensaje: 'Error retrieving stores',
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

module.exports = app;