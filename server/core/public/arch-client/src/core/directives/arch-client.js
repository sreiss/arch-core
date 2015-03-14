angular.module('archClient')
    .directive('archClient', [
        function() {
            return {
                restrict: 'A',
                templateUrl: 'arch-client/core/templates/arch-client.html',
                link: function (scope, element, attributes) {

                }
            };
        }
    ]);