angular.module('archCore')
  .controller('archUserController', function($scope, $stateParams, $location, $mdToast, $state, Users, OauthUser)
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

    $scope.users = Users.findAll();

    $scope.deleteUser = function(id)
    {
      if(confirm('Souhaitez-vous réellement supprimer ce membre ?'))
      {
        OauthUser.delete({id:id}, function(result)
        {
          $mdToast.show($mdToast.simple()
              .content("Membre supprimé avec succés.")
              .position($scope.getToastPosition())
              .hideDelay(3000)
          );

          $scope.users = Users.findAll();
        },
        function(err)
        {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de la suppression du membre.")
              .position($scope.getToastPosition())
              .hideDelay(3000)
          );
        });
      }
    };

    $scope.editUser = function(id)
    {
      alert(id);
      $state.go('userEdit', {'id' : id});
    };
  })
  .controller('archUserAddController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, User, archUserService, md5)
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
      var password = archUserService.generateRandomPassword();

      $scope.user.password = md5.createHash(password);
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

          archUserService.sendUserMail($scope.user.fname, $scope.user.lname, $scope.user.email, password);

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
  })
  .controller('archUserEditController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, User, archUserService, md5)
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

    console.log($stateParams);
  });
