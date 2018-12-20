;(function () {

    'use strict';

    angular.module('directive.basisangaben', [])
        .directive('basisangaben', basisangaben);


    function basisangaben() {
        return {
            restrict: 'E',
            scope: {
                parent: '=',
            },
            templateUrl: 'components/basisangaben/basisangaben.html',
            controller: 'BasisangabenDirectiveController',
            controllerAs: 'vm',
            link: function (scope, elem, attrs) {
            }
        };
    }
})();