;(function () {

    'use strict';

    angular.module('model.partner', [])
        .service('partner', partner);

    partner.$inject = ['http', 'url'];

    function partner(http, url) {

        let service = {
            getPartners: getPartners,
            selectPartner: selectPartner,
            addPartner: addPartner,
            updatePartner: updatePartner,
            removePartner: removePartner,
            ClientList: ClientList,
            selectUser: selectUser,
            getGroupUser: getGroupUser,
            updateGroupUser: updateGroupUser,
            getAllVorgangs: getAllVorgangs

        };
        return service;

        function getPartners() {
            return http.get(url.adressenverwaltung.partnerList)
                .then(function (res) {
                    return res;
                });
        }

        function selectPartner(data) {
            return http.get(url.adressenverwaltung.selectPartner, data)
                .then(function (res) {
                    return res;
                });
        }

        function addPartner(data) {
            return http.post(url.adressenverwaltung.addPartner, data)
                .then(function (res) {
                    return res;
                });
        }

        function updatePartner(data) {
            return http.post(url.adressenverwaltung.updatePartner, data)
                .then(function (res) {
                    return res;
                });
        }

        function removePartner(data) {
            return http.post(url.adressenverwaltung.removePartner, data)
                .then(function (res) {
                    return res;
                });
        }

        function ClientList(data) {
            return http.post(url.adressenverwaltung.ClientList, data)
                .then(function (res) {
                    return res;
                });
        }

        function selectUser(data) {
            return http.post(url.adressenverwaltung.selectUser, data)
                .then(function (res) {
                    return res;
                });
        }

        function getGroupUser(data) {
            return http.post(url.adressenverwaltung.getGroupUser, data)
                .then(function (res) {
                    return res;
                })
        }

        function updateGroupUser(data) {
            return http.post(url.adressenverwaltung.updateGroupUser, data)
                .then(function (res) {
                    return res;
                })
        }

        function getAllVorgangs(data) {
            return http.post(url.adressenverwaltung.getAllVorgangs, data)
                .then(function (res) {
                    return res;
                })
        }



    }

})();