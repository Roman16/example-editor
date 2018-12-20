;(function () {

    'use strict';

    angular.module('app')

        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$state', '$sessionStorage', 'dashboard', 'url', 'wiedervorlage'];

    function HeaderController($scope, $state, $sessionStorage, dashboard, url, wiedervorlage) {

        let vm = this;
        vm.logout = logout;
        vm.clearSession = clearSession;
        vm.exportEmails = exportEmails;
        vm.replayCount = replayCount;
        vm.openVorgangsmanagement = openVorgangsmanagement;

        vm.subMenu = false;
        vm.currentUser = sessionStorage.currentUser;
        vm.modal = {
            isOpened: false,
            toggleModal: _toggleModal,
            suggestions: [],
        };

        function openVorgangsmanagement(user) {
            if (user) {
                $state.go('app.wiedervorlage', {user: vm.currentUser})
            } else {
                $state.go('app.wiedervorlage')
            }
        }

        function logout() {
            sessionStorage.removeItem('user');
            $state.go('login');
        }

        function _toggleModal() {
            var elem = angular.element('body').css('overflow', 'hidden');
            vm.modal.isOpened = !vm.modal.isOpened;
        }

        function clearSession() {
            $sessionStorage.klientVariablesList = undefined;
            $sessionStorage.bankVariablesList = undefined;
            $sessionStorage.partnerVariablesList = undefined;
        }

        function exportEmails(data) {
            window.open(url.adressenverwaltung.export_email + data)
        }

        function replayCount() {
            wiedervorlage.getAppointmentsForToday({
                user: vm.currentUser
            }).then(function (res) {
                vm.wiedervorlage_all_count = res.total;
                vm.wiedervorlage_user_count = res.totalForUser;
            })
        }

        $scope.$on('deleteDate', function () {
            replayCount();
        });

        replayCount();


        $(window).click(function () {
            $(".sub-menu").removeClass('show-menu');
        });

        $('.toggle-menu').click(function (event) {
            event.stopPropagation();
            $(".sub-menu").toggleClass('show-menu');
        });
    }
})();