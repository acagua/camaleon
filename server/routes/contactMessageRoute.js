var express = require('express');
var mail = require('../services/mail/mail.js');

var app = express();

var ContactMessage = require('../models/contactMessage.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.post('/', function (req, res)
{
  var body = req.body;

  var contactMessage = new ContactMessage({
    name: body.name,
    lastName: body.lastName,
    email: body.email,
    message: body.message
  });

  contactMessage.save(function (err, docSaved)
  {
    if (err)
    {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear mensaje de contacto',
        errors: err
      });
    }
    else
    {
      // send mail to camaleon
      mail.sendContactMessage({ contactMessage: docSaved });

      return res.status(201).json({
        ok: true,
        document: docSaved
      });
    }
  });
});

module.exports = app;