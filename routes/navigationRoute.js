var express = require('express');
var Navigation = require('../models/navigation.js');

var navigationRoute = express.Router();

// @path /navigation
navigationRoute.route('/')
    .get(function(request, response){
        Navigation.find(function(error, nav){
            error ? response.send(error) : response.json(nav);
        });
    })

    .post(function(request, response){
        var nav = new Navigation();
        nav.links = request.body.links;

        nav.save(function(error){
            error ? response.send(error) : response.json({ message: 'navigation added'});
        });
    });

// @path /navigation/:nav_id
navigationRoute.route('/:nav_id')
    .get(function(request, response){
        Navigation.findById(request.params.nav_id, function(error, nav){
            error ? response.send(error) : response.json(nav);
        });
    })

    .put(function(request, response){
        Navigation.findById(request.params.nav_id, function(error, nav){
            if(error) {
                response.send(error);
            } else {
                nav.links = request.body.links;
            }

            nav.save(function(error){
                error ? response.send(error) : response.json({ message: 'navigation updated'});
            });
        })
    })

    .delete(function(request, response){
        Navigation.remove({
            _id: request.params.nav_id
        }, function(error, nav){
            error ? response.send(error) : response.json({ message: 'deleted navigation' });
        })
    });

module.exports = navigationRoute;