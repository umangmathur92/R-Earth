/*
Redirects a user away from certain pages (ex: sign up) if they are already logged in
 */
function loggedIn( request, response, next ) {
    if( request.session && request.session.userId ) {
        return response.redirect( '/' );
    }
    return next();
}

/*
Controls access to pages that require a user to be logged in
 */
function requiresLogIn( request, response, next ) {
    if( request.session && request.session.userId ) {
        return next();
    } else {
        res.send('You must be logged in to view this page.')
    }
}

module.exports = {
    loggedIn: loggedIn,
    requiresLogIn: requiresLogIn
}