
var express = require('express');

var app = express();

var Category = require('../models/category.js');

//---------------------------------------------------------------------------ROUTES
app.get('/', function (req, res)
{
    var from = Number(req.query.from) || 0;
    var limit = Number(req.query.limit) || 100;

    Category.find({})
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

    Category.findById(id, (err, category) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error searching category',
                errors: err
            });
        }
        else
        {
            if (!category)
            {
                return res.status(400).json({
                    ok: false,
                    message: 'The category with id: ' + id + 'does not exist'
                });
            }
            else
            {
                return res.status(200).json({
                    ok: true,
                    document: category
                });
            }
        }
    });
});


module.exports = app;