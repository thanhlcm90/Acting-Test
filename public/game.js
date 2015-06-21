(function() {
    //Start by defining the main module and adding the module dependencies
    angular.module(GameConfiguration.gameModuleName, GameConfiguration.gameModuleVendorDependencies);

    // Setting HTML5 Location Mode
    angular.module(GameConfiguration.gameModuleName).config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

    //Then define the init function for starting up the application
    angular.element(document).ready(function() {
        //Fixing facebook bug with redirect
        if (window.location.hash === '#_=_') window.location.hash = '#!';

        //Then init the app
        angular.bootstrap(document, [GameConfiguration.gameModuleName]);
    });
})();
