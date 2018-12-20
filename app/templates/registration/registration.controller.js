;(function () {

    'use strict';

    angular.module('app')

        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$scope', 'http', 'url', 'users_list', 'registration'];
    function RegistrationController($scope, http, url, users_list, registration) {

        let vm = this;
        vm.register = register;
        vm.removeUser = removeUser;
        vm.removeDialog= removeDialog;
        vm.newUser = {
            Email: '',
            Password: '',
            Benutzername: '',
            PrimaryRole: 0,
        }
        vm.DialogWindow = false;
        vm.idSelectUser = '';
        vm.users = users_list || [];


        function register() {
            registration.addUser(vm.newUser)
                .then(() => {
                    registration.getUsers()
                        .then(res => vm.users = res);
                });
        }

        function removeDialog(id) {
            vm.DialogWindow = true;
            vm.idSelectUser = id;
        }
        function removeUser() {
            registration.removeUser({
                userId: vm.idSelectUser
            })
                .then(() => {
                    vm.DialogWindow = false;
                    registration.getUsers()
                        .then(res => vm.users = res);
                });
        }
    }


})();