/**
 * OAuth service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var crypto = require('crypto');

module.exports = function(OauthUser, OauthAccesstoken, OauthClient, oauthSignuptypeService, qService) {
    return {
        /** Save user. */
        saveUser: function(userData)
        {
            var deferred = qService.defer();

            // Get signup type.
            oauthSignuptypeService.getSignupType(userData.signuptype.name).then(function(signupType)
            {
                if(signupType)
                {
                    return signupType;
                }
                else
                {
                    oauthSignuptypeService.saveSignupType(userData.signuptype).then(function(signupType)
                    {
                        return signupType;
                    });
                }
            })
            .then(function(signupType)
            {
                var user = new OauthUser();
                user.username = userData.username;
                user.password = userData.password;
                user.fname = userData.fname;
                user.lname = userData.lname;
                user.email = userData.email;
                user.signuptype = signupType._id;

                user.save(function(err, user)
                {
                    if(err)
                    {
                        deferred.reject(err.message);
                    }
                    else
                    {
                        deferred.resolve(user);
                    }
                });
            })
            .catch(function(err)
            {
                deferred.reject(err)
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
                else if (accessToken == null)
                {
                    deferred.reject(new Error('No access token matching [ACCESS_TOKEN] and [CLIENT_ID].'));
                }
                else
                {
                    OauthUser.findOne({_id: accessToken.userId}).exec(function (err, user)
                    {
                        if(err)
                        {
                            deferred.reject(err);
                        }
                        else if(accessToken == null)
                        {
                            deferred.reject(new Error('No user matching [ACCESS_TOKEN] and [CLIENT_ID].'));
                        }
                        else
                        {
                            deferred.resolve(user);
                        }
                    });
                }
            });

            return deferred.promise;
        },

        /** Save client. */
        saveClient: function(clientData)
        {
            var deferred = qService.defer();

            OauthClient.findOne({clientId: clientData.clientId}).exec(function (err, client)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(client != null)
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
                        else
                        {
                            deferred.resolve(client);
                        }
                    });
                }
            });

            return deferred.promise;
        },

        /** Get client's informations. */
        getClient: function(clientId)
        {
            var deferred = qService.defer();

            OauthClient.findOne({clientId: clientId}).exec(function (err, client)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if (client == null)
                {
                    deferred.reject(new Error('No client matching [CLIENT_ID].'));
                }
                else
                {
                    deferred.resolve(client);
                }
            });

            return deferred.promise;
        }
    };
};