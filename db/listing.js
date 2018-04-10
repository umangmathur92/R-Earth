const express = require("express");
const router = express.Router();
const db = require('../db/index');

function zipSearch( key ) {
	if (key) {
		var term = "'" + key + "%'"
    	return db.any('SELECT * FROM listings WHERE zipcode LIKE ' + term + ' ORDER BY post_date DESC');
	} else {
		return fetchListings();
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
	var year = base.getFullYear();
	var month = base.getMonth() + 1;
	var day = base.getDate();
	var hour = base.getHours();
	var min = base.getMinutes();
	var sec = base.getSeconds();
	var milli = base.getMilliseconds();

	var date = year + "-";
	if(month < 10) {
		date = date + "0" + month + "-";
	} else{
		date = date + month + "-";
	}

	if(day < 10) {
		date = date + "0" + day + " ";
	} else {
		date = date + day + " ";
	}

	if(hour < 10) {
		date = date + "0" + hour + ":";
	} else {
		date = date + hour + ":";
	}

	if(min < 10) {
		date = date + "0" + min + ":";
	} else {
		date = date + min + ":";
	}

	if(sec < 10) {
		date = date + "0" + sec + ":";
	} else {
		date = date + sec + ":";
	}
	date = date + milli;
	return date;
}

module.exports = {
	zipSearch: zipSearch,
	fetchListings: fetchListings,
	createListing: createListing,
	updateResponse: updateResponse,
	getCurrentDate: getCurrentDate
}
