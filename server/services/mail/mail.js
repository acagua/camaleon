var nodemailer = require("nodemailer");
var fs = require('fs');

//templates
var templateNewOrder = fs.readFileSync('server/services/mail/templates/newOrder.html', { encoding: 'utf-8' });
var templateNewOrderStore = fs.readFileSync('server/services/mail/templates/newOrderStore.html', { encoding: 'utf-8' });

var mailFrom = 'info@camaleon.shop';

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@camaleon.shop',
        pass: 'M3g4l0d0n2019!'
    }
});

exports.sendOrderMail = function (parameters)
{
    try
    {
        var bcc = ['info@camaleon.shop', 'nicolaz@camaleon.shop'];

        //1. mail to the user
        var to = parameters.user.email;

        var mailOptions = {
            from: mailFrom,
            to: to,
            bcc: bcc,
            subject: 'Tú orden #' + parameters.order.number + ' ha sido recibida :D',
            html: templateNewOrder
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

        //2. mail to the stores
        parameters.stores.forEach(element =>
        {
            var mailOptions = {
                from: mailFrom,
                to: element.emails[0],
                bcc: bcc,
                subject: element.name + ' tienes un pedido para preparar!',
                html: templateNewOrderStore
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
        });

    }
    catch (error)
    {
        console.log('error en mail - sendOrderMail: ' + error);
    }
}














