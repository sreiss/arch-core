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

          if(token)
          {
            console.log('INIT : Already connected.');

            if(token.user.signuptype.name != httpConstant.signupType.name && token.user.signuptype.isPublic === false)
            {
              console.log('INIT : Current signup type not public.');

              window.location = archAccountService.getLoginUrl();
            }
            else
            {
              $scope.alreadyLogged = true;

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
                })
                .catch(function(err)
                {
                  $scope.alreadyLogged = false;

                  $mdToast.show($mdToast.simple()
                      .content("Une erreur est survenue lors de la récupération du profile de l'utilisateur.")
                      .position('top right')
                      .hideDelay(3000)
                  );
                });
              }
            }
          }
          else
          {
            window.location = archAccountService.getLoginUrl();
          }
        }();

        $scope.myAccount = function()
        {
          var user = archAccountService.getCurrentUser();
          $state.go('userEdit', {'id' : user._id});
        };

        $scope.logout = function()
        {
          archAccountService.logout();
        };
      }
    };
  });
