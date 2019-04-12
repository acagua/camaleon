var nodemailer = require("nodemailer");


exports.sendMail = function (email)
{
    try
    {
        var transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'info@camaleon.shop',
                pass: 'M3g4l0d0n2019!'
            }
        });

        // Definimos el email
        var mailOptions = {
            from: 'info@camaleon.shop',
            to: email,
            subject: 'Asunto',
            text: 'Contenido del email'
        };
        // Enviamos el email
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

    } catch (error)
    {
        console.log('error en mail - sendMail: ' + error);
    }
};