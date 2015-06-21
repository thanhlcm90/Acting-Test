(function() {
    'use strict';

    // Setting up route
    angular.module('core').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // state routing
            $stateProvider.
            state('home', {
                url: '/game/:gameId',
                templateUrl: 'game-modules/core/views/core.client.view.html'
            });
        }
    ]);
})();
