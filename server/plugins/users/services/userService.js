/**
 * User service.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

var Q = require('q');

module.exports = function(User)
{
    return {
        /** Save user. */
        saveUser: function(userData)
        {
            var deferred = Q.defer();

            // Assign data.
            var user = new User();
            user.oauth = userData.oauth;
            user.role = userData.role;

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
            });

            return deferred.promise;
        },

        /** Update user. */
        updateUser: function(userData)
        {
            var deferred = Q.defer();

            User.update({oauth: userData.id},
            {
                role: userData.role,
                //birthdate: userData.birthdate,
                phone: userData.phone,
                licenceffa: userData.licenceffa,
                avatar: userData.avatar,
                firstconnexion: false
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
            });

            return deferred.promise;
        },

        /** Get user's informations. */
        getUser: function(oauthUserId)
        {
            var deferred = Q.defer();

            User.findOne({oauth: oauthUserId}).exec(function(err, result)
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

        /** Get users. */
        deleteUser: function(oauthUserId)
        {
            var deferred = Q.defer();

            User.findOneAndRemove({oauth : oauthUserId}).exec(function(err, result)
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