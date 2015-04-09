'use strict';

angular.module('archCore')
  .controller('archNavbarCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav)
{
    $scope.toggleSidenav = function(menuId)
    {
      $mdSidenav(menuId).toggle();
    };
}]);
