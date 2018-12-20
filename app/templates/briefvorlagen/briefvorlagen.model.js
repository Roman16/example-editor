;(function () {

    'use strict';

    angular.module('model.briefvorlagen', [])
        .service('briefvorlagen', briefvorlagen);

    briefvorlagen.$inject = ['http', 'url', '$stateParams'];

    function briefvorlagen(http, url, $stateParams) {

        let service = {
            getData: getData,
            updateData: updateData,
            remove: remove,
            getVorgang : getVorgang
        };
        return service;


        function getData() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            return http.get(url.briefvorlagen.getList, {AuthKey: user.AuthKey})
                .then(function (res) {
                    return res;
                });
        }

        /**
         *
         * @param data
         * @param download
         * @param  vorgangId
         */
        function updateData(data, download, vorgangId) {
            return http.post(url.briefvorlagen.updateTemplate + '?download=' + download + '&VorgangId=' + vorgangId, data)
                .then(function (res) {
                    return res;
                });
        }

        /**
         *
         * @param id
         */
        function remove(id) {
            let data = {
                id: id
            };
            return http.post(url.briefvorlagen.delete, data)
                .then(function (res) {
                    return res;
                });
        }

        function getVorgang(data) {
            return http.post(url.briefvorlagen.getVorgang, data)
                .then(function (res) {
                    return res;
                });
        }
    }


})();