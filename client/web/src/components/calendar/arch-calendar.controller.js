'use strict';

angular.module('archCore')
  .controller('archCalendarController', function($scope,$mdDialog, Event,$state, archAccountService) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var selectedDate = null;
    $scope.events = [];

    var currentUser = archAccountService.getCurrentUser();


    var dataEvents = Event.query(function() {
      console.log(dataEvents.data);
      if (dataEvents.data != null) {
      dataEvents.data.forEach(function (item) {
        var event = {};
        event.title = item.summary;
        event.start = item.dtstart;
        event.end = item.dtend;
        event.editable = false;
        event.id = item._id;
        switch(item.category) {
          case "officialRun":
            event.color = "#ef5350";
            break;
          case "discovery":
            event.color = "#81c784";
            break;
          case "training":
            event.color = "#fdd835";
            break;
          case "personalTraining":
            event.color = "#ffa726";
            break;
          default:
            event.color = "#64b5f6";

        }
        $scope.events.push(event);
      });
      }
    });

    /* event source that contains custom events on the scope */
    //$scope.events = [
    //  {title: 'All Day Event',start: new Date(y, m, 1)},
    //  {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    //  {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    //  {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    //  {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    //  {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    //];

    function DialogController($scope, $mdDialog, $state) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
        $state.go('eventAdd', {'category' : answer, 'date': selectedDate})
      };
    }

    $scope.showAlert = function(ev,jsEvent,view) {
      console.log(ev);
      $state.go('eventView',{id:ev.id});
    };

    $scope.typeEvent = function(ev) {
      if (currentUser && currentUser.profile.role == 'admin') {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'components/events/arch-type-event.html',
          targetEvent: ev
        })
          .then(function (answer) {
            //apres traitement du dialog
          }, function () {
            //cancel
          });
      }
    };
    $scope.alertOnEventClick = function(ev,jsEvent,view){
      $scope.showAlert(ev,jsEvent,view);
    };
    $scope.alertOnDayClick = function( date){
      $scope.typeEvent();
      selectedDate = date;
    };

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        dayClick: $scope.alertOnDayClick
      }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'Francais'){
        $scope.uiConfig.calendar.dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        $scope.uiConfig.calendar.dayNamesShort = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Francais';
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
  });
