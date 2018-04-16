const express = require("express");
const router = express.Router();
const db = require('../db/index');

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

function addressSearch(key, filter, order, pageNum) {
	var term = "'%" + key + "%'";
	var pageSize = 10;
	var subQueryToFetchNumOfResults = 'count(*) OVER() AS numresults, ';
	var subQueryToFetchPageCount = 'ceil((count(*) OVER())::numeric/'+ pageSize + ') AS numpages ';
	var subQueryToHandlePagination = ' LIMIT ' + 10 + ' OFFSET ' + ((pageNum - 1 ) * 10);
	return db.any('SELECT *, ' + subQueryToFetchNumOfResults + subQueryToFetchPageCount + ' FROM listings WHERE LOWER(address) LIKE LOWER(' + term + ') ' + filter + ' ORDER BY ' + order + subQueryToHandlePagination);
}

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
	if(isNaN(Number(key))) {
		return addressSearch(key, filter, order, pageNum);
	}
	else {
		return zipSearch(key, filter, order, pageNum);
	}
}

function fetchListings(pageNum) {
	var pageSize = 10;
	var subQueryToFetchNumOfResults = 'count(*) OVER() AS numresults, ';
	var subQueryToFetchPageCount = 'ceil((count(*) OVER())::numeric/'+ pageSize + ') AS numpages ';
	var subQueryToHandlePagination = ' LIMIT ' + 10 + ' OFFSET ' + ((pageNum - 1 ) * 10);
	return db.any('SELECT *, ' + subQueryToFetchNumOfResults + subQueryToFetchPageCount + ' FROM listings ORDER BY post_date DESC ' + subQueryToHandlePagination);
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