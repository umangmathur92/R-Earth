var express = require('express');
var router = express.Router();
const listing = require('../db/listing');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('submit', { title: 'R-Earth' });
});


router.post('/', function(req, res, next) {
  const user_id = req.session.userId;
  const title = req.body.title;
  const picture = req.body.picture;
  const description = req.body.description;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const address = req.body.address;
  const zipcode = req.body.zipcode;
  const category = req.body.category;
  listing.createListing(user_id, title, picture, description, longitude, latitude, address, zipcode, category);
});

router.post('/respond', function(req, res, next) {
  const status = req.body.status;
  const description = req.body.description;
  const agency = req.body.agency;
  listing.updateResponse(status, description, agency);
});

module.exports = router;

