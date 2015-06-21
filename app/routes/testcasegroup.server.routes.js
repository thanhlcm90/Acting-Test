'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    testcasegroup = require('../../app/controllers/testcasegroup.server.controller');

module.exports = function(app) {
    // Article Routes
    app.route('/testcasegroups')
        .get(testcasegroup.list)
        .post(users.requiresLogin, testcasegroup.create);

    app.route('/testcasegroups/:testcasegroupId')
        .get(testcasegroup.read)
        .put(users.requiresLogin, testcasegroup.hasAuthorization, testcasegroup.update)
        .delete(users.requiresLogin, testcasegroup.hasAuthorization, testcasegroup.delete);

    // Finish by binding the testcasegroup middleware
    app.param('testcasegroupId', testcasegroup.testcasegroupByID);
};
