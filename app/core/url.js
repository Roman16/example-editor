;(function () {
    angular
        .module('factory.url', [])
        .factory('url', [
            function () {
                //prod
                // let baseUrl = 'https://crm-ultima.de/api/';
                //test
                let baseUrl = 'http://itls-ultima.de/api/';

                let baseUrlNew = 'http://svm.biz.ua/api/web/v1/';

                return {
                    baseUrl: baseUrl,
                    user: {
                        login: baseUrl + 'AccountManage/Authentication',
                        register: baseUrlNew + 'user/registration'
                    },
                    registration: {
                        index: baseUrl + '/AccountManage/GetAllUsers',
                        addUser: baseUrl + '/AccountManage/AddUser',
                        deleteUser: baseUrl + '/AccountManage/DeleteUser',
                    },
                    dashboard: {
                        submit_vorgang: baseUrl + 'dashboard/addVorgang',
                        create_angrag: baseUrlNew + 'antragsteller/create',
                        update_angrag: baseUrlNew + 'antragsteller/update',
                        get_angrag: baseUrlNew + 'antragsteller/index',
                        get_all_members: baseUrl + 'dashboard/GetAllvorgangs',
                        get_kontaktart: baseUrl + '',
                        get_partners: baseUrl + 'Dashboard/GetAllAdressens',
                        get_werbung: baseUrl + 'Dashboard/GetAllWerbungs',
                        get_vorgangs: baseUrl + 'Dashboard/GetVorgangs',
                        get_vorgangs_partner: baseUrl + 'Dashboard/GetVorgangsPartner',
                        delete_vorgang: baseUrl + 'Dashboard/DeleteVorgang',
                        berlin_bank: baseUrl + 'Dashboard/GetBerlinBankInfo',

                    },
                    anstragsteller: {
                        index: baseUrl + 'Antragsteller/GetAntragstellersById',
                        update: baseUrl + 'Antragsteller/AntragstellerUpdate',
                        getCreditInform: baseUrl + 'Antragsteller/GetAbgerechnetCreditInfo',
                        setPartner: baseUrl + 'Antragsteller/SetPartner'
                    },
                    immobilie: {
                        create: baseUrlNew + 'immobilie/create',
                        index: baseUrl + 'Immobilie/GetImmobiliesById',
                        update: baseUrl + 'Immobilie/ImmobiliensUpdate',
                    },
                    kreditdaten: {
                        create: baseUrlNew + 'kredit-daten/create',
                        update: baseUrl + 'Kredit/KreditsUpdate',
                        index: baseUrl + 'Kredit/GetKreditsById',
                        changeUser: baseUrl + 'Kredit/ChangeUser',
                        getUser: baseUrl + 'Kredit/GetUser',
                    },
                    dokument: {
                        get_all_documents:  baseUrl + 'Document/GetDocumentsById',
                        file: baseUrl + 'Document/UploadFile',
                        uploadDoc: baseUrl + 'Document/UploadFile',
                    },
                    wiedervorlage: {
                        index: baseUrl + 'VorgangsManagement/GetAllUsers',
                        vorgangs: baseUrl + 'VorgangsManagement/GetVorgangs',
                        submitDate: baseUrl + 'VorgangsManagement/SetWiedervorlage',
                        deleteDate: baseUrl + 'VorgangsManagement/SetOffAnfragesWiedervorlage',
                        addComment: baseUrl + 'VorgangsManagement/SetComment',
                        deleteOffDate: baseUrl + 'VorgangsManagement/SetOffWiedervorlage',
                        appointmentsForToday: baseUrl + 'VorgangsManagement/GetTotalAppointmentsForToday',
                    },
                    banks: {
                        list: baseUrl + 'VorgangsManagement/GetAllBankanschrifts'
                    },
                    briefvorlagen: {
                        getList: baseUrl + 'Briefvorlagen/GetBriefvorlagenByAuthKey',
                        updateTemplate: baseUrl + 'Briefvorlagen/BriefvorlagenUpdate',
                        delete: baseUrl + 'Briefvorlagen/BriefvorlagenDeleteById',
                        getVorgang: baseUrl + 'Briefvorlagen/GetClient'
                    },
                    adressenverwaltung: {
                        bankList: baseUrl + 'VorgangsManagement/GetAllBankanschrifts',
                        selectBank: baseUrl + 'Adressenverwaltung/GetBankanschriftById',
                        updateBank: baseUrl + 'Adressenverwaltung/UpdateBankanschrift',
                        addBank: baseUrl + 'Adressenverwaltung/AddBankanschrift',
                        removeBank: baseUrl + 'Adressenverwaltung/DeleteBankanschriftById',
                        searchVorgangs: baseUrl + 'Adressenverwaltung/GetAllVorgangs',

                        partnerList: baseUrl + 'Dashboard/GetAllAdressens',
                        selectPartner: baseUrl + 'Adressenverwaltung/GetAdressenById',
                        addPartner: baseUrl + 'Adressenverwaltung/AddAdressen',
                        updatePartner: baseUrl + 'Adressenverwaltung/UpdateAdressen',
                        removePartner: baseUrl + 'Adressenverwaltung/DeleteAdressenById',
                        personPartnerList: baseUrl + 'Adressenverwaltung/GetAllPartnerContactPersons',
                        ClientList: baseUrl + 'Adressenverwaltung/GetVorgangsByAdressenId?id',

                        selectUser: baseUrl + 'Adressenverwaltung/GetVorgangsByUserId',
                        getGroupUser: baseUrl + 'Adressenverwaltung/GetUserById',
                        updateGroupUser: baseUrl + 'Adressenverwaltung/UpdateUser',


                        allPersons: baseUrl + 'Adressenverwaltung/GetAllContactPersons',
                        addPerson: baseUrl + 'Adressenverwaltung/AddContactPerson',
                        updatePerson: baseUrl + 'Adressenverwaltung/UpdateContactPerson',
                        removePersone: baseUrl + 'Adressenverwaltung/DeleteContactPersonById',
                        getAllVorgangs: baseUrl + 'Adressenverwaltung/GetAllVorgangsByAdressenId',

                        export_email: baseUrl + 'Adressenverwaltung/ExportEmails/',
                    },
                    statistic: {
                        clientList: baseUrl + 'Report/Clients',
                        downloadClientStatisticCsv: baseUrl + 'Report/ClientsReportToCsv',
                        downloadClientStatisticXls: baseUrl + 'Report/ClientsReportToExcel',

                        partnerList: baseUrl + 'Report/Partners',
                        downloadPartnerStatisticCsv: baseUrl + 'Report/PartnersReportToCsv',
                        downloadPartnerStatisticXls: baseUrl + 'Report/PartnersReportToExcel',
                    }
                };

            }
        ]);
})();