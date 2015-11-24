Package.describe({
	name: 'devian:analytics',
	version: '0.1.2',
	summary: 'Simple real-time analytics for free',
	git: 'https://github.com/Dev1an/Analytics.git',
	documentation: 'README.md'
});

Npm.depends({
	"geoip-lite": "1.1.6"
})

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.use([
		'ecmascript',
		'mongo',
		'accounts-base',
		'check',

		'faisalman:ua-parser-js@0.7.9',
		'kadira:flow-router@2.9.0'
	]);

	api.addFiles('Collections.js');
	api.addFiles(['Connection.js', 'EventMethods.js', 'Analytics.js'], 'server');
	api.addFiles('Events.js', 'client');

	api.export("Analytics");
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('devian:analytics');
	api.addFiles('analytics-tests.js');
});
