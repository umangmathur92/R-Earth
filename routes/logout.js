var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if( req.session ){
        req.session.destroy( function( error ){
            if( error ) {
                return next( error );
            } else {
                return res.redirect( '/' );
            }
        })
    }
});

module.exports = router;