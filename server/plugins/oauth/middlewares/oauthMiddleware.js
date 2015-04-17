/**
 * OAuth middleware.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var validator = require('validator');
var ArchParameterError = GLOBAL.ArchParameterError;

module.exports = function() {
    return {
        checkUser: function(req, res, next)
        {
            // Get user data.
            var userData = req.body;

            // Check username.
            var userUsername = userData.username || '';
            if(!validator.isEmail(userUsername))
            {
                throw new ArchParameterError("User username isn't a valid mail address.")
            }

            // Check user first name (length >= 3).
            var userFirstName = userData.fname || '';
            if(!validator.isLength(userFirstName, 3))
            {
                throw new ArchParameterError("User first name must contain at least 3 chars.")
            }

            // Check user first name (length >= 3).
            var userLastName = userData.lname || '';
            if(!validator.isLength(userLastName, 3))
            {
                throw new ArchParameterError("User last name must contain at least 3 chars.")
            }

            // Check user email.
            var userEmail = userData.email || '';
            if(!validator.isEmail(userEmail))
            {
                throw new ArchParameterError("User email isn't a valid mail address.")
            }

            // Check user signuptype.
            var userSignupTypeName = userData.signuptype || {};
            if(!validator.isLength(userSignupTypeName, 3))
            {
                throw new ArchParameterError("User signup type must contain at least 3 chars.")
            }

            next();
        },

        checkClient: function(req, res, next)
        {
            // Get client data.
            var clientData = req.body;

            // Check client name.
            var clientName = clientData.name || '';
            if(!validator.isLength(clientName, 3))
            {
                throw new ArchParameterError("Client name must contain at least 3 chars.")
            }

            // Check client redirect uri.
            var clientRedirectUri = clientData.redirect_uri || '';
            if(!validator.isURL(clientRedirectUri))
            {
                throw new ArchParameterError("Client redirect uri isn't a valid url.")
            }

            next();
        },

        checkClientCredentials: function(req, res, next)
        {
            // Check client id.
            var clientId = req.params.clientId || '';
            if(!validator.isLength(clientId, 10))
            {
                throw new ArchParameterError("Client id must contain at least 10 chars.")
            }

            next();
        }
    };
};
