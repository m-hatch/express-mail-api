var express = require('express');

var router = express.Router();

// middleware to use for all requests
router.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('processing request...');
    //console.log(request.body);
    next();
});

// root response
router.get('/', function(request, response) {
    response.json({ message: "hooray! welcome to my api!"});
});

module.exports = router;