var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC-648 Team 1' });
});

/* GET about page */
router.get('/about', function(req,res,next) {
  res.render('about', { title: 'CSC-648 Team 1'});
});

router.get('/about/ryan', function(req,res,next) {
  res.render('team/ryan', { title: 'Ryan'});
});

router.get('/about/umang', function(req,res,next) {
  res.render('team/umang', { title: 'Umang'});
});

router.get('/about/chloe', function(req, res, next) {
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

