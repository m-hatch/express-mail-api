var express = require('express');
var MyInfo = require('../models/myinfo.js');

var myinfoRoute = express.Router();

// @path /myinfo
myinfoRoute.route('/')
    .get(function(request, response){
        MyInfo.find(function(error, info){
            error ? response.send(error) : response.json(info);
        });
    })

    .post(function(request, response){
        var info = new MyInfo();
     
        info.name = request.body.name;
        info.title = request.body.title;
        info.position_title = request.body.position_title;
        info.links = request.body.links;

        info.save(function(error){
            error ? response.send(error) : response.json({ message: 'myinfo added'});
        });
    });

// @path /myinfo/:myinfo_id
myinfoRoute.route('/:myinfo_id')
    .get(function(request, response){
        MyInfo.findById(request.params.myinfo_id, function(error, info){
            error ? response.send(error) : response.json(info);
        });
    })

    .put(function(request, response){
        MyInfo.findById(request.params.myinfo_id, function(error, info){
            if(error) {
                response.send(error);
            } else {
                info.name = request.body.name;
                info.title = request.body.title;
                info.position_title = request.body.position_title;
                info.links = request.body.links;
            }

            info.save(function(error){
                error ? response.send(error) : response.json({ message: 'myinfo updated'});
            });
        })
    })

    .delete(function(request, response){
        MyInfo.remove({
            _id: request.params.myinfo_id
        }, function(error, info){
            error ? response.send(error) : response.json({ message: 'deleted myinfo' });
        })
    });

module.exports = myinfoRoute;