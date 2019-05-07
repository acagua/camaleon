var nodemailer = require("nodemailer");
var fs = require('fs');

// var template = fs.readFileSync('templates/newOrder.html', { encoding: 'utf-8' });
var template = '';

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
        var mailOptions = {
            from: mailFrom,
            to: parameters.email,
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
