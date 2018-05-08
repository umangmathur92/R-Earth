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


router.get('/', function(req, res, next) {
    const listings = listing.fetchListings(1);
    listings.then( data => { 
        res.send(data);
    });
});


/** Zipcode search, option filter by category and order listings by date. Pagination included */
router.post('/search/', function(req, res, next) {
    var userId = req.session.userId;
    var userType;
    if(req.session && userId) {
        var current = user.getUserById(userId);
        current.then(userInfo => {
            userType = userInfo.user_type;
        })
        .catch(error => {
            res.send({userId: userId, userType: userType, error: error});
        });
    }
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
            userId: userId,
            userType: userType
        };
        if(!isSuccess) {
            message.error = "No results found";
        }
        res.send(message);
    })
    .catch(error => {
       res.send({userId: userId, userType: userType, error: error});
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