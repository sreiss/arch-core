angular.module('archCore')
  .controller('archUserController', function($scope, $stateParams, $location, $mdToast, $state, httpConstant, SignupTypeUsers, OAuthUser, CoreUser)
  {
    $scope.users = SignupTypeUsers.query({signupType : httpConstant.signupType.name});

    $scope.deleteUser = function(id)
    {
      if(confirm('Souhaitez-vous réellement supprimer ce membre ?'))
      {
        OAuthUser.delete({id:id}, function(result)
        {
         /* CoreUser.delete({id:id}, function(result)
          {
            $mdToast.show($mdToast.simple()
                .content("Membre supprimé avec succés.")
                .position('top right')
                .hideDelay(3000)
            );

            $scope.users = SignupTypeUsers.query();
          },
          function(err)
          {
            throw err;
          });*/
        },
        function(err)
        {
          throw err;
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
          console.log(result);
          $scope.coreUser.oauth = result.data._id;
          $scope.coreUser.$save(function(result)
          {
            if(result.count > 0)
            {
              console.log(result);
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
  .controller('archUserEditController', function($scope, $filter, $stateParams, $location, $mdToast, httpConstant, $state, archUserService, CoreUser, OauthUser)
  {
    var id = $stateParams.id;

    CoreUser.query({id:id}, function(result)
    {
      $scope.user = new User();
      $scope.user.id = result.data.oauth._id;
      $scope.user.fname = result.data.oauth.fname || '';
      $scope.user.lname = result.data.oauth.lname  || '';
      $scope.user.email = result.data.oauth.email  || '';
      $scope.user.password = result.data.oauth.password  || '';
      $scope.user.newPassword = '';
      $scope.user.confirmPassword = '';
      $scope.user.role = result.data.role  || '';
      $scope.user.birthdate = result.data.birthdate  || '';
      $scope.user.phone = result.data.phone  || '';
      $scope.user.licenceffa = result.data.licenceffa  || '';
      $scope.user.avatar = result.data.avatar  || '';

      if($scope.user.avatar.length > 0)
      {
        previewAvatar($scope.user.avatar);
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
          $scope.user.avatar = e.target.result;
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
