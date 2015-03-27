/**
 * Kidoikoiaki plugin.
 *
 * @module arch/kidoikoiaki
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
            var userFirstName = userData.firstname || '';
            if(!validator.isLength(userFirstName, 3))
            {
                throw new ArchParameterError("User first name must contain at least 3 chars.")
            }

            // Check user first name (length >= 3).
            var userLastName = userData.lastname || '';
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

            // Check user password.
            var userPassword = userData.password || '';
            if(!validator.isLength(userPassword, 5))
            {
                throw new ArchParameterError("User password must contain at least 5 chars.")
            }

            next();
        },

        checkUserCredentials: function(req, res, next)
        {
            // Check access token.
            var accessToken = req.params.accessToken;
            if(!validator.isLength(accessToken, 40, 40))
            {
                throw new ArchParameterError("Access token isn't valid.");
            }

            // Check access token.
            var clientId = req.params.clientId;
            if(!validator.isLength(clientId, 10))
            {
                throw new ArchParameterError("Client ID must contain at least 10 chars.")
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
