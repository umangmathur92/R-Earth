var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );
const user = require('../db/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    var userType;
    var userAgency;
    var userId = req.session.userId;
    if(req.session && userId) {
        var current = user.getUserById(userId);
        current.then(userInfo => {
            userAgency = userInfo.agency;
            userType = userInfo.user_type;
        })
        .catch(error =>{
            res.send({userId: userId, userType: userType, error:error});
        });
    } else {
        res.send({userId: userId, userType: userType, error: "User is not logged in"});
    }

    //if(userType != 1){
      //  res.send({userId: userId, userType: userType, error: "User is not authorized to view the dashboard"})
    //}

    var dateSort = listing.fetchListings();
    var addressSort = listing.listingsByAddress();
    var titleSort = listing.listingsByTitle();
    var statusSort = listing.listingsByStatus();

    Promise.all([dateSort, addressSort, titleSort, statusSort]).then( data => { //Wait for all queries to complete
        var message = {
          date: data[0],
          address: data[1],
          title: data[2],
          status: data[3],
          userId: userId,
          userType: userType,
          userAgency: userAgency
        };
        req.send(message);
    })
    .catch(error => {
        res.send({userId: userId, userType: userType, error:error});
    });
});

/** Respond to existing listing if user is an authorized environmental agent*/
router.post('/respond', function(req, res, next) {
    var userType;
    var userAgency;
    const userId = req.session.userId;
    if(req.session && userId){
        var current = user.getUserById(userId);
        current.then(userInfo => {
           userType = userInfo.user_type;
           userAgency = userInfo.agency;
        })
        .catch(error =>{
            res.send({userId: userId, userType: userType, error:error});
        });
    } else {
        res.send({userId: userId, userType: userType, error: "User is not logged in"});
    }

    if(userType != 1){
        res.send({userId: userId, userType: userType, error: "User is not authorized to respond to a listing"})
    }
    const listingId = req.body.listingId;
    const status = req.body.status;
    const description = req.body.description;
    if(listingId && status && description) {
        var update = listing.updateResponse(listingId, status, description, userAgency); //Add response information to listing
        update.catch(error => {
            res.send({userId: userId, userType: userType, error:error});
        })
    }else {
        res.send({userId: userId, userType: userType, error: "Missing required fields to create a response"});
    }
});

module.exports = router;