var express = require('express');
var router = express.Router();

/** Log user out */
router.get('/', function(req, res, next) {
    if( req.session ){
        req.session.destroy( function( error ){ //Destroy existing session
            if( error ) {
				message = { title: 'Error', message: null, userId: null, userType: null, error: error};
				res.render('error', message);
            } else {
                res.redirect('/');
            }
        });
    }
});

module.exports = router;