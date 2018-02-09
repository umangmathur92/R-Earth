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

module.exports = router;
