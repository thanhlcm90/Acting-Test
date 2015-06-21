'use strict';

module.exports = {
    app: {
        title: 'ActingTest',
        description: 'ActingTest Application with MongoDB, Express, AngularJS, and Node.js',
        keywords: 'ActingTest, TestCase, MongoDB, Express, AngularJS, Node.js'
    },
    port: process.env.PORT || 8084,
    templateEngine: 'swig',
    sessionSecret: 'TestCase123$%^',
    sessionCollection: 'sessions',
    assets: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/ng-table/ng-table.min.css',
                'public/lib/angular-loading-bar/build/loading-bar.min.css',
                'public/lib/angularjs-toaster/toaster.css'
            ],
            js: [
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/ng-table/ng-table.min.js',
                'public/lib/angular-loading-bar/build/loading-bar.min.js',
                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/angularjs-toaster/toaster.js',
                'public/lib/bootstrap/js/tooltip.js',
                'public/mylib/angular-ckeditor/angular-ckeditor.js',
                'public/mylib/ckeditor/ckeditor.js',

                // lodash library
                'public/lib/lodash/lodash.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'public/directive/*.js',
            'public/services/*.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'public/lib/angular-mocks/angular-mocks.js',
            'public/modules/*/tests/*.js'
        ]
    },
    game: {
        lib: {
            css: [
                'public/lib/angular-loading-bar/build/loading-bar.min.css',
                'public/lib/angularjs-toaster/toaster.css'
            ],
            js: [
                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/jquery-ui/jquery-ui.min.js',
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-loading-bar/build/loading-bar.min.js',
                'public/lib/angularjs-toaster/toaster.js',
                'public/lib/angular-ui-sortable/sortable.min.js',

                // lodash library
                'public/lib/lodash/lodash.js',

                // slim scroll
                'public/lib/slimscroll/jquery.slimscroll.js'
            ]
        },
        css: [
            'public/css/game.css',
            'public/gamemodules/**/css/*.css'
        ],
        js: [
            'public/game-config.js',
            'public/game.js',
            'public/game-modules/*/*.js',
            'public/game-modules/*/*[!tests]*/*.js'
        ]
    }
};
