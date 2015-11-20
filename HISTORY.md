## v0.1.1

* The events are now stored in a separate Mongo collection instead of a nested array in the Connections collection.

## v0.1.0

* Router support: client-side route changes are now logged as an Event in the events array of a connection.

## v0.0.12

* The connection collection is now persistent. Database inconsistencies are handled with on startup.
* Event names `focus` and `blur` are now `window.focus` and `window.blur`

## v0.0.11

* Rename History.md to HISTORY.md

## v.0.0.10

* Add geospatial data analysis (based on IP address).