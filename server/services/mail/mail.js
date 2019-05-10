var nodemailer = require("nodemailer");
var fs = require('fs');

// var template = fs.readFileSync('/hola.txt', { encoding: 'utf-8' });
var template = 'monda!';

var to = ['info@camaleon.shop', 'nicolaz@camaleon.shop'];

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'info@camaleon.shop',
        pass: 'M3g4l0d0n2019!'
    }
});

var mailFrom = 'info@camaleon.shop';


exports.sendMail = function (email)
{
    try
    {
        var mailOptions = {
            from: mailFrom,
            to: email,
            subject: 'Asunto',
            text: 'Contenido del email'
        };

        transporter.sendMail(mailOptions, function (error, info)
        {
            if (error)
            {
                console.log(error);
            }
            else
            {
                console.log("Email sent");
            }
        });
    }
    catch (error)
    {
        console.log('error en mail - sendMail: ' + error);
    }
}


exports.sendOrderMail = function (parameters)
{
    try
    {
        to.push(parameters.email);

        var mailOptions = {
            from: mailFrom,
            to: to,
            subject: 'Tú orden #' + parameters.orderNumber + ' ha sido recibida :D',
            text: template
        };

        transporter.sendMail(mailOptions, function (error, info)
        {
            if (error)
            {
                console.log(error);
            }
            else
            {
                console.log("Email sent");
            }
        });
    }
    catch (error)
    {
        console.log('error en mail - sendOrderMail: ' + error);
    }
}
