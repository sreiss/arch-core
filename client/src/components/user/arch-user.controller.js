angular.module('archCore')
  .controller('archUserController', function($scope, $stateParams, $location, $mdToast, $state, Users, OauthUser)
  {
    $scope.users = Users.query();

    $scope.deleteUser = function(id)
    {
      if(confirm('Souhaitez-vous réellement supprimer ce membre ?'))
      {
        OauthUser.delete({id:id}, function(result)
        {
          $mdToast.show($mdToast.simple()
              .content("Membre supprimé avec succés.")
              .position('top right')
              .hideDelay(3000)
          );

          $scope.users = Users.query();
        },
        function(err)
        {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de la suppression du membre.")
              .position('top right')
              .hideDelay(3000)
          );
        });
      }
    };

    $scope.editUser = function(id)
    {
      $state.go('userEdit', {'id' : id});
    };
  })
  .controller('archUserAddController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, User, archUserService, md5)
  {
    $scope.user = new User();

    $scope.addUser = function()
    {
      var fname = $scope.user.fname;
      var lname = $scope.user.lname;
      var email = $scope.user.email;
      var password = archUserService.generateRandomPassword();

      $scope.user.password = md5.createHash(password);
      $scope.user.signuptype = httpConstant.signupType;

      $scope.user.$save(function(result)
      {
        if(result.count > 0)
        {
          $mdToast.show($mdToast.simple()
              .content("Membre ajouté avec succés.")
              .position('top right')
              .hideDelay(3000)
          );

          archUserService.sendUserMail(lname, fname, email, password);

          $state.go('users');
        }
        else
        {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de l'ajout du membre.")
              .position('top right')
              .hideDelay(3000)
          );
        }
      },
      function(responseError)
      {
        $mdToast.show($mdToast.simple()
            .content("Une erreur est survenue lors de l'ajout du membre.")
            .position('top right')
            .hideDelay(3000)
        );
      });
   }
  })
  .controller('archUserEditController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, User, archUserService, md5, OauthUser)
  {
    var id = $stateParams.id;

    OauthUser.query({id:id}, function(result)
    {
      $scope.user = new User();
      $scope.user.id = result.data.oauth._id;
      $scope.user.fname = result.data.oauth.fname;
      $scope.user.lname = result.data.oauth.lname;
      $scope.user.email = result.data.oauth.email;
      $scope.user.password = result.data.oauth.password;
      $scope.user.newPassword = '';
      $scope.user.confirmPassword = '';
      $scope.user.level = result.data.level;
      $scope.user.role = result.data.role;
    },
    function(err)
    {
      $mdToast.show($mdToast.simple()
          .content("Une erreur est survenue lors de la récupération du membre.")
          .position('top right')
          .hideDelay(3000)
      );

      $state.go('users');
    });

    $scope.editUser = function()
    {
      if(($scope.user.newPassword.length > 0 || $scope.user.confirmPassword.length > 0) && $scope.user.newPassword != $scope.user.confirmPassword)
      {
        $mdToast.show($mdToast.simple()
            .content("Les deux mots de passes ne sont pas identiques.")
            .position('top right')
            .hideDelay(3000)
        );
      }
      else
      {
        if($scope.user.newPassword.length > 0)
        {
          $scope.user.password = md5.createHash($scope.user.newPassword);
        }

        User.update({user:$scope.user}, function(result)
        {
          if(result.count > 0)
          {
            $mdToast.show($mdToast.simple()
                .content("Membre modifié avec succés.")
                .position('top right')
                .hideDelay(3000)
            );

            $state.go('users');
          }
          else
          {
            $mdToast.show($mdToast.simple()
                .content("Une erreur est survenue lors de la modification du membre.")
                .position('top right')
                .hideDelay(3000)
            );
          }
        },
        function(responseError)
        {
          $mdToast.show($mdToast.simple()
              .content("Une erreur est survenue lors de la modification du membre.")
              .position('top right')
              .hideDelay(3000)
          );
        });
      }
    };
  });
