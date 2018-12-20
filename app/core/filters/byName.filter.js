;(function() {
    "use strict";

    angular
        .module('app.core')
        .filter('isNameNotEmpty', isNameNotEmpty);

    isNameNotEmpty.$inject = [];

    function isNameNotEmpty() {
        return function(items) {
            let filtered = [];
            items.filter(function(item) {
               if(item.Vorname != ', ') filtered.push(item) ;
            })
            return filtered;
        }

    }

})();