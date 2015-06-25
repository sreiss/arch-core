'use strict';

angular.module('archCore')
.controller('archUserController', function($scope, $stateParams, $location, $state, httpConstant, archUserService, archAccountService, archToastService, DTOptionsBuilder, DTColumnDefBuilder)
  {
    $scope.users = new Array();
    $scope.currentUser = {};
    $scope.mailAll = '';

    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user;
    })
    .catch(function()
    {
      archToastService.showToast('LOADING_ERROR', 'error');
    });

    archUserService.getUsers().then(function(users)
    {
      $scope.users = users;
      mailToAll(users);
    })
    .catch(function()
    {
      archToastService.showToast("LOADING_ERROR", 'error');
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
            archToastService.showToast("LOADING_ERROR", 'error');
          });
        })
        .catch(function(err)
        {
          archToastService.showToast("SENDING_ERROR", 'error');
        });
      }
    };

    function mailToAll(users){
      users.forEach(function (user) {
        $scope.mailAll += user.email + ";";
    })
    }
  })
  .controller('archUserAddController', function($scope, $stateParams, $location, httpConstant, $state, OAuthUsers, CoreUsers, archUserService, archToastService)
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
        archToastService.showToast("USER_ADD_SUCCESS", 'success');
        $state.go('users');
      })
      .catch(function(err)
      {
        if(err.message = 'EMAIL_ALREADY_EXISTS')
        {
          archToastService.showToast("EMAIL_ERROR", 'error');
        }
        else
        {
          archToastService.showToast("SENDING_ERROR", 'error');
        }
      });
    }
  })
  .controller('archUserEditController', function($scope, $filter, $stateParams, $location, httpConstant, $state, archUserService, archAccountService, OAuthUser, OAuthUsers, CoreUser, CoreUsers, md5, archToastService)
  {
    var id = $stateParams.id;

    $scope.currentUser = {};
    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user;
      archAccountService.getProfile(user._id).then(function(profile) {
        if(profile.role.name == 'ADMIN'){
          archUserService.getRoles()
            .then(function(roles) {
              $scope.roles = roles;
            });
        }
      });
    })
    .catch(function()
    {
      archToastService.showToast("LOADING_ERROR", 'error');
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
        $scope.coreUser.adress = coreUser.data.adress  || '';
        $scope.coreUser.licenceffa = coreUser.data.licenceffa  || '';
        $scope.coreUser.avatar = coreUser.data.avatar  || '';

        if($scope.coreUser.avatar.length > 0)
        {
          previewAvatar($scope.coreUser.avatar);
        }
      },
      function(err)
      {
        archToastService.showToast("SENDING_ERROR", 'error');
        $state.go('users');
      });
    },
    function(err)
    {
      archToastService.showToast("LOADING_ERROR", 'error');
      $state.go('users');
    });

    $scope.file_changed = function(element)
    {
      var avatar = element.files[0];
      var reader = new FileReader();

      if(!avatar.type.match('image.*'))
      {
        archToastService.showToast("IMAGE_AVATAR", 'error');
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
          archToastService.showToast("EDIT_SUCCESS", 'success');
          $state.go('users');
        })
        .catch(function(err)
        {
          archToastService.showToast("SENDING_ERROR", 'success');
        });
      }
    };
  })
  .controller('archUserViewController', function($scope,archAccountService,OAuthUser,CoreUser,CoreUsers,$state,$stateParams,OAuthUsers, archToastService){
    var id = $stateParams.id;

    $scope.currentUser = {};
    archAccountService.getCurrentUser().then(function(user)
    {
      $scope.currentUser = user._id;
    })
    .catch(function()
    {
      archToastService.showToast("LOADING_ERROR", 'error');
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
            if(coreUser.data.birthdate){
              $scope.coreUser.birthdate = new Date(coreUser.data.birthdate);
            }else{
              $scope.coreUser.birthdate = "";
            }
            $scope.coreUser.phone = coreUser.data.phone  || '';
            $scope.coreUser.adress = coreUser.data.adress  || '';
            $scope.coreUser.licenceffa = coreUser.data.licenceffa  || '';
            $scope.coreUser.avatar = coreUser.data.avatar  || '';

            if($scope.coreUser.avatar.length > 0)
            {
              previewAvatar($scope.coreUser.avatar);
            }
          },
          function(err)
          {
            archToastService.showToast("LOADING_ERROR", 'error');
            $state.go('users');
          });
      },
      function(err)
      {
        archToastService.showToast("LOADING_ERROR", 'error');
        $state.go('users');
      });

    function previewAvatar(base64)
    {
      var html = '<img class="thumb" src="' + base64 + '"/>';
      document.getElementById('avatar_preview').innerHTML = html;
    }
  });
