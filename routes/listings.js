var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );
const middle = require('../middleware');

router.post('/', function(req, res, next) {
    const pageNum = req.body.pageNum;
    const listings = listing.fetchListings(pageNum);
    listings.then( data => {        
        res.send(data);
    });
});

router.post('/search/', function(req, res, next) {
    const key = req.body.key;
    const status = req.body.status;
    const category = req.body.category;
    const order = req.body.order;
    const pageNum = req.body.pageNum;
    const response = listing.determineSearch(key, status, category, order, pageNum);
    
    //const results = response[0];
    //const totalNumOfPages = response[1];
    //console.log('paaaygeeess: ' + totalNumOfPages);
    response.then( data => {
        console.log(JSON.stringify(data));
        if(data.length) {
            res.send({
                dataList: data,
                totalNumOfPages: data[0].numpages
            });
         } else {
            const message = "No results found";
        }
    });
});


module.exports = router;
