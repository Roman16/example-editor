;(function () {

    'use strict';

    angular.module('app')
        .controller('WeitereImmobilienController', WeitereImmobilienController)

    WeitereImmobilienController.$inject = ['$scope', 'antragsteller'];

    function WeitereImmobilienController($scope, antragsteller) {
        let vm = this;
        vm.array = $scope.array;
        vm.addDarlehen = addDarlehen;
        vm.deleteWis = deleteWis;
        vm.parseEuroFormat = parseEuroFormat;

        vm.convertAllDateFromString = antragsteller.convertAllDateFromString;

        function addDarlehen(immobilien) {
            if (!immobilien.darlehens) {
                immobilien.darlehens = [];
            }
            immobilien.darlehens.push({});
        }

        function deleteWis(index) {
            vm.array.splice(index, 1);
        }



        function parseEuroFormat(number) {
            if (typeof number === 'string') {
                return  parseFloat((number.replace('.', '')).replace(',', '.'));
            }else {
                return number;
            }
        }


    }

})();