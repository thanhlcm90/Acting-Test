(function() {
    'use strict';

    // html filter (render text as html)
    angular.module(ApplicationConfiguration.applicationModuleName).filter('html', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }])
})();
