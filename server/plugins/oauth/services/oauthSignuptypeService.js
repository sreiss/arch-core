/**
 * Signup type service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(OauthSignuptype, qService) {
    return {
        /** Save signup type. */
        saveSignupType: function(signuptypeData)
        {
            var deferred = qService.defer();

            var signupType = new OauthSignuptype();
            signupType.name = signuptypeData.name;
            signupType.description = signuptypeData.description;
            signupType.isPublic = signuptypeData.isPublic || 0;

            signupType.save().exec(function(err, signuptype)
            {
                if(err)
                {
                    deferred.reject(err.message);
                }
                else
                {
                    deferred.resolve(signuptype);
                }
            })

            return deferred.promise;
        },

        /** Get signup type's informations. */
        getSignupType: function(name)
        {
            var deferred = qService.defer();

            OauthSignuptype.findOne({name: name}).exec(function(err, result)
            {
                if(err)
                {
                    deferred.reject(err.message);
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