/**
 * Created by Brian on 07/04/2015.
 */
angular.module('archCore')
  .controller('archCalendarController', function($scope,$mdDialog, Event) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var selectedDate = null;
    $scope.events = [];


    var dataEvents = Event.query(function() {
      dataEvents.data.forEach(function(item){
        var event = {};
        event.title = item.summary;
        event.start = item.dtstart;
        event.end = item.dtend;
        event.editable = false;
        $scope.events.push(event);
      });

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

    $scope.showAlert = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('This is an alert title')
          .content('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };

    $scope.typeEvent = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/events/arch-type-event.html',
        targetEvent: ev
      })
      .then(function(answer) {
        //apres traitement du dialog
      }, function() {
          //cancel
      });
    };
    $scope.alertOnEventClick = function(){
      $scope.showAlert();
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
