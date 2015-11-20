function pushEvent(name, data) {
	const event = {name, date: new Date()}
	if (typeof data != 'undefined') event.data = data
	Analytics.connections.update({id: this.connection.id}, {$push: {events: event}})
}

Meteor.methods({
	"analytics.blurWindow"() {
		pushEvent.call(this, 'window.blur')
	},
	"analytics.focusWindow"() {
		pushEvent.call(this, 'window.focus')
	},
	"analytics.registerPageView"({path, querystring, hash}) {
		check(path, String)
		check(querystring, String)
		check(hash, String)

		pushEvent.call(this, 'pageView', {path, querystring, hash})
	}
})