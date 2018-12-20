;(function () {

    'use strict';

    angular.module('app')
        .controller('DokumenteController', DokumenteController);

    DokumenteController.$inject = ['$scope', '$location', '$stateParams', 'documents_data', 'dokument', '$sce', 'url', '$sessionStorage'];


    function DokumenteController($scope, $location, $stateParams, documents_data, dokument, $sce, url, $sessionStorage) {
        var vm = this;
        vm.uploadDocUrl = url.baseUrl + 'Document/UploadFilesRange';
        vm.id = $stateParams.id;
        vm.documents = documents_data;
        vm.addDocument = addDocument;
        vm.changeFile = change;

        vm.vorgangid = $stateParams.id;
        vm.partner = '';
        vm.file = null;
        vm.userCredentials = JSON.parse(sessionStorage.getItem('user_credentials'));
        vm.transactionId = sessionStorage.getItem('transactionId');
        vm.redirectUrl = $location.absUrl();

        vm.partner =  $sessionStorage.kooperationspartner;

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function addDocument(e) {
            const formData = new FormData();
            formData.append('Upload', document.getElementById("file-id").files[0]);
            formData.append('Id', vm.id);
            dokument.uploadDoc(formData);
        }

        function change() {
            var frm = angular.element('#uploadForm');
            frm.submit();
        }


    }

})();