var express = require('express');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

var app = express();

var User = require('../models/user.js');
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.get('/', function (req, res)
{
  //

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'nicolaz888@gmail.com',
      pass: 'paolaperez88'
    }
  });
  // Definimos el email
  var mailOptions = {
    from: 'Remitente',
    to: 'nicolaz888@hotmail.com',
    subject: 'Asunto',
    text: 'Contenido del email'
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info)
  {
    if (error)
    {
      console.log(error);
      res.send(500, error.message);
    } else
    {
      console.log("Email sent");
      res.status(200).jsonp(req.body);
    }
  });

  //

  var desde = Number(req.query.desde) || 0;
  var hasta = Number(req.query.hasta) || 5;

  User.find({})
    .skip(desde)
    .limit(hasta)
    .exec(
      function (err, users)
      {
        if (err)
        {
          return res.status(500).json({
            ok: false,
            message: 'Error cargando users',
            errors: err
          });
        }
        else
        {
          return res.status(200).json({
            ok: true,
            users: users
          });
        }
      });
});


app.post('/', function (req, res)
{
  var body = req.body;

  var user = new User({
    name: body.name,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
  });

  user.save(function (err, userSaved)
  {
    if (err)
    {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear user',
        errors: err
      });
    }
    else
    {
      userSaved.password = ':P';

      return res.status(201).json({
        ok: true,
        document: userSaved
      });
    }
  });
});


app.put('/:id', (req, res) =>
{
  var id = req.params.id;
  var body = req.body

  User.findById(id, (err, userSearched) =>
  {
    if (err)
    {
      return res.status(500).json({
        ok: false,
        message: 'Error al buscar user',
        errors: err
      });
    }
    else
    {
      if (!userSearched)
      {
        return res.status(400).json({
          ok: false,
          message: 'The user with id ' + id + ' does not exist'
        });
      }
      else
      {
        userSearched.name = body.name;
        userSearched.lastName = body.lastName;
        userSearched.address = body.address;
        userSearched.telephone = body.telephone;

        userSearched.save(function (err, userSaved)
        {
          if (err)
          {
            return res.status(400).json({
              ok: false,
              message: 'Error updating user',
              errors: err
            });
          }
          else
          {
            userSaved.password = ':D';
            return res.status(200).json({
              ok: true,
              document: userSaved
            });
          }
        });
      }
    }
  });
});

module.exports = app;