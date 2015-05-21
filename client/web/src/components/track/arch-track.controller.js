'use strict';

angular.module('archCore')
  .controller('archTrackController', function($scope, $stateParams, $location, $mdToast, $state, archAccountService)
  {
    $scope.currentUser = archAccountService.getCurrentUser();

    $scope.tracks = [];

    $scope.deleteTrack = function(id)
    {
      if(confirm('Souhaitez-vous réellement supprimer ce parcours ?'))
      {
      }
    };

    $scope.editTrack = function(id)
    {
      $state.go('trackEdit', {'id' : id});
    };
  })
  .controller('archTrackAddController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state)
  {
    $scope.track = {};

    $scope.addTrack = function()
    {
    }
  })
  .controller('archTrackEditController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state)
  {
    var id = $stateParams.id;

    $scope.editTrack = function()
    {
    };
  });
