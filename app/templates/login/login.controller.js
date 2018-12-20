;(function () {

    'use strict';

    angular.module('app')

        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'http', 'url', '$state', 'toastr', '$rootScope'];
    function LoginController($scope, http, url, $state, toastr, $rootScope) {

        let vm = this;

        vm.login = login;

        vm.user = {
            Email: '',
            Password: '',
        };

        function login() {
            http.post(url.user.login, vm.user)
                .then(function (res) {
                    if (res) {
                        sessionStorage.setItem('user', JSON.stringify(res));
                        sessionStorage.setItem('currentUser', res.Benutzername);

                        $state.go('app.dashboard')
                    } else {
                        toastr.error('Ungültiger Anmeldename oder Passwort')
                        for (var key in res.msg) {
                            toastr.error(res.msg[key][0], 'Login failed');
                        }
                    }
                });
        }
    }


})();