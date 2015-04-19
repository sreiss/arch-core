'use strict'

angular.module('archCore')
  .factory('archUserService', function($q, httpConstant, SignupTypeUsers, OAuthUser, CoreUser)
  {
    return {
      /** Get users. */
      getUsers: function()
      {
        return SignupTypeUsers.query({signupType : httpConstant.signupType.name});
      },

      /** Delete user. */
      deleteUser: function(id)
      {
        var deferred = $q.defer();

        // Delete OAuth user.
        OAuthUser.delete({id:id}, function(result)
        {
          // Delete ASCPA profil.
          CoreUser.delete({id:id}, function(result)
          {
            deferred.resolve(result);
          },
          function(err)
          {
            deferred.reject(err);
          });
        },
        function(err)
        {
          deferred.reject(err);
        });

        return deferred.promise;
      }
    }
  });
