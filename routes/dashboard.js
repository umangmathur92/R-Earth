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

    Promise.all([dateSort, addressSort, titleSort, statusSort]).then( data => { //Wait for all queries to complete
        var message = {
          date: data[0],
          address: data[1],
          title: data[2],
          status: data[3],
        };
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
        res.send({error:error});
    });
});

/** Respond to existing listing if user is an authorized environmental agent*/
router.post('/respond', function(req, res, next) {
    const userId = req.session.userId;
    const listingId = req.body.listingId;
    const status = req.body.status;
    const description = req.body.description;



    listing.updateResponse(listingId, status, description, agency); //Add response information to listing
    var login = {};
    if( req.session && req.session.userId ) { //Check for user login and type
        login.userId = req.session.userId;
        const current = user.getUserById(req.session.userId);
        current.then( userInfo => {
            login.userType = userInfo.user_type;
        res.send(login);
    })
    .catch(error => {
        res.send({error:error});
    });
    } else {
        res.send(login);
    }
});

module.exports = router;