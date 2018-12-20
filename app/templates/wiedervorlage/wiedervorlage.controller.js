;(function () {

    'use strict';

    angular.module('app')
        .controller('WiedervorlageController', WiedervorlageController);

    WiedervorlageController.$inject = ['$scope', '$stateParams', 'users', 'wiedervorlage', '$timeout'];


    function WiedervorlageController($scope, $stateParams, users, wiedervorlage, $timeout) {
        let vm = this;
        vm.openComment = openComment;
        vm.getRecortdByFilter = getRecortdByFilter;
        vm.search = search;
        vm.convertAllDateFromString = convertAllDateFromString;
        vm.submitAntragDate = submitAntragDate;
        vm.selectPage = selectPage;
        vm.deleteAntragDate = deleteAntragDate;
        vm.deleteAnfragDate = deleteAnfragDate;

        vm.filter = {
            user: "All",
            uber: false,
            keine: false,
            heute: false,
            morgen: false,
            inden: false,
            spater: false,
            searchKey: null
        };

        if ($stateParams.user) {
            vm.filter.user = $stateParams.user;
            vm.filter.heute = true;
            vm.filter.uber = true;
        }

        vm.commentmain = {};
        vm.vorgangs = [];

        vm.getRecortdByFilter();
        vm.commentVisible = false;
        vm.users = users;
        vm.showList = true;
        vm.isOnRequest = false;
        vm.newDate = new Date();
        vm.showAntragDialog = false;
        vm.showAnfragDialog = false;
        vm.curentItem = 0;
        vm.openAntrag = false;

        function convertAllDateFromString(date) {
            if (date !== null) {
                return moment(date).toDate();
            } else {
                return date;
            }
        }

        function submitAntragDate(data, fromAntrag, index) {
            if (fromAntrag == 'antrag') {
                vm.date = moment(data.AntragWiedervorlageDate).format('YYYY-MM-DD') + 'T00:00:00+0000'
                wiedervorlage.submitAntragDate({
                    id: data.AntragId,
                    wiedervorlage: vm.date,
                    FromAnfrage: false
                });
            } else if (fromAntrag == 'anfrag') {
                vm.date = moment(data.AnfrageWiedervorlageDate).format('YYYY-MM-DD') + 'T00:00:00+0000'
                wiedervorlage.submitAntragDate({
                    id: data.AnfrageID,
                    wiedervorlage: vm.date,
                    FromAnfrage: true
                });
            }
        }

        function deleteAntragDate() {
            wiedervorlage.deleteOffDate({
                id: vm.vorgangs.data[vm.curentItem].AntragId,
                filter: vm.filter
            }).then(function (res) {
                $scope.$emit('deleteDate');
                if (res) {
                    vm.vorgangs.data[vm.curentItem] = res;
                    vm.vorgangs.data[vm.curentItem].AnfrageWiedervorlageDate = moment(res.AnfrageWiedervorlageDate).toDate();
                    vm.vorgangs.data[vm.curentItem].AntragWiedervorlageDate = res.AntragWiedervorlageDate ? moment(res.AntragWiedervorlageDate).toDate() : null;
                    vm.vorgangs.data[vm.curentItem].WiedervorlageDate = moment(res.WiedervorlageDate).toDate();
                    vm.vorgangs.data[vm.curentItem].WiedervorlageChangedDate = vm.newDate;
                } else {
                    vm.vorgangs.data[vm.curentItem].AntragWiedervorlageDate = null;
                    vm.vorgangs.data[vm.curentItem].WiedervorlageChangedDate = vm.newDate;
                }

                vm.showAntragDialog = false;
            });

        }

        function deleteAnfragDate() {
            wiedervorlage.deleteDate({
                id: vm.vorgangs.data[vm.curentItem].AnfrageID,
                filter: vm.filter
            }).then(function (res) {
                $scope.$emit('deleteDate');
                if (res) {
                    vm.vorgangs.data[vm.curentItem] = res;
                    vm.vorgangs.data[vm.curentItem].AnfrageWiedervorlageDate = moment(res.AnfrageWiedervorlageDate).toDate();
                    vm.vorgangs.data[vm.curentItem].AntragWiedervorlageDate = res.AntragWiedervorlageDate ? moment(res.AntragWiedervorlageDate).toDate() : null;
                    vm.vorgangs.data[vm.curentItem].WiedervorlageDate = moment(res.WiedervorlageDate).toDate();
                    vm.vorgangs.data[vm.curentItem].WiedervorlageChangedDate = vm.newDate;

                } else {
                    vm.vorgangs.data[vm.curentItem].AnfrageWiedervorlageDate = null;
                    vm.vorgangs.data[vm.curentItem].AntragWiedervorlageDate = null;
                    vm.vorgangs.data[vm.curentItem].Anfrages = 0;
                    vm.vorgangs.data[vm.curentItem].WiedervorlageDate = moment(res.WiedervorlageDate).toDate();
                    vm.vorgangs.data[vm.curentItem].WiedervorlageChangedDate = vm.newDate;
                }
                vm.showAnfragDialog = false;
            });

        }

        function openComment(data, from) {
            vm.commentmain = undefined;
            $timeout(function () {
                vm.commentmain = data;
                vm.commentmain.type = from == 'antrag' ? true : false;
                vm.commentVisible = true;
            }, 100)
        }

        function getRecortdByFilter() {
            vm.showList = false;
            vm.filter.searchKey = '';
            vm.data = vm.filter;

            wiedervorlage.getVorgangs(vm.filter).then(function (res) {
                vm.vorgangs = res;
                vm.showList = true;
            });
        }

        function search(str) {
            vm.data = vm.filter;
            vm.data.page = 1;
            vm.data.searchKey = str;
            if (vm.isOnRequest) {
                $timeout(function () {
                    search(str);
                }, 250)
            } else {
                if (str === $scope.searchText) {
                    vm.vorgangs = [];
                    getMembers(vm.data)
                }
            }
        }

        function getMembers(data) {
            vm.isOnRequest = true;
            wiedervorlage.getAllMembers(data)
                .then(function (res) {
                    vm.vorgangs = res;
                    vm.isOnRequest = false;
                })
        }

        function selectPage(index) {
            vm.data = vm.filter;
            vm.data.page = index;
            wiedervorlage.getAllMembers(vm.data)
                .then(function (res) {
                    vm.vorgangs = res;
                })
        }

        $(window).scroll(function () {
            if ($(this).scrollTop() > 135) {
                $('.filter-block').addClass('fixed');
                $('.comment-block').addClass('fixed');
            } else {
                $('.filter-block').removeClass('fixed');
                $('.comment-block').removeClass('fixed');
            }
        });

    }
})();