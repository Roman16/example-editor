;(function () {
    angular
        .module('app')
        .config(mainConfig);


    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'templates/header/header.html',
                controller: 'HeaderController',
                controllerAs: 'vm',
            })
            .state('app.tabs', {
                abstract: true,
                templateUrl: 'templates/tabs/tabs.html',
                controller: 'TabsController',
                controllerAs: 'vm',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
            })
            .state('app.registration', {
                url: "/registration",
                templateUrl: 'templates/registration/registration.html',
                controller: 'RegistrationController',
                controllerAs: 'vm',
                resolve: {
                    users_list: function (registration) {
                        return registration.getAllUsers()
                            .then(function (res) {
                                return res;
                            });

                    },
                }
            })
            .state('app.dashboard', {
                url: "/dashboard",
                templateUrl: 'templates/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                resolve: {

                    users_data: function (dashboard) {
                        return dashboard.getAllMembers()
                            .then(function (res) {
                                return res;
                            });

                    },

                    werbung: function (dashboard) {
                        return dashboard.getWerbung()
                            .then(function (res) {
                                return res;
                            });
                    },
                    kontaktar: function (dashboard) {
                        return dashboard.getKontaktart()
                        // .then(function (res) {
                        //     return res;
                        // });
                    },
                }
            })
            .state('app.wiedervorlage', {
                url: "/wiedervorlage",
                templateUrl: 'templates/wiedervorlage/wiedervorlage.html',
                controller: 'WiedervorlageController',
                controllerAs: 'vm',
                params: {
                    user: '',
                },
                resolve: {
                    users: function (wiedervorlage) {
                        return wiedervorlage.getData()
                            .then(function (res) {
                                return res;
                            });
                    }
                }
            })
            .state('app.briefvorlagen', {
                url: "/briefvorlagen/:id",
                templateUrl: 'templates/briefvorlagen/briefvorlagen.html',
                controller: 'BriefvorlagenController',
                controllerAs: 'vm',
                resolve: {
                    templates: function (briefvorlagen) {
                        return briefvorlagen.getData()
                            .then(function (res) {
                                return res;
                            });
                    },
                    klient: function (briefvorlagen, $stateParams) {
                        if ($stateParams.id) {
                            return briefvorlagen.getVorgang({id: $stateParams.id})
                                .then(function (res) {
                                    return res;
                                });
                        }
                    }

                }
            })

            .state('app.tabs.antragsteller', {
                url: "/antragsteller/:id",
                templateUrl: 'templates/antragsteller/antragsteller.html',
                controller: 'AntragstellerController',
                controllerAs: 'vm',
                resolve: {
                    antrag_data: function (antragsteller, $stateParams) {
                        let id = $stateParams.id;
                        return antragsteller.getData(id)
                            .then(function (res) {
                                return res;
                            });
                    },
                    bank_list: function (antragsteller) {
                        return antragsteller.menu;
                    },
                    credit_info: function (antragsteller, $stateParams) {
                        return antragsteller.getCreditInform({id: $stateParams.id})
                            .then(function (res) {
                                return res;
                            });
                    },
                    allBanks: function (kreditdaten) {
                        return kreditdaten.getAllBanks()
                            .then(function (res) {
                                return res;
                            });
                    },
                    partners: function (dashboard) {
                        return dashboard.getPartners()
                            .then(function (res) {
                                return res;
                            });
                    }
                }
            })
            .state('app.tabs.immobilie', {
                url: "/immobilie/:id",
                templateUrl: 'templates/immobilie/immobilie.html',
                controller: 'ImmobilieController',
                controllerAs: 'vm',
                resolve: {
                    immobilie_data: function (immobilie, $stateParams) {
                        let id = $stateParams.id;
                        return immobilie.getData(id)
                            .then(function (res) {
                                return res;
                            });
                    },
                }
            })
            .state('app.tabs.kreditdaten', {
                url: "/kreditdaten/:id",
                templateUrl: 'templates/kreditdaten/kreditdaten.html',
                controller: 'KreditdatenController',
                controllerAs: 'vm',
                resolve: {
                    kreditdaten_data: function (kreditdaten, $stateParams) {
                        let id = $stateParams.id;
                        return kreditdaten.getData(id)
                            .then(function (res) {
                                return res;
                            });
                    },
                    allBanks: function (kreditdaten) {
                        return kreditdaten.getAllBanks()
                            .then(function (res) {
                                return res;
                            });
                    },
                    users_list: function (registration) {
                        return registration.getAllUsers()
                            .then(function (res) {
                                return res;
                            });

                    },
                }
            })
            .state('app.tabs.dokumente', {
                url: "/dokumente/:id",
                templateUrl: 'templates/dokumente/dokumente.html',
                controller: 'DokumenteController',
                controllerAs: 'vm',
                resolve: {

                    documents_data: function (dokument, $stateParams) {
                        const id = $stateParams.id;
                        return dokument.getAllDocs(id)
                            .then(function (res) {
                                return res;
                            });

                    }
                }
            })


            .state('app.adressenverwaltung', {
                abstract: true,
                templateUrl: 'templates/adressenverwaltung/adressenverwaltung.html',
                controller: 'AdressenverwaltungController',
                controllerAs: 'vm'
            })
            .state('app.adressenverwaltung.banken', {
                url: "/banken",
                templateUrl: 'templates/banken/banken.html',
                controller: 'BankenController',
                controllerAs: 'vm'
            })
            .state('app.adressenverwaltung.partner', {
                url: "/partner",
                templateUrl: 'templates/partner/partner.html',
                controller: 'PartnerController',
                controllerAs: 'vm',
                params: {
                    id: '',
                },
                resolve: {
                    users_list: function (registration) {
                        return registration.getAllUsers()
                            .then(function (res) {
                                return res;
                            });

                    },
                }
            })

            .state('app.statistic', {
                abstract: true,
                templateUrl: 'templates/statistic/statistic.html',
                controller: 'StatisticController',
                controllerAs: 'vm'
            })
            .state('app.statistic.client', {
                url: "/client_statistic",
                templateUrl: 'templates/statistic/client-statistic/client-statistic.html',
                controller: 'ClientStatisticController',
                controllerAs: 'vm',
            })
            .state('app.statistic.partner', {
                url: "/partner_statistic",
                templateUrl: 'templates/statistic/partner-statistic/partner-statistic.html',
                controller: 'PartnerStatisticController',
                controllerAs: 'vm',
            })

            .state('app.adressenverwaltung.ansprechpartner', {
                url: "/ansprechpartner",
                templateUrl: 'templates/ansprechpartner/ansprechpartner.html',
                controller: 'AnsprechpartnerController',
                controllerAs: 'vm'
            })


    }


})();

