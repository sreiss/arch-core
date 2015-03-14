/**
 * OAuth controller.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(oauthService) {
    return {
        /** Save user.*/
        saveUser: function(req, res)
        {
            // Get posted user.
            var user = req.body;

            if(user)
            {
                // Saving user.
                oauthService.saveUser(user).then(function(user)
                {
                    res.status(200).json({"message" : "User saved successfully.", "data" : user});
                },
                function(err)
                {
                    res.status(500).json({"message" : "An error occurred while saving new user.", "data" : err.message});
                });
            }
            else
            {
                res.status(500).json({"message" : "Missing parameters.", "data" : false});
            }
        },

        /** Get user's informations. */
        getUser: function(req, res)
        {
            // Get parameters.
            var accessToken = req.params.accessToken;
            var clientId = req.params.clientId;

            if(accessToken && clientId)
            {
                // Get user.
                oauthService.getUser(accessToken, clientId).then(function(user)
                {
                    res.status(200).json({"message" : "User found successfully.", "data" : user});
                },
                function(err)
                {
                    res.status(500).json({"message" : "An error occurred while founding user.", "data" : err.message});
                });
            }
            else
            {
                res.status(500).json({"message" : "Missing parameters.", "data" : null});
            }
        },

        /** Save client.*/
        saveClient: function(req, res)
        {
            // Get posted client.
            var client = req.body;

            if(client)
            {
                // Saving client.
                oauthService.saveClient(client).then(function(client)
                {
                    res.status(200).json({"message" : "Client saved successfully.", "data" : client});
                },
                function(err)
                {
                    res.status(500).json({"message" : "An error occurred while saving new client.", "data" : err.message});
                });
            }
            else
            {
                res.status(500).json({"message" : "Missing parameters.", "data" : false});
            }
        },

        /** Get client's informations. */
        getClient: function(req, res)
        {
            // Get parameters.
            var clientId = req.params.clientId;
            var clientSecret = req.params.clientSecret;

            if(clientId && clientSecret)
            {
                // Get user.
                oauthService.getClient(clientId, clientSecret).then(function(client)
                    {
                        res.status(200).json({"message" : "Client found successfully.", "data" : client});
                    },
                    function(err)
                    {
                        res.status(500).json({"message" : "An error occurred while founding client.", "data" : err.message});
                    });
            }
            else
            {
                res.status(500).json({"message" : "Missing parameters.", "data" : null});
            }
        }
    };
};
