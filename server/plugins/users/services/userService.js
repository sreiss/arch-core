/**
 * User service.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(User, signuptypeService, qService) {
    return {
        /** Save user. */
        saveUser: function(userData, callback)
        {
            var deferred = qService.defer();
            var user = new User();

            // Assign data.
            user.userId = userData.userId;
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

            // Get signup type.
            signuptypeService.getSignupType(userData.signuptype.name, function(signupType)
            {
                if(signupType == null)
                {
                    signuptypeService.saveSignupType(userData.signuptype, function(signupType)
                    {
                        deferred.resolve(signupType);
                    });
                }
                else
                {
                    deferred.resolve(signupType);
                }
            });

            // Saving user.
            deferred.promise.then(function(signupType)
            {
                user.signupType = signupType._id;

                user.save(function(err)
                {
                    if(err)
                    {
                        callback(err, null);
                    }

                    callback(null, user);
                });
            });
        },

        /** Delete existing user. */
        deleteUser: function(userId)
        {
            var deferred = qService.defer();

            User.findOneAndRemove({userId: userId}, function(err, user)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (user == null)
                {
                    deferred.reject(new Error('No user matching [USER_ID] : ' + userId + "."));
                }

                deferred.resolve(user);
            });

            return deferred.promise;
        },

        /** Get user's informations by UserId. */
        getUserById: function(userId)
        {
            var deferred = qService.defer();

            User.findOne({userId: userId}).populate('signuptype').exec(function (err, user)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (user == null)
                {
                    deferred.reject(new Error('No user matching [USER_ID] : ' + userId + "."));
                }

                deferred.resolve(user);
            });

            return deferred.promise;
        },

        /** Get all users' informations. */
        getUsers: function()
        {
            var deferred = qService.defer();

            User.find().populate('signuptype').exec(function (err, users)
            {
                if(err)
                {
                    deferred.reject(err);
                }

                if (users.length == 0)
                {
                    deferred.reject(new Error('No users found.'));
                }

                deferred.resolve(users);
            });

            return deferred.promise;
        }
    };
};