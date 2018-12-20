;(function () {

    'use strict';

    angular.module('app')
        .controller('KinderController', KinderController)

    KinderController.$inject = ['$scope', 'antragsteller'];

    function KinderController($scope, antragsteller) {
        let vm = this;
        vm.data = $scope.parent;
        vm.index = $scope.index;
        vm.array = $scope.array;
        vm.deleteKinder = deleteKinder;
        vm.convertAllDateFromString = antragsteller.convertAllDateFromString;

        function deleteKinder(index) {
            vm.array.splice(index, 1);
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