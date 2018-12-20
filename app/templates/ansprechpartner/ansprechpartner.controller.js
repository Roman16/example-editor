;(function () {

    'use strict';

    angular.module('app')
        .controller('AnsprechpartnerController', AnsprechpartnerController);

    AnsprechpartnerController.$inject = ['adressenverwaltung', '$interval'];


    function AnsprechpartnerController(adressenverwaltung, $interval) {
        let vm = this;

        vm.selectedPerson = {};
        vm.showNewPerson = false;
        vm.search = '';
        vm.download = true;

        vm.newPerson = newPerson;
        vm.selectPersons = selectPersons;
        vm.addPerson = addPerson;
        vm.updatePerson = updatePerson;
        vm.removePersone = removePersone;

        adressenverwaltung.allPersons({})
            .then(function (res) {
                vm.allPersons = res;
                selectPersons( vm.allPersons[0])
                vm.download = false;
            });

        function newPerson() {
            vm.selectedPerson = {};
            vm.showNewPerson = true;
        }

        function selectPersons(person) {
            vm.showNewPerson = false;
            vm.selectedPerson = person;
        }

        function addPerson(person) {
            adressenverwaltung.addPerson(
               person
            ).then(function (res) {
                vm.allPersons = res;
                // vm.partner = {};
            });
        }
        
        function updatePerson(person) {
            adressenverwaltung.updatePerson(
               person
            ).then(function (res) {
            });
        }

        function removePersone(id) {
            adressenverwaltung.removePersone({
                id: id.ContactPersonId
            }).then(function (res) {
                vm.allPersons = res;
                // vm.partner = {};
                vm.search = '';
                vm.selectedPerson = vm.allPersons[0];

            });
        }


    }

})();