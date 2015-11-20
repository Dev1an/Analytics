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
		Analytics.connections.update(record, {$set: {endDate: new Date()}});
	})
});

Accounts.onLogin(function(attempt) {
	Analytics.connections.update({id: attempt.connection.id}, {$set: {userId: attempt.user._id}})
})

Meteor.startup(function() {
	// Handle inconsistencies
	Analytics.connections.update({endDate: {$exists: false}}, {$set: {endDate: undefined}})
})

Meteor.methods({
	"analytics.blurWindow"() {
		Analytics.connections.update({id: this.connection.id}, {$push: {events: {date: new Date(), name: "window.blur"}}})
	},
	"analytics.focusWindow"() {
		Analytics.connections.update({id: this.connection.id}, {$push: {events: {date: new Date(), name: "window.focus"}}})
	}
})