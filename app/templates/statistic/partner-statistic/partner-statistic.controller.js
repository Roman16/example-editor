;(function () {

    'use strict';

    angular.module('app')
        .controller('PartnerStatisticController', PartnerStatisticController);

    PartnerStatisticController.$inject = ['$state', 'partner_statistic', 'url', '$stateParams'];


    function PartnerStatisticController($state, partner_statistic, url, $stateParams) {
        let vm = this;
        vm.limit_page = '10';
        vm.page = 1;
        vm.partner_list = [];
        vm.loading = true;
        vm.sort_params = {
            orderBy: '',
            orderType: ''
        };

        partner_statistic.getPartner({
            page: 1,
            limit: 10
        }).then(function (res) {
            vm.partner_list = res;
            vm.loading = false;
        });

        vm.selectPage = selectPage;
        vm.sortPartner = sortPartner;
        vm.downloadFile = downloadFile;
        vm.goPartner = goPartner;
        vm.convertDate = convertDate;

        function convertDate(date) {
            if (date) {
                return moment(date).format('DD.MM.YYYY')
            } else {
                return date;
            }
        }


        function selectPage(page, limit) {
            vm.loading = true;
            vm.partner_list = [];

            partner_statistic.getPartner({
                orderBy: vm.sort_params.orderBy,
                orderType: vm.sort_params.orderType,
                page: limit ? 1 : page,
                limit: vm.limit_page
            }).then(function (res) {
                vm.partner_list = res;
                vm.page = page;
                vm.loading = false;
            })
        }

        function sortPartner(param) {
            vm.loading = true;
            vm.partner_list = [];

            partner_statistic.getPartner({
                orderBy: param ? param : vm.sort_params.orderBy,
                orderType: param ? (vm.sort_params.orderBy === param ? (vm.sort_params.orderType === 'ascending' ? 'descending' : 'ascending') : 'ascending') : '',
                page: 1,
                limit: vm.limit_page
            }).then(function (res) {
                vm.partner_list = res;
                vm.sort_params.orderType = vm.sort_params.orderBy === param ? (vm.sort_params.orderType === 'ascending' ? 'descending' : 'ascending') : 'ascending';
                vm.sort_params.orderBy = param;
                vm.page = 1;

                vm.loading = false;
            });
        }

        function goPartner(id) {
            // $stateParams.id = id;
            $state.go('app.adressenverwaltung.partner', {id: id})
        }

        function downloadFile(type) {
            if (type === 'csv') {
                window.open(url.statistic.downloadPartnerStatisticCsv + '?orderBy=' + vm.sort_params.orderBy + '&orderType=' + vm.sort_params.orderType);
            } else if (type === 'xls') {
                window.open(url.statistic.downloadPartnerStatisticXls + '?orderBy=' + vm.sort_params.orderBy + '&orderType=' + vm.sort_params.orderType);
            }
        }
    }
})();