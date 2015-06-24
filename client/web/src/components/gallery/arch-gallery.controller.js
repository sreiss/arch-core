'use strict';

angular.module('archCore')
  .controller('archGalleryAddController', function($scope, $stateParams, $mdToast, $state, httpConstant, Upload)
  {
    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });
    $scope.log = '';
    var metas = {};
    metas.nameG = $scope.nameG;
      $scope.upload = function (files) {
        metas.nameG = $scope.nameG;
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            Upload.upload({
              url: httpConstant.coreServerUrl + '/galleries/media',
              file: file,
              fields: metas
            }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              $scope.log = 'progress: ' + progressPercentage + '% ' +
              evt.config.file.name + '\n' + $scope.log;
            }).success(function (data, status, headers, config) {
              $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
            });
          }
        }
      }
  })
  .controller('archGalleriesController', function($scope, $stateParams, $mdToast, $state, httpConstant,archToastService, Media,$window){
    $scope.images = [];
      Media.get({}, function(result) {
        if(result.count > 0)
        {
          var data = result.data;
          var screenSize = function (width, height) {
            var x = width ? width : $window.innerWidth;
            var y = height ? height : $window.innerHeight;

            return x + 'x' + y;
          };
          console.log(result.data);
          for (var i =0; i < data.length; i++){
            //$scope.images[i].thumb = httpConstant.coreServerUrl + $scope.images[i].url +'?dim=150x150';
            //$scope.images[i].url = httpConstant.coreServerUrl + $scope.images[i].url;
            $scope.images.push({
              src: httpConstant.coreServerUrl + '/' + data[i].url,
              safeSrc: httpConstant.coreServerUrl + '/' +data[i].url,
              thumb: httpConstant.coreServerUrl + '/' +data[i].url + '?dim=150x150',
              caption: data[i].gallery.name,
              size: screenSize(),
              type: 'image'
            });
          }
        } else {
          archToastService.showToast('GET_KID_EROOR', 'error');
        }
      },
      function(responseError)
      {
        archToastService.showToast('GET_KID_EROOR', 'error');
      });

  });
