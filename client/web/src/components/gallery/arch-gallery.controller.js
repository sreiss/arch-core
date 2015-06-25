'use strict';

angular.module('archCore')
  .controller('archGalleryAddController', function($scope, $stateParams, $mdToast, $state, httpConstant, Upload,archToastService)
  {
    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });
    $scope.log = '';
    var metas = {};
    metas.nameG = $scope.nameG;
      $scope.upload = function (files) {
        if($scope.nameG) {
          metas.nameG = $scope.nameG;
          if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              Upload.upload({
                url: httpConstant.coreServerUrl + '/galleries/media',
                file: file,
                fields: metas
              }).success(function (data, status, headers, config) {
                $scope.log = $scope.log + ' ' + data.value.name  ;
              });
            }
          }
        }
      }
  })
  //.controller('archGalleriesController', function($scope, $stateParams, $mdToast, $state, httpConstant,archToastService, Media,$window){
  //  $scope.images = [];
  //    Media.get({}, function(result) {
  //      if(result.count > 0)
  //      {
  //        var data = result.data;
  //        var screenSize = function (width, height) {
  //          var x = width ? width : $window.innerWidth;
  //          var y = height ? height : $window.innerHeight;
  //
  //          return x + 'x' + y;
  //        };
  //        for (var i =0; i < data.length; i++){
  //          //$scope.images[i].thumb = httpConstant.coreServerUrl + $scope.images[i].url +'?dim=150x150';
  //          //$scope.images[i].url = httpConstant.coreServerUrl + $scope.images[i].url;
  //          $scope.images.push({
  //            src: httpConstant.coreServerUrl + '/' + data[i].url,
  //            safeSrc: httpConstant.coreServerUrl + '/' +data[i].url,
  //            thumb: httpConstant.coreServerUrl + '/' +data[i].url,
  //            caption: data[i].gallery.name,
  //            size: screenSize(),
  //            type: 'image'
  //          });
  //        }
  //      } else {
  //        archToastService.showToast('LOADING_ERROR', 'error');
  //      }
  //    },
  //    function(responseError)
  //    {
  //      archToastService.showToast('LOADING_ERROR', 'error');
  //    });
  //
  //})
  .controller('archGalleriesController', function($scope, $stateParams, $mdToast, $state, httpConstant,archToastService, Media, Gallery,$window) {
      Gallery.get({}, function(result) {
              if(result.count > 0) {
                $scope.galleries = result.data;
                for (var i =0; i < result.data.length; i++){
                    Media.getByGallery({id:result.data[i]._id},function(result){
                      console.log(result.data);
                    })
                }
              }
      })
  })
  .controller('archGalleryViewController', function($scope, $stateParams, $mdToast, $state, httpConstant,archToastService, Media, Gallery,$window) {
      var idGallery = '';
      $scope.images = [];
      $scope.galleryName = '';
    if($stateParams.id){
        idGallery = $stateParams.id;
        Gallery.get({id : idGallery}, function(result){
          $scope.galleryName = result.data.name;
        });
        Media.getByGallery({id:idGallery},function(result){
                if(result.count > 0)
                {
                  var data = result.data;
                  var screenSize = function (width, height) {
                    var x = width ? width : $window.innerWidth;
                    var y = height ? height : $window.innerHeight;

                    return x + 'x' + y;
                  };
                  for (var i =0; i < data.length; i++){
                    //$scope.images[i].thumb = httpConstant.coreServerUrl + $scope.images[i].url +'?dim=150x150';
                    //$scope.images[i].url = httpConstant.coreServerUrl + $scope.images[i].url;
                    $scope.images.push({
                      src: httpConstant.coreServerUrl + '/' + data[i].url,
                      safeSrc: httpConstant.coreServerUrl + '/' +data[i].url,
                      thumb: httpConstant.coreServerUrl + '/' +data[i].url,
                      caption: '',
                      size: screenSize(),
                      type: 'image'
                    });
                  }
                } else {
                  archToastService.showToast('LOADING_ERROR', 'error');
                }
              },
              function(responseError)
              {
                archToastService.showToast('LOADING_ERROR', 'error');
              });
      }

  });
