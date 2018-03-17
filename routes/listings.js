var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/search/:key?', function(req, res, next) {
    const key = req.params.key;
    const results = listing.zipSearch(key);
    results.then( data => {
        res.send(data);        //Render appropriate .ejs file
    })
});

router.post('/search/', function(req, res, next) {
    const key = req.body.key;
    const results = listing.zipSearch(key);
    results.then( data => {
        res.send(data);        //Render appropriate .ejs file
    })
});

module.exports = router;
