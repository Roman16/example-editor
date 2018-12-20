;(function () {

    'use strict';

    angular.module('directive.search', [])
        .directive('search', search);


    function search() {
        return {
            restrict: 'E',
            scope: {
                customers: '=',
                parent: '='
            },
            templateUrl: 'components/search/search.html',
            controller: 'SearchDirectiveController',
            controllerAs: 'vm',
            link: function (scope, elem, attrs, $timeout) {

            }
        };
    }
})();