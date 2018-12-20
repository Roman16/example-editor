;(function () {

    'use strict';

    angular.module('app')
        .controller('NutzungDirectiveController', NutzungDirectiveController);

    NutzungDirectiveController.$inject = ['$scope'];


    function NutzungDirectiveController($scope) {
        let vm = this;
        vm.nutzung = $scope.nutzung;
        vm.zusatzliche = $scope.zusatzliche;

        vm.parseEuroFormat = parseEuroFormat;

        function parseEuroFormat(number) {
            if (typeof number === 'string') {
                return  parseFloat((number.replace('.', '')).replace(',', '.'));
            }else {
                return number;
            }
        }
    }

})();