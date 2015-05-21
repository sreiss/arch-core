'use strict';

angular.module('archCore')
  .controller('archNavbarCtrl', function($scope, $mdSidenav)
{
    $scope.toggleSidenav = function(menuId)
    {
      $mdSidenav(menuId).toggle();
    };
  });
