'use strict'
angular.module('archCore')
  .directive('archLogout', function ($translate, httpConstant) {
    return {
      restrict: 'E',
      templateUrl: 'components/logout/arch-logout.html',
      controller: function($scope, $cookieStore) {
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
