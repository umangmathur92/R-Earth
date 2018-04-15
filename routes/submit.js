var express = require('express');
var router = express.Router();
const listing = require( '../db/listing' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('submit', { title: 'R-Earth' });
});

router.post('/', function(req,res,next){
  //res.render('submit', {title: 'R-Earth'});
    if(req.body.title && req.body.address && req.body.category && req.body.zip && req.body.description){
      const title = req.body.title;
      const address = req.body.address;
      const category = req.body.category;
      const zip = req.body.zip;
      const description = req.body.description;

      res.send(title + " " + address + " " + category + " " + zip + " " +description);
    }
});

module.exports = router;

