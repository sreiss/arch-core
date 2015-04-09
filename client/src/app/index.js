'use strict';

angular.module('archCore', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngMaterial','ui.router', 'pascalprecht.translate','ui.bootstrap','ui.calendar','angular-md5'])
  .config(function ($mdThemingProvider, $stateProvider, $urlRouterProvider, $translateProvider, i18nfrFRConstant, i18nenUSConstant)
{
  $mdThemingProvider
    .theme('default')
    .primaryPalette('deep-orange')
    .accentPalette('teal', {
      'default': '500'
    });

  $stateProvider
    .state('home',
    {
      url: "/",
      templateUrl: "app/main/main.html",
      controller: 'archHomeController'
    })
    .state('users',
    {
      url: '/users',
      templateUrl: 'components/user/arch-user.html',
      controller: 'archUserController'
    })
    .state('calendar',
    {
      url: "/calendar",
      templateUrl: "components/calendar/calendar.html",
      controller: 'CalendarCtrl'
    })
    .state('userAdd',
    {
      url: "/users/add",
      templateUrl: "components/user/arch-user-add.html",
      controller: "archUserAddController"
    })
    .state('userEdit',
    {
      url: "/users/edit/:id",
      templateUrl: "components/user/arch-user-edit.html",
      controller: "archUserEditController"
    });

  $urlRouterProvider
    .otherwise("/");

  $translateProvider
    .translations('fr', i18nfrFRConstant)
    .translations('en', i18nenUSConstant)
    .preferredLanguage('fr');
});
