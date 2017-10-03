var express = require('express');
var MyInfo = require('../models/myinfo.js');
var Navigation = require('../models/navigation.js');
var About = require('../models/about.js');
var Portfolio = require('../models/portfolio.js');
var Contact = require('../models/contact.js');

var allDataRoute = express.Router();

// @path /alldata
allDataRoute.route('/')
    .get(function(request, response){

        // create promises
        var p1 = MyInfo.findOne().exec(),
            p2 = Navigation.findOne().exec(),
            p3 = About.findOne().exec(),
            p4 = Portfolio.findOne().exec(),
            p5 = Contact.findOne().exec();

        // assign data to response object
        Promise.all([p1, p2, p3, p4, p5]).then(function(docs) {
            var data = {};
            data.myinfo = docs[0];
            data.navigation = docs[1];
            data.about = docs[2];
            data.projects = docs[3].projects;
            data.contact = docs[4];

            response.json(data);
        });

    });

module.exports = allDataRoute;