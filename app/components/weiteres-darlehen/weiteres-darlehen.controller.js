;(function () {

    'use strict';

    angular.module('app')
        .controller('WeitereDarlehenController', WeitereDarlehenController)

    WeitereDarlehenController.$inject = ['$scope'];

    function WeitereDarlehenController($scope) {
        let vm = this;
        vm.data = $scope.parent;
        vm.array = $scope.array;
        vm.delete = $scope.delete;
        vm.deleteDarlehen = deleteDarlehen;
        vm.parseEuroFormat = parseEuroFormat;


        function deleteDarlehen(index) {
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