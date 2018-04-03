var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );
const middle = require('../middleware');
var ejs = require('ejs');


router.post('/', function(req, res, next) {
    const listings = listing.fetchListings();
    listings.then( data => { 
        res.send(data);
         
    });
   
});

router.post('/search/', function(req, res, next) {
    const key = req.body.key;
    const results = listing.zipSearch(key);
    results.then( data => {
        res.send(data);        //Render appropriate .ejs file
    });
});

router.get('/create', middle.requiresLogIn, function(req, res, next) {

});

router.post('/create', middle.requiresLogIn, function(req, res, next) {

});

module.exports = router;
