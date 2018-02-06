var express = require('express');
var sgHelper = require('sendgrid').mail;
var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

var mailRoute = express.Router();

// @path /mail
mailRoute.post('/', function(request, response) {

    var mailBody = 'Name: ' + request.body.name + ';\r\n'
        + 'Email: ' + request.body.email + ';\r\n'
        + 'Company: ' + request.body.company + ';\r\n'
        + 'Message: ' + request.body.message;

    // config mail options
    var mailOptions = {
      from: new sgHelper.Email('hatch.api@donotreply.com'),
      to: new sgHelper.Email('hatch.montgomery@gmail.com'),
      subject: 'Digital Portfolio Email',
      content: new sgHelper.Content('text/plain', mailBody)
    };

    var mail = new sgHelper.Mail(
      mailOptions.from, 
      mailOptions.subject, 
      mailOptions.to, 
      mailOptions.content
    );

    // send request
    var request = sendgrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sendgrid.API(request, function(error, info) {
      if (error) {
        response.json({ message: "error sending message"});
        console.log(error);
      } else {
        response.json({ message: "contact form received"});
      } 
      console.log(info.statusCode);
      console.log(info.body);
      console.log(info.headers);
    });

});

module.exports = mailRoute;