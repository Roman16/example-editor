;(function () {

    "use strict";

    angular
        .module('directive.changePartner',[])
        .directive('changePartner', changePartner)

    function changePartner() {
        return {
            restrict: 'E',
            scope: {
                partner: '=',
                vorgangid: '='
            },
            templateUrl: 'components/antragsteller-change-partner/antragsteller-change-partner.html',
            controller: 'changePartnerDirectiveController',
            controllerAs: 'vm',
            link: function (scope, elem, attrs) {
            }
        }
    }
})();