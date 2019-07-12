
var express = require('express');

var app = express();

var Item = require('../models/item.js');
var ItemOption = require('../models/itemOption.js');
var ItemSpecification = require('../models/itemSpecification.js');
const { Status } = require('../models/item.js');

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

    Item.find({ status: Status.ACTIVE, _storeCodeName: storeCodeName })
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


app.get('/category/:categoryId', function (req, res)
{
    var categoryId = req.params.categoryId;

    var from = Number(req.query.from) || 0;
    var limit = Number(req.query.limit) || 20;

    Item.find({ _categoryId: categoryId })
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


app.get('/random/store/:storeId', function (req, res)
{
    var storeId = req.params.storeId;

    var limit = Number(req.query.limit) || 5;

    var filter = { _storeId: storeId };
    var fields = {};
    var options = { limit: limit };
    Item.findRandom(filter, fields, options, function (err, items)
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
                title: 'random by store',
                ok: true,
                documents: items
            });
        }
    });
});


app.get('/random/category/:categoryId', function (req, res)
{
    var categoryId = req.params.categoryId;

    var limit = Number(req.query.limit) || 5;

    var filter = { status: Status.ACTIVE, _categoryId: categoryId };
    var fields = {};
    var options = { limit: limit };
    Item.findRandom(filter, fields, options, function (err, items)
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
                title: 'random by category',
                ok: true,
                documents: items
            });
        }
    });
});


app.get('/random/home/', function (req, res)
{
    var limit = Number(req.query.limit) || 8;

    var filter = {};
    var fields = {};
    var options = { limit: limit };
    Item.findRandom(filter, fields, options, function (err, items)
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

    //ejemplo de mapa y de nested monda
    var itemOptions = [];

    itemOptions.push(new ItemOption({ name: 'tipo de hoja', values: ['rayada', 'cuadriculas'] }));

    var itemSpecifications = [];

    itemSpecifications.push(
        new ItemSpecification({ name: 'peso', value: '1' }),
        new ItemSpecification({ name: 'dimensiones', value: '34x45x67' }),
        new ItemSpecification({ name: 'volumen', value: '45' }),
        new ItemSpecification({ name: 'material', value: 'cuero' }),
        new ItemSpecification({ name: 'color', value: 'rojo' }),
        new ItemSpecification({ name: 'sabor', value: 'frutitas' }),
        new ItemSpecification({ name: 'fragancia', value: 'lavanda' }),
        new ItemSpecification({ name: 'textura', value: 'mate' })
    );

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