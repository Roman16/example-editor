;(function () {

    'use strict';

    angular.module('model.kreditdaten', [])
        .service('kreditdaten', kreditdaten);

    kreditdaten.$inject = ['http', 'url', '$stateParams'];

    function kreditdaten(http, url, $stateParams) {

        let service = {
            getAllUser: getAllUser,
            getData: getData,
            update: update,
            getAllBanks: getAllBanks,
            changeUser: changeUser,
            getUser: getUser
        };
        return service;

        function getAllUser() {
            return http.get(url.wiedervorlage.index)
                .then(function (res) {
                    return res;
                });
        }

        function getData(id) {
            let data = {
                Id: id
            };
            return http.get(url.kreditdaten.index, data)
                .then(function (res) {
                    return res;
                });
        }

        function update(data) {
            return http.post(url.kreditdaten.update, data)
                .then(function (res) {
                    return res;
                });
        }

        function getAllBanks() {
            return http.get(url.banks.list)
                .then(function (res) {
                    return res;
                });
        }

        function changeUser(data) {
            return http.post(url.kreditdaten.changeUser, data)
                .then(function (res) {
                    return res;
                });
        }

        function getUser(data) {
            return http.post(url.kreditdaten.getUser, data)
                .then(function (res) {
                    return res;
                });
        }

    }


})();