var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config.js').SEED;

var app = express();
var User = require('../models/user.js');

//-------------------------------------------AUTENTICACIÓN NORMAL
app.post('/', (req, res) =>
{
    var body = req.body;

    User.findOne({ email: body.email }, (err, userSearched) =>
    {
        if (err)
        {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar el user con email: ' + body.email,
                errors: err
            });
        }
        else if (!userSearched)
        {
            return res.status(400).json({
                ok: false,
                message: 'No se encuentra el usuario con email: ' + body.email,
                errors: { message: 'No se encuentra el usuario con ese email' }
            });
        }
        else
        {
            if (!bcrypt.compareSync(body.password, userSearched.password))
            {
                return res.status(422).json({
                    ok: false,
                    message: 'Credenciales incorrectas',
                    errors: { error: 'Credenciales incorrectas' }
                });
            }
            else
            {
                userSearched.password = ';)';
                // crear token
                var token = jwt.sign({ user: userSearched }, SEED, { expiresIn: 14400 }); // 4 horas
                return res.status(200).json({
                    ok: 'true',
                    token: token,
                    user: userSearched
                });
            }
        }
    });

});

module.exports = app;