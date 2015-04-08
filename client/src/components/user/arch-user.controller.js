angular.module('archCore')
  .controller('archUserController', function($scope, $stateParams, Users, OauthUser)
  {
    $scope.users = Users.findAll();

    $scope.deleteUser = function(id)
    {
      if(confirm('Souhaitez-vous réellement supprimer ce membre ?'))
      {
        OauthUser.delete({id:id}, function(result)
        {
          console.log(result);
        },
        function(err)
        {
          console.log(err);
        });
      }
    };
  })
  .controller('archUserAddController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, User)
  {
    $scope.toastPosition =
    {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

    $scope.getToastPosition = function()
    {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    $scope.user = new User();

    $scope.addUser = function()
    {
      $scope.user.password = "randompasswordmd5";
      $scope.user.signuptype = httpConstant.signupType;

      $scope.user.$save(function (result)
      {
        if(result.count > 0)
        {
          $mdToast.show($mdToast.simple()
              .content("Membre ajouté avec succés.")
              .position($scope.getToastPosition())
              .hideDelay(3000)
          );

          $state.go('users');
        }
        else
        {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de l'ajout du membre.")
              .position($scope.getToastPosition())
              .hideDelay(3000)
          );
        }
      },
      function(responseError)
      {
        $mdToast.show($mdToast.simple()
            .content("Une erreur est survenue lors de l'ajout du membre.")
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
      });
   }
  });
