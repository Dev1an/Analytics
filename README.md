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
- **id**: String  
The [meteor connection id](http://docs.meteor.com/#/full/meteor_onconnection)
- **address**: String  
  The visitor's IP address
- **geoData**: Object  
  Geospatial data based on the visitors IP address
  - **country**: String  
    2 letter [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) country code
  - **region**: String  
    2 character region code.  For US states this is the 2 letter [ISO-3166-2](https://en.wikipedia.org/wiki/ISO_3166-2#Current_codes) subcountry code for other countries, this is the [FIPS 10-4](https://en.wikipedia.org/wiki/List_of_FIPS_region_codes) subcountry code
  - **city**: String  
    This is the full city name
  - **ll**: [Number]  
    The latitude and longitude of the city
- **userAgent**: String  
  The user agent that was sent un the HTTP header
- **startDate**: Date <br> The moment the visitor initiated the web socket connection
- **endDate**: Date <br> The moment the visitor closed the web socket
- **events**: [Event] <br> An array containing client-side events like 'window.blur' and 'widow.focus'. An Event looks like this
  - **name**: String <br> Event name (for example: 'blur' or 'focus')
  - **date**: Date <br> The moment the event was triggered
  - **data**: Object *optional* <br> Some data about the event

The events array is a lazy loaded query on the `Analytics.events` collection. If you want a reactive datasource you should use the `eventsCursor` property of a connection, this returns a mongo cursor to the same data.