'use strict';

angular.module('archCore')
  .controller('archCalendarController', function ($scope, $mdDialog, Event, $state,archToastService,httpConstant) {
    var selectedDate = null;
    $scope.events = [];
    $scope.urlServer = httpConstant.coreServerUrl;

    var dataEvents = Event.query(function () {
      if (dataEvents.data != null) {
        dataEvents.data.forEach(function (item) {
          var event = {};
          event.title = item.summary;
          event.start = moment(item.dtstart);
          event.end = moment(item.dtend);
          event.editable = false;
          event.id = item._id;
          switch (item.category) {
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
    },
    function (responseError) {
      archToastService.showToast('LOADING_ERROR', 'error');
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
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
        $state.go('eventAdd', {'category': answer, 'date': selectedDate})
      };
    }

    $scope.showEvent = function (ev, jsEvent, view) {
      console.log(ev);
      $state.go('eventView', {id: ev.id});
    };

    $scope.typeEvent = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/events/arch-type-event.html',
        targetEvent: ev
      })
    };

    $scope.alertOnEventClick = function (ev, jsEvent, view) {
      $scope.showEvent(ev, jsEvent, view);
    };
    $scope.alertOnDayClick = function (date) {
      $scope.typeEvent();
      selectedDate = date;
    };

    /* config object */
    $scope.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        dayClick: $scope.alertOnDayClick
      }
    };

    $scope.uiConfig.calendar.monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août","Septembre","Octobre","Novembre","Decembre"]
    $scope.uiConfig.calendar.buttonText = {today:'Aujourd\'hui'};
    $scope.uiConfig.calendar.dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    $scope.uiConfig.calendar.dayNamesShort = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    /* event sources array*/
    $scope.eventSources = [$scope.events];
  });
