// Write your package code here!

Analytics = {
	connections: new Mongo.Collection("analyticsConnections", {
		transform(connection) {
			connection.user = Meteor.users.findOne(connection.userId)
			connection.inFocus = function() {
				if (connection.endDate != undefined) return false
				for (var i = connection.events.length-1; i>=0; --i)
					if (connection.events[i].name == "window.focus" || connection.events[i].name == "window.blur")
						return connection.events[i].name == "window.focus"
				return true
			}
			return connection
		}
	})
};