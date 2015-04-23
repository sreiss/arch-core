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

      /** Add user. */
      addUser: function(oauthUser, coreUser)
      {
        var deferred = $q.defer();

        // Add OAuth user.
        oauthUser.signuptype = httpConstant.signupType;
        oauthUser.$save(function(result)
        {
          coreUser.oauth = result.data._id;
          coreUser.$save(function(result)
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
