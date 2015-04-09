'use strict'

angular.module('archCore')
  .factory('archUserService', function($cookieStore, $q)
  {
    return {
      isLogin: function($scope)
      {
        // Check token in coockies.
        var token = $cookieStore.get('token');

        if(!token || isExpired(token))
        {
          $scope.alreadyLogged = false;
          console.log('INIT : Not connected');

          var cookieClientId = $cookieStore.get('clientId') || '';
          var cookieClientSecret = $cookieStore.get('clientSecret') || '';
          var cookieClientRedirectUri = $cookieStore.get('clientRedirectUri') || '';
          var cookieClientHash = $cookieStore.get('clientHash') || '';

          // If no saved in cookies, save new client.
          if(cookieClientId.length == 0 || cookieClientSecret.length == 0 || cookieClientRedirectUri.length == 0 || cookieClientHash.length == 0)
          {
            console.log('INIT : Params not found in cookies, save new client.');

            archLoginService.saveClient().then(function(result)
            {
              console.log('INIT : Params saved in cookies.');

              var clientHash = $base64.encode(result.data.clientId + ':' + result.data.clientSecret);
              $cookieStore.put('clientId', result.data.clientId);
              $cookieStore.put('clientSecret', result.data.clientSecret);
              $cookieStore.put('clientRedirectUri', result.data.clientRedirectUri);
              $cookieStore.put('clientHash', clientHash);

              $scope.loginUrl = httpConstant.loginUrl + '/#/?client=' + clientHash + '&return=' + $base64.encode(result.data.clientRedirectUri);
            });
          }
          else
          {
            console.log('INIT : Params found in cookies.');
            $scope.loginUrl = httpConstant.loginUrl + '/#/?client=' + cookieClientHash + '&return=' + $base64.encode(cookieClientRedirectUri);
          }
        }
        else
        {
          console.log('INIT : Already connected.');

          $scope.alreadyLogged = true;
          $scope.mapUrl = '/#/map';
        }
      },

      isTokenExpired: function(token)
      {
        var now = new Date();

        if(now.getTime() > token.expired_at)
        {
          return true;
        }
        else
        {
          return false;
        }
      },

      generateRandomPassword: function()
      {
        var pwd = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(var i= 0; i < 8; i++ )
        {
          pwd += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return pwd;
      },

      sendUserMail: function(lname, fname, email, password)
      {
        console.log(fname);
        console.log(lname);
        console.log(email);
        console.log(password);
      }
    }
  });
