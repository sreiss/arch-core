'use strict';

angular.module('archCore', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngMaterial','ui.router', 'pascalprecht.translate']).config(function ($mdThemingProvider, $stateProvider, $urlRouterProvider, $translateProvider, i18nfrFRConstant, i18nenUSConstant)
{
  $mdThemingProvider
    .theme('default')
    .primaryPalette('deep-orange')
    .accentPalette('teal', {
      'default': '500'
    });

  $stateProvider
    .state('archCore',
    {
      url: '',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('archCore.home',
    {
      url: "/",
      templateUrl: "app/main/main.html",
      controller: 'archHomeController'
    })
    .state('archCore.users',
    {
      url: '/users',
      templateUrl: 'components/user/arch-user.html',
      controller: 'archUserController'
    });

  $urlRouterProvider
    .otherwise("/");

  $translateProvider
    .translations('fr', i18nfrFRConstant)
    .translations('en', i18nenUSConstant)
    .preferredLanguage('fr');
});
