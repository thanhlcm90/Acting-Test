'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    testcase = require('../../app/controllers/testcase.server.controller');

module.exports = function(app) {
    // Article Routes
    app.route('/testcases')
        .get(testcase.list)
        .post(users.requiresLogin, testcase.create);

    app.route('/testcases/:testcaseId')
        .get(testcase.read)
        .put(users.requiresLogin, testcase.hasAuthorization, testcase.update)
        .delete(users.requiresLogin, testcase.hasAuthorization, testcase.delete);

    // Finish by binding the testcase middleware
    app.param('testcaseId', testcase.testcaseByID);
};
