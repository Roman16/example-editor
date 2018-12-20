;(function () {

    'use strict';

    angular.module('model.banken', [])
        .service('banken', banken);

    banken.$inject = ['http', 'url', '$stateParams'];

    function banken(http, url) {

        let service = {
            getBank: getBank,
            selectBank: selectBank,
            addBank: addBank,
            removeBank: removeBank,
            updateBank: updateBank,
            searchVorgangs: searchVorgangs,
        };
        return service;

        function getBank() {
            return http.get(url.adressenverwaltung.bankList)
                .then(function (res) {
                    return res;
                });
        }

        function selectBank(data) {
            return http.get(url.adressenverwaltung.selectBank, data)
                .then(function (res) {
                    return res;
                });
        }


        function addBank(data) {
            return http.post(url.adressenverwaltung.addBank, data)
                .then(function (res) {
                    return res;
                });
        }

        function removeBank(data) {
            return http.post(url.adressenverwaltung.removeBank, data)
                .then(function (res) {
                    return res;
                });
        }

        function updateBank(data) {
            return http.post(url.adressenverwaltung.updateBank, data)
                .then(function (res) {
                    return res;
                });
        }

        function searchVorgangs(data) {
            return http.get(url.adressenverwaltung.searchVorgangs, data)
                .then(function (res) {
                    return res;
                })
        }


    }

})();