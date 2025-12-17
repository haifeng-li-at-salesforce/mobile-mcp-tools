# RootViewController Class

A root view controller displays the first custom view that your app presents. In Objective-C apps, this view is the one at the bottom, or root, of your view stack. For the Mobile SDK Objective-C template project, Mobile SDK appropriately names its root view controller class `RootViewController`. This class sets up a mechanism for your app’s interactions with the Salesforce REST API. Regardless of how you define your root view controller, you can reuse the template app’s code for retrieving Salesforce data through REST APIs.

## RootViewController Design

As the sole custom view controller in a basic Mobile SDK app, the `RootViewController` class covers only the bare essentials. Its two primary tasks are:

- Use Salesforce REST APIs to query Salesforce data
- Display the Salesforce data in a table

This app retrieves Salesforce data by issuing an asynchronous REST request in the form of a SOQL query. In this case, the query is a simple SELECT statement that gets the `Name` field from up to 10 Contact records. The app displays the query results in a static read-only table. Mobile SDK leverages the current user’s authenticated credentials to form and send the REST request.

## Swift Implementation

Beginning in Mobile SDK 9.0, the Swift template app no longer defines a `RootViewController` class. Instead, it uses SwiftUI views and models with Combine extensions to accomplish the same goals, as described in [Native Swift Template](ios-native-swiftui-template.md).

<!-- In Swift, the `RootViewController` class inherits `UITableViewController`. The action begins with the override of the `loadView` method of `UIViewController`:


::include{src="../../shared/func_loadview.md"}

 <!-\- 8.0 edits-\->After calling the superclass method and setting the view’s title, the app creates and sends its REST request. Notice that the template app calls `request(forQuery:)` and `send(request:, _:)` on a shared instance of the `RestClient` class. You use the `RestClient` singleton object for all REST requests. This object uses the current user’s credentials to form and send authenticated requests.

 <!-\- 8.0 edits-\->After the app sends the request, Salesforce responds by passing a result message and, hopefully, data to the `send` method. Mobile SDK forwards the response to the completion block closure. All completions, successful or not, go to this same closure. Your app is responsible for determining the status of the response and acting accordingly. Here’s the default handler:

::include{src="../../shared/func*handlesuccess.md"}
The iOS runtime calls `loadView()` only once, when the view first loads into memory. In more sophisticated real-world apps, `loadView()` is often not the best place for the request. For example, if you add a detail view that lets the user edit the root view’s data, you’ll need to update the edited rows when the root view reappears. In these cases, you can requery in a method that’s called each time the view comes to the foreground, such as `viewWillAppear(*:)`.

:::note

The template app’s completion handler is designed for a SELECT query request. Some other cases, such as DELETE requests, can require a more nuanced approach.:::

-->

## Objective-C Implementation

In Objective-C, the `RootViewController` class inherits `UITableViewController` and implements the `SFRestDelegate` protocol. The action begins with an override of the `viewDidLoad` method of `UIViewController`:

::include{src="../../shared/root_view_controller_viewdidload.md"}
After calling the superclass method and setting the view’s title, the app creates and sends its REST request. Notice that the `requestForQuery` and `send:delegate:` messages are sent to a singleton shared instance of the `SFRestAPI` class. You use this singleton object for all REST requests.

After the apps sends the REST request, Salesforce responds by passing status messages and, hopefully, data to the delegate listed in the `send:delegate:` message. In this case, the delegate is the `RootViewController` object itself:

```nolang
[[SFRestAPI sharedInstance] send:request delegate:self];
```

For handling REST responses, the Objective-C `RootViewController` uses the `SFRestDelegate` protocol instead of the `sendRestRequest:failBlock:completeBlock:` block method. The response arrives in one of the `SFRestDelegate` callback methods. For successful requests, the code handles Salesforce data in the `request:didSucceed:rawResponse:` callback:

::include{src="../../shared/root_view_controller_requestdidloadresponse.md"}
As the use of the `id` data type suggests, this code handles JSON responses in generic Objective-C terms. It addresses the `jsonResponse` object as an instance of `NSDictionary` and treats its records as an `NSArray` object. Because `RootViewController` implements `UITableViewController`, it’s simple to populate the table in the view with extracted records.
