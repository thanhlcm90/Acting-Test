(function() {
    'use strict';

    // Setting up route
    angular.module('choosegroup').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // Redirect to home view when route not found
            $urlRouterProvider.otherwise('/choosegroup');

            // state routing
            $stateProvider.
            state('choosegroup', {
                url: '/choosegroup',
                templateUrl: 'game-modules/choosegroup/views/choosegroup.client.view.html'
            });
        }
    ]);
})();
