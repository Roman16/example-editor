;(function () {

    'use strict';

    angular.module('model.antragsteller', [])
        .service('antragsteller', antragsteller);

    antragsteller.$inject = ['http', 'url', '$stateParams'];

    function antragsteller(http, url, $stateParams) {

        const MENU_LEFT = [
            {
                name: 'Bank- und Sparguthaben',
                max: 1,
                current: 0,
                identify: 'BankSparguthaben',
                items: []
            },
            {
                name: 'Wertpapiere / Aktien',
                max: 1,
                current: 0,
                identify: 'WertpapiereAktien',
                items: []
            },
            {
                name: 'Bausparvertrag',
                max: 3,
                current: 0,
                identify: 'Bausparvertrag',
                items: []
            },
            {
                name: 'Lebens-/ Rentenversicherung',
                max: 3,
                current: 0,
                identify: 'LebensRentenversicherung',
                items: []
            },
            {
                name: 'Sparpläne',
                max: 1,
                current: 0,
                identify: 'Sparplane',
                items: []
            },
            {
                name: 'Sonstiges Vermögen',
                max: 1,
                current: 0,
                identify: 'SonstigesVermogen',
                items: []
            },
            {
                name: 'Einkünfte aus Nebentätigkeit',
                max: 3,
                current: 0,
                identify: 'EinkunfteNebentatigkeit',
                items: []
            },
            {
                name: 'Unbefristete Zusatzrente',
                max: 1,
                current: 0,
                identify: 'UnbefristeteZusatzrente',
                items: []
            },
            {
                name: 'Ehegattenunterhalt',
                max: 1,
                current: 0,
                identify: 'Ehegattenunterhalt',
                items: []
            },
            {
                name: 'Variable Einkünfte',
                max: 1,
                current: 0,
                identify: 'VariableEinkunfte',
                items: []
            },
            {
                name: 'Sonstige Einnahmen',
                max: 1,
                current: 0,
                identify: 'SonstigeEinnahmen',
                items: []
            },
            {
                name: 'Mieteinnahmen',
                max: 1,
                current: 0,
                identify: 'Mieteinnahmen',
                items: []
            }
        ];
        const MENU_RIGHT = [
            {
                name: 'Mietausgaben',
                max: 9,
                current: 0,
                identify: 'Mietausgaben',
                items: []
            },
            {
                name: 'Unterhaltsverpflichtungen',
                max: 3,
                current: 0,
                identify: 'Unterhaltsverpflichtungen',
                items: []
            },
            {
                name: 'Private Krankenversicherung',
                max: 1,
                current: 0,
                identify: 'PrivateKrankenversicherung',
                items: []
            },
            {
                name: 'Sonstige Ausgaben',
                max: 1,
                current: 0,
                identify: 'SonstigeAusgaben',
                items: []
            },
            {
                name: 'Sonstige Versicherungsausgaben',
                max: 1,
                current: 0,
                identify: 'SonstigeVersicherungsausgaben',
                items: []
            },
            {
                name: 'Ratenkredit / Leasing',
                max: 9,
                current: 0,
                identify: 'RatenkreditLeasing',
                items: []
            },
            {
                name: 'Privates Darlehen',
                max: 3,
                current: 0,
                identify: 'PrivatesDarlehen',
                items: []
            },
            {
                name: 'Sonstige Verbindlichkeiten',
                max: 1,
                current: 0,
                identify: 'SonstigeVerbindlichkeiten',
                items: []
            }
        ];

        let service = {
            menu: {left: MENU_LEFT, right: MENU_RIGHT},
            findElementById: _findElementById,
            getData: getData,
            convertDateFromString: convertDateFromString,
            convertAllDateFromString: convertAllDateFromString,
            convertFromString: convertFromString,
            convertToString: convertToString,
            update: update,
            getAblehnung: getAblehnung,
            getCreditInform: getCreditInform,
            setPartner: setPartner,
            deleteVorgang: deleteVorgang
        };
        return service;


        function getData(Id) {
            let data = {
                Id: Id
            };
            return http.get(url.anstragsteller.index, data)
                .then(function (res) {
                    return res;
                });
        }

        function update(data) {
            return http.post(url.anstragsteller.update, data)
                .then(function (res) {
                    return res;
                });
        }

        function getCreditInform(data) {
            return http.post(url.anstragsteller.getCreditInform, data)
                .then(function (res) {
                  return res;
                })
        }

        function _findElementById(id, side, bank_list) {
            let result;
            if (side === 'L') {
                bank_list.left.some(function (item) {
                    if (item.identify === id) {
                        result = item;
                        return true;
                    }

                })
            } else {
                bank_list.right.some(function (item) {
                    if (item.identify === id) {
                        result = item;
                        return true;
                    }
                })
            }
            return result;
        }

        function convertDateFromString(date) {
            if (date !== null){
                return moment(date).toDate();
                // return new Date(moment(date, 'DD.MM.YYYY').format());
            } else {
                // return new Date();
            }
        }

        function convertAllDateFromString(date) {
            if (date !== null){
                return moment(date).toDate();

            }else {
                return date;
            }
        }

        function convertFromString(date) {
            if (date !== null) {
               return moment(date).toDate();
            } else {
                return new Date();
            }
        }
        function convertToString(date) {
            if (date !== null) {

                // return  moment(date).toDate();
                return  date;

            } else {
                return new Date();
            }
        }

        function setPartner(data) {
            return http.post(url.anstragsteller.setPartner, data)
                .then(function (res) {
                    return res;
                });
        }

        function deleteVorgang(data) {
            return http.post(url.dashboard.delete_vorgang, data)
                .then(function (res) {
                });
        }

        function getAblehnung() {
            return [
                'nicht abgelehnt',
                'neg. Schufa',
                'Scoring',
                'ausgelastet',
                'zu kurz beschäftigt',
                'zu geringes Einkommen',
                'keine Angaben',
                'neg. Schweiz',
                'neg. AGR',
                'schleppende Zw',
                'Kunde-Rücktritt Widerruf',
                'Langzeitkrank',
                'neg. Kontoführung',
                'Kredit Rechtsabteilung',
                'negative VC',
                'Siehe Kommentarfeld',
                'Siehe Wiedervorlage',
            ];
        }
    }

})();