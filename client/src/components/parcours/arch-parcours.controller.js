angular.module('archCore')
  .controller('archParcoursController', function($scope, $stateParams, $location, $mdToast, $state)
  {
    $scope.parcours = [];

    $scope.deleteUser = function(id)
    {
      if(confirm('Souhaitez-vous réellement supprimer ce membre ?'))
      {
      }
    };

    $scope.editParcours = function(id)
    {
      $state.go('parcoursEdit', {'id' : id});
    };
  })
  .controller('archParcoursAddController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, md5)
  {
    $scope.parcours = {};

    $scope.addUser = function()
    {
    }
  })
  .controller('archParcoursEditController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, md5)
  {
    var id = $stateParams.id;

    $scope.editParcours = function()
    {
    };
  });
