;(function () {
    angular.module('app',
        [
            'app.core',
            'app.directives',
            'app.request',
            'app.services',
            'ckeditor',
            // 'app.filters',
            'bw.paging',

        ])
        .run(runBlock);

    // runBlock.$inject = ['$sessionStorage','$localStorage',];

    function runBlock() {

    }
})();
