'use strict';

angular.module('archCore')
  .controller('archGalleryAddController', function($scope, $stateParams, $mdToast, $state, httpConstant, Upload)
  {
    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });
    $scope.log = '';
var metas = {};
  metas.nameG = "test";

    $scope.upload = function (files) {
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
            $scope.$apply();
          });
        }
      }
    }
  })
  .controller('archGalleriesController', function($scope, $stateParams, $mdToast, $state, httpConstant, Upload){

  });
