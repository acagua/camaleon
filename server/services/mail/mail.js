var nodemailer = require("nodemailer");
var fs = require('fs');
var util = require('../../utils/util.js');

var Order = require('../../models/order.js');

//templates sandbox
// var templateOrderCreated = fs.readFileSync('server/services/mail/templates/orderCreated.html', { encoding: 'utf-8' });
// var templateOrderPayment = fs.readFileSync('server/services/mail/templates/orderPayment.html', { encoding: 'utf-8' });
// var templateNewOrderStore = fs.readFileSync('server/services/mail/templates/newOrderStore.html', { encoding: 'utf-8' });
// var templateNewPassword = fs.readFileSync('server/services/mail/templates/newPassword.html', { encoding: 'utf-8' });
// var templateContactMessage = fs.readFileSync('server/services/mail/templates/contactMessage.html', { encoding: 'utf-8' });

//templates produccion
var templateNewOrder = fs.readFileSync('/var/www/camaleon.shop/server/services/mail/templates/newOrder.html', { encoding: 'utf-8' });
var templateOrderCreated = fs.readFileSync('/var/www/camaleon.shop/server/services/mail/templates/orderCreated.html', { encoding: 'utf-8' });
var templateOrderPayment = fs.readFileSync('/var/www/camaleon.shop/server/services/mail/templates/orderPayment.html', { encoding: 'utf-8' });
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


exports.sendOrderMail = function(parameters) {
    try {
        var user = parameters.user;
        var order = parameters.order;

        // var bcc = ['info@camaleon.shop', 'nicolaz@camaleon.shop'];
        var bcc = [];

        //1. mail to the user
        var to = parameters.user.email;

        var htmlTemplate = templateOrderCreated;
        var htmlOrderTable = '';

        order.items.forEach(element => {
            htmlOrderTable += `<tr>
                                    <td align="center"><a href="https://camaleon.shop/store/${element.item._storeCodeName}">${element.item._storeCodeName}</a></td>
                                    <td align="center"><a href="https://camaleon.shop/item/${element.item._id}">${element.item.name}</a></td>
                                    <td align="center">${element.quantity}</td>
                                    <td align="right">$${element.total}</td>
                               </tr>`;
        });

        var orderDate = util.getStrDate(order.date);

        htmlTemplate = htmlTemplate.replace('**name**', user.name)
            .replace('**order-number**', order.number)
            .replace('**purchase-date**', orderDate)
            .replace('**qty**', order.items.length)
            .replace('**shipping-address**', order.address)
            .replace('**telephone**', order.telephone)
            .replace('**subtotal**', order.subtotal)
            .replace('**shipping**', order.shippingCost)
            .replace('**tax**', 0 + '')
            .replace('**total**', order.total)
            .replace('**department**', order.department.name)
            .replace('**city**', order.city.name)
            .replace('**order-id**', order._id)
            .replace('**tableItems**', htmlOrderTable);

        var mailOptions = {
            from: mailFrom,
            to: to,
            bcc: bcc,
            subject: 'Tu orden #' + order.number + ' ha sido recibida :D',
            html: htmlTemplate
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent" + '\n');
            }
        });
    } catch (error) {
        console.log('error en mail - sendOrderMail: ' + error);
    }
}

exports.sendOrderPaymentMail = function(parameters) {
    try {
        var user = parameters.user;
        var order = parameters.order;

        var bcc = ['info@camaleon.shop', 'nicolaz@camaleon.shop'];

        //1. mail to the user
        var to = parameters.user.email;

        var htmlTemplate = templateOrderPayment;
        var htmlOrderTable = '';

        order.items.forEach(element => {
            htmlOrderTable += `<tr>
                                    <td align="center"><a href="https://camaleon.shop/store/${element.item._storeCodeName}">${element.item._storeCodeName}</a></td>
                                    <td align="center"><a href="https://camaleon.shop/item/${element.item._id}">${element.item.name}</a></td>
                                    <td align="center">${element.quantity}</td>
                                    <td align="right">$${element.total}</td>
                               </tr>`;
        });

        var orderDate = util.getStrDate(order.date);

        htmlTemplate = htmlTemplate.replace('**name**', user.name)
            .replace('**order-number**', order.number)
            .replace('**purchase-date**', orderDate)
            .replace('**qty**', order.items.length)
            .replace('**shipping-address**', order.address)
            .replace('**telephone**', order.telephone)
            .replace('**subtotal**', order.total)
            .replace('**shipping**', order.shippingCost)
            .replace('**tax**', 0 + '')
            .replace('**total**', order.total)
            .replace('**department**', order.department.name)
            .replace('**city**', order.city.name)
            .replace('**order-id**', order._id)
            .replace(/payment-response/g, parseOrderStatus(order.status))
            .replace('**tableItems**', htmlOrderTable);

        var mailOptions = {
            from: mailFrom,
            to: to,
            bcc: bcc,
            subject: 'Tu orden #' + order.number + ' ha sido confirmada :D',
            html: htmlTemplate
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent");
            }
        });

        //2. mail to the stores
        parameters.stores.forEach(element1 => {
            var htmlTemplate = templateNewOrderStore;
            var htmlOrderTable = '<table>';
            // replace order table
            order.items.forEach(element2 => {
                if (element2.item._storeId + 'x' === element1._id + 'x') {
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

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent");
                }
            });
        });

    } catch (error) {
        console.log('error en mail - sendOrderPaymentMail: ' + error);
    }
}


parseOrderStatus = function(orderStatus) {
    try {
        var resp = 'NA';

        if (orderStatus == Order.Status.PAID) {
            return 'exitoso';
        } else if (orderStatus == Order.Status.CANCELED) {
            return 'rechazado';
        }

        return resp;
    } catch (error) {
        console.log('error en mail - parseOrderStatus: ' + error);
        return 'error'
    }
}


exports.sendNewPasswordMail = function(parameters) {
    try {
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

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent");
            }
        });
    } catch (error) {
        console.log('error en mail - sendNewPasswordMail: ' + error);
    }
}

exports.sendContactMessage = function(parameters) {
    try {
        var contactMessage = parameters.contactMessage;

        // var to = mailFrom;
        var to = 'info@camaleon.shop';

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

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent");
            }
        });

        return true;
    } catch (error) {
        console.log('error en mail - sendContactMessage: ' + error);
        return false;
    }
}