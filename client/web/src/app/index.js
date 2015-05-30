'use strict';

angular.module('archCore', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngMaterial', 'ui.router', 'pascalprecht.translate', 'ui.bootstrap', 'ui.calendar', 'angular-md5', 'base64', 'datatables'])
  .config(function ($mdThemingProvider, $stateProvider, $urlRouterProvider, $translateProvider, i18nfrFRConstant, i18nenUSConstant) {
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
      .state('calendar',
      {
        url: "/calendar",
        templateUrl: "components/calendar/arch-calendar.html",
        controller: 'archCalendarController'
      })
      .state('tracks',
      {
        url: '/tracks',
        templateUrl: 'components/track/arch-track.html',
        controller: 'archTrackController'
      })
      .state('trackAdd',
      {
        url: "/tracks/add",
        templateUrl: "components/track/arch-track-add.html",
        controller: "archTrackAddController"
      })
      .state('trackEdit',
      {
        url: "/tracks/edit/:id",
        templateUrl: "components/track/arch-track-edit.html",
        controller: "archTrackEditController"
      })
      .state('events',
      {
        url: "/events",
        templateUrl: "components/events/arch-type-event.html",
        controller: "archEventController"
      })
      .state('eventAdd',
      {
        url: "/event/add/:category",
        templateUrl: "components/events/event/arch-event-add.html",
        controller: "archEventAddController",
        params: {"date": null}
      })
      .state('eventEdit',
      {
        url: "/event/edit/:id",
        templateUrl: "components/events/event/arch-event-edit.html",
        controller: "archEventEditController"
      })
      .state('eventView',
      {
        url: "/event/event/:id",
        templateUrl: "components/events/event/arch-event-view.html",
        controller: "archEventViewController"

      });

    $urlRouterProvider
      .otherwise("/");

    $translateProvider
      .translations('fr', i18nfrFRConstant)
      .translations('en', i18nenUSConstant)
      .preferredLanguage('fr');
  });
