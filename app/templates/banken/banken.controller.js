;(function () {

    'use strict';

    angular.module('app')
        .controller('BankenController', BankenController);

    BankenController.$inject = ['banken', '$state', '$sessionStorage', 'toastr', '$timeout'];


    function BankenController(banken, $state, $sessionStorage, toastr, $timeout) {
        let vm = this;

        vm.selectedBank = {};
        vm.bankVariablesList = {};
        vm.autocompleteText = '';
        vm.idSelectBank = '';

        vm.showNewBank = false;
        vm.isOpened = false;
        vm.download = true;
        vm.DialogWindow = false;

        vm.selectedBank.ContactPersons = {};

        vm.selectBank = selectBank;
        vm.newBank = newBank;
        vm.addBank = addBank;
        vm.removeBank = removeBank;
        vm.updateBank = updateBank;
        vm.removeDialog = removeDialog;
        vm.addPersons = addPersons;
        vm.deleteContactPersons = deleteContactPersons;
        vm.changeRating = changeRating;

        vm.sendMessage = sendMessage;
        vm.searchVorgangs = searchVorgangs;
        vm.selectClientForBriefvorlage = selectClientForBriefvorlage;
        vm.blurAutocomplete = blurAutocomplete;

        banken.getBank({})
            .then(function (res) {
                vm.bankList = res;
                vm.selectedBank = vm.bankList[0];
                vm.download = false;

                banken.selectBank({
                    id: vm.bankList[0].BankanschriftId
                }).then(function (res) {
                    res.CreateDate = moment(res.CreateDate).toDate();
                    vm.showNewBank = false;
                    vm.selectedBank = res;
                });
            });


        function selectBank(item) {
            banken.selectBank({
                id: item.BankanschriftId
            }).then(function (res) {
                res.CreateDate = moment(res.CreateDate).toDate();
                vm.showNewBank = false;
                vm.selectedBank = res;
            });
        }

        function changeRating(i) {
            if(vm.selectedBank.AnkerButton == i ) {
                vm.selectedBank.AnkerButton = 0;
            } else {
                vm.selectedBank.AnkerButton = i;
            }

            updateBank(vm.selectedBank)
        }

        function newBank() {
            vm.selectedBank = {
                CreateDate: new Date()
            };
            vm.showNewBank = true;
            vm.selectedBank.ContactPersons = [];
        }

        function addBank(name) {
            banken.addBank(
                name
            ).then(function (res) {
                toastr.success('Erfolgreich hinzugefügt');
                vm.bankList = res.Data;
                vm.bank.name = '';
            });
        }

        function removeDialog(bank) {
            vm.DialogWindow = true;

            vm.idSelectBank = bank.BankanschriftId;
        }

        function removeBank() {
            banken.removeBank({
                id:  vm.idSelectBank
            }).then(function (res) {
                toastr.success('Erfolgreich entfert');
                vm.bankList = res.Data;
                vm.bank = {};
                vm.selectedBank = vm.bankList[0];

                vm.DialogWindow = false;
            });
        }

        function updateBank(bank) {
            banken.updateBank(
                bank
            ).then(function (res) {
                toastr.success('Aktualisiert');
            });
        }

        function addPersons() {
            vm.selectedBank.ContactPersons.push({
                Vorname: '',
                Name: '',
                Phone: '',
                Fax: '',
            });
        }

        function deleteContactPersons(index) {
            vm.selectedBank.ContactPersons.splice(index, 1);
        }

        function sendMessage() {
            $sessionStorage.bankVariablesList = {};
            if (vm.selectedBank.Anrede === 'herr') {
                vm.bankVariablesList.sex = 1;
            } else if (vm.selectedBank.Anrede === 'frau') {
                vm.bankVariablesList.sex = 0;
            } else {
                vm.bankVariablesList.sex = undefined;
            }

            vm.bankVariablesList.AntragstellerId = vm.selectedBank.BankanschriftId;
            vm.bankVariablesList.firmenname = vm.selectedBank.Name;
            vm.bankVariablesList.street = vm.selectedBank.Street;
            vm.bankVariablesList.plz = vm.selectedBank.plz;
            vm.bankVariablesList.ort = vm.selectedBank.ort;

            for (var i = 0; i < vm.selectedBank.ContactPersons.length; i++) {
                if (vm.selectedBank.ContactPersons[i].Active) {
                    vm.bankVariablesList.ansprechpartner = vm.selectedBank.ContactPersons[i];
                    break;
                } else {
                    vm.bankVariablesList.ansprechpartner = undefined;
                }
            }

            $sessionStorage.entryid = undefined;
            $sessionStorage.klientVariablesList = undefined;
            $sessionStorage.partnerVariablesList = undefined;
            $sessionStorage.bankVariablesList = vm.bankVariablesList;

            if (vm.idClientPartner) {
                $state.go('app.briefvorlagen', {id: vm.idClientPartner});
            } else {
                $state.go('app.briefvorlagen');
            }
        }

        function searchVorgangs(searchText) {
            if (searchText.length > 2) {
                banken.searchVorgangs({
                    searchKey: searchText
                }).then(function (res) {
                    vm.allVorgangsList = res;
                })
            }
        }

        function blurAutocomplete() {
            $timeout(function () {
                vm.show_autocomplete = false;
            }, 500)
        }

        function selectClientForBriefvorlage(client) {
            if (client) {
                vm.autocompleteText = client.Vorname;
                vm.idClientPartner = client.VorgangId;
                vm.show_autocomplete = false;
            } else {
                vm.show_autocomplete = false;
            }
        }

    }

})();