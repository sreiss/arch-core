'use strict'
angular.module('archCore')
  .directive('archAccount', function (archAccountService, $translate, $state, $window, httpConstant) {
    return {
      restrict: 'E',
      templateUrl: 'components/account/arch-account.html',
      controller: function($scope, $cookieStore,$stateParams, $mdToast) {
        var init = function()
        {
          var token = archAccountService.getCurrentToken();

          if(!token && $stateParams.token)
          {
            $cookieStore.put('token', JSON.parse(decodeURIComponent(atob($stateParams.token))));
            token = archAccountService.getCurrentToken();
          }

          if(token)
          {
            console.log('INIT : Already connected.');

            if(token.user.signuptype.name != httpConstant.signupType.name && token.user.signuptype.isPublic === false)
            {
              console.log('INIT : Current signup type not public.');

              archAccountService.getLoginUrl().then(function(loginUrl)
              {
                window.location = loginUrl;
              });
            }
            else
            {
              $scope.alreadyLogged = true;
            }
          }
          else
          {
            archAccountService.getLoginUrl().then(function(loginUrl)
            {
              window.location = loginUrl;
            });
          }
        }();

        $scope.myAccount = function()
        {
          console.log('myAccount');
          archAccountService.getCurrentUser().then(function(user)
          {
            console.log(user);
            //$state.go('userEdit', {'id' : user._id});
          });
        };

        $scope.logout = function()
        {
          archAccountService.logout();
        };
      }
    };
  });
