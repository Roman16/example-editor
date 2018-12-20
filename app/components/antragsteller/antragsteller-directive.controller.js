;(function () {

    'use strict';

    angular.module('app')
        .controller('AntragstellerDirectiveController', AntragstellerDirectiveController);

    AntragstellerDirectiveController.$inject = ['$scope', 'antragsteller', '$sessionStorage'];


    function AntragstellerDirectiveController($scope, antragsteller, $sessionStorage) {
        let vm = this;
        vm.data = $scope.parent;
        vm.customAddress = customAddress;
        vm.convertDateFromString = antragsteller.convertDateFromString;
        vm.convertAllDateFromString = antragsteller.convertAllDateFromString;
        // if (vm.data.number === '1') {
        //     vm.show_address = true;
        // } else {
        //     vm.show_address = false;
        // }

        function customAddress() {
            vm.show_address = true;
        }

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