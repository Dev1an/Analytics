const geoIp = Npm.require('geoip-lite')

Meteor.onConnection(function(connection) {
	const record = Analytics.connections.insert({
		id: connection.id,
		address: connection.clientAddress,
		userAgent: connection.httpHeaders['user-agent'],
		geoData: geoIp.lookup(connection.clientAddress),
		startDate: new Date(),
		events: []
	})

	connection.onClose(function() {
		Connections.update(record, {$set: {endDate: new Date()}})
	})
});

Accounts.onLogin(function(attempt) {
	Analytics.connections.update({id: attempt.connection.id}, {$set: {userId: attempt.user._id}})
})

Meteor.startup(function() {
	// Handle inconsistencies
	console.log('inconsistencies', Connections.update({endDate: {$exists: false}}, {$set: {endDate: undefined}}, {multi: true}))
})

process.on('SIGTERM', Meteor.bindEnvironment(function() {
	console.log('closing', Connections.update({endDate: {$exists: false}}, {$set: {endDate: new Date()}}, {multi: true}))
	process.exit(0)
}))