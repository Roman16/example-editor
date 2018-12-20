;(function () {
    'use strict';
    angular.module('directives.module', []);
    angular.module('app.directives', [
        'directive.antragsteller',
        'directive.basisangaben',
        'directive.kinder',
        'directive.nutzung',
        'directive.bankverbindung',
        'directive.weitere-immobilien',
        'directive.weiteres-darlehen',
        'directive.antrag',
        'directive.anfrage',
        'directive.search',
        'directive.wiedervolage-comment',
        'directive.format',
        // 'directive.format-currency',
        'directives.module',
        'directive.changePartner',
        'autocomplete'
    ]);

})();