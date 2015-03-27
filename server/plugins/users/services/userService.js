/**
 * User service.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(User, qService) {
    return {
        /** Save user. */
        saveUser: function(userData)
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

            user.save().exec(function(err, user)
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

            return deferred.promise;
        },

        /** Get user's informations by UserId. */
        getUserById: function(userId)
        {
            var deferred = qService.defer();

            User.findOne({userId: userId}).exec(function(err, user)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(user);
                }
            });

            return deferred.promise;
        },

        /** Get all users' informations. */
        getUsers: function()
        {
            var deferred = qService.defer();

            User.find().exec(function(err, users)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(users);
                }
            });

            return deferred.promise;
        }
    };
};