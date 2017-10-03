var express = require('express');
var About = require('../models/about.js');

var aboutRoute = express.Router();

// @path /about
aboutRoute.route('/')
    .get(function(request, response){
        About.find(function(error, about){
            error ? response.send(error) : response.json(about);
        });
    })

    .post(function(request, response){
        var about = new About();
        about.img = request.body.img;
        about.description = request.body.description;
        about.skills_heading = request.body.skills_heading;
        about.skills_description = request.body.skills_description;
        about.expertise = request.body.expertise;

        about.save(function(error){
            error ? response.send(error) : response.json({ message: 'about added'});
        });
    });

// @path /about/:about_id
aboutRoute.route('/:about_id')
    .get(function(request, response){
        About.findById(request.params.about_id, function(error, about){
            error ? response.send(error) : response.json(about);
        });
    })

    .put(function(request, response){
        About.findById(request.params.about_id, function(error, about){
            if(error) {
                response.send(error);
            } else {
                about.img = request.body.img;
                about.description = request.body.description;
                about.skills_heading = request.body.skills_heading;
                about.skills_description = request.body.skills_description;
                about.expertise = request.body.expertise;
            }

            about.save(function(error){
                error ? response.send(error) : response.json({ message: 'about updated'});
            });
        })
    })

    .delete(function(request, response){
        About.remove({
            _id: request.params.about_id
        }, function(error, about){
            error ? response.send(error) : response.json({ message: 'deleted about' });
        })
    });

module.exports = aboutRoute;