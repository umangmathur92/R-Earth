var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('submit', { title: 'R-Earth' });
});

router.post('/', function(req, res, next) {
  res.render('submit', { title: 'R-Earth' });
});

module.exports = router;

