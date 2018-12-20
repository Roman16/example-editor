;(function () {

    'use strict';

    angular.module('app')
        .controller('BriefvorlagenController', BriefvorlagenController);

    BriefvorlagenController.$inject = ['$scope', 'briefvorlagen', 'templates', '$sessionStorage', '$timeout', 'toastr', '$stateParams', '$localStorage', 'klient', '$sce'];


    function BriefvorlagenController($scope, briefvorlagen, templates, $sessionStorage, $timeout, toastr, $stateParams, $localStorage, klient, $sce) {
        let vm = this;
        vm.save = save;
        vm.remove = remove;

        vm.templates = templates;
        vm.showButton = true;
        vm.htmlContent = '';
        vm.removeDialogWindow = false;
        vm.saveDialogWindow = false;
        vm.newDialogWindow = false;
        vm.donwload = '';
        vm.clientId = $stateParams.id;
        vm.optionsDateFormat = {year: 'numeric', month: 'long', day: 'numeric'};
        vm.currentDate = moment(new Date).format('DD.MM.YYYY');
        vm.disabledButtonCreate = false;
        vm.disabledButtonSave = false;

        vm.id = false;
        vm.showWindow = false;
        vm.removeTrue = false;
        vm.showListBlock = 'bank';

        vm.onTemplateClick = onTemplateClick;
        vm.newTemplate = newTemplate;
        vm.removeItem = removeItem;
        vm.saveTemplate = saveTemplate;
        vm.createTemplate = createTemplate;
        // vm.pdfDownload = pdfDownload;
        vm.set = set;

        vm.Vorgang = $sessionStorage.entryid;
        vm.transactionId = sessionStorage.getItem('transactionId');

        const doc = new jsPDF();
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        // Editor options.
        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function () {
            // ...
        };

        CKEDITOR.on('instanceReady', function (e) {
            var selection = e.editor.getSelection();
            var range = selection.getRanges()[0];
            var cursor_position = range.startOffset;
        });

        CKEDITOR.addCss('body{width: 21cm;height: 29.7cm;border: 1px #D3D3D3 solid;box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);padding: 2.5cm; box-sizing: border-box; margin: 0 auto;}');
        CKEDITOR.addCss('body p{margin: 5px 0;}');
        CKEDITOR.addCss('span[lang]{font-style: normal !important;}');


        vm.getCKCursorPosition = function () {

        };

        function set(info) {
            for (var key in CKEDITOR.instances) {
                CKEDITOR.instances[key].insertText(info);
                break;
            }
            // CKEDITOR.instances['editor1'].insertText(info);
            // vm.rango.insertNode(document.createTextNode(info));
            // return sel.getRangeAt(0);
        }


        /**
         *
         * @param download
         */


        function save(download) {
            vm.donwload = download;

            vm.htmlContentString = [];

            if (!vm.id) {
                vm.newDialogWindow = true;
            } else {
                vm.saveDialogWindow = true;
            }


            // doc.fromHTML(vm.testhtmlContent, 15, 15, {
            //     'width': 170,
            //     'elementHandlers': specialElementHandlers
            // });
            // const fileName = vm.name + '.pdf';
            // doc.save(fileName);
            // location.reload();


            // html2canvas(document.getElementById('myHTML'), {
            //     onrendered: function (canvas) {
            //         var data = canvas.toDataURL();
            //         var docDefinition = {
            //             content: [{
            //                 image: data,
            //                 width: 500,
            //             }]
            //         };
            //         pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
            //     }
            // });
        }

        function saveTemplate() {
            if (vm.donwload) {
                CKEDITOR.instances.editor1.execCommand('print');
            }
            vm.disabledButtonSave = true;
            $timeout(function () {
                vm.disabledButtonSave = false;
                vm.saveDialogWindow = false;
            }, 100);

            const user = JSON.parse(sessionStorage.getItem('user'));
            const requestParams = {
                "Id": vm.id,
                "Name": vm.name,
                "Content": `<div id="template-wrapper" style=" margin: 0 auto; padding: 2.5cm 3.22cm; word-spacing: 0px; box-sizing: border-box; font-size: 20px; font-weight: normal; letter-spacing: 0px">` + vm.htmlContent +
                `</div>`,
                "User": user.Benutzername,
                "AuthKey": user.AuthKey,
            };
            if (vm.VorgangId) {
                vm.VorgangId = vm.Vorgang ? vm.Vorgang : vm.user.AntragstellerId;
            }
            briefvorlagen.updateData(requestParams, vm.donwload, vm.Vorgang)
                .then(function (res) {
                    if (vm.donwload) {
                        // try {
                        //     window.open(res, '_blank')
                        // }
                        // catch (e) {
                        //     alert('Unknown error');
                        // }
                    }
                    briefvorlagen.getData()
                        .then(function (res) {
                            vm.templates = res;
                            vm.saveDialogWindow = false;
                        });

                    vm.htmlContentString = [];
                });
        }

        function createTemplate() {
            vm.disabledButtonCreate = true;
            $timeout(function () {
                vm.disabledButtonCreate = false;
            }, 5000);

            if (!vm.id) {
                for (var i = 0; i < vm.templates.length; i++) {
                    if (vm.templates[i].Name === vm.nameFile) {
                        vm.newTemplateName = false;
                        toastr.error('Template with such name allready exisrs');
                        break
                    } else {
                        vm.newTemplateName = true;
                    }
                }

                if (vm.nameFile && vm.newTemplateName) {
                    const user = JSON.parse(sessionStorage.getItem('user'));
                    const requestParams = {
                        "Name": vm.nameFile,
                        "Content": `<div id="template-wrapper" style=" margin: 0 auto;padding: 2.5cm 3.29cm; word-spacing: 0px; box-sizing: border-box; font-size:209px; font-weight: normal;letter-spacing: 0px">` + vm.htmlContentString +
                        `</div>`,
                        "User": user.Benutzername,
                        "AuthKey": user.AuthKey,

                    };
                    if (vm.id) requestParams.Id = vm.id;
                    briefvorlagen.updateData(requestParams, vm.donwload)
                        .then(function () {

                            if (vm.donwload) {
                                try {
                                    window.open('http://' + res, '_blank')
                                }
                                catch (e) {
                                    alert('Unknown error');
                                }
                            }
                            briefvorlagen.getData()
                                .then(function (res) {
                                    vm.templates = res;
                                    vm.nameFile = '';
                                    vm.newDialogWindow = false;
                                });

                            vm.htmlContentString = [];
                        });
                }
            } else {
                vm.newDialogWindow = false;
            }
        }

        /**
         *
         * @param item
         * @param index
         */

        vm.removeItemIndex = '';
        vm.removeItemId = '';

        function remove(item, index) {
            vm.removeDialogWindow = true;

            vm.removeItemIndex = index;
            vm.removeItemId = item.Id;
        };

        function removeItem() {
            briefvorlagen.remove(vm.removeItemId)
                .then(function () {
                    vm.templates.splice(vm.removeItemIndex, 1);
                    vm.removeDialogWindow = false;

                    vm.id = false;
                    vm.name = '';
                    vm.htmlContent = '';
                })
        };

        vm.bankVariablesList = $sessionStorage.bankVariablesList;
        vm.partnerVariablesList = $sessionStorage.partnerVariablesList;
        vm.klientVariablesList = $sessionStorage.klientVariablesList;
        vm.clientVorgang = klient;

        function onTemplateClick(template) {
            // debugger;
            let createTemp = document.createElement('div');
            createTemp.innerHTML = template.Content;
            let tmpTemplateContent = createTemp.children[0].innerHTML;
            vm.id = template.Id;
            vm.name = template.Name;
            vm.htmlContent = tmpTemplateContent;

            // $timeout(function () {
            //     vm.testhtmlContent = CKEDITOR.instances.editor1.getData();
            //     $('#myHTML').html(vm.testhtmlContent);
            //
            // }, 100)


            //-----------------------------------------------------------------------------------------------------
            //replace variables
            //-----------------------------------------------------------------------------------------------------

            if (vm.bankVariablesList) {

                vm.htmlContent = vm.htmlContent
                    .replace(/\[datum\]/g, vm.currentDate)
                    .replace(/\[bank.anrede\]/g, vm.bankVariablesList.sex == undefined ? '' : (vm.bankVariablesList.sex == 1 ? "Herr" : "Frau"))
                    .replace(/\[bank.firmenname\]/g, vm.bankVariablesList.firmenname ? vm.bankVariablesList.firmenname : '')
                    .replace(/\[bank.straße\]/g, vm.bankVariablesList.street ? vm.bankVariablesList.street : '')
                    .replace(/\[bank.plz\]/g, vm.bankVariablesList.plz ? vm.bankVariablesList.plz : '')
                    .replace(/\[bank.ort\]/g, vm.bankVariablesList.ort ? vm.bankVariablesList.ort : '');

                if (vm.bankVariablesList.ansprechpartner) {
                    vm.htmlContent = vm.htmlContent
                        .replace(/\[bank.ansprechpartner.sehr.geehrte\(r\)\]/g, vm.bankVariablesList.ansprechpartner.Salutation ? (vm.bankVariablesList.ansprechpartner.Salutation == 'Herr' ? 'Sehr geehrter' : 'Sehr geehrte') : '')
                        .replace(/\[bank.ansprechpartner.anrede\]/g, vm.bankVariablesList.ansprechpartner.Salutation ? vm.bankVariablesList.ansprechpartner.Salutation : '')
                        .replace(/\[bank.ansprechpartner.name\]/g, vm.bankVariablesList.ansprechpartner.Name ? vm.bankVariablesList.ansprechpartner.Name : '')
                        .replace(/\[bank.ansprechpartner.vorname\]/g, vm.bankVariablesList.ansprechpartner.Vorname ? vm.bankVariablesList.ansprechpartner.Vorname : '');
                }

                if (vm.clientVorgang) {
                    vm.htmlContent = vm.htmlContent
                        .replace(/\[bank.klient.vorname\]/g, vm.clientVorgang.vorname ? vm.clientVorgang.vorname : '')
                        .replace(/\[bank.klient.sehr.geehrte\(r\)\]/g, vm.clientVorgang.sex == undefined ? '' : (vm.clientVorgang.sex == 1 ? "Sehr geehrter" : "Sehr geehrte"))
                        .replace(/\[bank.klient.anrede\]/g, vm.clientVorgang.sex == undefined ? '' : (vm.clientVorgang.sex == 1 ? "Herr" : "Frau"))
                        .replace(/\[bank.klient.name\]/g, vm.clientVorgang.second_name ? vm.clientVorgang.second_name : '')
                        .replace(/\[bank.klient.straße\]/g, vm.clientVorgang.street ? vm.clientVorgang.street : '')
                        .replace(/\[bank.klient.plz\]/g, vm.clientVorgang.plz ? vm.clientVorgang.plz : '')
                        .replace(/\[bank.klient.ort\]/g, vm.clientVorgang.ort ? vm.clientVorgang.ort : '');
                }

            } else if (vm.partnerVariablesList) {

                vm.htmlContent = vm.htmlContent
                    .replace(/\[partner.sehr.geehrte\(r\)\]/g, vm.partnerVariablesList.sex == undefined ? '' : (vm.partnerVariablesList.sex == 1 ? "Sehr geehrter" : "Sehr geehrte"))
                    .replace(/\[datum\]/g, vm.currentDate)
                    .replace(/\[partner.anrede\]/g, vm.partnerVariablesList.sex == undefined ? '' : (vm.partnerVariablesList.sex == 1 ? "Herr" : "Frau"))
                    .replace(/\[partner.name\]/g, vm.partnerVariablesList.second_name ? vm.partnerVariablesList.second_name : '')
                    .replace(/\[partner.vorname\]/g, vm.partnerVariablesList.vorname ? vm.partnerVariablesList.vorname : '')
                    .replace(/\[partner.straße\]/g, vm.partnerVariablesList.street ? vm.partnerVariablesList.street : '')
                    .replace(/\[partner.plz\]/g, vm.partnerVariablesList.plz ? vm.partnerVariablesList.plz : '')
                    .replace(/\[partner.ort\]/g, vm.partnerVariablesList.ort ? vm.partnerVariablesList.ort : '');

                if (vm.partnerVariablesList.ansprechpartner) {
                    vm.htmlContent = vm.htmlContent
                        .replace(/\[partner.ansprechpartner.sehr.geehrte\(r\)\]/g, vm.partnerVariablesList.ansprechpartner.Salutation ? (vm.partnerVariablesList.ansprechpartner.Salutation == 'Herr' ? 'Sehr geehrter' : 'Sehr geehrte') : '')
                        .replace(/\[partner.ansprechpartner.anrede\]/g, vm.partnerVariablesList.ansprechpartner.Salutation ? vm.partnerVariablesList.ansprechpartner.Salutation : '')
                        .replace(/\[partner.ansprechpartner.name\]/g, vm.partnerVariablesList.ansprechpartner.Name ? vm.partnerVariablesList.ansprechpartner.Name : '')
                        .replace(/\[partner.ansprechpartner.vorname\]/g, vm.partnerVariablesList.ansprechpartner.Vorname ? vm.partnerVariablesList.ansprechpartner.Vorname : '');
                }

                if (vm.clientVorgang) {
                    vm.htmlContent = vm.htmlContent
                        .replace(/\[partner.klient.vorname\]/g, vm.clientVorgang.vorname ? vm.clientVorgang.vorname : '')
                        .replace(/\[partner.klient.sehr.geehrte\(r\)\]/g, vm.clientVorgang.sex == undefined ? '' : (vm.clientVorgang.sex == 1 ? "Sehr geehrter" : "Sehr geehrte"))
                        .replace(/\[partner.klient.anrede\]/g, vm.clientVorgang.sex == undefined ? '' : (vm.clientVorgang.sex == 1 ? "Herr" : "Frau"))
                        .replace(/\[partner.klient.name\]/g, vm.clientVorgang.second_name ? vm.clientVorgang.second_name : '')
                        .replace(/\[partner.klient.straße\]/g, vm.clientVorgang.street ? vm.clientVorgang.street : '')
                        .replace(/\[partner.klient.plz\]/g, vm.clientVorgang.plz ? vm.clientVorgang.plz : '')
                        .replace(/\[partner.klient.ort\]/g, vm.clientVorgang.ort ? vm.clientVorgang.ort : '');
                }

            } else if (vm.klientVariablesList) {

                vm.htmlContent = vm.htmlContent
                    .replace(/\[klient.sehr.geehrte\(r\)\]/g, vm.klientVariablesList.sex == undefined ? '' : (vm.klientVariablesList.sex == 1 ? "Sehr geehrter" : "Sehr geehrte"))
                    .replace(/\[datum\]/g, vm.currentDate)
                    .replace(/\[klient.anrede\]/g, vm.klientVariablesList.sex == undefined ? '' : (vm.klientVariablesList.sex == 1 ? "Herr" : "Frau"))
                    .replace(/\[klient.name\]/g, vm.klientVariablesList.second_name ? vm.klientVariablesList.second_name : '')
                    .replace(/\[klient.vorname\]/g, vm.klientVariablesList.vorname ? vm.klientVariablesList.vorname : '')
                    .replace(/\[klient.straße\]/g, vm.klientVariablesList.street ? vm.klientVariablesList.street + " " + vm.klientVariablesList.house : '')
                    .replace(/\[klient.plz\]/g, vm.klientVariablesList.plz ? vm.klientVariablesList.plz : '')
                    .replace(/\[klient.ort\]/g, vm.klientVariablesList.ort ? vm.klientVariablesList.ort : '')
            }
        }

        function newTemplate() {
            vm.id = false;
            vm.name = '';
            vm.htmlContent = '';
        }


    }

})();