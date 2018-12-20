;(function () {

    'use strict';

    angular.module('app')
        .controller('PartnerController', PartnerController);

    PartnerController.$inject = ['partner', '$state', '$sessionStorage', 'toastr', 'registration', 'users_list', '$timeout', '$stateParams'];


    function PartnerController(partner, $state, $sessionStorage, toastr, registration, users_list, $timeout, $stateParams) {
        let vm = this;

        vm.selectedPartner = {};
        vm.selectClient = [];
        vm.partnerVariablesList = {};
        vm.sortingLog = [];
        vm.groupeList = users_list;

        vm.showNewPartner = false;
        vm.DialogWindow = false;
        vm.search = '';
        vm.download = true;
        vm.usedClient = true;
        vm.selectClientId = '';
        vm.autocompleteText = '';
        vm.idClientPartner = '';
        vm.allVorgangsList = [];
        vm.idSelectPartner = '';
        vm.AdressenId = $stateParams.id;
        vm.showTemplate = 1;

        vm.newPartner = newPartner;
        vm.selectPartner = selectPartner;
        vm.addPartner = addPartner;
        vm.updatePartner = updatePartner;
        vm.removePartner = removePartner;
        vm.removeDialog = removeDialog;
        vm.addPersons = addPersons;
        // vm.selectPerson = selectPerson;
        vm.removePerson = removePerson;
        vm.showClientList = showClientList;
        vm.vornameClicked = vornameClicked;
        vm.sendMessage = sendMessage;
        vm.deleteContactPersons = deleteContactPersons;
        vm.convertAllDateFromString = convertAllDateFromString;
        vm.selectGroupUser = selectGroupUser;
        vm.updateUser = updateUser;
        vm.deletePartner = deletePartner;
        vm.changeRating = changeRating;
        vm.selectPage = selectPage;


        vm.sortableOptions = {
            connectWith: ".connected-apps-container",
            start: function (e, ui) {
                vm.sourceModelClone = ui.item.sortable.sourceModel.slice();
            },
            stop: function (e, ui) {
                // if the element is removed from the first container
                if (
                    $(e.target).hasClass("first") &&
                    ui.item.sortable.droptarget &&
                    e.target != ui.item.sortable.droptarget[0]
                ) {
                    ui.item.sortable.sourceModel.length = 0;
                    // clone the original model to restore the removed item
                    Array.prototype.push.apply(
                        ui.item.sortable.sourceModel,
                        vm.sourceModelClone
                    );
                    vm.sourceModelClone = null;
                }
            },
            update: function (event, ui) {
                if (// ensure we are in the first update() callback
                    !ui.item.sortable.received &&
                    // check that its an actual moving
                    // between the two lists
                    ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0] &&
                    // check the size limitation
                    ui.item.sortable.droptargetModel.length >= 1) {
                    ui.item.sortable.cancel();
                }
            }
        };

        function deletePartner(index) {
            vm.arrPartner.splice(index, 1);
        }

        function convertAllDateFromString(date) {
            if (date) {
                return moment(date).toDate();
            } else {
                return date;
            }
        }

        partner.getPartners({})
            .then(function (res) {
                vm.partnerList = res;
                vm.selectedPartner = vm.partnerList[0];
                vm.download = false;

                partner.selectPartner({
                    id: vm.AdressenId ? vm.AdressenId : vm.partnerList[0].AdressenId
                }).then(function (res) {
                    res.CreateDate = moment(res.CreateDate).toDate();
                    vm.selectedPartner = res;
                    vm.arrPartner = [];
                    for (var i = 0; i < vm.groupeList.length; i++) {
                        if (vm.groupeList[i].BenutzerId == vm.selectedPartner.Partners) {
                            vm.arrPartner = [vm.groupeList[i]];
                        }
                    }
                });

                partner.ClientList({
                    id: vm.partnerList[0].AdressenId,
                    page: 1
                }).then(function (res) {
                    vm.selectClient = res;

                })

                partner.getAllVorgangs({
                    id: vm.partnerList[0].AdressenId
                }).then(function (res) {
                    vm.allVorgangsList = res;
                })


            });

        vm.blurAutocomplete = function () {
            $timeout(function () {
                vm.show_autocomplete = false;
            }, 500)
        };

        vm.selectClientForBriefvorlage = function (client) {
            vm.autocompleteText = client.Vorname;
            vm.idClientPartner = client.VorgangId;
            vm.show_autocomplete = false;
        };

        function changeRating(i) {
            if(vm.selectedPartner.AnkerButton == i ) {
                vm.selectedPartner.AnkerButton = 0;
            } else {
                vm.selectedPartner.AnkerButton = i;
            }
            updatePartner(vm.selectedPartner)
        }

        function selectGroupUser(id) {
            vm.showKlientList = true;
            vm.selectClient = [];
            vm.selectClientId = id;
            vm.usedClient = false;

            partner.selectUser({
                userId: id,
                page: 1
            }).then(function (res) {
                vm.selectClient = res;
                vm.showKlientList = false;
            });

            partner.getGroupUser({
                Id: id
            }).then(function (res) {
                vm.selectedPartner = res;
            });
        }

        function updateUser(data) {
            for (var i = 0; i < data.ContactPersons.length; i++) {
                data.ContactPersons[i].dtmDate = moment(data.ContactPersons[i].dtmDate).toDate();
            }

            partner.updateGroupUser(data)
                .then(function (res) {
                    toastr.success('Updated successfully');
                });
        }

        function selectPage(index) {
            if (vm.usedClient) {
                partner.ClientList({
                    id: vm.selectClientId,
                    page: index
                }).then(function (res) {
                    vm.selectClient = res;
                    vm.showKlientList = false;
                })

            } else {
                partner.selectUser({
                    userId: vm.selectClientId,
                    page: index
                }).then(function (res) {
                    vm.selectClient = res;
                    vm.showKlientList = false;
                })
            }
        }

        function newPartner() {
            vm.selectedPartner = {
                CreateDate: new Date()
            };
            vm.showNewPartner = true;
            vm.selectedPartner.ContactPersons = [];
        }

        function selectPartner(item) {
            vm.selectClientId = item.AdressenId;
            vm.usedClient = true;
            vm.arrPartner = [];

            partner.selectPartner({
                id: item.AdressenId
            }).then(function (res) {
                res.CreateDate = moment(res.CreateDate).toDate();
                vm.showNewPartner = false;
                vm.selectedPartner = res;
                vm.listPerson = vm.selectedPartner.ContactPersons;
                for (var i = 0; i < vm.groupeList.length; i++) {
                    if (vm.groupeList[i].BenutzerId == vm.selectedPartner.Partners) {
                        vm.arrPartner = [vm.groupeList[i]];
                    }
                }

            });

            partner.ClientList({
                id: vm.selectClientId,
                page: 1
            }).then(function (res) {
                vm.selectClient = res;
            })

            partner.getAllVorgangs({
                id: vm.selectClientId
            }).then(function (res) {
                vm.allVorgangsList = res;
            })
        }

        function addPartner(item_partner) {
            partner.addPartner(
                item_partner
            ).then(function (res) {
                toastr.success('Erfolgreich hinzugefügt');
                vm.partnerList = res.Data;
                vm.partner = {};
            });
        }

        function updatePartner(item_partner) {
            for (var i = 0; i < item_partner.ContactPersons.length; i++) {
                item_partner.ContactPersons[i].dtmDate = moment(item_partner.ContactPersons[i].dtmDate).toDate();
            }

            if (vm.arrPartner[0]) {
                vm.selectedPartner.Partners = String(vm.arrPartner[0].BenutzerId);
            } else {
                vm.selectedPartner.Partners = null;
            }
            partner.updatePartner(
                item_partner
            ).then(function (res) {
                toastr.success('Aktualisiert');
            });
        }

        function removeDialog(partner) {
            vm.DialogWindow = true;

            vm.idSelectPartner = partner.AdressenId;
        }

        function removePartner() {
            partner.removePartner({
                id: vm.idSelectPartner
            }).then(function (res) {
                toastr.success('Erfolgreich entfert');
                vm.partner = {};
                vm.search = '';
                vm.selectedPartner = vm.partnerList[1];
                vm.partnerList = res.Data;

                vm.DialogWindow = false;
            });
        }

        function addPersons() {
            vm.selectedPartner.ContactPersons.push({
                Salutation: '',
                Vorname: '',
                Name: '',
                dtmDate: '',
                Position: '',
                Resort: '',
                Department: '',
                Email: '',
                HomePage: '',
                Phone: '',
                Funk: '',
                Fax: '',
                MemInfo: '',
            });
        }

        function deleteContactPersons(index) {
            vm.selectedPartner.ContactPersons.splice(index, 1);
        }


        function removePerson(item) {
            vm.selectedPartner.ContactPersons.splice(item, 1);
            vm.selectedPerson = vm.selectedPartner.ContactPersons[0];
        }

        function showClientList(id) {
            partner.ClientList({
                id,
                page: 1
            }).then(function (res) {
                vm.selectClient = res;
            })
        }

        function vornameClicked(code, id) {
            sessionStorage.setItem('transactionId', code);
            $state.go('app.tabs.antragsteller', {id: id});
        }

        function sendMessage() {
            $sessionStorage.value = {};
            if (vm.selectedPartner.Anrede === 'herr') {
                vm.partnerVariablesList.sex = 1;
            } else if (vm.selectedPartner.Anrede === 'frau') {
                vm.partnerVariablesList.sex = 0;
            } else {
                vm.partnerVariablesList.sex = undefined;
            }

            vm.partnerVariablesList.AntragstellerId = vm.selectedPartner.AdressenId;
            vm.partnerVariablesList.vorname = vm.selectedPartner.Vorname;
            vm.partnerVariablesList.second_name = vm.selectedPartner.Nachname;
            vm.partnerVariablesList.street = vm.selectedPartner.Street;
            vm.partnerVariablesList.plz = vm.selectedPartner.plz;
            vm.partnerVariablesList.ort = vm.selectedPartner.ort;
            vm.partnerVariablesList.firmenname = vm.selectedPartner.FirmName;

            for (var i = 0; i < vm.selectedPartner.ContactPersons.length; i++) {
                if (vm.selectedPartner.ContactPersons[i].Active) {
                    vm.partnerVariablesList.ansprechpartner = vm.selectedPartner.ContactPersons[i];
                    break;
                } else {
                    vm.partnerVariablesList.ansprechpartner = undefined;
                }
            }
            $sessionStorage.entryid = undefined;
            $sessionStorage.klientVariablesList = undefined;
            $sessionStorage.bankVariablesList = undefined;
            $sessionStorage.partnerVariablesList = vm.partnerVariablesList;

            if (vm.idClientPartner) {
                $state.go('app.briefvorlagen', {id: vm.idClientPartner});
            } else {
                $state.go('app.briefvorlagen');
            }

        }

    }

})();