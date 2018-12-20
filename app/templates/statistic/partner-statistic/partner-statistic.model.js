;(function () {

    'use strict';

    angular.module('model.partner_statistic', [])
        .service('partner_statistic', partner_statistic);

    partner_statistic.$inject = ['http', 'url', '$stateParams'];

    function partner_statistic(http, url) {

        let service = {
            getPartner: getPartner
        };
        return service;

        function getPartner(data) {
            return http.post(url.statistic.partnerList, data)
                .then(function (res) {
                    return res;
                });
        }


    }

})();