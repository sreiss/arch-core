angular.module('archCore')
  .controller('archEventController', function($scope, $stateParams, $location, $mdToast, $state,Event) {
    $scope.events = Event.query();
  })
  .controller('archEventAddController', function($scope, $stateParams, $location, $mdToast, $state, Event)
  {
    $scope.event = new Event();

    $scope.addEvent = function()
    {
      console.log($scope.event.begin);
      $scope.event.$save(function (result)
        {
          if(result.count > 0)
          {
            $mdToast.show($mdToast.simple()
                .content("Membre ajouté avec succés.")
                .position('top right')
                .hideDelay(3000)
            );
            $state.go('events');
          }
          else
          {
            $mdToast.show($mdToast.simple()
                .content("Une erreur est survenue lors de l'ajout du membre.")
                .position('top right')
                .hideDelay(3000)
            );
          }
        },
        function(responseError)
        {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de l'ajout du membre.")
              .position('top right')
              .hideDelay(3000)
          );
        });
    }
  });
