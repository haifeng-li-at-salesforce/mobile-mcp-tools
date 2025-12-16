# Using Files in iOS Native Apps

To handle files in native iOS apps, use convenience methods defined in the `SFRestAPI (Files)` category. These methods parallel the files API for Android native and hybrid apps. They send requests to the same list of REST APIs, but use different underpinnings.

For example, the following code snippet calls the `requestForOwnedFilesList:page:` method to retrieve a `SFRestRequest` object. It then sends the request object to the server, specifying its owning object as the delegate that receives the response.

```nolang
SFRestRequest *request = [[SFRestAPI sharedInstance] requestForOwnedFilesList:nil page:0];
[[SFRestAPI sharedInstance] send:request delegate:self];
...
```

This example passes nil to the first parameter (`userId`). This value tells the `requestForOwnedFilesList:page:` method to use the ID of the context, or logged in, user. Passing 0 to the `pageNum` parameter tells the method to fetch the first page.

:::note

Swift versions of `SFRestAPI (Files)` methods are not defined explicitly by Mobile SDK. To code these methods in Swift, use the autocomplete suggestions offered by the Xcode compiler. These suggested method and parameter names are determined by Swift compiler heuristics and can differ from their Objective-C equivalents.

:::

## REST Responses and Multithreading

The SalesforceNetwork library always dispatches REST responses to the thread where your `SFRestDelegate` currently runs. This design accommodates your app no matter how your delegate intends to handle the server response. When you receive the response, you can do whatever you like with the returned data. For example, you can cache it, store it in a database, or immediately blast it to UI controls. If you send the response directly to the UI, however, remember that your delegate must dispatch its messages to the main thread.

**See Also**

- [Files API Reference](reference-files.md)
