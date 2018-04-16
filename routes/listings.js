var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );
const middle = require('../middleware');

router.post('/search/', function(req, res, next) {
    const key = req.body.key;
    const status = req.body.status;
    const category = req.body.category;
    const order = req.body.order;
    const pageNum = req.body.pageNum;
    const response = listing.determineSearch(key, status, category, order, pageNum);
    response.then( data => {
        const isSuccess = data.length > 0;
        res.send({
            success: isSuccess,
            dataList: isSuccess ? data : [],
            totalNumOfPages: isSuccess ? data[0].numpages : 0,
            totalNumOfResults: isSuccess ? data[0].numresults : 0
        });
    });
});

module.exports = router;