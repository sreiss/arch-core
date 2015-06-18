'use strict';

angular.module('archCore')
.controller('archUserController', function($scope, $stateParams, $location, $mdToast, $state, httpConstant, archUserService, archAccountService, archToastService, DTOptionsBuilder, DTColumnDefBuilder)
  {
    $scope.users = new Array();
    $scope.currentUser = {};

    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user;
    })
    .catch(function()
    {
      archToastService.showToast("Une erreur est survenue lors de la récupération de l'utilisateur courant.", 'error');
    });

    archUserService.getUsers().then(function(users)
    {
      $scope.users = users;
    })
    .catch(function()
    {
      archToastService.showToast("Une erreur est survenue lors de la récupération des membres.", 'error');
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
          archToastService.showToast("Membre supprimé avec succès.", 'success');

          archUserService.getUsers().then(function(users)
          {
            $scope.users = users;
          })
          .catch(function()
          {
            archToastService.showToast("Une erreur est survenue lors de la récupération des membres.", 'error');
          });
        })
        .catch(function(err)
        {
          archToastService.showToast("Une erreur est survenue lors de la suppression du membre.", 'error');
        });
      }
    };

    $scope.editUser = function(id)
    {
      $state.go('userEdit', {'id' : id});
    };
  })
  .controller('archUserAddController', function($scope, $stateParams, $location, $mdToast, httpConstant, $state, OAuthUsers, CoreUsers, archUserService, archToastService)
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
        archToastService.showToast("Membre ajouté avec succès.", 'success');
        $state.go('users');
      })
      .catch(function(err)
      {
        if(err.message = 'EMAIL_ALREADY_EXISTS')
        {
          archToastService.showToast("L'adresse e-mail renseignée est déjà associée à un autre compte.", 'error');
        }
        else
        {
          archToastService.showToast("Une erreur est survenue lors de l'ajout du membre.", 'error');
        }
      });
    }
  })
  .controller('archUserEditController', function($scope, $filter, $stateParams, $location, $mdToast, httpConstant, $state, archUserService, archAccountService, OAuthUser, OAuthUsers, CoreUser, CoreUsers, md5, archToastService)
  {
    var id = $stateParams.id;

    $scope.currentUser = {};
    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user._id;
    })
    .catch(function()
    {
      archToastService.showToast("Une erreur est survenue lors de la récupération de l'utilisateur courant.", 'error');
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
        archToastService.showToast("Une erreur est survenue lors de la récupération du membre.", 'error');
        $state.go('users');
      });
    },
    function(err)
    {
      archToastService.showToast("Une erreur est survenue lors de la récupération du membre.", 'error');
      $state.go('users');
    });

    $scope.file_changed = function(element)
    {
      var avatar = element.files[0];
      var reader = new FileReader();

      if(!avatar.type.match('image.*'))
      {
        archToastService.showToast("L'avatar du membre doit être une image.", 'error');
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
        archToastService.showToast("Les deux mots de passes ne sont pas identiques.", 'error');
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
          archToastService.showToast("Membre modifié avec succès.", 'success');
          $state.go('users');
        })
        .catch(function(err)
        {
          archToastService.showToast("Une erreur est survenue lors de la modification du membre.", 'success');
        });
      }
    };
  });
