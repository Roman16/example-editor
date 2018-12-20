;(function () {

    'use strict';

    angular.module('app')
        .controller('AntragController', AntragController)

    AntragController.$inject = ['$scope', 'banks', 'antragsteller', 'antrag', '$timeout', 'kreditdaten'];

    function AntragController($scope, banks, antragsteller, antrag, $timeout, kreditdaten) {
        let vm = this;

        vm.data = $scope.parent;
        vm.array = $scope.array;
        // vm.banken = {};

        if (!vm.data.erstelltam) vm.data.erstelltam = new Date();

        vm.user = JSON.parse(sessionStorage.getItem('user'));
        if (!vm.data.bearbeiter) vm.data.bearbeiter = vm.user.Benutzername;
        vm.isTooltipOpened = false;
        vm.anfrageIsOpened = false;
        vm.banks = JSON.parse($scope.banks);

        vm.addAnfrage = addAnfrage;
        vm.getLabel = getLabel;
        vm.toggleAnfrage = toggleAnfrage;
        vm.addFinanzierungsbausteine = addFinanzierungsbausteine;
        vm.toggleTooltip = toggleTooltip;
        vm.getTotalOfGesamtprovision = getTotalOfGesamtprovision;
        vm.getTotalOfBeraterrovision = getTotalOfBeraterrovision;
        vm.match = antragsteller.getAblehnung();
        vm.deleteFinanzierungsbausteine = deleteFinanzierungsbausteine;
        vm.round = round;
        vm.privatDarlehen = privatDarlehen;
        vm.deleteAntrag = deleteAntrag;
        vm.isTooltipOpened = false;
        vm.getTypeOf = getTypeOf;
        vm.getAllUser = getAllUser;
        vm.getAllUser();

        vm.parseEuroFormat = parseEuroFormat;
        vm.convertAllDateFromString = convertAllDateFromString;
        vm.changeWiedervorlage = changeWiedervorlage;

        function changeWiedervorlage(date) {
            if (date) {
                return moment(date).format('YYYY-MM-DD') + 'T00:00:00+0000'
            } else {
                return date;
            }
        }

        function getTypeOf(val) {
            if (val === null || val === '') {
                return 'null';
            } else {
                return typeof val;
            }
        }

        function getAllUser() {
            kreditdaten.getAllUser().then(function (res) {
                vm.bearbeiterUser = res;
            })
        }

        $scope.$on('bankenChange', function (event, data) {
            initBanken(data.data);
        });

        $scope.$on('notBankenChange', function () {
            vm.data.datum = null;
            vm.banken = null;
            vm.data.abgelehnt = false;
            vm.data.abgerechnet = false;
        });


        function parseEuroFormat(number) {
            if (typeof number === 'string' && (number.indexOf(',') != -1 || number.indexOf('.') != -1)) {
                return parseFloat((number.replace('.', '')).replace(',', '.'));
            } else {
                return number;
            }
        }

        function convertAllDateFromString(date) {
            if (date !== null) {
                return moment(date).toDate();
            } else {
                return date;
            }
        }

        function toggleAnfrage() {
            if (vm.anfrageIsOpened) {
                vm.anfrageIsOpened = false;
            } else {
                vm.anfrageIsOpened = true;
            }
        }

        function toggleTooltip() {
            vm.isTooltipOpened = !vm.isTooltipOpened;
        }

        initBanken();

        function initBanken(data) {
            for (var i = 0; i < vm.data.anfrages.length; i++) {
                vm.showAntragBank = {};
                if (vm.data.anfrages[i].reason != 'offen' && vm.data.anfrages[i].reason != 'Storno' && vm.data.anfrages[i].reason != 'angefragt') {
                    vm.curentData = vm.data.anfrages[i].reason + 'Date';
                    vm.showAntragBank = angular.copy(vm.data.anfrages[i]);
                    if (data) {
                        vm.data.datum = angular.copy(data);
                    } else {
                        vm.data.datum = angular.copy(vm.data.anfrages[i][vm.curentData]);
                    }
                    for (var j = 0; j < vm.banks.length; j++) {
                        if (vm.banks[j].BankanschriftId === +vm.showAntragBank.bank_id) {
                            vm.banken = vm.banks[j].Name;
                            vm.data.banken_id = +vm.showAntragBank.bank_id;
                        }
                    }

                    if (vm.data.anfrages[i].reason === 'abgerechnet') {
                        vm.data.abgerechnet = true;
                        vm.data.abgelehnt = false;

                        break
                    } else {
                        vm.curentData = vm.data.anfrages[i].reason + 'Date';
                        if (vm.data.anfrages[i].reason === 'abgelehnt') {
                            vm.data.abgelehnt = true;
                            vm.data.abgerechnet = false;
                        } else {
                            vm.data.abgerechnet = false;
                            vm.data.abgelehnt = false;
                        }
                    }
                }

            }
        }


        function addAnfrage() {
            if (typeof vm.data.anfrages === 'undefined') {
                vm.data.anfrages = [];
            }
            vm.data.anfrages.push({
                _delete: deleteAnfrage
            });
        }

        function convertDateFromString(date) {
            return date;
        }

        function getLabel(object) {
            var selected = 0;
            var selectedName = 'automatisch';
            for (const group in object) {
                if (object[group]) {
                    selected++;
                    selectedName = object[group];
                }
            }
            if (selected > 1) {
                return 'mehrere';
            } else {
                return selectedName;
            }
        }


        vm.indexAnfrag = 0;

        vm.deleteAnfrage = deleteAnfrage;
        vm.deleteAntrag = deleteAntrag;
        vm.showDeleteAntragConfirmation = showDeleteAntragConfirmation;
        vm.showDeleteAnfrageConfirmation = showDeleteAnfrageConfirmation;

        function showDeleteAntragConfirmation(id) {
            vm.showDeleteAntragConfirmationDialog = true;
            vm.antragId = id;
        }

        function showDeleteAnfrageConfirmation(id) {
            vm.showDeleteAnfrageConfirmationDialog = true;
            vm.anfrageId = id;
        }

        function deleteAnfrage(index) {
            vm.data.anfrages.splice(index, 1)
            vm.showDeleteAnfrageConfirmationDialog = false;
        }

        function addFinanzierungsbausteine(id, name, description) {
            if (typeof vm.data.finanzierungsbausteines === 'undefined') {
                vm.data.finanzierungsbausteines = [];
            }
            vm.data.finanzierungsbausteines.push({
                id: id,
                name: name || '',
                description: description || '',
                _delete: deleteFinanzierungsbausteine,
            });
        }

        function deleteFinanzierungsbausteine(index) {
            vm.data.finanzierungsbausteines.splice(index, 1);
        }

        function deleteAntrag(index) {
            $scope.$parent.vm.deleteAntrag(index);
            vm.showDeleteAnfrageConfirmationDialog = false;
        }


        function round(arg) {
            return Math.round(arg);
        }

        function getTotalOfGesamtprovision() {
            let total = 0;
            if (vm.data.finanzierungsbausteines) {
                vm.data.finanzierungsbausteines.forEach(function (item) {
                    if (item.hasOwnProperty('gesamtprovision_eur')) {
                        if (item.gesamtprovision_eur) {
                            total += parseFloat(item.gesamtprovision_eur)
                        }
                    }
                });
            }

            return total
        }

        function getTotalOfBeraterrovision() {
            let total = 0;
            if (typeof vm.data.finanzierungsbausteines !== 'undefined') {
                vm.data.finanzierungsbausteines.forEach(function (item) {
                    if (item.hasOwnProperty('provisionBerater_eur')) {
                        if (item.provisionBerater_eur) {
                            total += parseFloat(item.provisionBerater_eur)
                        }
                    }
                });
            }
            return total
        }

        function privatDarlehen(method, arg1, arg2) {
            switch (method) {
                case 'gesamtkreditbetrag':
                    antrag.privatDarlehen.antragssumme = arg1;
                    antrag.privatDarlehen.zinsbelastung = arg2;
                    return _percent();

                case 'letztedatum':
                    antrag.privatDarlehen.erstedatum = arg1;
                    antrag.privatDarlehen.laufzeit = arg2;
                    return _datum();

            }

            function _percent() {
                return antrag.privatDarlehen.vermittlungscourtage();
            }

            function _datum() {
                return antrag.privatDarlehen.ratedatum();
            }
        }

        vm.show_dropdown = false;
        vm.insert_dropdown = false;
    }

})();