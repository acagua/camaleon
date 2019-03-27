
var express = require('express');

var app = express();

var Item = require('../models/item.js');

//---------------------------------------------------------------------------ROUTES
app.get('/', function (req, res)
{
    var from = Number(req.query.from) || 0;
    var limit = Number(req.query.limit) || 100;

    Item.find({})
        .skip(from)
        .limit(limit)
        .exec(
            function (err, items)
            {
                if (err)
                {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error retrieving items',
                        errors: err
                    });
                }
                else
                {
                    return res.status(200).json({
                        ok: true,
                        documents: items
                    });
                }
            });
});


app.get('/:id', function (req, res)
{
    var id = req.params.id;

    Item.findById(id, (err, item) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error searching item',
                errors: err
            });
        }
        else
        {
            if (!item)
            {
                return res.status(400).json({
                    ok: false,
                    message: 'The item with id: ' + id + 'does not exist'
                });
            }
            else
            {
                return res.status(200).json({
                    ok: true,
                    document: item
                });
            }
        }
    });
});


app.get('/store/:storeCodeName', function (req, res)
{
    var storeCodeName = req.params.storeCodeName;

    var from = Number(req.query.from) || 0;
    var limit = Number(req.query.limit) || 20;

    Item.find({ _storeCodeName: storeCodeName })
        .skip(from)
        .limit(limit)
        .exec(
            function (err, items)
            {
                if (err)
                {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error retrieving items',
                        errors: err
                    });
                }
                else
                {
                    return res.status(200).json({
                        ok: true,
                        documents: items
                    });
                }
            });
});


app.post('/', function (req, res)
{
    var body = req.body;

    var item = new Item({
        name: body.name,
        description: body.description,
        price: body.price,
        images: body.images,
        _storeId: body.storeId,
        _storeCodeName: body.storeCodeName,
        _categoryId: body.categoryId
    });

    item.save(function (err, itemSaved)
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error al crear item',
                errors: err
            });
        }
        else
        {
            return res.status(200).json({
                ok: true,
                message: 'Se ha guardado el item!',
                item: itemSaved
            });
        }
    });
});


module.exports = app;