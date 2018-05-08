var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var message = { title: 'CSC-648 Team 1', userId: req.session.Id, userType: req.session.userType, page: 'about'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('about', message);
});

router.get('/ryan', function(req,res,next) {
    var message = { title: 'Ryan', userId: req.session.Id, userType: req.session.userType, page: 'about'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/ryan', message);
});

router.get('/umang', function(req,res,next) {
    var message = { title: 'Umang', userId: req.session.Id, userType: req.session.userType, page: 'about'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/umang', message);
});

router.get('/chloe', function(req, res, next) {
    var message = { title: 'Chloe', userId: req.session.Id, userType: req.session.userType, page: 'about'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/chloe', message);
});

router.get('/Alex', function(req,res,next) {
    var message = { title: 'Alex', userId: req.session.Id, userType: req.session.userType, page: 'about'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/Alex', message);
});

router.get('/rosalba', function(req, res, next) {
    var message = { title: 'Rosalba', userId: req.session.Id, userType: req.session.userType, page: 'about'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/rosalba', message);
});

router.get('/taylor', function(req, res, next) {
    var message = { title: 'Taylor', userId: req.session.Id, userType: req.session.userType, page: 'about'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/taylor', message);
});

router.get('/lorenzo', function(req, res, next) {
    var message = { title: 'Lorenzo', userId: req.session.Id, userType: req.session.userType, page: 'about'};
    if( req.session && req.session.userId ) {
        message.userId = req.session.userId;
    }
    res.render('team/lorenzo', message);
});


module.exports = router;
