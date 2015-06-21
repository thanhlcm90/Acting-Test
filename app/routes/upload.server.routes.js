'use strict';

module.exports = function(app) {
    // Root routing
    var upload = require('../../app/controllers/upload.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/upload')
        .post(users.requiresLogin, upload.upload);
};
