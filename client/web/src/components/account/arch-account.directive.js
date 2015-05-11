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
          var token = archAccountService.getCurrentToken();

          if(!token)
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

                window.location = httpConstant.casClientUrl + '/#/?client=' + clientHash + '&return=' + $base64.encode(result.data.clientRedirectUri);
              });
            }
            else
            {
              console.log('INIT : Params found in cookies.');
              window.location = httpConstant.casClientUrl + '/#/?client=' + cookieClientHash + '&return=' + $base64.encode(cookieClientRedirectUri);
            }
          }
          else
          {
            console.log('INIT : Already connected.');

            $scope.token = token;
            $scope.user = token.user;

            // Get current user's profile um die Role zu haben !
            if(!$scope.user.profile)
            {
              console.log('INIT : Get profil of current user.');

              archAccountService.getProfile($scope.user._id).then(function(result)
              {
                token.user.profile = result.data;
                $cookieStore.put('token', token);
                $scope.user = token.user;

                if(token.user.profile.firstconnexion)
                {
                  $state.go('userEdit', {'id' : token.user._id});
                }
              })
              .catch(function(err)
              {
                $mdToast.show($mdToast.simple()
                  .content("Une erreur est survenue lors de la récupération du profile de l'utilisateur.")
                  .position('top right')
                  .hideDelay(3000)
                );
              });
            }
            else
            {
              if(token.user.profile.firstconnexion)
              {
                $state.go('userEdit', {'id' : token.user._id});
              }
            }
          }
        }();

        $scope.myAccount = function()
        {
          var user = archAccountService.getCurrentUser();
          $state.go('userEdit', {'id' : user._id});
        };

        $scope.logout = function()
        {
            $cookieStore.remove('token');
            window.location.reload();
        };
      }
    };
  });
