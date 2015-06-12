'use strict';

angular.module('archCore')
  .controller('archEventController', function ($scope, $stateParams, $location, $mdToast, $state, Event, archAccountService) {
    $scope.currentUser = {};

    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user;
    })
    .catch(function()
    {
      $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
    });
  })
  .controller('archEventEditController', function ($scope, $stateParams, $location, $mdToast, $state, Event, archAccountService) {
    $scope.currentUser = {};

    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user;
    })
    .catch(function()
    {
      $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
    });

    $scope.event = new Event;
    Event.get({id: $stateParams.id}, function (result) {
      console.log(result.data);
      $scope.event = result.data;
    });
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
    $scope.getNumber = function (num) {
      return new Array(num);
    };
    $scope.editEvent = function () {
      //var arrayStart = $scope.dtstart.date.split("/");
      //.minute($scope.dtsart.minute).heure($scope.dtstart.heure)
      var tmpStart = moment();
      var tmpEnd = moment();
      $scope.event.dtstart = tmpStart;
      $scope.event.dtend = tmpEnd;
      // $scope.event.creator = archAccountService.getCurrentUser()._id;
      console.log($scope.event);
      Event.update({event: $scope.event}, function (result) {
          if (result.count > 0) {
            $mdToast.show($mdToast.simple()
                .content("Evènement ajouté avec succés.")
                .position('top right')
                .hideDelay(3000)
            );
            $state.go('calendar');
          }
          else {
            $mdToast.show($mdToast.simple()
                .content("Une erreur est survenue lors de l'ajout de l'événement.")
                .position('top right')
                .hideDelay(3000)
            );
          }
        },
        function (responseError) {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de l'ajout de l'événement.")
              .position('top right')
              .hideDelay(3000)
          );
        });
    }
  })
  .controller('archEventViewController', function ($scope, $stateParams, $location, $mdDialog, $mdToast, $state, Event, archAccountService, EventGuest, archUserService) {
    function DialogController($scope, $mdDialog, $state) {
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }

    $scope.currentUser = {};

    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user;
    })
    .catch(function()
    {
      $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
    });

    $scope.event = {};

    Event.get({id: $stateParams.id}, function (result) {
      console.log(result.data);
      $scope.event = result.data;
    });

    $scope.users = archUserService.getUsers();
    var temp = [];
    $scope.users.$promise.then(function (item) {
      // time = 1.000 sec. Request is completed.
      // data is available, so you assign it to $scope.tasks
      var usersData = item.data;
      usersData.forEach(function (user) {
        $scope.event.participants.forEach(function (guest) {
          if (user._id == guest.guest) {
            temp.push(user);
          }
        })
      })
      $scope.listGuest = temp;
    });

    $scope.deleteEvent = function (id) {
      if (confirm('Souhaitez-vous réellement supprimer cet événement ?')) {
        Event.delete({id: id}).then(function (result) {
          if (result.count > 0) {
            $mdToast.show($mdToast.simple()
                .content('Evénement supprimée avec succés.')
                .position('top right')
                .hideDelay(3000)
            );
            $state.go('calendar');
          }
          else {
            $mdToast.show($mdToast.simple()
                .content('Une erreur est survenue à la suppression de l\'événement.')
                .position('top right')
                .hideDelay(3000)
            );
          }
        });
      }
    };

    $scope.showUsersEvent = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/events/event/arch-event-list-guest.html',
        targetEvent: ev,
        scope: $scope
      })
        .then(function (answer) {
          //apres traitement du dialog
        }, function () {
          //cancel
        });
    };

    $scope.takePartEvent = function (id) {
      var test = new EventGuest();

      test._id = id;
      test.participants = [{guest: $scope.currentUser._id, status: "takePart"}]
      test.$save(function (result) {
          if (result.count > 0) {
            $mdToast.show($mdToast.simple()
                .content("Evènement ajouté avec succés.")
                .position('top right')
                .hideDelay(3000)
            );
            $state.go('calendar');
          }
          else {
            $mdToast.show($mdToast.simple()
                .content("Une erreur est survenue lors de l'ajout de l'événement.")
                .position('top right')
                .hideDelay(3000)
            );
          }
        },
        function (responseError) {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de l'ajout de l'événement.")
              .position('top right')
              .hideDelay(3000)
          );
        });
    }
    $scope.listGuest = function () {

    }
  })
  .controller('archEventAddController', function ($scope, $stateParams, $location, $mdToast, $state, Event, $mdDialog, archAccountService) {

    $scope.event = new Event();
    $scope.event.dtstart = moment();
    $scope.event.dtend = moment();
    $scope.event.summary = "";
    $scope.event.description = "";
    $scope.event.transp = "false";
    $scope.event.sequence = "1";
    $scope.event.participants = [];
    $scope.event.course = null;
    $scope.event.website = "";
    $scope.event.information = "";
    $scope.event.trainings = [];
    $scope.event.creator = null;
    $scope.event.program = "";
    $scope.event.runs = [];
    $scope.dtstart = {};
    $scope.dtend = {};

    if ($stateParams.category) {
      $scope.event.category = $stateParams.category;
    }
    else {
      $scope.event.category = "event";
    }
    if ($stateParams.date != null) {
      var dateParam = moment($stateParams.date);
      $scope.dtstart.date = new Date(dateParam);
      $scope.dtstart.time = new Date(dateParam);
      $scope.dtend.date = new Date(dateParam);
      $scope.dtend.time = new Date(dateParam);
    }

    $scope.addEvent = function () {
      var timeStart = moment($scope.dtstart.time);
      var dateStart = moment($scope.dtstart.date).hour(timeStart.hour()).minute(timeStart.minute());
      var timeEnd = moment($scope.dtend.time);
      var dateEnd = moment($scope.dtend.date).hour(timeEnd.hour()).minute(timeEnd.minute());

      $scope.event.dtstart = dateStart;
      $scope.event.dtend = dateEnd;

      $scope.currentUser = {};

      archAccountService.getCurrentUser().then(function(user)
      {
        $scope.event.creator = user._id;
      })
      .catch(function()
      {
        $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
      });

      console.log($scope.event);
      $scope.event.$save(function (result) {
        if (result.count > 0) {
          $mdToast.show($mdToast.simple()
              .content("Evènement ajouté avec succés.")
              .position('top right')
              .hideDelay(3000)
          );
          $state.go('calendar');
        }
        else {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de l'ajout de l'événement.")
              .position('top right')
              .hideDelay(3000)
          );
        }
      },
      function (responseError) {
        $mdToast.show($mdToast.simple()
            .content("Une erreur est survenue lors de l'ajout de l'événement.")
            .position('top right')
            .hideDelay(3000)
        );
      });
    }
  });
