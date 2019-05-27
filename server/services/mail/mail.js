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
        var order = parameters.order;

        var bcc = ['info@camaleon.shop', 'nicolaz@camaleon.shop'];

        //1. mail to the user
        var to = parameters.user.email;

        var mailOptions = {
            from: mailFrom,
            to: to,
            bcc: bcc,
            subject: 'Tú orden #' + order.number + ' ha sido recibida :D',
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
        console.log('b:::parameters.stores: ' + JSON.stringify(parameters.stores) + '\n');

        parameters.stores.forEach(element1 =>
        {
            var htmlTemplate = templateNewOrderStore;
            var htmlOrderTable = '<table>';
            // replace order table
            order.items.forEach(element2 =>
            {
                if (element2.item._storeId + 'x' === element1._id + 'x')
                {
                    htmlOrderTable += '<tr>';
                    htmlOrderTable += ' <th>Producto</th>';
                    htmlOrderTable += ' <th>Cantidad</th>';
                    htmlOrderTable += '</tr>';

                    htmlOrderTable += '<tr>';
                    htmlOrderTable += ' <td>' + element2.item.name + '</td>';
                    htmlOrderTable += ' <td>' + element2.quantity + '</td>';
                    htmlOrderTable += '</tr>';
                }
            });

            htmlOrderTable += '</table>';

            htmlTemplate = htmlTemplate.replace('**tableItems**', htmlOrderTable)
                .replace('**storeName**', element1.name);

            var mailOptions = {
                from: mailFrom,
                to: element1.emails[0],
                bcc: bcc,
                subject: element1.name + ' tienes un pedido para preparar!',
                html: htmlTemplate
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














