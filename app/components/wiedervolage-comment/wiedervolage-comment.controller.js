;(function () {

    'use strict';

    angular.module('app')
        .controller('WiedervolageComment', WiedervolageComment)

    WiedervolageComment.$inject = ['$scope', 'wiedervorlage'];

    function WiedervolageComment($scope, wiedervorlage) {
        let vm = this;
        vm.addComment = addComment;

        vm.data = $scope.parent;
        vm.openAntrag = $scope.label;
        vm.comment = '';
        vm.comment =  vm.openAntrag ? $scope.parent.AntragComment : $scope.parent.AnfrageComment;

        function addComment(comment) {
            if (vm.openAntrag) {
                wiedervorlage.addComment({
                    id: vm.data.AntragId,
                    comment: comment,
                    FromAnfrage: false
                })
            } else {
                wiedervorlage.addComment({
                    id: vm.data.AnfrageID,
                    comment: comment,
                    FromAnfrage: true
                })
            }


        }
    }

})();