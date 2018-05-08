const express = require("express");
const router = express.Router();
const db = require('../db/index');
const dateFormat = require('dateformat');

/** Search all listings by zipcode*/
function zipSearch(key, filter, order, pageNum) {
	if (key) {
		var term = "'" + key + "%'"
		var pageSize = 10;
		var subQueryToFetchNumOfResults = 'count(*) OVER() AS numresults, ';
		var subQueryToFetchPageCount = 'ceil((count(*) OVER())::numeric/'+ pageSize + ') AS numpages ';
		var subQueryToHandlePagination = ' LIMIT ' + 10 + ' OFFSET ' + ((pageNum - 1 ) * 10);
		return db.any('SELECT *, ' + subQueryToFetchNumOfResults + subQueryToFetchPageCount + ' FROM listings WHERE zipcode LIKE ' + term + filter + ' ORDER BY ' + order + subQueryToHandlePagination) ;
	} else {
		return fetchListings(pageNum);
	}
}

/** Search by physical address*/
function addressSearch(key, filter, order, pageNum) {
	var term = "'%" + key + "%'";
	var pageSize = 10;
	var subQueryToFetchNumOfResults = 'count(*) OVER() AS numresults, ';
	var subQueryToFetchPageCount = 'ceil((count(*) OVER())::numeric/'+ pageSize + ') AS numpages ';
	var subQueryToHandlePagination = ' LIMIT ' + 10 + ' OFFSET ' + ((pageNum - 1 ) * 10);
	return db.any('SELECT *, ' + subQueryToFetchNumOfResults + subQueryToFetchPageCount + ' FROM listings WHERE LOWER(address) LIKE LOWER(' + term + ') ' + filter + ' ORDER BY ' + order + subQueryToHandlePagination);
}

/** Apply filters before executing zipcode or address search*/
function determineSearch(key, status, category, order, pageNum) {
	if(!key){
		return fetchListings(pageNum);
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

	console.log(filter)

	if(isNaN(Number(key))) {
		return addressSearch(key, filter, order, pageNum);
	}
	else {
		return zipSearch(key, filter, order, pageNum);
	}
}

/** Get all available listings*/
function fetchListings(pageNum) {
	var pageSize = 10;
	var subQueryToFetchNumOfResults = 'count(*) OVER() AS numresults, ';
	var subQueryToFetchPageCount = 'ceil((count(*) OVER())::numeric/'+ pageSize + ') AS numpages ';
	var subQueryToHandlePagination = ' LIMIT ' + 10 + ' OFFSET ' + ((pageNum - 1 ) * 10);
	return db.any('SELECT *, ' + subQueryToFetchNumOfResults + subQueryToFetchPageCount + ' FROM listings ORDER BY post_date DESC ' + subQueryToHandlePagination);
}

/** Create new listing in database with initial information*/
function createListing(user_id, title, picture, description, longitude, latitude, address, zipcode, category) {
	return db.any('INSERT INTO listings (user_id, title, picture, post_date, description, longitude, latitude, address, zipcode, status, category) VALUES ($1, $2, $3, now(), $4, $5, $6, $7, $8, $9, $10)', [user_id,
		title, picture, description, longitude, latitude, address, zipcode, 0, category]);
}

/** Update and existing listing with response information from environmental agent*/
function updateResponse(listingId, status, response, agency) {
	return db.any('INSERT INTO listings (status, response, agency, response_date) VALUES ($1, $2, $3, now()) WHERE listing_id = $4',
		[status, response, agency, listingId]);
}

/** Return specific listing by id value*/
function getListingById(listingId) {
	return db.oneOrNone(`SELECT * FROM listings WHERE listing_id = $1`, [listingId]);
}

module.exports = {
	zipSearch: zipSearch,
	fetchListings: fetchListings,
	createListing: createListing,
	updateResponse: updateResponse,
	addressSearch: addressSearch,
	determineSearch: determineSearch,
	getListingById: getListingById
}
