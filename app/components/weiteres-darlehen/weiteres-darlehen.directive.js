;(function () {

    'use strict';

    angular.module('directive.weiteres-darlehen', [])
        .directive('weitereDarlehen', weitereDarlehen);


    function weitereDarlehen() {
        return {
            restrict: 'E',
            scope: {
                array: '='
            },
            templateUrl: 'components/weiteres-darlehen/weiteres-darlehen.html',
            controller: 'WeitereDarlehenController',
            controllerAs: 'vm',
            link: function (scope, elem, attrs) {}
        };
    }
})();