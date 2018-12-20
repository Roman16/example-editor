;(function () {

    'use strict';

    angular.module('app')
        .controller('ImmobilieController', ImmobilieController);

    ImmobilieController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'immobilie', 'url', 'http', 'immobilie_data', 'toastr', '$sessionStorage'];


    function ImmobilieController($scope, $state, $rootScope, $stateParams, immobilie, url, http, immobilie_data, toastr, $sessionStorage) {
        var vm = this;
        vm.addStellplatze = addStellplatze;
        vm.addGrundbuchdaten = addGrundbuchdaten;
        vm.addFlurstuck = addFlurstuck;
        vm.deleteFlurstuck = deleteFlurstuck;
        vm.deleteStellplatze = deleteStellplatze;
        vm.addDarlehen = addDarlehen;
        vm.deleteDarlehen = deleteDarlehen;
        vm.addRechte = addRechte;
        vm.submit = submit;

        vm.partner = '';
        vm.isSubmited = false;
        vm.userCredentials = JSON.parse(sessionStorage.getItem('user_credentials'));
        $scope.$watch("vm.immobilieObject", debounce(submit, 1000), true);
        vm.transactionId = sessionStorage.getItem('transactionId');
        vm.vorgangid = $stateParams.id;
        vm.partner =  $sessionStorage.kooperationspartner;

        if (immobilie_data) {
            vm.immobilieObject = immobilie_data;
        } else {
            vm.immobilieObject = {
                entryid: $stateParams.id,
                wofur: 'Neubau (eigenes Bauvorhaben)',
                basisangaben: {
                    strabe: '',
                    nr: '',
                    plz: '',
                    ort: '',
                    art: '',
                    grundstucksgrobe: '',
                    einliegerwonhnung: '',
                    baujahr: '',
                    anzahl: '',
                    bauweise: '',
                    fertighaus: '',
                    keller: '',
                    dachgeschoss: '',
                },
                nutzung: {
                    gesamte: '',
                    wie: '',
                    gewerbeflache: '',
                },
                zusatzliche: {
                    erbbaurecht: '',
                    wurde: '',
                },
                StellplatzeList: [],
                Grundbuchdaten: {
                    isOpened: false,
                    grunduch: '',
                    blatt: '',
                    Flurstuck: [],
                },
                Rechte: {
                    isOpened: false,
                    betrag: '',
                    beschreibung: '',
                    anmerkungen: '',
                },
                darlehens: [],
            }
        }

        vm.menu = [
            {
                name: 'Stellplatz',
                current: 0,
                propId: 'Stellplatz',
                max: 100,
                vermietet: 0,
            },
            {
                name: 'Carport',
                current: 0,
                propId: 'Carport',
                max: 100,
                vermietet: 0,
            },
            {
                name: 'Garage',
                current: 0,
                propId: 'Garage',
                max: 100,
                vermietet: 0,
            },
            {
                name: 'Doppelgarage',
                current: 0,
                propId: 'Doppelgarage',
                max: 100,
                vermietet: 0,
            },
            {
                name: 'Kellergarage',
                current: 0,
                propId: 'Kellergarage',
                max: 100,
                vermietet: 0,
            },
            {
                name: 'Tiefgaragenstellplatz',
                current: 0,
                propId: 'Tiefgaragenstellplatz',
                max: 100,
                vermietet: 0,
            }
        ];

        function deleteStellplatze(index) {
            vm.immobilieObject.StellplatzeList.splice(index, 1);
        }

        function addStellplatze(item) {
            var tempItem = Object.assign({}, item);
            vm.immobilieObject.StellplatzeList.push(tempItem);
        }

        function addGrundbuchdaten() {
            vm.immobilieObject.Grundbuchdaten.isOpened = true;
        }

        function addFlurstuck() {
            vm.immobilieObject.Grundbuchdaten.Flurstuck.push({
                flur: '',
                flurstuck: '',
                anteil: '',
                anteil2: '',
                desFlurs: '',
            });
        }

        function deleteFlurstuck(index) {
            vm.immobilieObject.Grundbuchdaten.Flurstuck = vm.immobilieObject.Grundbuchdaten.Flurstuck.filter((item, iteration) => {
                return index !== iteration;
            })
        }

        function addRechte() {
            vm.immobilieObject.Rechte.isOpened = true;
        }

        function deleteDarlehen(index) {
            vm.immobilieObject.Grundbuchdaten.darlehens.splice(index, 1);
        }

        function addDarlehen() {
            vm.immobilieObject.Grundbuchdaten.darlehens.push({
                _delete: deleteDarlehen
            });
        }

        function submit() {
            immobilie.update(vm.immobilieObject);
        }

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

    }

})();