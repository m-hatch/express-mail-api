var express = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./routes/router.js');
var mailRoute = require('./routes/mailRoute.js');
var compression = require('compression');
var helmet = require('helmet');

// initialize api and configure to get data from POST
var api = express();
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(compression());
api.use(helmet());

var port = process.env.PORT || 3000; 

// register routes
api.use('/', router);
api.use('/mail', mailRoute);

// start server
api.listen(port);
console.log('server started on port ' + port);