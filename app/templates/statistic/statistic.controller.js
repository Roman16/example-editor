;(function () {

    'use strict';

    angular.module('app')
        .controller('StatisticController', StatisticController);

    StatisticController.$inject = ['$state', '$rootScope'];


    function StatisticController($state, $rootScope) {
        let vm = this;
        vm.current_controller = $state.current.controller;

        // if state changed relect active tab
        $rootScope.$on('$stateChangeStart',
            (event, toState, toParams, fromState, fromParams) => {
                if (vm.current_controller !== toState.controller){
                    vm.current_controller = toState.controller;
                }
            })
    }

})();