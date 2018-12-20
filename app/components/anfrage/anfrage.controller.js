;(function () {

    'use strict';

    angular.module('app')
        .controller('AnfrageController', AnfrageController);

    AnfrageController.$inject = ['$scope', 'banks', 'antragsteller' ];

    function AnfrageController($scope, banks, antragsteller) {
        let vm = this;
        vm.data = $scope.parent;
        // vm.index = $scope.index;
        vm.toggleAnfrage = toggleAnfrage;
        vm.convertDateFromString = antragsteller.convertDateFromString;

        vm.anfrageIsOpened = false;
        vm.banken = $scope.banken;

        vm.banks = JSON.parse($scope.banks);

        vm.currentDate = new Date();
        vm.match = antragsteller.getAblehnung();

        vm.convertAllDateFromString = convertAllDateFromString;
        vm.parseEuroFormat = parseEuroFormat;
        vm.convertDate = convertDate;

        vm.showAntragBank = showAntragBank;

        function showAntragBank(data, bankId, key) {
            vm.data[key] = vm.currentDate;

            if (bankId) {
                $scope.$emit('bankenChange',{data: vm.data[key]})
            }else {
                $scope.$emit('notBankenChange', data)
            }
        }

        function convertAllDateFromString(date) {
            if (date) {
                return moment(date).toDate();
            } else {
                return date;
            }
        }

        function convertDate(date) {
            if (date) {
                return moment(date).format('YYYY-MM-DD')+'T00:00:00+0000'
            }else {
                return date;
            }
        }

        function parseEuroFormat(number) {
            if (typeof number === 'string') {
                return parseFloat((number.replace('.', '')).replace(',', '.'));
            } else {
                return number;
            }
        }

        function toggleAnfrage() {
            if (vm.anfrageIsOpened) {
                vm.anfrageIsOpened = false;
            } else {
                vm.anfrageIsOpened = true;
            }
        }

        $scope.$watch('vm.data.reason', function () {
            if (vm.data.reason) {
                vm.data.fieldOne = vm.currentDate;
            }
        });

    }

})();