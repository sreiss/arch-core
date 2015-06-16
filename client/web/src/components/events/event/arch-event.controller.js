'use strict';

angular.module('archCore')
  .controller('archEventController', function ($scope, $stateParams, $location, $mdToast, $state, Event, archAccountService) {
    $scope.currentUser = {};

    archAccountService.getCurrentUser().then(function (user) {
      $scope.currentUser = user;
    })
      .catch(function () {
        $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
      });
  })
  .controller('archEventEditController', function ($scope, $stateParams, $location, $mdToast, $state, Event, archAccountService) {
    $scope.currentUser = {};
    $scope.dtstart = {};
    $scope.dtend = {};
    $scope.event = new Event();

    archAccountService.getCurrentUser().then(function (user) {
      $scope.currentUser = user;
    })
      .catch(function () {
        $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
      });

    Event.get({id: $stateParams.id}, function (result) {
      console.log(result.data);
      $scope.event = result.data;
      var dateParam = moment($scope.event.dtstart).format("YYYY-MM-DD");
      $scope.dtstart.date = new Date(dateParam);
      $scope.dtstart.time = new Date(dateParam);
      $scope.dtend.date = new Date($scope.event.dtend);
      $scope.dtend.time = new Date($scope.event.dtend);
    });
    $scope.editEvent = function () {
      var timeStart = moment($scope.dtstart.time);
      var dateStart = moment($scope.dtstart.date).hour(timeStart.hour()).minute(timeStart.minute());
      var timeEnd = moment($scope.dtend.time);
      var dateEnd = moment($scope.dtend.date).hour(timeEnd.hour()).minute(timeEnd.minute());

      $scope.event.dtstart = dateStart;
      $scope.event.dtend = dateEnd;
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
  .controller('archEventViewController', function ($scope, $stateParams, $location, $mdDialog, $mdToast, $state, Event, archAccountService, httpConstant, EventGuest, archUserService) {
    $scope.currentUser = {};
    $scope.event = {};
    archAccountService.getCurrentUser().then(function (user) {
      $scope.currentUser = user;
    })
      .catch(function () {
        $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
      });

    Event.get({id: $stateParams.id}, function (result) {
      $scope.event = result.data;
      $scope.kid = httpConstant.kidClientUrl + "/#/sheet/" + $scope.event.kidoikoiaki + "/";
    });

    $scope.users = archUserService.getUsers();
    var temp = [];
    archUserService.getUsers().then(function (item) {
      item.forEach(function (user) {
        $scope.event.participants.forEach(function (guest) {
          var userTemp = {};
          if (user._id == guest.guest) {
            userTemp.fname = user.fname;
            userTemp.lname = user.lname;
            userTemp.username = user.username;
            userTemp.status = guest.status;
            temp.push(userTemp);
          }
        })
      });
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

    $scope.statusEvent = function (id, status) {
      var guest = new EventGuest();
      guest._id = id;
      guest.participants = {guest: $scope.currentUser._id, status: status};
      guest.$save(function (result) {
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
    };
  })
  .controller('archEventAddController', function ($scope, $stateParams, $location, $mdToast, $state, Event, $mdDialog, archAccountService, httpConstant, Events, Sheet) {

    $scope.event = new Event();
    $scope.event.transp = "false";
    $scope.event.sequence = "1";
    $scope.event.participants = [];
    $scope.event.course = null;
    $scope.event.trainings = [];
    $scope.event.creator = null;
    $scope.event.runs = [];
    $scope.dtstart = {};
    $scope.dtend = {};
    $scope.$error = {"date" : false};


    var currentUser = {};

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

    archAccountService.getCurrentUser().then(function (user) {
      currentUser = user;
      Events.get({id: currentUser._id}, function (result) {
        console.log(result.data);
      });
    })
      .catch(function () {
        $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
      });

    $scope.addEvent = function () {
      var timeStart = moment($scope.dtstart.time);
      var dateStart = moment($scope.dtstart.date).hour(timeStart.hour()).minute(timeStart.minute());
      var timeEnd = moment($scope.dtend.time);
      var dateEnd = moment($scope.dtend.date).hour(timeEnd.hour()).minute(timeEnd.minute());
      if(dateStart.isBefore(dateEnd)){
        $scope.event.dtstart = dateStart;
        $scope.event.dtend = dateEnd;
        $scope.event.creator = currentUser._id;

        console.log($scope.event);
        var sheet = new Sheet();
        sheet.she_name = "ASCPA-" + $scope.event.summary;
        sheet.she_email = currentUser.email;
        sheet.she_reference = "";
        sheet.$save(function (result) {
          if (result.count > 0) {
            $scope.event.kidoikoiaki = result.data.she_reference;
          }
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
        });
      }else{
        $scope.$error = {"date" : true};
      }
    }
  })
  .controller('archEventListController', function($scope,$stateParams, Event,DTOptionsBuilder){
    $scope.events = new Array();
    Event.query(function(result){
      $scope.events = result.data;
    });
    $scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage(
      {
        "sProcessing":     "Traitement en cours...",
        "sSearch":         "Rechercher&nbsp;:",
        "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
        "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoPostFix":    "",
        "sLoadingRecords": "Chargement en cours...",
        "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
        "oPaginate": {
          "sFirst":      "Premier",
          "sPrevious":   "Pr&eacute;c&eacute;dent",
          "sNext":       "Suivant",
          "sLast":       "Dernier"
        },
        "oAria": {
          "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
          "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
        }
      });
  });
