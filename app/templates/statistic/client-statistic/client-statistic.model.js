;(function () {

    'use strict';

    angular.module('model.client_statistic', [])
        .service('client_statistic', client_statistic);

    client_statistic.$inject = ['http', 'url', '$stateParams'];

    function client_statistic(http, url) {

        let service = {
            getClient: getClient
        };
        return service;

        function getClient(data) {
            return http.post(url.statistic.clientList, data)
                .then(function (res) {
                    return res;
                });
        }


    }

})();