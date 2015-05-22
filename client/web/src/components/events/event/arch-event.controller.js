'use strict';

angular.module('archCore')
  .controller('archEventController', function($scope, $stateParams, $location, $mdToast, $state,Event, archAccountService) {
    //$scope.events = Event.query();
    $scope.currentUser = archAccountService.getCurrentUser();
  })
  .controller('archEventViewController', function($scope, $stateParams, $location, $mdToast, $state,Event, archAccountService) {
    Event.get($stateParams.id, function(result){
      console.log(result.data[0]);
      $scope.event = result.data[0];
    });
    $scope.currentUser = archAccountService.getCurrentUser();

    $scope.deleteEvent = function(id){
      Event.delete({id:id});
      $state.go('calendar');
    }
  })
  .controller('archEventAddController', function($scope, $stateParams, $location, $mdToast, $state, Event,$mdDialog,archAccountService)
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
    $scope.event.dtstart = moment();
    $scope.event.dtend = moment();
    $scope.event.summary = "";
    $scope.event.description = "";
    $scope.event.transp = "false";
    $scope.event.sequence = "0";
    $scope.event.participants = [{guest : null, status:""}];
    $scope.event.course = null;
    $scope.event.website = "";
    $scope.event.information = "";
    $scope.event.trainings = [{training:null}];
    $scope.event.creator = null;
    $scope.event.program = "";
    $scope.event.runs = [{run:null}];
    $scope.dtstart= {};
    $scope.dtend= {};

    if($stateParams.category){
      $scope.event.category = $stateParams.category;
    }
    else{
      $scope.event.category = "event";
    }
    if($stateParams.date != null){
      var dateParam = moment($stateParams.date);
      //$scope.dtstart.day = dateParam.date();
      //$scope.dtstart.month = dateParam.month();
      //$scope.dtstart.year = dateParam.year();
    }
    $scope.day = 31;
    $scope.month = 12;
    $scope.hour = 23;
    $scope.minute = 59;
    var dataYears = [];
    var currentYear = moment().year();
    for (var i = 0; i < 10; i++) {
      dataYears.push(currentYear + i);
    }
    $scope.years = dataYears;
    $scope.getNumber = function(num) {
      return new Array(num);
    };
    console.log(archAccountService.getCurrentUser());
    $scope.addEvent = function()
    {
      //var arrayStart = $scope.dtstart.date.split("/");
      //.minute($scope.dtsart.minute).heure($scope.dtstart.heure)
      var tmpStart = moment().date($scope.dtstart.day).month($scope.dtstart.month).year($scope.dtstart.year);
      var tmpEnd = moment().date($scope.dtend.day).month($scope.dtend.month).year($scope.dtend.year);
      $scope.event.dtstart = tmpStart;
      $scope.event.dtend = tmpEnd;
      $scope.event.creator = archAccountService.getCurrentUser()._id;
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
          $state.go('calendar');
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
