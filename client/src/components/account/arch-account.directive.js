'use strict'
angular.module('archCore')
  .directive('archAccount', function (archAccountService, $translate, $state, $window, httpConstant) {
    return {
      restrict: 'E',
      templateUrl: 'components/account/arch-account.html',
      controller: function($scope, $cookieStore, $base64) {
        var init = function()
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

              archAccountService.saveClient().then(function(result)
              {
                console.log('INIT : Params saved in cookies.');

                var clientHash = $base64.encode(result.data.clientId + ':' + result.data.clientSecret);
                $cookieStore.put('clientId', result.data.clientId);
                $cookieStore.put('clientSecret', result.data.clientSecret);
                $cookieStore.put('clientRedirectUri', result.data.clientRedirectUri);
                $cookieStore.put('clientHash', clientHash);

                window.location = httpConstant.loginUrl + '/#/?client=' + clientHash + '&return=' + $base64.encode(result.data.clientRedirectUri);
              });
            }
            else
            {
              console.log('INIT : Params found in cookies.');
              window.location = httpConstant.loginUrl + '/#/?client=' + cookieClientHash + '&return=' + $base64.encode(cookieClientRedirectUri);
            }
          }
          else
          {
            console.log('INIT : Already connected.');
            $scope.username = token.user.fname + " " + token.user.lname;
          }
        }();

        function isExpired(token)
        {
          var now = new Date();

          if(now.getTime() > token.expired_at)
          {
            logout();
            return true;
          }
          else
          {
            return false;
          }
        };

        function logout()
        {
          if(confirm('Tu veux te deconnecter ?'))
          {
            $cookieStore.remove('token');
          }
        }

        $scope.myAccount = function()
        {
          var token = $cookieStore.get('token');
          $state.go('userEdit', {'id' : token.user._id});
        };

        $scope.logout = function()
        {
          if(confirm("Souhaitez-vous réellement vous déconnecter ?"))
          {
            $cookieStore.remove('token');
            window.location.reload();
          }
        };
      }
    };
  });
