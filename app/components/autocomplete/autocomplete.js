;(function () {

    'use strict';

    angular.module('autocomplete', [])
        .directive('autocomplete', autocomplete);

    function autocomplete() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<input name="autocomplete" type="text"/>',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.list, function (value) {
                        element.autocomplete({
                            source:
                                function ( ) {
                                      value.forEach(function (item) {
                                            return {
                                                label: item.name,
                                                value: item
                                            };
                                        });
                                },

                            minLength: 0,

                            focus:
                                function (event, ui) {
                                    var customer = ui.item.value;
                                    $(this).val(customer.Name);
                                    event.preventDefault();
                                },

                            select:
                                function (event, ui) {
                                    var customer = ui.item.value;
                                    $(document).trigger('customerSelected', customer);
                                    event.preventDefault();
                                }
                        }).autocomplete( "instance" )._renderItem = function( ul, item ) {
                            return $( "<li>" )
                                .append( "<div>" + item.name + "</div>" )
                                .appendTo( ul );
                        };
                });
            }

        };
    }

})();
