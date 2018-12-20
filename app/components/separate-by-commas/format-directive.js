;(function () {

    'use strict';

    angular.module('directive.format', [])
    // .directive('format', format)
        .directive('format', format)
        .filter('replaceComma', [
            function () {
                return function(number) {
                    var splitNum;
                    if(number) {
                        for (var i = 0; i < number.length; i++) {
                            if (number[i] === '.') {
                                number = number.replace('.', '')

                            }
                        }

                        if ((number.toString()).indexOf(',')) {
                            number = parseFloat((number.toString()).replace(',', '.'));
                        }
                        number = Math.abs(number);
                        number = number.toFixed(2);
                        splitNum = number.split('.');
                        splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        return splitNum.join(",");
                    } else {
                        return number;
                    }
                }
            }
        ])

        .filter('decimal2comma', [
            function () {
                return function (input) {
                    var ret = (input) ? input.toString().replace(".", ",") : null;
                    if (ret) {
                        var decArr = ret.split(",");
                        if (decArr.length > 1) {
                            var dec = decArr[1].length;
                            if (dec === 1) {
                                ret += "0";
                            }
                        }
                    }
                    return ret;
                };
            }
        ]);

    format.$inject = ['$filter'];
    function format($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    if (ctrl.$modelValue ) {
                            return ($filter('replaceComma')(ctrl.$modelValue, ''));
                    } else {
                        return '0,00'
                    }
                });

                elem.bind('blur', function (event) {
                    var count = 0;
                    var plainNumber = elem.val();
                    // var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                    if (plainNumber ) {
                            elem.val(($filter('replaceComma')(plainNumber)));
                    } else {
                        elem.val('0,00')
                    }



                });
            }
        };
    }

})();