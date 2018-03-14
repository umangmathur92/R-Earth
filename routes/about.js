var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about', { title: 'CSC-648 Team 1'});
});

router.get('/ryan', function(req,res,next) {
    res.render('team/ryan', { title: 'Ryan'});
});

router.get('/umang', function(req,res,next) {
    res.render('team/umang', { title: 'Umang'});
});

router.get('/chloe', function(req, res, next) {
    res.render('team/chloe', {title: 'Chloe'});
});

router.get('/about/Alex', function(req,res,next) {
    res.render('team/Alex', { title: 'Alex'});
});

router.get('/about/rosalba', function(req, res, next) {
    res.render('team/rosalba', {title: 'Rosalba'});
});

router.get('/about/taylor', function(req, res, next) {
    res.render('team/taylor', {title: 'Taylor'});
});

router.get('/about/lorenzo', function(req, res, next) {
    res.render('team/lorenzo', {title: 'Lorenzo'});
});


module.exports = router;
