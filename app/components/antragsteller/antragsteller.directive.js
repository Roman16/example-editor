;(function () {

    'use strict';

    angular.module('directive.antragsteller', [])
        .directive('antragsteller', antragsteller);


    function antragsteller() {
        return {
            restrict: 'E',
            scope: {
                parent: '=',
            },
            templateUrl: 'components/antragsteller/antragsteller.html',
            controller: 'AntragstellerDirectiveController',
            controllerAs: 'vm',
            link: function (scope, elem, attrs) {
            }
        };
    }
})();