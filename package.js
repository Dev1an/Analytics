Package.describe({
	name: 'devian:analytics',
	version: '0.0.2',
	// Brief, one-line summary of the package.
	summary: 'Simple meteor analytics for free!',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: null
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.use(['ecmascript', 'mongo', 'accounts-base', 'faisalman:ua-parser-js']);
	api.addFiles('collections.js');
	api.addFiles('Connection.js', 'server');

	api.export("Analytics");
});

Package.onTest(function(api) {
	api.use('ecmascript');
	api.use('tinytest');
	api.use('devian:analytics');
	api.addFiles('analytics-tests.js');
});
