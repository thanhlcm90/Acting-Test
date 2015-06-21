'use strict';

// Init the application configuration module for AngularJS application
var GameConfiguration = (function() {
    // Init module configuration options
    var gameModuleName = 'actingtest-game';
    var gameModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.utils', 'angular-loading-bar', 'toaster', 'ui.sortable'];

    // Add a new vertical module
    var registerModule = function(moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(gameModuleName).requires.push(moduleName);
    };

    return {
        gameModuleName: gameModuleName,
        gameModuleVendorDependencies: gameModuleVendorDependencies,
        registerModule: registerModule
    };
})();
