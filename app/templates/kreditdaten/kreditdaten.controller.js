;(function () {

    'use strict';

    angular.module('app')
        .controller('KreditdatenController', KreditdatenController);

    KreditdatenController.$inject = ['$scope', '$rootScope', 'kreditdaten', '$stateParams', 'url', 'http', 'kreditdaten_data', 'toastr', 'antragsteller', 'allBanks', '$sessionStorage'];


    function KreditdatenController($scope, $rootScope, kreditdaten, $stateParams, url, http, kreditdaten_data, toastr, antragsteller, allBanks, $sessionStorage) {
        let vm = this;
        vm.isSubmited = false;
        vm.deletseAntrag = deleteAntrag;
        vm.convertDateFromString = antragsteller.convertDateFromString;
        vm.addAntrag = addAntrag;
        vm.deleteAntrag = deleteAntrag;
        vm.submit = submit;
        vm.checkedPartner = checkedPartner;

        vm.selectPartner = false;
        vm.showDialog = false;

        vm.vorgangid = $stateParams.id;
        vm.partner = '';
        vm.banks = allBanks;
        vm.userCredentials = JSON.parse(sessionStorage.getItem('user_credentials'));
        vm.entryVorgang = JSON.parse(sessionStorage.getItem('entrie_vorgang')) || {};
        vm.transactionId = sessionStorage.getItem('transactionId');
        vm.data = {
            datum: new Date(),
            wunsch: vm.entryVorgang.Finanzbedarf || '',
            auftragseingang: vm.entryVorgang.Kontaktart || '',
            antrags: [],
            banks: vm.banks
        };

        vm.partner = $sessionStorage.kooperationspartner;

        $scope.$watch("vm.data", debounce(submit, 1000), true);

        if (kreditdaten_data) {
            vm.data = kreditdaten_data;
            vm.data.entryId = $stateParams.id;
        }

        function addAntrag() {
            vm.data.antrags.push({
                wiedervorlage: null,
                anfrages: [],
                _delete: deleteAntrag
            });
        }

        function deleteAntrag(index) {
        return vm.data.antrags.splice(index, 1);
        }

        function submit() {
            vm.data.entryId = $stateParams.id;
            kreditdaten.update(vm.data).then(function () {
                $scope.$emit('deleteDate');
            });
        }

        function debounce(func, wait, immediate) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

        kreditdaten.getUser({
            vorgangId: vm.vorgangid
        }).then(function (res) {
            vm.partnergeschaftList = res;
        });

        function checkedPartner(partnerId) {
            kreditdaten.changeUser({
                vorgangId: vm.vorgangid,
                userId: partnerId
            }).then(function (res) {
            });

            vm.showDialog = false;
            vm.selectPartner = false;
        }
    }

})();
