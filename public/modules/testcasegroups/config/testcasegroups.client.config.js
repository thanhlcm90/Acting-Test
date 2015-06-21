'use strict';

// Configuring the Articles module
angular.module('testcasegroups').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'TestCase', 'testcasegroups', 'dropdown', '/testcasegroups(/create)?');
		Menus.addSubMenuItem('topbar', 'testcasegroups', 'TestCase Group List', 'testcasegroups');
		Menus.addSubMenuItem('topbar', 'testcasegroups', 'Create new TestCase Group', 'testcasegroups/create');
	}
]);