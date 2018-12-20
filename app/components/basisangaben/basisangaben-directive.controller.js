;(function () {

    'use strict';

    angular.module('app')
        .controller('BasisangabenDirectiveController', BasisangabenDirectiveController);

    BasisangabenDirectiveController.$inject = ['$scope'];


    function BasisangabenDirectiveController($scope) {
        let vm = this;
        vm.data = $scope.parent;
    }

})();