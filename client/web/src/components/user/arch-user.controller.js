'use strict';

angular.module('archCore')
.controller('archUserController', function($scope, $stateParams, $location, $mdToast, $state, httpConstant, archUserService, archAccountService,DTOptionsBuilder, DTColumnDefBuilder)
  {
    $scope.users = new Array();
    $scope.currentUser = {};

    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user;
    })
    .catch(function()
    {
      $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
    });

    archUserService.getUsers().then(function(users)
    {
      $scope.users = users;
    })
    .catch(function()
    {
      $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération des membres.").position('top right').hideDelay(3000));
    });

    $scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage(
    {
      "sProcessing":     "Traitement en cours...",
      "sSearch":         "Rechercher&nbsp;:",
      "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
      "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      "sInfoPostFix":    "",
      "sLoadingRecords": "Chargement en cours...",
      "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
      "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
      "oPaginate": {
        "sFirst":      "Premier",
        "sPrevious":   "Pr&eacute;c&eacute;dent",
        "sNext":       "Suivant",
        "sLast":       "Dernier"
      },
      "oAria": {
        "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
        "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
      }
    });

    $scope.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(3).notSortable()];

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

          archUserService.getUsers().then(function(users)
          {
            $scope.users = users;
          })
          .catch(function()
          {
            $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération des membres.").position('top right').hideDelay(3000));
          });
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

    archUserService.getRoles()
      .then(function(roles) {
        $scope.roles = roles;
      });


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

    $scope.currentUser = {};
    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user._id;
    })
    .catch(function()
    {
      $mdToast.show($mdToast.simple().content("Une erreur est survenue lors de la récupération de l'utilisateur courant.").position('top right').hideDelay(3000));
    });

    OAuthUser.query({id:id}, function(oauthUser)
    {
      $scope.oauthUser = new OAuthUsers();
      $scope.oauthUser.id = oauthUser.data._id;
      $scope.oauthUser.fname = oauthUser.data.fname || '';
      $scope.oauthUser.lname = oauthUser.data.lname  || '';
      $scope.oauthUser.email = oauthUser.data.email  || '';
      $scope.oauthUser.password = oauthUser.data.password  || '';

      CoreUser.query({id:id}, function(coreUser)
      {
        $scope.coreUser = new CoreUsers();
        $scope.coreUser.role = coreUser.data.role  || '';
        $scope.coreUser.birthdate = new Date(coreUser.data.birthdate)  || '';
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
      if($scope.oauthUser.newPassword && $scope.oauthUser.confirmPassword && ($scope.oauthUser.newPassword != $scope.oauthUser.confirmPassword))
      {
        $mdToast.show($mdToast.simple()
            .content("Les deux mots de passes ne sont pas identiques.")
            .position('top right')
            .hideDelay(3000)
        );
      }
      else
      {
        if($scope.oauthUser.newPassword)
        {
          $scope.oauthUser.password = md5.createHash($scope.oauthUser.newPassword);
        }
        console.log($scope.coreUser.birthdate );
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
