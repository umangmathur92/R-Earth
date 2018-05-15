var express = require('express');
var router = express.Router();
const listing = require('../db/listing');
const user = require('../db/users');
const dateFormat = require('dateformat');


/* Used to initially load the Dashboard page. Wait for public/scripts/dashboard.js to fill all elements
* Created by: Chloe Zirbel*/
router.get('/', function(req, res, next) {
    var userType;
    var userAgency;
    var userId = req.session.userId;
    var message = {userId: userId, userType: 0, page: 'dashboard'};
    if(req.session && userId) { //Check for existing session
        var current = user.getUserById(userId);
        current.then(userInfo => {
        userAgency = userInfo.agency;   //Set user information
		userType = userInfo.user_type;
        if(userType != 1) { //If not an environmental agent (deny access)
            res.redirect('/');
        } else {
			message = {userId: userId, userType: userType, page: 'dashboard'}
            res.render('dashboard', message);
        }
    })
    .catch(error =>{
		message = { title: 'Error', message: null, userId: null, userType: userType, error: error};
		res.render('error', message);
        //res.send({userId: userId, userType: userType, error:error});
    });
    } else {
        req.session.previousPage = 'dashboard';
        req.session.save(function(error){
            var message = {title: 'R-Earth', userId: null, userType: null, page: 'login'};
            res.render('signup', message);
        });
    }
});

/* Used to fully load Dashboard page. public/scripts/dashboard.js calls this to retrieve elements
* Created by: Chloe Zirbel
* Contributions from: Taylor Marquez*/
router.post('/', function(req, res, next) {
    var userType;
    var userAgency;
    var userId = req.session.userId;
    if(req.session && userId) { //Check for existing session
        var current = user.getUserById(userId);
        current.then(userInfo => {
            userAgency = userInfo.agency; //Set user information
            userType = userInfo.user_type;
            if(userType != 1){ //If not an environmental agent (deny access)
                //res.send({userId: userId, userType: userType, error: "User is not authorized to view the dashboard"})
                res.redirect('/');
            }
        })
        .catch(error =>{
			message = { title: 'Error', message: null, userId: null, userType: userType, error: error};
			res.render('error', message);
            //res.send({userId: userId, userType: userType, error:error});
        });
    } else {
        req.session.previousPage = 'dashboard';
        req.session.save(function(error){
            var message = {title: 'R-Earth', userId: null, page: 'login'};
            res.render('signup', message);
        });
    }

    var dateSort = listing.fetchListings();
    var addressSort = listing.listingsByAddress();
    var titleSort = listing.listingsByTitle();
    var statusSort = listing.listingsByStatus();

    Promise.all([dateSort, addressSort, titleSort, statusSort]).then( data => { //Wait for all queries to complete
        var message = {
          date: changeAllDates(data[0]),
          address: changeAllDates(data[1]),
          title: changeAllDates(data[2]),
          status: changeAllDates(data[3]),
          userId: userId,
          userType: userType,
          userAgency: userAgency
        };
        res.send(message);
    })
    .catch(error => {
		message = { title: 'Error', message: null, userId: null, userType: userType, error: error};
		res.render('error', message);
        //res.send({userId: userId, userType: userType, error:error});
    });
});

/** Respond to existing listing if user is an authorized environmental agent
 * Created by: Chloe Zirbel
 * Contributions from: Taylor Marquez*/
router.post('/respond', function(req, res, next) {
    var userType = req.session.userType;
    var userAgency;
    const userId = req.session.userId;
    if(req.session && userId){ //Check for existing session
        var current = user.getUserById(userId);
        current.then(userInfo => {
           userType = userInfo.user_type; //Set user information
           userAgency = userInfo.agency;
            if(userType != 1){ //If not an environmental agent (deny access)
                //   res.send({userId: userId, userType: userType, error: "User is not authorized to respond to a listing"})
                res.redirect('/');
            }
        })
        .catch(error =>{
			message = { title: 'Error', message: null, userId: null, userType: userType, error: error};
			res.render('error', message);
            //res.send({userId: userId, userType: userType, error:error});
        });
    } else {
		message = { title: 'Error', message: null, userId: null, userType: null, error: "User is not logged in"};
        res.render('error', message);
    }

    const listingId = req.body.listingId;
    const status = req.body.status;
    const description = req.body.description;
    if(listingId && status && description) {
        var update = listing.updateResponse(listingId, status, description, userAgency); //Add response information to listing
        update.catch(error => {
			message = { title: 'Error', message: null, userId: null, userType: null, error: error};
			res.render('error', message);
           // res.send({userId: userId, userType: userType, error:error});
        });
    }else {
		message = { title: 'Error', message: null, userId: null, userType: null, error: "Missing required fields to create a response"};
        res.render('error', message);
    }
});

/** Utility function for changing database date format to human-readable dates
 * Created by: Chloe Zirbel */
function changeAllDates(dataSet) {
    for(var i = 0; i < dataSet.length; i++) {
        var date = dataSet[i].post_date;
        dataSet[i].post_date = dateFormat(date, 'mmmm d yyyy, h:MM tt Z');
    }
    return dataSet;
}

module.exports = router;