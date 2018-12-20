;(function () {

    "use strict";

    angular
        .module('directive.changePartner')
        .controller('changePartnerDirectiveController', changePartnerDirectiveController);

    function changePartnerDirectiveController($scope, antragsteller, dashboard) {
        var vm = this;

        vm.partner = '';
        vm.vorgangid = $scope.vorgangid;
        vm.partners = $scope.partners;

        vm.selectPartner = false;
        vm.showDialog = false;

        vm.checkedPartner = checkedPartner;

        dashboard.getPartners()
            .then(function (res) {
                vm.partners = res;
            });

        dashboard.getVorgangsPartners({
            vorgangId: vm.vorgangid
        })
            .then(function (res) {
                vm.partner = res.Name;
                vm.partnergeschaftList = res.Id;
            });

        function checkedPartner(vorgangId) {
            antragsteller.setPartner({
                partnerId: vm.partnergeschaftList,
                vorgangId: vorgangId
            }).then(function () {
                for (var i=0; i<vm.partners.length; i++) {
                    if (vm.partners[i].AdressenId === vm.partnergeschaftList) {
                        vm.partner = vm.partners[i].Nachname+','+ vm.partners[i].Vorname;
                    }
                }
                vm.selectPartner = false;
                vm.showDialog = false;
            })
        }

    }

})();