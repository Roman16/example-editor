;(function () {

    'use strict';

    angular.module('app')
        .controller('ClientStatisticController', ClientStatisticController);

    ClientStatisticController.$inject = ['$state', 'client_statistic', 'url'];


    function ClientStatisticController($state, client_statistic, url) {
        let vm = this;
        vm.client_list = [];
        vm.limit_page = '10';
        vm.page = 1;
        vm.loading = true;
        vm.sort_params = {
            orderBy: '',
            orderType: ''
        };
        vm.abgerechnet_from = '';
        vm.abgerechnet_to = '';

        client_statistic.getClient({
            page: 1,
            limit: 10
        }).then(function (res) {
            vm.client_list = res;
            vm.loading = false;
        });

        vm.selectPage = selectPage;
        vm.convertDate = convertDate;
        vm.sortClient = sortClient;
        vm.downloadFile = downloadFile;

        function selectPage(page, limit) {
            vm.loading = true;
            vm.client_list = [];

            vm.abgerechnet_from = vm.date_from ? moment(vm.date_from).format('YYYY-MM-DD') : '';
            vm.abgerechnet_to = vm.date_to ? moment(vm.date_to).format('YYYY-MM-DD') : '';
            client_statistic.getClient({
                orderBy: vm.sort_params.orderBy,
                orderType: vm.sort_params.orderType,
                page: limit ? 1 : page,
                limit: vm.limit_page,
                abgerechnetFrom: vm.abgerechnet_from ? vm.abgerechnet_from : '',
                abgerechnetTo: vm.abgerechnet_to ? vm.abgerechnet_to : ''
            }).then(function (res) {
                vm.client_list = res;
                vm.page = page;
                vm.loading = false;
            })
        }

        function convertDate(date) {
            if (date) {
                return moment(date).format('DD.MM.YYYY')
            } else {
                return date;
            }
        }

        function sortClient(param) {
            vm.loading = true;
            vm.client_list = [];

            vm.abgerechnet_from = vm.date_from ? moment(vm.date_from).format('YYYY-MM-DD') : '';
            vm.abgerechnet_to = vm.date_to ? moment(vm.date_to).format('YYYY-MM-DD') : '';
            client_statistic.getClient({
                orderBy: param ? param : vm.sort_params.orderBy,
                orderType: param ? (vm.sort_params.orderBy === param ? (vm.sort_params.orderType === 'ascending' ? 'descending' : 'ascending') : 'ascending') : '',
                page: 1,
                limit: vm.limit_page,
                abgerechnetFrom: vm.abgerechnet_from ? vm.abgerechnet_from : '',
                abgerechnetTo: vm.abgerechnet_to ? vm.abgerechnet_to : ''
            }).then(function (res) {
                vm.client_list = res;
                vm.sort_params.orderType =param ? (vm.sort_params.orderBy === param ? (vm.sort_params.orderType === 'ascending' ? 'descending' : 'ascending') : 'ascending') : '';
                vm.sort_params.orderBy = param;
                vm.page = 1;
                vm.loading = false;
            });
        }

        function downloadFile(type) {
            if (type === 'csv') {
                window.open(url.statistic.downloadClientStatisticCsv + '?orderBy=' + vm.sort_params.orderBy + '&orderType=' + vm.sort_params.orderType + '&abgerechnetFrom=' + vm.abgerechnet_from + '&abgerechnetTo=' + vm.abgerechnet_to);
            } else if (type === 'xls') {
                window.open(url.statistic.downloadClientStatisticXls + '?orderBy=' + vm.sort_params.orderBy + '&orderType=' + vm.sort_params.orderType + '&abgerechnetFrom=' + vm.abgerechnet_from + '&abgerechnetTo=' + vm.abgerechnet_to);
            }
        }
    }

})();