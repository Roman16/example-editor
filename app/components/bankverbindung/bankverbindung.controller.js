;(function () {

    'use strict';

    angular.module('app')
        .controller('BankverbindungController', BankverbindungController);

    BankverbindungController.$inject = ['$scope'];

    function BankverbindungController($scope) {
        let vm = this;
        vm.data = $scope.parent;
        vm.array = $scope.array;
        vm.deleteBankverbindung = deleteBankverbindung;

        function deleteBankverbindung(index) {
            vm.array.splice(index, 1);
        }


    }

})();