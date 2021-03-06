const express = require("express");
const router = express.Router();
const db = require('../db/index');
const dateFormat = require('dateformat');

/** Search all listings by zipcode*/
function zipSearch(key, filter, order, pageNum) {
	var term = "'" + key + "%'"
	var pageSize = 10;
	var subQueryToFetchNumOfResults = 'count(*) OVER() AS numresults, ';
	var subQueryToFetchPageCount = 'ceil((count(*) OVER())::numeric/'+ pageSize + ') AS numpages ';
	var subQueryToHandlePagination = ' LIMIT ' + 10 + ' OFFSET ' + ((pageNum - 1 ) * 10);
	return db.any('SELECT *, ' + subQueryToFetchNumOfResults + subQueryToFetchPageCount + ' FROM listings WHERE zipcode LIKE ' + term + filter + ' ORDER BY ' + order + ' ' + subQueryToHandlePagination);
}

/** Get all available listings sorted by street name alphabetical*/
function listingsByAddress() {
	return db.any('SELECT * FROM listings ORDER BY split_part(address, \' \', 2)');
}

/** Get all available listings sorted by title alphabetical*/
function listingsByTitle() {
	return db.any('SELECT * FROM listings ORDER BY title ASC');
}

/** Get all available listings sorted by status*/
function listingsByStatus() {
	return db.any('SELECT * FROM listings ORDER BY status ASC');
}

/** Search by physical address*/
function addressSearch(key, filter, order, pageNum) {
	var term = "'%" + key + "%'";
	var pageSize = 10;
	var subQueryToFetchNumOfResults = 'count(*) OVER() AS numresults, ';
	var subQueryToFetchPageCount = 'ceil((count(*) OVER())::numeric/'+ pageSize + ') AS numpages ';
	var subQueryToHandlePagination = ' LIMIT ' + 10 + ' OFFSET ' + ((pageNum - 1 ) * 10);
	return db.any('SELECT *, ' + subQueryToFetchNumOfResults + subQueryToFetchPageCount + ' FROM listings WHERE LOWER(address) LIKE LOWER(' + term + ') ' + filter + ' ORDER BY ' + order + ' ' + subQueryToHandlePagination);
}

/** Apply filters before executing zipcode or address search*/
function determineSearch(key, status, category, order, pageNum) {
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
	} else {
		return zipSearch(key, filter, order, pageNum);
	}
}

/** Get all available listings with pagination data*/
function fetchListingsPagination(pageNum) {
	var pageSize = 10;
	var subQueryToFetchNumOfResults = 'count(*) OVER() AS numresults, ';
	var subQueryToFetchPageCount = 'ceil((count(*) OVER())::numeric/'+ pageSize + ') AS numpages ';
	var subQueryToHandlePagination = ' LIMIT ' + 10 + ' OFFSET ' + ((pageNum - 1 ) * 10);
	return db.any('SELECT *, ' + subQueryToFetchNumOfResults + subQueryToFetchPageCount + ' FROM listings ORDER BY post_date DESC ' + subQueryToHandlePagination);
}

/** Get all available listings sorted by date*/
function fetchListings() {
	return db.any('SELECT * FROM listings ORDER BY post_date DESC');
}

/** Get all available listings sorted by street name alphabetical*/
function listingsByAddress() {
	return db.any('SELECT * FROM listings ORDER BY split_part(address, \' \', 2)');
}

/** Get all available listings sorted by title alphabetical*/
function listingsByTitle() {
	return db.any('SELECT * FROM listings ORDER BY title ASC');
}

/** Get all available listings sorted by status*/
function listingsByStatus() {
	return db.any('SELECT * FROM listings ORDER BY status ASC');
}

/** Create new listing in database with initial information*/
function createListing(user_id, title, picture, description, longitude, latitude, address, zipcode, category) {
	return db.any('INSERT INTO listings (user_id, title, picture, post_date, description, longitude, latitude, address, zipcode, status, category) VALUES ($1, $2, $3, now(), $4, $5, $6, $7, $8, $9, $10)', [user_id,
		title, picture, description, longitude, latitude, address, zipcode, 0, category]);
	}
	
	/** Update and existing listing with response information from environmental agent*/
	function updateResponse(listingId, status, response, agency) {
		return db.any('UPDATE listings SET status = $1, response = $2, agency = $3, response_date = now() WHERE listing_id = $4',
		[status, response, agency, listingId]);
	}
	
	/** Return specific listing by id value*/
	function getListingById(listingId) {
		return db.oneOrNone(`SELECT * FROM listings WHERE listing_id = $1`, [listingId]);
	}
	
	module.exports = {
		zipSearch: zipSearch,
		fetchListings: fetchListings,
		listingsByAddress: listingsByAddress,
		listingsByTitle: listingsByTitle,
		listingsByStatus: listingsByStatus,
		createListing: createListing,
		updateResponse: updateResponse,
		addressSearch: addressSearch,
		determineSearch: determineSearch,
		getListingById: getListingById,
		listingByAddress: listingsByAddress,
		listingByTitle: listingsByTitle,
		listingByStatus: listingsByStatus
	}
	