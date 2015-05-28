'use strict';
angular.module('archCore')
  .directive('archRoleSelector', function() {
    return {
      restrict: 'E',
      templateUrl: 'components/user/arch-role-selector.html',
      link: function(scope, element, attributes) {
        if (!scope.roles) {
          attributes.$observe('roles', function(roles) {
            scope.roles = roles;
          });
        }
      }
    }
  });
