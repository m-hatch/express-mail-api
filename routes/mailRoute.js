var express = require('express');
var nodemailer = require('nodemailer');

var mailRoute = express.Router();

// @path /mail
mailRoute.post('/', function(request, response) {

    var mailBody = 'Name: ' + request.body.name + ';\r\n'
        + 'Email: ' + request.body.email + ';\r\n'
        + 'Company: ' + request.body.company + ';\r\n'
        + 'Message: ' + request.body.message;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hatch.api1',
        pass: 'randomPass123'
      }
    });

    var mailOptions = {
      from: 'email',
      to: 'hatch@acm.org',
      subject: 'Digital Portfolio Email',
      text: mailBody
    };

    transporter.sendMail(mailOptions, function(error, info){
      (error) ? console.log(error) : response.json({ message: "contact form received"});
    });

    
});

module.exports = mailRoute;