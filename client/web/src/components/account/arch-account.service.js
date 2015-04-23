'use strict'
angular.module('archCore')
  .factory('archAccountService', function(archHttpService, $q, httpConstant, $cookieStore) {
    var casUrl = httpConstant.casServerUrl + '/oauth';

    return {
      saveClient: function()
      {
        var client =
        {
          "name" : httpConstant.clientName,
          "redirect_uri" : httpConstant.clientRedirectUri
        }

        var deferred = $q.defer();

        archHttpService.post(casUrl + '/client', client).then(function(result)
        {
          deferred.resolve(result);
        })
          .catch(function(err)
          {
            deferred.reject(err.message);
          });

        return deferred.promise;
      },

      getCurrentToken: function()
      {
        var token = $cookieStore.get('token');

        if(token)
        {
          var now = new Date();

          if(now.getTime() > token.expired_at)
          {
            $cookieStore.remove('token');
            token = null;
          }
        }

        return token;
      },

      getCurrentUser: function()
      {
        var token = this.getCurrentToken();
        var currentUser = token.user || null;

        return currentUser;
      },

      isCurrentUserAdmin: function()
      {
        var currentUser = this.getCurrentUser();
        var role = currentUser.profil.role || '';

        if(role == "admin")
        {
          return true;
        }

        return false;
      },

      getProfile: function(id)
      {
        var deferred = $q.defer();

        archHttpService.get(httpConstant.coreServerUrl + '/users/user/' + id).then(function(result)
        {
          deferred.resolve(result);
        })
        .catch(function(err)
        {
          deferred.reject(err.message);
        });

        return deferred.promise;
      }
    };
  });
