var express = require('express');
var Portfolio = require('../models/portfolio.js');

var portfolioRoute = express.Router();

// @path /portfolio
portfolioRoute.route('/')
    .get(function(request, response){
        Portfolio.find(function(error, portfolio){
            error ? response.send(error) : response.json(portfolio);
        });
    })

    .post(function(request, response){
        var portfolio = new Portfolio();
        portfolio.projects = request.body.projects;

        portfolio.save(function(error){
            error ? response.send(error) : response.json({ message: 'portfolio added'});
        });
    });

// @path /portfolio/:portfolio_id
portfolioRoute.route('/:portfolio_id')
    .get(function(request, response){
        Portfolio.findById(request.params.portfolio_id, function(error, portfolio){
            error ? response.send(error) : response.json(portfolio);
        });
    })

    .put(function(request, response){
        Portfolio.findById(request.params.portfolio_id, function(error, portfolio){
            if(error) {
                response.send(error);
            } else {
                portfolio.projects = request.body.projects;
            }

            portfolio.save(function(error){
                error ? response.send(error) : response.json({ message: 'portfolio updated'});
            });
        })
    })

    .delete(function(request, response){
        Portfolio.remove({
            _id: request.params.portfolio_id
        }, function(error, portfolio){
            error ? response.send(error) : response.json({ message: 'deleted portfolio' });
        })
    });

module.exports = portfolioRoute;