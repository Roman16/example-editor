;(function () {

    'use strict';

    angular.module('app.dashboard', [])
        .service('dashboard', dashboard);


    dashboard.$inject = ['http', 'url', '$state'];

    function dashboard(http, url, $state) {


        let service = {
            getAllMembers: getAllMembers,
            getWerbung: getWerbung,
            getKontaktart: getKontaktart,
            getPartners: getPartners,
            submitVorgang: submitVorgang,
            getVorgangs:  getVorgangs,
            getVorgangsPartners: getVorgangsPartners,
            getBerlinBank: getBerlinBank
        };
        return service;


        function submitVorgang(data) {
            return http.post(url.dashboard.submit_vorgang, data)
                .then(function (res) {
                    sessionStorage.setItem('entry', JSON.stringify(data));
                    $state.go('app.tabs.antragsteller', {id: res});
                    return res;
                });
        }

        function getAllMembers(str) {
            const user = JSON.parse(sessionStorage.getItem('user'));

            if(str) {
                return http.get(url.dashboard.get_all_members, {AuthKey: user.AuthKey, page: str.page, searchKey: str.searchText})
                    .then(function (res) {
                        return res;
                    });
            } else {

                return http.get(url.dashboard.get_all_members, {AuthKey: user.AuthKey})
                    .then(function (res) {
                        return res;
                    });
            }
        }



        function getWerbung() {
            return http.get(url.dashboard.get_werbung)
                .then(function (res) {
                    return res;
                });
        }

        function getKontaktart() {
            return [
                {
                    id: 1,
                    value: 'E-Mail'
                },
                {
                    id: 2,
                    value: 'telefonisch'
                },
                {
                    id: 3,
                    value: 'per Post'
                },
                {
                    id: 3,
                    value: 'direkt'
                },
                {
                    id: 4,
                    value: 'Internet'
                },
            ];
            // return http.get(url.dashboard.get_kontaktart)
            //     .then(function (res) {
            //         return res;
            //     });
        }

        function getPartners() {
            return http.get(url.dashboard.get_partners)
                .then(function (res) {
                    return res;
                });
        }

        function getVorgangsPartners(data) {
            return http.post(url.dashboard.get_vorgangs_partner, data)
                .then(function (res) {
                    return res;
                });
        }

        function  getVorgangs(data) {
            return http.get(url.dashboard.get_vorgangs, data)
                .then(function (res) {
                    return res;
                })

        }

        function  getBerlinBank() {
            return http.get(url.dashboard.berlin_bank)
                .then(function (res) {
                    return res;
                })

        }
    }
})();