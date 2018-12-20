;(function () {

    'use strict';

    angular
        .module('directives.module')
        .directive('chooseFileButton', chooseFileButton);

    function chooseFileButton() {
        return {
            restrict: 'E',
            link: chooseFileButtonDirectiveLink
        };

        /** @ngInject */

        function chooseFileButtonDirectiveLink(scope, elem, attrs) {
            var button = elem.find('button');
            var input = elem.find('input');
            input.css({display: 'none'});
            button.bind('click', function () {
                input[0].click();
            });
        }
    }
})();
