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
    })
    .state('events',
    {
      url: "/events",
      templateUrl: "components/event/arch-event.html",
      controller : "archEventController"
    })
    .state('eventAdd',
    {
      url: "/event/add",
      templateUrl: "components/event/arch-event-add.html",
      controller : "archEventAddController"
    })
    .state('calendar',
    {
      url: "/calendar",
      templateUrl: "components/calendar/calendar.html",
      controller: 'CalendarCtrl'
    });

  $urlRouterProvider
    .otherwise("/");

  $translateProvider
    .translations('fr', i18nfrFRConstant)
    .translations('en', i18nenUSConstant)
    .preferredLanguage('fr');
});
