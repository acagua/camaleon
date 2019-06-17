var nodemailer = require("nodemailer");
var fs = require('fs');
var util = require('../../utils/util.js');

//templates desarrollo
// var templateNewOrder = fs.readFileSync('server/services/mail/templates/newOrder.html', { encoding: 'utf-8' });
// var templateNewOrderStore = fs.readFileSync('server/services/mail/templates/newOrderStore.html', { encoding: 'utf-8' });
// var templateNewPassword = fs.readFileSync('server/services/mail/templates/newPassword.html', { encoding: 'utf-8' });
// var templateContactMessage = fs.readFileSync('server/services/mail/templates/contactMessage.html', { encoding: 'utf-8' });

//templates produccion
var templateNewOrder = fs.readFileSync('/var/www/camaleon.shop/server/services/mail/templates/newOrder.html', { encoding: 'utf-8' });
var templateNewOrderStore = fs.readFileSync('/var/www/camaleon.shop/server/services/mail/templates/newOrderStore.html', { encoding: 'utf-8' });
var templateNewPassword = fs.readFileSync('/var/www/camaleon.shop/server/services/mail/templates/newPassword.html', { encoding: 'utf-8' });
var templateContactMessage = fs.readFileSync('/var/www/camaleon.shop/server/services/mail/templates/contactMessage.html', { encoding: 'utf-8' });

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
        var user = parameters.user;
        var order = parameters.order;

        var bcc = ['info@camaleon.shop', 'nicolaz@camaleon.shop'];

        //1. mail to the user
        var to = parameters.user.email;

        var htmlTemplate = templateNewOrder;
        var htmlOrderTable = `<div class="desktop">
                                <div class="row header text-light my-auto">
                                    <div class="col-3 my-2">
                                        <div class="f-300 f-size-4">Tienda</div>
                                    </div>
                                    <div class="col-3 my-2">
                                        <div class="f-300 f-size-4">Producto</div>
                                    </div>
                                    <div class="col-3 my-2">
                                        <div class="f-300 f-size-4">Cantidad</div>
                                    </div>
                                    <div class="col-3 my-2">
                                        <div class="f-300 f-size-4">Total</div>
                                    </div>
                                </div>`;

        order.items.forEach(element =>
        {
            htmlOrderTable += `<div class="row info item border-bottom">
                                    <div class="col-3 mt-4">
                                        <div class="f-300 f-size-4">${element.item._storeCodeName}</div>
                                    </div>
                                    <div class="col-3 mt-4">
                                        <div class="f-300 f-size-4">${element.item.name}</div>
                                    </div>
                                    <div class="col-3 mt-4">
                                        <div class="f-300 f-size-4">${element.quantity}</div>
                                    </div>
                                    <div class="col-3 mt-4">
                                        <div class="f-300 f-size-4">$${element.total}</div>
                                    </div>
                                </div>`;
        });

        htmlOrderTable += '</div>';

        htmlOrderTable += `<div class="mobile">
                                <div class="row info item border-bottom">`;

        order.items.forEach(element =>
        {
            htmlOrderTable += `<div class="col-6 mt-4">
                                    <div class="f-300 f-size-4">
                                    <img class="image"
                                    src="${element.item.images[0]}">
                                    </div>
                                    <!-- <div class="f-300 f-size-5"><b>Nombre: </b> Billetera de mucho cargue</div> -->
                                    <div class="f-300 f-size-5">${element.item.name}</div>
                                    <div class="f-300 f-size-5"><b>Marca: </b>${element.item._storeCodeName}</div>
                                    <div class="f-300 f-size-5"><b>Cantidad: </b>${element.quantity}</div>
                                    <div class="f-300 f-size-5"><b>Total: </b>$${element.total}</div>
                                </div>`;
        });

        htmlOrderTable += `</div></div>`;

        var orderDate = util.getStrDate(order.date);

        htmlTemplate = htmlTemplate.replace('**name**', user.name)
            .replace('**order-number**', order.number)
            .replace('**purchase-date**', orderDate)
            .replace('**qty**', order.items.length)
            .replace('**shipping-address**', order.address)
            .replace('**subtotal**', order.total)
            .replace('**shipping**', order.shippingCost)
            .replace('**tax**', 0 + '')
            .replace('**total**', order.total)
            .replace('**order-id**', order._id)
            .replace('**tableItems**', htmlOrderTable);

        var mailOptions = {
            from: mailFrom,
            to: to,
            bcc: bcc,
            subject: 'Tú orden #' + order.number + ' ha sido recibida :D',
            html: htmlTemplate
        };

        transporter.sendMail(mailOptions, function (error, info)
        {
            if (error)
            {
                console.log(error);
            } else
            {
                console.log("Email sent");
            }
        });

        //2. mail to the stores
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
                } else
                {
                    console.log("Email sent");
                }
            });
        });

    } catch (error)
    {
        console.log('error en mail - sendOrderMail: ' + error);
    }
}

exports.sendNewPasswordMail = function (parameters)
{
    try
    {
        var user = parameters.user;
        var token = parameters.token.token;

        var to = user.email;

        var html = templateNewPassword.replace('**userName**', user.name)
            .replace('**token**', token);

        var mailOptions = {
            from: mailFrom,
            to: to,
            subject: 'Nueva contraseña',
            html: html
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
        console.log('error en mail - sendNewPasswordMail: ' + error);
    }
}

exports.sendContactMessage = function (parameters)
{
    try
    {
        var contactMessage = parameters.contactMessage;

        // var to = mailFrom;
        var to = 'nicolaz888@hotmail.com';

        var html = templateContactMessage.replace('**sender**', contactMessage.name + ' ' + contactMessage.lastName)
            .replace('**phone**', contactMessage.phone)
            .replace('**email**', contactMessage.email)
            .replace('**message**', contactMessage.message);

        var mailOptions = {
            from: mailFrom,
            to: to,
            subject: 'Nuevo Mensaje de Contacto',
            html: html
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

        return true;
    }
    catch (error)
    {
        console.log('error en mail - sendContactMessage: ' + error);
        return false;
    }
}