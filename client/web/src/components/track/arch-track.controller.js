'use strict';

angular.module('archCore')
  .controller('archTrackController', function($scope, $stateParams, $location, $mdToast, $state, archAccountService, archToastService)
  {
    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.event.creator = user._id;
    })
    .catch(function()
    {
      archToastService.showToast("Une erreur est survenue lors de la récupération de l'utilisateur courant.", 'error');
    });

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
