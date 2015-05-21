'use strict';

angular.module('archCore')
  .controller('archUserController', function($scope, $stateParams, $location, $mdToast, $state, httpConstant, archUserService, archAccountService)
  {
    $scope.users = archUserService.getUsers();
    $scope.currentUser = archAccountService.getCurrentUser();

    $scope.deleteUser = function(id)
    {
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
  .controller('archUserAddController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, OAuthUsers, CoreUsers, archUserService)
  {
    $scope.oauthUser = new OAuthUsers();
    $scope.coreUser = new CoreUsers();

    $scope.addUser = function()
    {
      archUserService.addUser($scope.oauthUser, $scope.coreUser).then(function(result)
      {
        $mdToast.show($mdToast.simple()
          .content("Membre ajouté avec succés.")
          .position('top right')
          .hideDelay(3000)
        );

        $state.go('users');
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
  .controller('archUserEditController', function($scope, $filter, $stateParams, $location, $mdToast, httpConstant, $state, archUserService, archAccountService, OAuthUser, OAuthUsers, CoreUser, CoreUsers, md5)
  {
    var id = $stateParams.id;
    $scope.currentUser = archAccountService.getCurrentUser();

    OAuthUser.query({id:id}, function(oauthUser)
    {
      $scope.oauthUser = new OAuthUsers();
      $scope.oauthUser.id = oauthUser.data._id;
      $scope.oauthUser.fname = oauthUser.data.fname || '';
      $scope.oauthUser.lname = oauthUser.data.lname  || '';
      $scope.oauthUser.email = oauthUser.data.email  || '';
      $scope.oauthUser.password = oauthUser.data.password  || '';
      $scope.oauthUser.newPassword = '';
      $scope.oauthUser.confirmPassword = '';

      CoreUser.query({id:id}, function(coreUser)
      {
        $scope.coreUser = new CoreUsers();
        $scope.coreUser.role = coreUser.data.role  || '';
        $scope.coreUser.birthdate = coreUser.data.birthdate  || '';
        $scope.coreUser.phone = coreUser.data.phone  || '';
        $scope.coreUser.licenceffa = coreUser.data.licenceffa  || '';
        $scope.coreUser.avatar = coreUser.data.avatar  || '';

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
      if(($scope.oauthUser.newPassword.length > 0 || $scope.oauthUser.confirmPassword.length > 0) && $scope.oauthUser.newPassword != $scope.oauthUser.confirmPassword)
      {
        $mdToast.show($mdToast.simple()
            .content("Les deux mots de passes ne sont pas identiques.")
            .position('top right')
            .hideDelay(3000)
        );
      }
      else
      {
        if($scope.oauthUser.newPassword.length > 0)
        {
          $scope.oauthUser.password = md5.createHash($scope.oauthUser.newPassword);
        }

        archUserService.editUser($scope.oauthUser, $scope.coreUser).then(function(result)
        {
          $mdToast.show($mdToast.simple()
              .content("Membre modifié avec succés.")
              .position('top right')
              .hideDelay(3000)
          );

          $state.go('users');
        })
        .catch(function(err)
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
