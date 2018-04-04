const express = require("express");
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');

function getUser( username ) {
    return db.oneOrNone(`SELECT * FROM users WHERE  username = $1`, [username] );
}

function signUp(name, username, password, userType, agency, callback) {
    bcrypt.hash( password, 10, function( error, hash ) {
        if( error ) {
            return callback( error, null );
        }

        const newEntry = db.any( `INSERT INTO users ( name, username, password, user_type, active, agency ) VALUES ( $1, $2, $3, $4, 0, $5 )`, [ name, username, hash, userType, agency ] );
        newEntry.then( _ => {
            return getUser( username );
        })
        .then( data => {
            if( data == null ) {
                return callback();
            } else {
                return callback( null, data );
            }
        });
    });
}

function checkPassword(username, password, callback) {
    const user = getUser( username );
    user.then( data => {
        if( data == null ) {
            return callback();
        }
        bcrypt.compare( password, data.password, function( error, result ) {
            if( result == true ) {
                return callback( null, data );
            } else {
                return callback();
            }
        })
    });
}

module.exports = {
    getUser: getUser,
    signUp: signUp,
    checkPassword: checkPassword
}