angular.module('archCore')
  .controller('archUserController', function($scope, $stateParams, Users)
  {
    $scope.users = Users.findAll();
    console.log($scope.users);
  });

  /*
.controller('archParticipantEditController', function($scope, Participant){
  $scope.participants = Participant
    .get({ sheetReference: 'prout' });
})
.controller('archParticipantNewController', function($scope, Participant,$location,$mdToast, Sheet,$stateParams, $state,$animate){
    $scope.toastPosition = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    $scope.participant = new Participant();
    Sheet.get({she_id:$stateParams.idSheet},function(sheet) {
      $scope.participant.prt_sheet = sheet.data._id;
      console.log(sheet.data._id);
    });
    $scope.newParticipant = function() {
      $scope.participant.$save(
        function (value) {
            $mdToast.show(
              $mdToast.simple()
                .content('Participant créé avec succés.')
                .position($scope.getToastPosition())
                .hideDelay(3000)
          );
          $state.go('sheet.categories');
        }
        ,
        function (responseError) {
          if (responseError.status === 400) {
            console.log(responseError);
          }

        }
      );
      $state.go('sheet.participants');
    }*/
