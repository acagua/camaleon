var nodeMailer = require("nodemailer");



exports.sendMail = function (email)
{
    var transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nicolaz888@gmail.com',
            pass: 'paolaperez88'
        }
    });
    // Definimos el email
    var mailOptions = {
        from: 'Remitente',
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
            res.send(500, error.message);
        } else
        {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};