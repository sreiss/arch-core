/**
 * OAuth service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var crypto = require('crypto');

module.exports = function(OauthUser, OauthAccesstoken, OauthClient, qService) {
    return {
        /** Save user. */
        saveUser: function(userData, callback)
        {
            var deferred = qService.defer();

            OauthUser.findOne({username: userData.username}).exec(function (err, user)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (user != null)
                {
                    deferred.reject(new Error('An user already exists with this username.'));
                }
                else
                {
                    var user = new OauthUser();
                    user.username = userData.username;
                    user.firstname = userData.firstname;
                    user.lastname = userData.lastname;
                    user.email = userData.email;
                    user.password = userData.password;

                    user.save(function(err, user)
                    {
                        if(err)
                        {
                            deferred.reject(err);
                        }

                        deferred.resolve(user);
                    });
                }
            });

            return deferred.promise;
        },

        /** Update user. */
        updateUser: function(userData, callback)
        {
            var deferred = qService.defer();

            OauthUser.findById(userData._id).exec(function (err, user)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (user == null)
                {
                    deferred.reject(new Error('No user matching [ID] : ' + userData._id + '.'));
                }
                else
                {
                    user.username = userData.username;
                    user.firstname = userData.firstname;
                    user.lastname = userData.lastname;
                    user.email = userData.email;
                    user.password = userData.password;

                    user.save(function(err, user)
                    {
                        if(err)
                        {
                            deferred.reject(err);
                        }

                        deferred.resolve(user);
                    });
                }
            });

            return deferred.promise;
        },

        /** Get user's informations. */
        getUser: function(accessToken, clientId)
        {
            var deferred = qService.defer();

            OauthAccesstoken.findOne({accessToken: accessToken, clientId: clientId}).exec(function (err, accessToken)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (accessToken == null)
                {
                    deferred.reject(new Error('No access token matching [ACCESS_TOKEN] and [CLIENT_ID].'));
                }
                else
                {
                    OauthUser.findOne({_id: accessToken.userId}).exec(function (err, user)
                    {
                        if (err) {
                            deferred.reject(err);
                        }

                        if (accessToken == null)
                        {
                            deferred.reject(new Error('No user matching [ACCESS_TOKEN] and [CLIENT_ID].'));
                        }

                        deferred.resolve(user);
                    });
                }
            });

            return deferred.promise;
        },

        /** Save client. */
        saveClient: function(clientData, callback)
        {
            var deferred = qService.defer();

            OauthClient.findOne({clientId: clientData.clientId}).exec(function (err, client)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (client != null)
                {
                    deferred.reject(new Error('A client already exists with this clientId.'));
                }
                else
                {
                    var now = new Date().getTime();
                    clientData.clientId = clientData.name + '_' + now.toString() + '_' + Math.floor(Math.random() * 9999);
                    clientData.clientSecret = clientData.clientId + '_' + clientData.redirect_uri;

                    var client = new OauthClient();
                    client.clientId = clientData.clientId;
                    client.clientSecret = crypto.createHash('sha1').update(clientData.clientSecret).digest('hex');
                    client.clientRedirectUri = clientData.redirect_uri;

                    client.save(function(err, client)
                    {
                        if(err)
                        {
                            deferred.reject(err);
                        }

                        deferred.resolve(client);
                    });
                }
            });

            return deferred.promise;
        },

        /** Get client's informations. */
        getClient: function(clientId, clientSecret)
        {
            var deferred = qService.defer();

            OauthClient.findOne({clientId: clientId, clientSecret: clientSecret}).exec(function (err, client)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (client == null)
                {
                    deferred.reject(new Error('No client matching [CLIENT_ID] and [CLIENT_SECRET].'));
                }

                deferred.resolve(client);
            });

            return deferred.promise;
        }
    };
};