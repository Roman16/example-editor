(function () {
    'use strict';
    angular
        .module('factory.request', [])
        .factory('http', http);

    http.$inject = ['$http', '$q', '$timeout'];

    /**
     * Wrapper over the standard http function
     */

    function http($http, $q, $timeout) {
        console.log('create request service');

        return {
            get: function (url, data) {
                return request('GET', url, data);
            },
            post: function (url, data) {
                return request('POST', url, data);
            },
            delete: function (url, data) {
                return request('DELETE', url, data);
            },
            put: function (url, data) {
                return request('PUT', url, data);
            },
            file: function (url, data) {
                return requestFile(url, data);
            }
        };


        /**
         * Main request function
         * @param {string} method - Method name
         * @param {string} url - Request url
         * @param {object} data - Data to request
         * @returns {promise}
         */

        function request(method, url, data) {

            var config = {};
            // shity code because of dummy request config.....
            if (url === 'http://itls-hh.eu/Document/UploadFile') {
                config = {
                    method: method,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
            } else {
                config = {
                    dataType: 'json',
                    method: method,
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                };
            }

            // data.auth_key = sessionStorage.getItem('user').auth_key;

            if (method === 'DELETE') {
                if (data.id) {
                    config.params = data;
                }
                else {
                    config.data = data;
                }
            }

            if (method === 'GET') {
                config.params = data;
                config.timeout = 20000;
            }
            else {
                config.data = data;
            }

            const user = JSON.parse(sessionStorage.getItem('user'));
            
            // console.log(user)
            // if (user !== null && url !== 'http://itls-hh.eu/Document/UploadFile') {
            //     config.url = url + '?auth_key=' + user.AuthKey;
            // }
            // else {
                config.url = url;
            // }

            // $ionicLoading.show({
            //     templateUrl: 'views/lazyload/lazyload.html'
            // });

            return $http(config)
                .then(requestComplete)
                .catch(requestFailed);
        }

        /**
         * Function for sending files
         * @param {string} url - Request url
         * @param {object} data - Data to request
         * @returns {promise}
         */

        function requestFile(url, data) {

            // if ($sessionStorage.auth_key) {
            //     url = url + '?auth_key=' + $sessionStorage.auth_key;
            // }

            var ft = new FileTransfer();

            var promise = $q.defer();
            ft.upload(data.file.fullPath, encodeURI(url), function (response) {
                console.info('response complete', JSON.parse(response.response));
                promise.resolve(JSON.parse(response.response));
            }, function (error) {
                console.log('error', error);
                promise.reject(error.body);
            }, {
                fileName: data.file.name,
                fileKey: 'file',
                mimeType: '',
                httpMethod: 'POST',
                chunkedMode: false,
                params: data
            });

            return promise.promise;
        }


        /**
         * Callback function for failed request
         * @param err
         * @returns {promise}
         */
        function requestFailed(err) {
            console.info('error', err.config.url, err);

            if (err.data == null || !err.data.error) {
                if (err.status === 200) {
                    console.log('Server error: ' + err.data, 'long', 'center');
                }
                else if (err.status === -1) {
                    console.log('Server is not available', 'long', 'center');
                }
                else if (err.status === 0) {
                    console.log('There is no Internet connection', 'long', 'center');
                }
                else if (err.status === 500) {
                    console.log('Server error: ' + err.status + ' ' + err.data.message, 'long', 'center');
                }
                else {
                    console.log('Server error: ' + err.status + ' ' + err.statusText, 'long', 'center');
                }
                // console.log('XHR Failed: ' + err.status);
            } else {
                console.log(err.data.error, 'long', 'center');
            }


            return $q.reject(err.data.error);
        }

        /**
         * Callback function for success request
         * @param response
         * @returns {promise}
         */

        function requestComplete(response) {
            let promise = $q.defer();

            // console.info('response complete', response.config.url, response);

            if (!response.data.error) {
                promise.resolve(response.data);
            }
            else {
                promise.reject(response);
            }


            return promise.promise;
        }
    }
})();