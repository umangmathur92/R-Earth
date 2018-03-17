const express = require("express");
const router = express.Router();
const db = require('../db');

router.get("/", (request, response) => {
	 response.render('temp', { title: 'Vert Prot Test' });
});

module.exports = router;