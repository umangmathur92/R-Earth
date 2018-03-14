const express = require("express");
const router = express.Router();
const db = require('../db/index');

function zipSearch( key ) {
    return db.any( `SELECT * FROM listing WHERE zipcode = $1 ORDER BY date DESC`, [ key ] );
}

module.exports = {
    zipSearch: zipSearch
}