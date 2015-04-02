/**
 * OAuth controller.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(oauthService) {
    return {
        /** Save user.*/
        saveUser: function(req, res)
        {
            // Get posted user.
            var user = req.body;

            // Saving user.
            oauthService.saveUser(user).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            }).
            catch(function(err)
            {
                throw new ArchSaveError(err.message);
            });
        },
/*
        /** Get user's informations. */
        getUser: function(req, res)
        {
            // Get parameters.
            var accessToken = req.params.accessToken;
            var clientId = req.params.clientId;

            // Get user.
            oauthService.getUser(accessToken, clientId).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            },
            function(err)
            {
                throw new ArchFindError(err.message);
            });
        },

        /** Save client.*/
        saveClient: function(req, res)
        {
            // Get posted client.
            var client = req.body;

            // Saving client.
            oauthService.saveClient(client).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            },
            function(err)
            {
                throw new ArchSaveError(err.message);
            });
        },

        /** Get client's informations. */
        getClient: function(req, res)
        {
            // Get parameters.
            var clientId = req.params.clientId;

            // Get user.
            oauthService.getClient(clientId).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            },
            function(err)
            {
                throw new ArchFindError(err.message);
            });
        }
    };
};
