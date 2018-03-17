const express = require("express");
const router = express.Router();
const db = require('../db/index');

function zipSearch( key ) {
	if (key) {
    return db.any( `SELECT * FROM listing WHERE zipcode = $1 ORDER BY date DESC`, [ key ] );
	} else {
		return db.any(`SELECT * FROM listing ORDER BY date DESC`);
	}
}

module.exports = {
    zipSearch: zipSearch
}