/**
 * User service.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(User, userService, oauthService, qService)
{
    return {
        /** Save user. */
        saveUser: function(userData)
        {
            var deferred = qService.defer();

            oauthService.saveUser(userData).then(function(oauthUser)
            {
                return oauthUser;
            })
            .then(function(oauthUser)
            {
                var user = new User();

                // Assign data.
                user.oauth = oauthUser._id;
                user.role = userData.role;
                user.block = userData.block;

                user.save(function(err, user)
                {
                    if(err)
                    {
                        deferred.reject(err.message)
                    }
                    else
                    {
                        deferred.resolve(user);
                    }
                })
            })
            .catch(function(err)
            {
               deferred.reject(err);
            });

            return deferred.promise;
        },

        /** Update user. */
        updateUser: function(userData)
        {
            var deferred = qService.defer();

            oauthService.updateUser(userData).then(function(oauthUser)
            {
                return oauthUser;
            })
            .then(function(oauthUser)
            {
                User.update({oauth: userData.id},
                {
                    role: userData.role,
                    birthdate: userData.birthdate,
                    phone: userData.phone,
                    licenceffa: userData.licenceffa,
                    avatar: userData.avatar
                },
                function(err, numberAffected, rawResponse)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(rawResponse);
                    }
                })
            })
            .catch(function(err)
            {
                deferred.reject(err);
            });

            return deferred.promise;
        },

        /** Get user's informations. */
        getUser: function(oauthUserId)
        {
            var deferred = qService.defer();

            User.findOne({oauth: oauthUserId}).populate('oauth').exec(function(err, result)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(result);
                }
            });

            return deferred.promise;
        },

        /** Get all users' informations. */
        getUsers: function()
        {
            var deferred = qService.defer();

            User.find().populate('oauth').exec(function(err, result)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(result);
                }
            });

            return deferred.promise;
        },

        /** Get all users' informations. */
        deleteUser: function(oauthUserId)
        {
            var deferred = qService.defer();

            oauthService.deleteUser(oauthUserId).then(function(result)
            {
                User.findOneAndRemove({oauth:oauthUserId}).exec(function(err, result)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(result);
                    }
                });
            })
            .catch(function(err)
            {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };
};