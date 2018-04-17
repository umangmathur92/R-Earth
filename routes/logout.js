var express = require('express');
var router = express.Router();

/** Log user out */
router.get('/', function(req, res, next) {
    if( req.session ){
        req.session.destroy( function( error ){ //Destroy existing session
            if( error ) {
                return next( error );
            }
        });
    }
});

module.exports = router;