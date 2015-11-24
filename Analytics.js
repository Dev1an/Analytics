const allConnections = Connections.find()
const allEvents = Events.find()

Meteor.publish('analytics', function() {
	var openConnectionCount = 0
	var connectionCount = 0
	var pageViews = 0

	var collectingOldData = true

	const allConnectionsObserver = allConnections.observeChanges({
		added: (id, fields) => {
			const changes = {connectionCount: ++connectionCount}
			if (!fields.hasOwnProperty('endDate'))
				changes.openConnectionCount = ++openConnectionCount

			if (!collectingOldData) this.changed('analytics', 'live', changes)
		},
		changed: (id, fields) => {
			if (fields.hasOwnProperty('endDate')) {
				--openConnectionCount
				if (!collectingOldData) this.changed('analytics', 'live', {openConnectionCount})
			}
		}
	})

	const pageViewObserver = Events.find({name: 'pageView'}).observeChanges({
		added: () => {
			++pageViews
			if (!collectingOldData) this.changed('analytics', 'live', {pageViews})
		}
	})

	// When we are done analysing the old data
	// update the status variable so that we can transmit live data
	collectingOldData = false;
	this.added('analytics', 'live', {
		openConnectionCount,
		connectionCount,
		pageViews
	})

	// Stop observers when the client disconnects
	this.onStop(() => {
		allConnectionsObserver.stop()
		pageViewObserver.stop()
	})

})