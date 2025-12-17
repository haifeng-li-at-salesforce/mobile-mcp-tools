# Managing Requests

The `SalesforceNetwork` library for iOS defines two primary objects, `SFNetworkEngine` and `SFNetworkOperation`. `SFRestRequest` internally uses a `SFNetworkOperation` object to make each server call.

If you’d like to access the `SFNetworkOperation` object for any request, you have two options.

- The following methods return `SFNetworkOperation*`:

  - `[SFRestRequest send:]`

  - `[SFRestAPI send:delegate:]`

- `SFRestRequest` objects include a `networkOperation` object of type `SFNetworkOperation*`.

To cancel pending REST requests, you also have two options.

- `SFRestRequest` provides a new method that cancels the request:

  ```nolang
  - (void) cancel;
  ```

- And `SFRestAPI` has a method that cancels all requests currently running:

  ```nolang
  - (void)cancelAllRequests;
  ```

## Examples of Canceling Requests

To cancel all requests:

```nolang
[[SFRestAPI sharedInstance] cancelAllRequests];
```

To cancel a single request:

```swift
SFRestRequest *request = [[SFRestAPI sharedInstance] requestForOwnedFilesList:nil page:0];
[[SFRestAPI sharedInstance] send:request delegate:self];
...
// User taps Cancel Request button while waiting for the response
-(void) cancelRequest:(SFRestRequest *) request {
   [request cancel];
}
```
