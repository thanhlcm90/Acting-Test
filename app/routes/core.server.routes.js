'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
	app.route('/admin').get(core.admin);
	app.route('/home').get(core.home);
	app.route('/about').get(core.about);
	app.route('/cases').get(core.cases);
	app.route('/tutorial').get(core.tutorial);
	app.route('/forum').get(core.forum);
	app.route('/find').get(core.find);
	app.route('/profile').get(core.profile);
};