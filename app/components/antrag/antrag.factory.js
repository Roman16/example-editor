;(function () {
    angular.module('factory.antrag', [])
        .factory('antrag', Antrag);

    Antrag.$inject = [];

    function Antrag() {
        const model = {};
        model.privatDarlehen = {
            antragssumme: 0,
            zinsbelastung: 0,
            erstedatum: 0,
            laufzeit: 0,

            vermittlungscourtage: function () {
                result = this.antragssumme + this.zinsbelastung;
                return isNaN(result) || result == Infinity ? '0,00 €' : result.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                });
            },

            ratedatum: function () {
                result = new Date(moment(this.erstedatum).add({months: this.laufzeit}))
                return result;
            },

        };
        return model;

    }
})();