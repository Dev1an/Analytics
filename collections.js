// Write your package code here!

Analytics = {
	connections: new Mongo.Collection("analyticsConnections", {
		transform(connection) {
			connection.user = Meteor.users.findOne(connection.userId)
			connection.inFocus = function() {
				if (connection.hasOwnProperty('endDate')) return false
				const lastEvent = Analytics.events.findOne({
					// Query selector
					connectionId: connection.id,
					name: {$in: ['window.blur', 'window.focus']}
				}, {
					// Options
					fields: {name: 1},
					sort: {date: -1},
					limit: 1
				})
				if (lastEvent && lastEvent.name == 'window.blur') return false
				else return true
			}

			connection.eventsCursor = Analytics.events.find({connectionId: connection.id})
			Object.defineProperty(connection, 'events', {
				get() { return this.eventsCursor.fetch(); }
			})
			return connection
		}
	}),
	events: new Mongo.Collection('analyticsEvents'),
	analysis: new Mongo.Collection('analytics', {
		transform(analysis) {
			analysis.pageViewsPerConnection = Math.round(analysis.pageViews / analysis.connectionCount * 10)/10
			return analysis
		}
	})
};

Events = Analytics.events
Connections = Analytics.connections

if (Meteor.isServer) {
	Meteor.publish('rawTrackingData', function() {
		return [Events.find(), Connections.find()]
	})
	Meteor.publish('liveTrackingData', function() {
		const now = new Date
		now.setSeconds(now.getSeconds()-3)
		return [Events.find({date: {$gte: now}}), Connections.find({endDate: {$exists: false}})]
	})
}