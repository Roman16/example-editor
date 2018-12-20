;(function () {

    'use strict';

    angular.module('directive.antrag', [])
        .directive('antrag', antrag);


    function antrag() {
        return {
            restrict: 'E',
            scope: {
                parent: '=',
                array: '=',
                index: '@',
                banks: '@'
            },
            templateUrl: 'components/antrag/antrag.html',
            controller: 'AntragController',
            controllerAs: 'vm',
            link: function (scope, elem, attrs) {
            }
        };
    }
})();