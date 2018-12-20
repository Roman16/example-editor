;(function () {

    'use strict';

    angular.module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'users_data', 'werbung', 'url', 'http', '$state', 'dashboard', '$sessionStorage', '$timeout', '$stateParams'];


    function DashboardController($scope, users_data, werbung, url, http, $state, dashboard, $sessionStorage, $timeout, $stateParams) {
        let vm = this;
        const user = JSON.parse(sessionStorage.getItem('user'));
        vm.vornameClicked = vornameClicked;
        vm.convertAllDateFromString = convertAllDateFromString;
        vm.getMembers = getMembers;
        vm.search = search;

        vm.isOnRequest = false;
        vm.download = false;
        vm.downloadPartnerList = true;
        vm.customers = [];
        vm.berlin_bank = '';
        vm.data = {
            Verwendungszweck: "1",
            Plz: "",
            Finanzbedarf: "",
            Werbung: "24",
            Kontaktart: "-1",
            Partnergeschaft: "Ja",
            PartnergeschaftList: "",
            AuthKey: user.AuthKey
        };
        vm.submit = submit;
        vm.getListPartners = getListPartners;

        dashboard.getBerlinBank().then(function (res) {
            vm.berlin_bank = res;
        });

        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        vm.users = users_data;
        vm.werbungList = werbung;

        function getListPartners() {
            dashboard.getPartners()
                .then(function (res) {
                    vm.partners = res;
                    vm.downloadPartnerList = false;
                });
        }

        vm.subVorgang = {};

        function submit() {
            vm.subVorgang.vorgang = vm.data;
            vm.subVorgang.nachname = vm.data.nachname;
            vm.subVorgang.vorname = vm.data.vorname;
            vm.subVorgang.birthDate = vm.data.birthDate;

            dashboard.submitVorgang(vm.subVorgang);
            sessionStorage.setItem('entrie_vorgang', JSON.stringify(vm.data));
        }

        function vornameClicked(code, referenceId, partner) {
            sessionStorage.setItem('transactionId', code);
            $sessionStorage.kooperationspartner = partner;
            $state.go('app.tabs.antragsteller', {id: referenceId});
        }

        function convertAllDateFromString(date) {
            if (date !== null) {
                return moment(date).toDate();
            } else {
                return date;
            }
        }

        function search(date, name, vor) {
            if (vm.isOnRequest) {
                $timeout(function () {
                    search(date, name, vor);
                }, 450)
            } else {
                if (date === vm.data.birthDate && name === vm.data.nachname && vor === vm.data.vorname) getMembers(date, name, vor)
            }
        }

        function getMembers(date, name, vor) {
            vm.isOnRequest = true;
            var day = moment(date).format('YYYY-MM-DD')
            dashboard.getVorgangs({
                birthDate: date ? day + 'T00:00:00+0000' : null,
                nachname: name,
                vorname: vor
            }).then(function (res) {
                vm.customers = res;
                vm.isOnRequest = false;
                vm.download = false;
            })
        }


    }

})();