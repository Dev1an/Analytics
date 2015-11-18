// Write your package code here!

Analytics = {
	connections: new Mongo.Collection("analyticsConnections", {
		transform(connection) {
			connection.user = Meteor.users.findOne(connection.userId)
			return connection
		}
	})
};