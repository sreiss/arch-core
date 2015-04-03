/**
 * User service.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(User, userService, oauthService, qService) {
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
                user.userId = oauthUser._id;
                user.role = userData.role;
                user.level = userData.level;
                user.block = userData.block;
                user.created = userData.created;
                user.createdBy = userData.createdBy;
                user.modified = userData.modified;
                user.modifiedBy = userData.modifiedBy;
                user.archived = userData.archived;
                user.archivedBy = userData.archivedBy;
                user.published = userData.published;

                user.save(function(err, user)
                {
                    if(err)
                    {
                        deferred.reject(err.message)
                    }
                    else
                    {
                        userService.getUserById(user.userId).then(function(user)
                        {
                            deferred.resolve(user);
                        })
                        .catch(function(err)
                        {
                            deferred.reject(err);
                        });
                    }
                })
            })
            .catch(function(err)
            {
               deferred.reject(err);
            });

            return deferred.promise;
        },

        /** Get user's informations by UserId. */
        getUserById: function(userId)
        {
            var deferred = qService.defer();

            oauthService.getUserById(userId).then(function(oauthUser)
            {
               return oauthUser;
            })
            .then(function(oauthUser)
            {
                User.findOne({userId: userId}).exec(function(err, user)
                {
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        var data =
                        {
                            account: oauthUser,
                            profile: user
                        };

                        deferred.resolve(data);
                    }
                });
            })
            .catch(function(err)
            {
                deferred.reject(err);
            });

            return deferred.promise;
        },

        /** Get all users' informations. */
        getUsers: function()
        {
            var deferred = qService.defer();

            User.find().exec(function(err, result)
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
        }
    };
};