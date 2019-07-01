var express = require('express');

var app = express();

var PayU = require('../models/payu.js');

//---------------------------------------------------------------------------ROUTES
app.post('/', function(req, res) {
    var body = req.body;
    var payu = new PayU({
        //name: body.name
        name: 'post'
    });
    payu.save(function(err, docSaved) {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear payu',
                errors: err
            });
        } else {
            return res.status(201).json({
                ok: true,
                document: docSaved
            });
        }
    });
});

app.get('/', function(req, res) {
    //var body = req.params;
    var body = req.query;
    var payu = new PayU({
        //name: body.name
        name: 'get'
    });
    payu.save(function(err, docSaved) {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear payu',
                errors: err
            });
        } else {
            return res.status(201).json({
                ok: true,
                document: docSaved
            });
        }
    });
});

module.exports = app;