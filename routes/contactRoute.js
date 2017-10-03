var express = require('express');
var Contact = require('../models/contact.js');

var contactRoute = express.Router();

// @path /navigation
contactRoute.route('/')
    .get(function(request, response){
        Contact.find(function(error, contact){
            error ? response.send(error) : response.json(contact);
        });
    })

    .post(function(request, response){
        var contact = new Contact();
        contact.heading = request.body.heading;
        contact.text = request.body.text;

        contact.save(function(error){
            error ? response.send(error) : response.json({ message: 'contact added'});
        });
    });

// @path /contact/:contact_id
contactRoute.route('/:contact_id')
    .get(function(request, response){
        Contact.findById(request.params.contact_id, function(error, contact){
            error ? response.send(error) : response.json(contact);
        });
    })

    .put(function(request, response){
        Contact.findById(request.params.contact_id, function(error, contact){
            if(error) {
                response.send(error);
            } else {
                contact.heading = request.body.heading;
                contact.text = request.body.text;
            }

            contact.save(function(error){
                error ? response.send(error) : response.json({ message: 'contact updated'});
            });
        })
    })

    .delete(function(request, response){
        Contact.remove({
            _id: request.params.contact_id
        }, function(error, contact){
            error ? response.send(error) : response.json({ message: 'deleted contact' });
        })
    });

module.exports = contactRoute;