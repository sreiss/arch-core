'use strict'

angular.module('archCore')
  .factory('archUserService', function($q, httpConstant, SignupTypeUsers, OAuthUser, OAuthUsers, CoreUser, CoreUsers, archHttpService)
  {
    var _roleUrl = httpConstant.coreServerUrl + '/users/role';

    return {
      getRoles: function() {
        return archHttpService.get(_roleUrl);
      },
      /** Get users. */
      getUsers: function()
      {
        var deferred = $q.defer();

        SignupTypeUsers.query({signupType : httpConstant.signupType.name}, function(err, users)
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

      /** Edit user. */
      editUser: function(oauthUser, coreUser)
      {
        var deferred = $q.defer();

        // Add OAuth user.
        OAuthUsers.update({user:oauthUser}, function(result)
        {
          coreUser.id = oauthUser.id;
          CoreUsers.update({user:coreUser}, function(result)
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
