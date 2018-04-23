var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var message = { title: 'CSC-648 Team 1'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('about', message);
});

router.get('/ryan', function(req,res,next) {
    var message = { title: 'Ryan'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/ryan', message);
});

router.get('/umang', function(req,res,next) {
    var message = { title: 'Umang'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/umang', message);
});

router.get('/chloe', function(req, res, next) {
    var message = { title: 'Chloe'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/chloe', message);
});

router.get('/about/Alex', function(req,res,next) {
    var message = { title: 'Alex'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/Alex', message);
});

router.get('/about/rosalba', function(req, res, next) {
    var message = { title: 'Rosalba'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/rosalba', message);
});

router.get('/about/taylor', function(req, res, next) {
    var message = { title: 'Taylor'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/taylor', message);
});

router.get('/about/lorenzo', function(req, res, next) {
    var message = { title: 'Lorenzo'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/lorenzo', message);
});


module.exports = router;
