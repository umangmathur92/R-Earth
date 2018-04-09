const express = require("express");
const router = express.Router();
const db = require('../db/index');

function zipSearch( key ) {
	if (key) {
		var term = "'" + key + "%'"
    	return db.any('SELECT * FROM listings WHERE zipcode LIKE ' + term + ' ORDER BY date DESC');
	} else {
		return fetchListings();
	}
}

function fetchListings() {
	return db.any('SELECT * FROM listings ORDER BY date DESC');
}

module.exports = {
	zipSearch: zipSearch,
	fetchListings: fetchListings
}
