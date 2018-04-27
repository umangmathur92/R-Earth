var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );
const user = require('../db/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    var dateSort = listing.fetchListings();
    var addressSort = listing.listingsByAddress();
    var titleSort = listing.listingsByTitle();
    var statusSort = listing.listingsByStatus();
    res.send(titleSort);
});