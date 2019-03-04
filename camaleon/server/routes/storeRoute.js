var express = require('express');

var app = express();

var Store = require('../models/store.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/:id', function (req, res)
{
    Store.findById(id, (err, storeSearched) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error searching store',
                errors: err
            });
        }
        else
        {
            if (!storeSearched)
            {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'The store with id: ' + id + 'does not exist',
                    errors: { message: 'Store with id does not exist' }
                });
            }
            else
            {
                return res.status(200).json({
                    ok: true,
                    store: storeSearched
                });
            }
        }
    });
});

module.exports = app;