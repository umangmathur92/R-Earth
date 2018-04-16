const express = require("express");
const router = express.Router();
const db = require('../db/index');
const dateFormat = require('dateformat');

function zipSearch( key, filter, order ) {
	if (key) {
		var term = "'" + key + "%'"
    	return db.any('SELECT * FROM listings WHERE zipcode LIKE ' + term + filter + ' ORDER BY ' + order);
	} else {
		return fetchListings();
	}
}

function addressSearch(key, filter, order) {
	var term = "'%" + key + "%'";
	return db.any('SELECT * FROM listings WHERE LOWER(address) LIKE LOWER(' + term + ') ' + filter + ' ORDER BY ' + order);
}

function determineSearch(key, status, category, order) {
	if(!key){
		return fetchListings();
	}

	var filter = "";
	if(status) {
		filter += " AND status = " + status;
	}

	if(category) {
		filter += " AND category = " + category;
	}

	if(!order) {
		order = "post_date DESC";
	}

	if(isNaN(Number(key))) {
		return addressSearch(key, filter, order);
	}
	else {
		return zipSearch(key, filter, order);
	}
}

function fetchListings() {
	return db.any('SELECT * FROM listings ORDER BY post_date DESC');
}

function createListing(user_id, title, picture, description, longitude, latitude, address, zipcode, category) {
	var date = getCurrentDate();
	return db.any('INSERT INTO listings (user_id, title, picture, post_date, description, longitude, latitude,' +
		' address, zipcode, status, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [user_id,
		title, picture, date, description, longitutde, latitude, address, zipcode, 0, category]);
}

function updateResponse(status, response, agency) {
	var date = getCurrentDate();
	return db.any('INSERT INTO listings (status, response, agency, response_date', [status, response, agency, date]);
}

function getCurrentDate() {
	var base = new Date();
	var date = dateFormat(base, 'yyyy-MM-dd HH:mm:ss:L');
	return date;
}

module.exports = {
	zipSearch: zipSearch,
	fetchListings: fetchListings,
	createListing: createListing,
	updateResponse: updateResponse,
	getCurrentDate: getCurrentDate,
	addressSearch: addressSearch,
	determineSearch: determineSearch
}
