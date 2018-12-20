;(function () {

    'use strict';

    angular.module('app')
        .controller('AntragstellerController', AntragstellerController);

    AntragstellerController.$inject = ['$scope', '$rootScope', '$stateParams', 'antragsteller', 'bank_list', 'allBanks', 'http', 'url', 'toastr', 'antrag_data', 'credit_info', '$state', '$timeout', '$sessionStorage', 'partners', 'dashboard'];


    function AntragstellerController($scope, $rootScope, $stateParams, antragsteller, bank_list, allBanks, http, url, toastr, antrag_data, credit_info, $state, $timeout, $sessionStorage, partners, dashboard) {
        let vm = this;

        vm.partners = partners;

        vm.submit = submit;
        vm.addKinder = addKinder;
        vm.deleteKinder = deleteKinder;
        vm.deleteBankverbindung = deleteBankverbindung;
        vm.deleteWis = deleteWis;
        vm.clearKinder = clearKinder;
        vm.addItem = addItem;
        vm.checkMaxInBanks = checkMaxInBanks;
        vm.addBankverbindung = addBankverbindung;
        vm.addWis = addWis;
        vm.clearWis = clearWis;
        vm._deleteBank = deleteItem;
        vm.changeRating = changeRating;
        vm.removeVorgang = removeVorgang;

        vm.parseEuroFormat = parseEuroFormat;

        function parseEuroFormat(number) {
            if (typeof number === 'string') {
                return parseFloat((number.replace('.', '')).replace(',', '.'));
            } else {
                return number;
            }
        }

        function removeVorgang() {
            antragsteller.deleteVorgang({id: $stateParams.id}).then(function () {
                $state.go('app.dashboard')
            })
        }

        vm.convertAllDateFromString = antragsteller.convertAllDateFromString;
        vm.convertToDate = convertToDate;
        vm.creditInform = credit_info;
        vm.banks = allBanks;
        vm.DialogWindow = false;
        vm.vorgangid = $stateParams.id;
        vm.entryObject = {
            antragstellers: [
                {
                    number: '1',
                    sex: '1',
                },
                {
                    number: '2',
                    value: '1',
                },
            ],
            entryid: $stateParams.id,
            banks: [],
            kinders: [],
            bankverbindungs: [],
            wis: [],
        }

        if($stateParams.date) console.log($stateParams.date)

        // if ($stateParams.date) vm.entryObject.antragstellers[0].date = $stateParams.date
        // if ($stateParams.name) vm.entryObject.antragstellers[0].name = $stateParams.name
        // if ($stateParams.vorname) vm.entryObject.antragstellers[0].vorname = $stateParams.vorname

        vm.bank_list = bank_list;


        if (antrag_data) {
            vm.entryObject.entryid = $stateParams.id;
            vm.entryObject.AnkerButton = antrag_data.AnkerButton;
            vm.entryObject.antragstellers = antrag_data.antragstellers;
            vm.entryObject.kinders = antrag_data.kinders || [];
            vm.entryObject.banks = antrag_data.banks || [];
            vm.entryObject.bankverbindungs = antrag_data.bankverbindungs || [];
            vm.entryObject.wis = antrag_data.wis || [];

            const user = {
                fname: antrag_data.antragstellers[0].vorname && antrag_data.antragstellers[0].second_name ? `- ${antrag_data.antragstellers[0].second_name} ${antrag_data.antragstellers[0].vorname}` : '',
            }

            if (vm.entryObject.antragstellers[0].date_birthd && vm.entryObject.antragstellers[0].date_birthd != 'Invalid date') {
                vm.entryObject.antragstellers[0].date_birthd = antragsteller.convertAllDateFromString(vm.entryObject.antragstellers[0].date_birthd);
            }
            if (vm.entryObject.antragstellers[1]) {
                if (vm.entryObject.antragstellers[1].date_birthd && vm.entryObject.antragstellers[1].date_birthd != 'Invalid date') {
                    vm.entryObject.antragstellers[1].date_birthd = antragsteller.convertAllDateFromString(vm.entryObject.antragstellers[1].date_birthd);
                }
            }

            sessionStorage.setItem('user_credentials', JSON.stringify(user));
        }

        $scope.$watch("vm.entryObject", debounce(submit, 1000), true);


        function submit() {
            vm.newEntryObject = angular.copy(vm.entryObject);
            if (vm.newEntryObject.antragstellers[0].date_birthd) {
                if (typeof vm.newEntryObject.antragstellers[0].date_birthd != 'string') {
                    vm.newEntryObject.antragstellers[0].date_birthd = antragsteller.convertToString(vm.newEntryObject.antragstellers[0].date_birthd);
                }
            }
            if (vm.newEntryObject.antragstellers[1]) {
                if (vm.newEntryObject.antragstellers[1].date_birthd && vm.newEntryObject.antragstellers[1].date_birthd != 'string') {
                    vm.newEntryObject.antragstellers[1].date_birthd = antragsteller.convertToString(vm.newEntryObject.antragstellers[1].date_birthd);
                }
            }

            antragsteller.update(vm.newEntryObject);
        }

        function convertToDate(date) {
            if (date) {
                return moment(date).toDate();
            } else {
                return date;
            }
        }

        function addKinder() {
            vm.entryObject.kinders.push({
                name: '',
                geburtsdatum: '',
                kindergeld: '0',
                unterhaltseinnahmen: '0',
                betrag: '',
            });
        }

        function changeRating(i) {
            vm.entryObject.AnkerButton = i;
            antragsteller.update(vm.newEntryObject);
        }

        function deleteKinder(index) {
            vm.entryObject.kinders.splice(index, 1);
        }

        function clearKinder() {
            vm.entryObject.kinders = [];
        }

        function addItem(item, side) {
            if (item.max > item.current) {
                item.current++;
                let tmpItem = {
                    identify: item.identify,
                    _delete: deleteItem,
                    side: side
                };
                vm.entryObject.banks.push(tmpItem);
            }
        }

        function deleteItem(index, side) {
            if (side === 'L') {
                let item = antragsteller.findElementById(vm.entryObject.banks[index].identify, 'L', vm.bank_list);
                item.current--;
                vm.entryObject.banks.splice(index, 1)
            } else {
                let item = antragsteller.findElementById(vm.entryObject.banks[index].identify, 'R', vm.bank_list);
                item.current--;
                vm.entryObject.banks.splice(index, 1)
            }
        }

        function checkMaxInBanks(item) {
            return item.max > item.current;
        }

        function addBankverbindung() {
            vm.entryObject.bankverbindungs.push({
                _delete: deleteBankverbindung
            });
        }

        function deleteBankverbindung(index) {
            vm.entryObject.bankverbindungs.splice(index, 1);
        }

        function addWis() {
            vm.entryObject.wis.push({
                darlehens: [],
                _delete: deleteWis
            });
        }

        function deleteWis(index) {
            vm.entryObject.wis.splice(index, 1);
        }

        function clearWis() {
            vm.entryObject.wis = [];
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
        vm.entryObject.antragstellers[0].fromPage='antragsteller';
        $sessionStorage.klientVariablesList = vm.entryObject.antragstellers[0];

        $sessionStorage.entryid = vm.entryObject.entryid;
        $sessionStorage.ansprechpartner = undefined;
        $sessionStorage.bankVariablesList = undefined;
        $sessionStorage.partnerVariablesList = undefined;
    }

})();