;(function () {

    'use strict';

    angular.module('model.immobilie', [])
        .service('immobilie', immobilie);

    immobilie.$inject = ['http', 'url', '$stateParams'];

    function immobilie(http, url, $stateParams) {

        let service = {
            getData: getData,
            update: update,
        };
        return service;


        function getData(id) {
            let data = {
                Id: id
            };
            return http.get(url.immobilie.index, data)
                .then(function (res) {
                    return res;
                });
        }

        function update(data) {
            return http.post(url.immobilie.update, data)
                .then(function (res) {
                    return res;
                });
        }
    }


})();