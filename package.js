Package.describe({
	name: 'devian:analytics',
	version: '0.0.5',
	// Brief, one-line summary of the package.
	summary: 'Simple real-time analytics for free',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/Dev1an/Analytics.git',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.use(['ecmascript', 'mongo', 'accounts-base', 'faisalman:ua-parser-js@0.7.9']);
	api.addFiles('Collections.js');
	api.addFiles('Connection.js', 'server');
	api.addFiles('Events.js', 'client');

	api.export("Analytics");
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('devian:analytics');
	api.addFiles('analytics-tests.js');
});
