'use strict';

angular.module('archCore').directive('archSidebar', function(httpConstant)
{
  return {
    restrict: 'E',
    templateUrl: 'components/sidebar/arch-sidebar.html',
    controller: function($scope)
    {
      $scope.keystoneURl = httpConstant.keystoneClientUrl;
    }
  };
});
