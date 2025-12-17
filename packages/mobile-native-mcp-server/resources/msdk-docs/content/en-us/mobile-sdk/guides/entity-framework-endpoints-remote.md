# Force.RemoteObject Class

To support arbitrary REST calls, Mobile Sync introduces the `Force.RemoteObject` abstract class. `Force.RemoteObject` serves as a layer of abstraction between `Force.SObject` and `Backbone.Model`. Instead of directly subclassing `Backbone.Model`, `Force.SObject` now subclasses `Force.RemoteObject`, which in turn subclasses `Backbone.Model`. `Force.RemoteObject` does everything `Force.SObject` formerly did except communicate with the server.<!-- [such as….] -->

## Calling Custom Endpoints with `syncRemoteObjectWithServer()`

The `RemoteObject.syncRemoteObjectWithServer()` prototype method handles server interactions. `Force.SObject` implements `syncRemoteObjectWithServer()` to use the Salesforce Platform REST API. If you want to use other server end points, create a subclass of `Force.RemoteObject` and implement `syncRemoteObjectWithServer()`. This method is called when you call `fetch()` on an object of your subclass, if the object is currently configured to fetch from the server.

<!-- [WOLF: TRUE?]

 -->

## Example

The FileExplorer sample application is a Mobile Sync app that shows how to use `Force.RemoteObject`. HybridFileExplorer calls the Connect REST API to manipulate files. It defines an `app.models.File` object that extends `Force.RemoteObject`. In its implementation of `syncRemoteObjectWithServer()`, `app.models.File` calls `Force.forceJsClient.fileDetails()`, which wraps the `/chatter/files/fileId` REST API.

```javascript
app.models.File = Force.RemoteObject.extend({
  syncRemoteObjectWithServer: function (method, id) {
    if (method != "read") throw "Method not supported " + method;
    return Force.forceJsClient.fileDetails(id, null);
  },
});
```
