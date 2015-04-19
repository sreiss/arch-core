angular.module('archCore')
  .controller('archUserController', function($scope, $stateParams, $location, $mdToast, $state, httpConstant, archUserService)
  {
    $scope.users = archUserService.getUsers();

    $scope.deleteUser = function(id)
    {
      console.log(id);
      if(confirm('Souhaitez-vous réellement supprimer ce membre ?'))
      {
        archUserService.deleteUser(id).then(function(result)
        {
          $mdToast.show($mdToast.simple()
            .content("Membre supprimé avec succés.")
            .position('top right')
            .hideDelay(3000)
          );

          $scope.users = archUserService.getUsers();
        })
        .catch(function(err)
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
  .controller('archUserAddController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, OAuthUsers, CoreUsers)
  {
    $scope.oauthUser = new OAuthUsers();
    $scope.coreUser = new CoreUsers();

    $scope.addUser = function()
    {
      $scope.oauthUser.signuptype = httpConstant.signupType;
      $scope.oauthUser.$save(function(result)
      {
        if(result.count > 0)
        {
          $scope.coreUser.oauth = result.data._id;
          $scope.coreUser.$save(function(result)
          {
            if(result.count > 0)
            {
              $mdToast.show($mdToast.simple()
                .content("Membre ajouté avec succés.")
                .position('top right')
                .hideDelay(3000)
              );
              $state.go('users');
            }
            else
            {
              throw new Error();
            }
          },
          function(responseError)
          {
            throw responseError;
          });
        }
        else
        {
          throw new Error();
        }
      },
      function(responseError)
      {
        throw responseError;
      })
      .catch(function(err)
      {
        $mdToast.show($mdToast.simple()
            .content("Une erreur est survenue lors de l'ajout du membre.")
            .position('top right')
            .hideDelay(3000)
        );
      });
   }
  })
  .controller('archUserEditController', function($scope, $filter, $stateParams, $location, $mdToast, httpConstant, $state, archUserService, OAuthUser, CoreUser)
  {
    var id = $stateParams.id;

    OAuthUser.query({id:id}, function(result)
    {
      $scope.oauthUser = new OAuthUsers();
      $scope.oauthUser.id = result.data._id;
      $scope.oauthUser.fname = result.data.fname || '';
      $scope.oauthUser.lname = result.data.lname  || '';
      $scope.oauthUser.email = result.data.email  || '';
      $scope.oauthUser.password = result.data.password  || '';
      $scope.oauthUser.newPassword = '';
      $scope.oauthUser.confirmPassword = '';

      CoreUser.query({id:id}, function(result)
      {
        $scope.coreUser = new CoreUsers();
        $scope.coreUser.role = result.data.role  || '';
        $scope.coreUser.birthdate = result.data.birthdate  || '';
        $scope.coreUser.phone = result.data.phone  || '';
        $scope.coreUser.licenceffa = result.data.licenceffa  || '';
        $scope.coreUser.avatar = result.data.avatar  || '';

        if($scope.coreUser.avatar.length > 0)
        {
          previewAvatar($scope.coreUser.avatar);
        }
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

    $scope.file_changed = function(element)
    {
      var avatar = element.files[0];
      var reader = new FileReader();

      if(!avatar.type.match('image.*'))
      {
        $mdToast.show($mdToast.simple()
            .content("L'avatar du membre doit être une image.")
            .position('top right')
            .hideDelay(3000)
        );
        return false;
      }

      reader.onload = (function(file)
      {
        return function(e)
        {
          previewAvatar(e.target.result);
          $scope.coreUser.avatar = e.target.result;
        };
      })(avatar);

      reader.readAsDataURL(avatar);
    };

    function previewAvatar(base64)
    {
      var html = '<img class="thumb" src="' + base64 + '"/>';
      document.getElementById('avatar_preview').innerHTML = html;
    }

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
          $scope.user.password = $scope.user.newPassword;
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
