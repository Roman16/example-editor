;(function () {

    'use strict';

    angular.module('directive.bankverbindung', [])
        .directive('bankverbindung', bankverbindung);


    function bankverbindung() {
        return {
            restrict: 'E',
            scope: {
                array: '='
            },
            templateUrl: 'components/bankverbindung/bankverbindung.html',
            controller: 'BankverbindungController',
            controllerAs: 'vm',
            link: function (scope, elem, attrs) {
            }
        };
    }
})();