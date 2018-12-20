;(function () {

    'use strict';

    angular.module('model.wiedervorlage', [])
        .service('wiedervorlage', wiedervorlage);

    wiedervorlage.$inject = ['http', 'url', '$stateParams'];

    function wiedervorlage(http, url, $stateParams) {

        let service = {
            getData: getData,
            getVorgangs: getVorgangs,
            getAllMembers: getAllMembers,
            submitAntragDate: submitAntragDate,
            deleteDate: deleteDate,
            addComment: addComment,
            deleteOffDate: deleteOffDate,
            getAppointmentsForToday: getAppointmentsForToday
        };
        return service;

        function getData(data) {
            return http.get(url.wiedervorlage.index, data)
                .then(function (res) {
                    return res;
                });
        }

        function getVorgangs(data) {
            return http.post(url.wiedervorlage.vorgangs, data)
                .then(function (res) {
                    return res;
                });
        }

        function getAllMembers(data) {
            if (data) {
                return http.post(url.wiedervorlage.vorgangs, data)
                    .then(function (res) {
                        return res;
                    });
            }
        }

        function submitAntragDate(data) {
            return http.post(url.wiedervorlage.submitDate, data)
                .then(function (res) {
                    return res;
                })
        }

        function deleteDate(data) {
            return http.post(url.wiedervorlage.deleteDate, data)
                .then(function (res) {
                    return res;
                })
        }

        function deleteOffDate(data) {
            return http.post(url.wiedervorlage.deleteOffDate, data)
                .then(function (res) {
                    return res;
                })
        }

        function addComment(data) {
            return http.post(url.wiedervorlage.addComment, data)
                .then(function (res) {
                    return res;
                })
        }

        function getAppointmentsForToday(data) {
            return http.post(url.wiedervorlage.appointmentsForToday, data)
                .then(function (res) {
                    return res;
                })
        }
    }


})();