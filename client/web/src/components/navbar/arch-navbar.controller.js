'use strict';

angular.module('archCore')
  .controller('archNavbarCtrl', function($scope, $mdSidenav)
{
  $scope.openLeftMenu = function()
  {
    $mdSidenav('left').toggle();
  }
});
