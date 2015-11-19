# Analytics
See it in action on [simpleanalytics.meteor](http://simpleanalytics.meteor.com)

## Features
- Uses websockets to track visitors
- Saves the IP address of the visitor
- Seamlessly integrates with the accounts-base package to track logged in users.
- Tracks the visitor's behavior using events

# Usage
When the package is added every DDP connection will be logged in a mongo collection: `Analytics.connections`.
A connection contains information about the socket along with some additional information.
- **id**: String <br> The [meteor connection id](http://docs.meteor.com/#/full/meteor_onconnection)
- **address**: String <br> The visitor's IP address
- **userAgent**: String <br> The user agent that was sent un the HTTP header
- **startDate**: Date <br> The moment the visitor initiated the web socket connection
- **endDate**: Date <br> The moment the visitor closed the web socket
- **events**: String <br> Client-side events like 'window.blur' and 'widow.focus'