'use strict'
angular.module('archCore')
  .factory('archAccountService', function(archHttpService, $q, httpConstant, $cookieStore, $base64) {
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
        var token = $cookieStore.get('token') || null;

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

        if(token)
        {
          return token.user || null;
        }

        return null;
      },

      checkRole: function(role)
      {
        var currentUser = this.getCurrentUser();
        var currentRole = currentUser.profil.role || '';

        if(role == currentRole)
        {
          return true;
        }

        return false;
      },

      isAdmin: function()
      {
        return this.checkRole('ADMIN');
      },

      isMember: function()
      {
        return this.checkRole('MEMBER');
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
      },

      logout: function()
      {
        $cookieStore.remove('token');
        window.location.reload();
      },

      getLoginUrl: function()
      {
        var deferred = $q.defer();

        var cookieClientId = $cookieStore.get('ASCPA_clientId') || '';
        var cookieClientSecret = $cookieStore.get('ASCPA_clientSecret') || '';
        var cookieClientRedirectUri = $cookieStore.get('ASCPA_clientRedirectUri') || '';
        var cookieClientHash = $cookieStore.get('ASCPA_clientHash') || '';

        // If no saved in cookies, save new client.
        if(cookieClientId.length == 0 || cookieClientSecret.length == 0 || cookieClientRedirectUri.length == 0 || cookieClientHash.length == 0)
        {
          console.log('INIT : Params not found in cookies, save new client.');

          this.saveClient().then(function(result)
          {
            console.log('INIT : Params saved in cookies.');

            var clientHash = $base64.encode(result.data.clientId + ':' + result.data.clientSecret);
            $cookieStore.put('ASCPA_clientId', result.data.clientId);
            $cookieStore.put('ASCPA_clientSecret', result.data.clientSecret);
            $cookieStore.put('ASCPA_clientRedirectUri', result.data.clientRedirectUri);
            $cookieStore.put('ASCPA_clientHash', clientHash);

            deferred.resolve(httpConstant.casClientUrl + '/#/?client=' + clientHash + '&return=' + $base64.encode(result.data.clientRedirectUri));
          });
        }
        else
        {
          console.log('INIT : Params found in cookies.');

          deferred.resolve(httpConstant.casClientUrl + '/#/?client=' + cookieClientHash + '&return=' + $base64.encode(cookieClientRedirectUri));
        }

        return deferred.promise;
      }
    };
  });
