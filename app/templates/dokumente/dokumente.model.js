;(function () {

    'use strict';

    angular.module('model.dokument', [])
        .service('dokument', dokument);


    dokument.$inject = ['http', 'url'];

    function dokument(http, url) {


        let service = {
            getAllDocs: getAllDocs,
            uploadDoc: uploadDoc,
        };
        return service;

        function getAllDocs(Id) {
            const data = {
                Id,
            };
            return http.get(url.dokument.get_all_documents, data)
                .then(function (res) {
                    return res;
                });
        }

        function uploadDoc(data) {
            return http.post(url.dokument.uploadDoc, data)
                .then(function (res) {
                    return res;
                });   
        }

    }
})();