'use strict';

angular.module('archCore')
  .controller('archEventController', function ($scope, $stateParams, $location, $mdToast, $state, Event, archAccountService) {
  })
  .controller('archEventEditController', function ($scope, $stateParams, $location, $mdToast, $state, Event, archAccountService,archToastService) {
    $scope.currentUser = {};
    $scope.dtstart = {};
    $scope.dtend = {};
    $scope.event = new Event();

    archAccountService.getCurrentUser().then(function (user) {
      $scope.currentUser = user;
    })
    .catch(function () {
      archToastService.showToast('LOADING_ERROR', 'error');
    });

    Event.get({id: $stateParams.id}, function (result) {
      $scope.event = result.data;
      var dateParam = moment($scope.event.dtstart).format("YYYY-MM-DD");
      $scope.dtstart.date = new Date(dateParam);
      $scope.dtstart.time = new Date(dateParam);
      $scope.dtend.date = new Date($scope.event.dtend);
      $scope.dtend.time = new Date($scope.event.dtend);
    },
    function (responseError) {
      archToastService.showToast('LOADING_ERROR', 'error');
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
          archToastService.showToast('EDIT_SUCCESS', 'success');
          $state.go('calendar', {}, { reload: true });
        }
        else {
          archToastService.showToast('SENDING_ERROR', 'error');
        }
      },
      function (responseError) {
        archToastService.showToast('SENDING_ERROR', 'error');
      });
    }
  })
  .controller('archEventViewController', function ($scope,Sheet, $stateParams,Participant, $location, $mdDialog, $mdToast, $state, Event, archAccountService,archToastService, httpConstant, EventGuest, archUserService) {
    $scope.currentUser = {};
    $scope.event = {};
    archAccountService.getCurrentUser().then(function (user) {
      $scope.currentUser = user;
      console.log(user);

    })
    .catch(function () {
      archToastService.showToast('LOADING_ERROR', 'error');
    });

    Event.get({id: $stateParams.id}, function (result) {
      $scope.event = result.data;
      $scope.kid = httpConstant.kidClientUrl + "/#/sheet/" + $scope.event.kidoikoiaki + "/";
    },
    function (responseError) {
      archToastService.showToast('LOADING_ERROR', 'error');
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
    })
    .catch(function () {
      archToastService.showToast('LOADING_ERROR', 'error');
    });

    $scope.deleteEvent = function (id) {
      if (confirm('Souhaitez-vous réellement supprimer cet événement ?')) {
        Event.delete({id: id},function (result) {
          if (result.count > 0) {
            archToastService.showToast('DELETE_SUCCESS', 'success');
            $state.go('calendar', {}, { reload: true });
          }
          else {
            archToastService.showToast('SENDING_ERROR', 'error');
          }
        },
        function (responseError) {
          archToastService.showToast('SENDING_ERROR', 'error');
        });
      }
    };
    $scope.statusEvent = function (id, status) {
      if($scope.event.kidoikoiaki && status == 'yes') {
      Sheet.get({id: $scope.event.kidoikoiaki}, function(result) {
          if(result.count > 0)
          {
            var participant = new Participant();
            participant.prt_email = $scope.currentUser.email;
            participant.prt_fname = $scope.currentUser.fname;
            participant.prt_lname = $scope.currentUser.lname;
            participant.prt_notified = true;
            participant.prt_share = 1;
            participant.prt_sheet = result.data._id;
            participant.$save(function() {
                archToastService.showToast('ADD_PARTICIPANT_SUCCESS', 'success');
            },
            function() {
              archToastService.showToast('KID_ERROR', 'error');
            })
          } else {
            archToastService.showToast('KID_EROOR', 'error');
          }
        },
        function(responseError)
        {
          archToastService.showToast('KID_EROOR', 'error');
        });
      }
      var guest = new EventGuest();
      guest._id = id;
      guest.participants = {guest: $scope.currentUser._id, status: status};
      guest.$save(function (result) {
        if (result.count > 0) {
          archToastService.showToast('GUEST_UPDATE_SUCCESS', 'success');
          $state.go($state.current, {}, {reload: true});
        }
        else {
          archToastService.showToast('SENDING_ERROR', 'error');
        }
      },
      function (responseError) {
        archToastService.showToast('SENDING_ERROR', 'error');
      });
    };
  })
  .controller('archEventAddController', function ($scope, $stateParams, $location, $mdToast, $state, Event, $mdDialog, archAccountService,archToastService, httpConstant, Events, Sheet) {

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
      //Events.get({id: currentUser._id}, function (result) {
      //  console.log(result.data);
      //});
    })
    .catch(function () {
      archToastService.showToast('LOADING_ERROR', 'error');
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

        var sheet = new Sheet();
        sheet.she_name = "ASCPA-" + $scope.event.summary;
        sheet.she_email = currentUser.email;
        sheet.she_path= httpConstant.coreServerUrl;
        sheet.she_reference_private = "";
        sheet.$save(function (result) {
          if (result.count > 0) {
            $scope.event.kidoikoiaki = result.data.she_reference_private;
          }else{
            archToastService.showToast('KID_ERROR', 'error');
          }
          saveEvent();
        },
        function (responseError) {
          archToastService.showToast('KID_ERROR', 'error');
          saveEvent();
        });
      }else{
        archToastService.showToast('DATE_ERROR', 'error');
      }

      function saveEvent() {
        $scope.event.$save(function (result) {
            if (result.count > 0) {
              archToastService.showToast('EVENT_ADD_SUCCESS', 'success');
              $state.go('calendar', {}, { reload: true });
            }
            else {
              archToastService.showToast('SENDING_ERROR', 'error');
            }
          },
          function (responseError) {
            archToastService.showToast('SENDING_ERROR', 'error');
          });
      }
    }
  })
  .controller('archEventListController', function($scope,$stateParams, Event,DTOptionsBuilder,archToastService){
    $scope.events = new Array();
    Event.query(function(result){
      $scope.events = result.data;
    },
    function (responseError) {
      archToastService.showToast('LOADING_ERROR', 'error');
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
