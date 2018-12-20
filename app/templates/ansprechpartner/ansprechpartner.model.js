;(function () {

    'use strict';

    angular.module('model.adressenverwaltung', [])
        .service('adressenverwaltung', adressenverwaltung);

    adressenverwaltung.$inject = ['http', 'url'];

    function adressenverwaltung(http, url) {

        let service = {
            allPersons: allPersons,
            addPerson: addPerson,
            updatePerson: updatePerson,
            removePersone: removePersone
        };
        return service;

        function allPersons() {
            return http.get(url.adressenverwaltung.allPersons)
                .then(function (res) {
                    return res;
                });
        }

        function addPerson(data) {
            return http.post(url.adressenverwaltung.addPerson, data)
                .then(function (res) {
                    return res;
                });
        }

        function updatePerson(data) {
            return http.post(url.adressenverwaltung.updatePerson, data)
                .then(function (res) {
                    return res;
                });
        }

        function removePersone(data) {
            return http.post(url.adressenverwaltung.removePersone, data)
                .then(function (res) {
                    return res;
                });
        }

    }

})();