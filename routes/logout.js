var express = require('express');
var router = express.Router();

/** Log user out */
router.get('/', function(req, res, next) {
    if( req.session ){
        req.session.destroy( function( error ){ //Destroy existing session
            if( error ) {
                res.send({userId: null, userType: null, error:error});
            } else {
                res.redirect('/');
            }
        });
    }
});

module.exports = router;