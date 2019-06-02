var express = require('express');
var randomstring = require("randomstring");
var mail = require('../services/mail/mail.js');
var bcrypt = require('bcrypt');

var app = express();

var User = require('../models/user.js');
var Token = require('../models/token.js');

const MAX_MIN_DIFF = 5;
//-------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------RUTAS
app.post('/', function (req, res)
{
  var email = req.body.email;

  //search for the user
  User.find({ email: email },
    function (err, docs)
    {
      if (err)
      {
        return res.status(500).json({
          ok: false,
          message: 'Error searching user',
          errors: err
        });
      }
      else
      {
        if (docs.length === 0)
        {
          return res.status(404).json({
            ok: false,
            message: 'No user with email: ' + email + ' exists'
          });
        }
        else
        {
          var userSearched = docs[0];

          // create the token 
          var token = generateToken();

          var token = new Token({
            token: token,
            email: userSearched.email
          });

          token.save(function (err, tokenSaved)
          {
            if (err)
            {
              return res.status(500).json({
                ok: false,
                message: 'Error al crear token',
                errors: err
              });
            }
            else
            {
              mail.sendNewPasswordMail({ user: userSearched, token: tokenSaved });

              return res.status(200).json({
                ok: true,
                message: 'OK'
              });
            }
          });
        }
      }
    }
  );

});


app.post('/verify', function (req, res)
{
  var token = req.body.token;

  Token.find({ token: token }, function (err, docs)
  {
    if (err)
    {
      return res.status(500).json({
        ok: false,
        message: 'Error al buscar token',
        errors: err
      });
    }
    else
    {
      if (docs.length > 0)
      {
        //once the token is found, we have to check the time validation
        var tokenSearched = docs[0];
        var dateToken = tokenSearched.date;
        var dateNow = new Date();

        var minDiff = Math.ceil((dateNow - dateToken) / 60000)

        if (minDiff > MAX_MIN_DIFF)
        {
          return res.status(202).json({
            ok: true,
            message: 'token found but expired :S',
            code: 202
          });
        }
        else
        {
          return res.status(200).json({
            ok: true,
            message: 'OK'
          });
        }
      }
      else
      {
        return res.status(404).json({
          ok: false,
          message: 'No token: ' + token + ' exists'
        });
      }
    }
  });
});


app.post('/new', function (req, res)
{
  var token = req.body.token;
  var password = req.body.password;

  Token.find({ token: token }, function (err, docs)
  {
    if (err)
    {
      return res.status(500).json({
        ok: false,
        message: 'Error al buscar token',
        errors: err
      });
    }
    else
    {
      if (docs.length > 0)
      {
        //once the token exists, we have to update password bitch
        var tokenSearched = docs[0];

        var email = tokenSearched.email;

        User.find({ email: email },
          function (err, docs)
          {
            if (err)
            {
              return res.status(500).json({
                ok: false,
                message: 'Error searching user',
                errors: err
              });
            }
            else
            {
              if (docs.length === 0)
              {
                return res.status(404).json({
                  ok: false,
                  message: 'No user with email: ' + email + ' exists'
                });
              }
              else
              {
                var userSearched = docs[0];

                // create the token 
                userSearched.password = bcrypt.hashSync(password, 10)

                userSearched.save(function (err, tokenSaved)
                {
                  if (err)
                  {
                    return res.status(500).json({
                      ok: false,
                      message: 'Error al crear token',
                      errors: err
                    });
                  }
                  else
                  {
                    return res.status(200).json({
                      ok: true,
                      message: 'OK'
                    });
                  }
                });
              }
            }
          }
        );
      }
      else
      {
        return res.status(404).json({
          ok: false,
          message: 'No token: ' + token + ' exists'
        });
      }
    }
  });
});


function generateToken()
{
  try
  {
    var token = randomstring.generate({
      length: 12
    });;

    return token;
  }
  catch (error)
  {
    console.log('error at tokenRoute.js - generateToken: ' + error);
  }
}

module.exports = app;