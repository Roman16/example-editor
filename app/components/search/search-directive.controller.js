;(function () {

    'use strict';

    angular.module('app')
        .controller('SearchDirectiveController', SearchDirectiveController);

    SearchDirectiveController.$inject = ['$scope', 'dashboard', '$timeout', '$sessionStorage', '$state'];


    function SearchDirectiveController($scope, dashboard, $timeout, $sessionStorage, $state) {
        let vm = this;
        vm.modal = $scope.parent;
        vm.isOnRequest = false;
        vm.searchStr = '';
        vm.searchText = '';

        vm.toggle = toggle;
        vm.setFocus = setFocus;
        vm.search = search;
        vm.selectPage = selectPage;

        function search() {
            getMembers()
        }

        function setFocus() {
            $(document).ready(function () {
                $('#search').focus()
            })
            getMembers();

            var dialog = $('.ng-modal-dialog').height();
            $('.b-form__results').height(dialog - 110);
        }


        function getMembers() {
            vm.isOnRequest = true;
            dashboard.getAllMembers({
                page: 1,
                searchText: vm.searchText
            })
                .then(function (res) {
                    vm.customers = res;
                    vm.isOnRequest = false;
                })
        }


        function toggle(code, partner, referenceId) {
            sessionStorage.setItem('transactionId', code );
            $sessionStorage.kooperationspartner = partner;
            vm.searchText = '';
            var elem = angular.element('body').css('overflow', 'scroll');
            vm.modal.isOpened = false;

            if(referenceId) {
                $state.go('app.tabs.antragsteller', {id: referenceId});
            }
        }

        function selectPage(index, key) {
            dashboard.getAllMembers({
                page: index,
                searchText: key
            })
                .then(function (res) {
                    vm.customers = res;
                    vm.isOnRequest = false;
                })
        }


        $(document).keypress(function (e) {
            if(e.which == 13)
                return false;
        });
    }

})();