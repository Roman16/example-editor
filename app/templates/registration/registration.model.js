;(function () {

    'use strict';

    angular.module('model.registration', [])
        .service('registration', registration);

    registration.$inject = ['http', 'url', '$stateParams'];

    function registration(http, url, $stateParams) {

        let service = {
            getAllUsers: getAllUsers,
            addUser: addUser,
            getUsers: getUsers,
            removeUser: removeUser
        };
        return service;


        function getAllUsers() {
            return http.get(url.registration.index)
                .then(function (res) {
                    return res;
                });
        }

        function getUsers() {
            return http.get(url.registration.index);
        }

        function addUser(data) {
            return http.post(url.registration.addUser, data);
        }

        function removeUser(data) {
            return http.post(url.registration.deleteUser, data);
        }


    }


})();