var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );
const user = require('../db/users');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'csc648team01',
    api_key: '532321131662413',
    api_secret: 'RqHswX8LkdYsslb5VX_74AEMckg'
});

/** Zipcode search, option filter by category and order listings by date. Pagination included */
router.post('/search/', function(req, res, next) {
    const key = req.body.key;
    const status = req.body.status;
    const category = req.body.category;
    const order = req.body.order;
    const pageNum = req.body.pageNum;
    const response = listing.determineSearch(key, status, category, order, pageNum); //Apply search parameters
    response.then( data => {
        for(var i = 0; i < data.length; i++) { // Resolve picture URLs: full size and thumbnail
            var publicId = data[i].picture;
            var full = getFullImage(publicId);
            var thumb = getThumbnail(publicId);
            data[i].picture = full;
            data[i].thumbnail = thumb;
        }
        const isSuccess = data.length > 0;
        var message = {
            success: isSuccess,
            dataList: isSuccess ? data : [],
            totalNumOfPages: isSuccess ? data[0].numpages : 0,
            totalNumOfResults: isSuccess ? data[0].numresults : 0,
        };
        if(!isSuccess) {
            message.error = "No results found";
        }
        if( req.session && req.session.userId ) { //Check for user login and type
            message.userId = req.session.userId;
            var current = user.getUserById(req.session.userId);
            current.then(userInfo => {
                message.userType = userInfo.user_type;
                res.send(message);
            })
            .catch(error => {
                res.send({error: error});
            });
        } else {
            res.send(message);
        }
    })
    .catch(error => {
        res.send({error: error});
    });
});

/** View full details of a single listing */
router.get('/view', function(req, res, next) {
    const listingId = req.body.listingId;
    const details = listing.getListingById(listingId);
    details.then( data => {
        if( req.session && req.session.userId ) { //Check for user login and type
            data.userId = req.session.userId;
            const current = user.getUserById(req.session.userId);
            current.then( userInfo => {
               data.userType = userInfo.user_type;
               res.send(data);
            });
        } else {
            res.send(data);
        }
    });
});

/** Generate full sized image*/
function getFullImage(publicId) {
    var url = cloudinary.url(publicId, {width: 500, height: 375, crop: 'fill'});
    return url;
}

/** Generate thumbnail*/
function getThumbnail(publicId) {
    var url = cloudinary.url(publicId, {width: 80, height: 80, crop: 'fill'});
    return url;
}

module.exports = router;
