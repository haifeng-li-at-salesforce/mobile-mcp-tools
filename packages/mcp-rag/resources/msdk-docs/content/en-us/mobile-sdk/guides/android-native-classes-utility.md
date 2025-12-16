# Utility Classes

Though most of the classes in the `util` package are for internal use, several of them can also benefit third-party developers.

| Class               | Description                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EventsObservable`  | See the source code for a list of all events that Mobile SDK for Android propagates.                                                                      |
| `EventsObserver`    | Implement this interface to eavesdrop on any event. This functionality is useful if you’re doing something special when certain types of events occur.    |
| `UriFragmentParser` | You can directly call this static helper class. It parses a given URI, breaks its parameters into a series of key/value pairs, and returns them in a map. |
