Meteor.onConnection(function(connection) {
	const record = Analytics.connections.insert({
		id: connection.id,
		address: connection.clientAddress,
		userAgent: connection.httpHeaders['user-agent'],
		startDate: new Date()
	})

	connection.onClose(function() {
		Analytics.connections.update(record, {$set: {endDate: new Date()}});
	})
});

Accounts.onLogin(function(attempt) {
	Analytics.connections.update({id: attempt.connection.id}, {$set: {userId: attempt.user._id}})
})

Meteor.startup(function() {
	Analytics.connections.remove({})
})