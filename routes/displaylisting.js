var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('i was callllledd');
  res.render('displaylisting');
});

module.exports = router;