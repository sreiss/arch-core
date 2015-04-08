/**
 * OAuth controller.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(oauthService)
{
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
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },
/*
        /** Get user's informations. */
        getUser: function(req, res)
        {
            // Get parameters.
            var username = req.params.username;
            var password = req.params.password;

            // Get user.
            oauthService.getUser(username, password).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Get user's informations. */
        getUsersBySignuptype: function(req, res)
        {
            // Get parameter.
            var signuptype = req.params.signuptype;

            // Get users.
            oauthService.getUsersBySignuptype(signuptype).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
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
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
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
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};
