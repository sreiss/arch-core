angular.module('archCore')
  .controller('archEventController', function($scope, $stateParams, $location, $mdToast, $state,Event, archAccountService) {
    //$scope.events = Event.query();
    $scope.currentUser = archAccountService.getCurrentUser();
  })
  .controller('archEventAddController', function($scope, $stateParams, $location, $mdToast, $state, Event,$mdDialog)
  {

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

    $scope.event = new Event();

    if($stateParams.category){
      $scope.event.category = $stateParams.category;
    }
    else{
      $scope.event.category = "event";
    }
    if($stateParams.date != null){
      $scope.event.dtstart = moment($stateParams.date);
    }

    $scope.startDate = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/events/arch-date-time.html',
        targetEvent: ev
      })
        .then(function(answer) {
          $scope.event.dtstart = moment(answer);
        });
    };

    $scope.endDate = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/events/arch-date-time.html',
        targetEvent: ev
      })
        .then(function(answer) {
          $scope.event.dtend = moment(answer);
        });
    };

    $scope.addEvent = function()
    {

      $scope.event.transp = "false";
      $scope.event.sequence = "0.0";
      $scope.event.category = $scope.event.category;
      $scope.event.participants = [];
      console.log($scope.event);
      $scope.event.$save(function (result)
      {
        if(result.count > 0)
        {
          $mdToast.show($mdToast.simple()
              .content("Evènement ajouté avec succés.")
              .position('top right')
              .hideDelay(3000)
          );
          $state.go('events');
        }
        else
        {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de l'ajout de l'événement.")
              .position('top right')
              .hideDelay(3000)
          );
        }
      },
      function(responseError)
      {
        $mdToast.show($mdToast.simple()
            .content("Une erreur est survenue lors de l'ajout de l'événement.")
            .position('top right')
            .hideDelay(3000)
        );
      });
    }
  });
