/**
 * Signup type service.
 *
 * @module arch/users
 * @copyright ArchTailors 2015
 */

module.exports = function(Signuptype) {
    return {
        /** Save signup type. */
        saveSignupType: function(signuptypeData, callback)
        {
            Signuptype.findOne({name: signuptypeData.name}, function(err, res)
            {
                if(err)
                {
                    throw err;
                }

                if(res != null)
                {
                    callback(res);
                }
                else
                {
                    var signupType = new Signuptype();
                    signupType.name = signuptypeData.name;
                    signupType.description = signuptypeData.description;
                    signupType.isPublic = signuptypeData.isPublic;

                    signupType.save(function(err)
                    {
                        if(err)
                        {
                            throw err;
                        }

                        callback(signupType);
                    })
                }
            });
        },

        /** Get signup type's informations. */
        getSignupType: function(name, callback)
        {
            Signuptype.findOne({name: name}, function(err, res)
            {
                if(err)
                {
                    throw err;
                }

                callback(res);
            });
        }
    };
};