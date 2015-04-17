'use strict';

angular.module('archCore').controller('archHomeController', function($scope)
{
  $scope.toastPosition =
  {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.getToastPosition = function ()
  {
    return Object.keys($scope.toastPosition).filter(function (pos)
    {
      return $scope.toastPosition[pos];
    })
      .join(' ');
  };
});
