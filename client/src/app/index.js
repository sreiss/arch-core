'use strict';

angular.module('client', [ 'ui.bootstrap','ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial','ui.calendar'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'test'
      });

    $urlRouterProvider.otherwise('/');
  })
;
