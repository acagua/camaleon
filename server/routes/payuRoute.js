var express = require('express');
//var md5 = require('ts-md5');
const crypto = require('crypto')
var mail = require('../services/mail/mail.js');

var app = express();

var PayU = require('../models/payu.js');

var Order = require('../models/order.js');
var User = require('../models/user.js');
var Store = require('../models/store.js');

//---------------------------------------------------------------------------ROUTES
app.post('/', function(req, res) {
    var body = req.body;
    var response_code_pol = body.response_code_pol;
    var phone = body.phone;
    var additional_value = body.additional_value;
    var test = body.test;
    var transaction_date = body.transaction_date;
    var cc_number = body.cc_number;
    var cc_holder = body.cc_holder;
    var error_code_bank = body.error_code_bank;
    var billing_country = body.billing_country;
    var bank_referenced_name = body.bank_referenced_name;
    var description = body.description;
    var administrative_fee_tax = body.administrative_fee_tax;
    var value = body.value;
    var administrative_fee = body.administrative_fee;
    var payment_method_type = body.payment_method_type;
    var office_phone = body.office_phone;
    var email_buyer = body.email_buyer;
    var response_message_pol = body.response_message_pol;
    var error_message_bank = body.error_message_bank;
    var shipping_city = body.shipping_city;
    var transaction_id = body.transaction_id;
    var sign = body.sign;
    var operation_date = body.operation_date;
    var tax = body.tax;
    var transaction_bank_id = body.transaction_bank_id;
    var payment_method = body.payment_method;
    var billing_address = body.billing_address;
    var payment_method_name = body.payment_method_name;
    var pseCycle = body.pseCycle;
    var pse_bank = body.pse_bank;
    var state_pol = body.state_pol; //4:aprobada|5:rechazada|6:expirada
    var date = body.date;
    var nickname_buyer = body.nickname_buyer;
    var reference_pol = body.reference_pol;
    var currency = body.currency;
    var risk = body.risk;
    var shipping_address = body.shipping_address;
    var bank_id = body.bank_id;
    var payment_request_state = body.payment_request_state;
    var customer_number = body.customer_number;
    var administrative_fee_base = body.administrative_fee_base;
    var attempts = body.attempts;
    var merchant_id = body.merchant_id;
    var exchange_rate = body.exchange_rate;
    var shipping_country = body.shipping_country;
    var installments_number = body.installments_number;
    var franchise = body.franchise;
    var payment_method_id = body.payment_method_id;
    var extra1 = body.extra1;
    var extra2 = body.extra2;
    var antifraudMerchantId = body.antifraudMerchantId;
    var extra3 = body.extra3;
    var commision_pol_currency = body.commision_pol_currency;
    var nickname_seller = body.nickname_seller;
    var ip = body.ip;
    var commision_pol = body.commision_pol;
    var airline_code = body.airline_code;
    var billing_city = body.billing_city;
    var pse_reference1 = body.pse_reference1;
    var cus = body.cus;
    var reference_sale = body.reference_sale;
    var authorization_code = body.authorization_code;
    var pse_reference3 = body.pse_reference3;
    var pse_reference2 = body.pse_reference2;

    //Sandbox
    // var payUApiKey = '4Vj8eK4rloUd272L48hsrarnUA';
    // Producción
    var payUApiKey = 'riJ8844MMP9ursOtgmFWnhSI2B';

    var new_value = '';
    if (value.substring(value.length - 2, value.length) == '00') {
        new_value = value.substring(0, value.length - 1);
    } else {
        new_value = value;
    }

    var verifySignature = crypto.createHash('md5').update(payUApiKey + '~' + merchant_id + '~' + reference_sale + '~' + new_value + '~' + currency + '~' + state_pol).digest("hex")

    if (sign == verifySignature) {
        //UPDATE ORDER
        var currentStatus = '';
        Order.findOne({
                number: reference_sale // search query
            }, "status")
            .then(doc => {
                currentStatus = doc.status;
                // console.log("order status " + currentStatus);
                if (currentStatus == Order.Status.PAYMENT_PENDING) {
                    var nuevoEstado = '';
                    // console.log("estado" + state_pol);
                    if (state_pol == 4) {
                        //TODO Enviar correo de confirmacion de pago
                        nuevoEstado = Order.Status.PAID;
                    } else if (state_pol == 5 || state_pol == 6) {
                        //TODO Enviar correo de rechazo de pago
                        nuevoEstado = Order.Status.CANCELED;
                    }

                    Order.findOneAndUpdate({
                        number: reference_sale // search query
                    }, {
                        status: nuevoEstado // field:values to update
                    }, {
                        new: true, // return updated doc
                        runValidators: true // validate before update
                    }).then(doc => {
                        // console.log(doc);
                        //mail
                        //search for the user of the order and the stores
                        User.findById(doc._userId, (err, user) => {
                            if (err) {
                                console.log('error at searching for the user in the order registration');
                            } else {
                                if (!user) {
                                    console.log('The user with id ' + doc._userId + ' does not exist');
                                } else {
                                    //find stores to retrieve the emails to bcc
                                    Store.find({
                                        '_id': {
                                            $in: doc._storesIds
                                        }
                                    }, (err, stores) => {
                                        if (err) {
                                            console.log('error at searching for the stores in the order registration');
                                        } else {
                                            var parameters = {
                                                order: doc,
                                                user: user,
                                                stores: stores
                                            };

                                            mail.sendOrderPaymentMail(parameters);
                                            // console.log('b:::YES' + '\n');
                                        }
                                    });
                                }
                            }
                        });
                        //\mail
                    }).catch(err => {
                        console.error(err);
                    });
                } else {
                    //ESTADO YA ACTUALIZADO
                    console.log('Estado actualizado previamente');
                }
            })
            .catch(err => {
                console.error("err" + err);
            });
    } else {
        //ERROR NO CONCUERDA FIRMA 
        console.log('error en la firma');
    }

    var payu = new PayU({
        response_code_pol: response_code_pol,
        phone: phone,
        additional_value: additional_value,
        test: test,
        transaction_date: transaction_date,
        cc_number: cc_number,
        cc_holder: cc_holder,
        error_code_bank: error_code_bank,
        billing_country: billing_country,
        bank_referenced_name: bank_referenced_name,
        description: description,
        administrative_fee_tax: administrative_fee_tax,
        value: value,
        administrative_fee: administrative_fee,
        payment_method_type: payment_method_type,
        office_phone: office_phone,
        email_buyer: email_buyer,
        response_message_pol: response_message_pol,
        error_message_bank: error_message_bank,
        shipping_city: shipping_city,
        transaction_id: transaction_id,
        sign: sign,
        verify_sign: verifySignature,
        operation_date: operation_date,
        tax: tax,
        transaction_bank_id: transaction_bank_id,
        payment_method: payment_method,
        billing_address: billing_address,
        payment_method_name: payment_method_name,
        pseCycle: pseCycle,
        pse_bank: pse_bank,
        state_pol: state_pol,
        date: date,
        nickname_buyer: nickname_buyer,
        reference_pol: reference_pol,
        currency: currency,
        risk: risk,
        shipping_address: shipping_address,
        bank_id: bank_id,
        payment_request_state: payment_request_state,
        customer_number: customer_number,
        administrative_fee_base: administrative_fee_base,
        attempts: attempts,
        merchant_id: merchant_id,
        exchange_rate: exchange_rate,
        shipping_country: shipping_country,
        installments_number: installments_number,
        franchise: franchise,
        payment_method_id: payment_method_id,
        extra1: extra1,
        extra2: extra2,
        antifraudMerchantId: antifraudMerchantId,
        extra3: extra3,
        commision_pol_currency: commision_pol_currency,
        nickname_seller: nickname_seller,
        ip: ip,
        commision_pol: commision_pol,
        airline_code: airline_code,
        billing_city: billing_city,
        pse_reference1: pse_reference1,
        cus: cus,
        reference_sale: reference_sale,
        authorization_code: authorization_code,
        pse_reference3: pse_reference3,
        pse_reference2: pse_reference2
    });

    payu.save(function(err, docSaved) {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear payu',
                errors: err
            });
        } else {
            return res.status(201).json({
                ok: true,
                document: docSaved
            });
        }
    });
});

module.exports = app;