# Using REST APIs

To query, describe, create, or update data from a Salesforce org, Mobile SDK apps call Salesforce REST APIs. Salesforce REST APIs honor SOQL and SOSL strings and can accept and return data in either JSON or XML format. Mobile SDK wraps standard Salesforce REST requests in methods that handle the low-level HTTP configuration for you. For other Salesforce APIs, Mobile SDK provides methods for manually creating a custom request object and receiving the response. You can even use Mobile SDK REST API methods to make unauthenticated and external API calls.

Salesforce supports an ever-growing variety of REST APIs. For an overview of our offerings, see _[Which API Do I Use?](https://help.salesforce.com/articleView?id=integrate_what_is_api.htm)_ in Salesforce Help. For information on standard REST APIs, see _[REST API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/)_.

## Coding REST Interactions

With Android native apps, you do minimal coding to access Salesforce data through REST calls. The classes in the `com.salesforce.androidsdk.rest` package initialize the communication channels and encapsulate low-level HTTP plumbing. These classes, all of which are implemented by Mobile SDK, include:

- `ClientManager`—Serves as a factory for `RestClient` instances. It also handles account logins and handshakes with the Salesforce server.
- `RestClient`—Handles protocol for sending REST API requests to the Salesforce server.

  Don’t directly create instances of `RestClient`. Instead, call the `ClientManager.getRestClient()` method.

- `RestRequest`—Represents REST API requests formatted from the data you provide. Also serves as a factory for instances of itself.

  :::important

  Don’t directly create instances of `RestRequest`. Instead, call an appropriate `RestRequest` static getter function such as `RestRequest.getRequestForCreate()`.

  :::

- `RestResponse`—Contains the response content in the requested format. The `RestRequest` class creates `RestResponse` instances and returns them to your app through your implementation of the `RestClient.AsyncRequestCallback` interface.

Here’s the basic procedure for using the REST classes on a UI thread:

1.  Create an instance of `ClientManager`.

    1.  Use the `SalesforceSDKManager.getInstance().getAccountType()` method to obtain the value to pass as the second argument of the `ClientManager` constructor.

    2.  For the `LoginOptions` parameter of the `ClientManager` constructor, call `SalesforceSDKManager.getInstance().getLoginOptions()`.

2.  Implement the `ClientManager.RestClientCallback` interface.

3.  Call `ClientManager.getRestClient()` to obtain a `RestClient` instance, passing it an instance of your `RestClientCallback` implementation. The following code implements and instantiates `RestClientCallback` inline.

    - Kotlin

      - :
        ::include{src="../../shared/kotlin_rest_api_get_rest_client.md"}

    - Java

      - :
        ::include{src="../../shared/rest_api_get_rest_client.md"}

4.  Call a static `RestRequest()` getter method to obtain the appropriate `RestRequest` object for your needs. For example, to get a description of a Salesforce object:

    ```java
    final RestRequest request = RestRequest.getRequestForDescribe(apiVersion, objectType);
    ```

5.  Pass the `RestRequest` object you obtained in the previous step to `RestClient.sendAsync()` or `RestClient.sendSync()`. If you’re on a UI thread and therefore calling `sendAsync()`:
    - Implement the `ClientManager.AsyncRequestCallback` interface.
    - Pass an instance of your implementation to the `sendAsync()` method.
    - Receive the formatted response through your `ASyncRequestCallback.onSuccess()` method. Before using the response, double-check that it’s valid by calling `RestResponse.isSuccess()`.

The following code implements and instantiates `AsyncRequestCallback` inline.

- Kotlin

  - :
    ::include{src="../../shared/kotlin_rest_sendasync_code.md"}

- Java

  - :
    ::include{src="../../shared/android_rest_sendasync_code.md"}

If you’re calling the `sendSync()` method from a service, use the same procedure with the following changes.

1.  To obtain a `RestClient` instance call `ClientManager.peekRestClient()` instead of `ClientManager.getRestClient()`.
2.  Retrieve your formatted REST response from the `sendSync()` method’s return value.

## Checking REST Response Status

A REST response arriving at your app’s onSuccess() callback method indicates only that the network call didn’t fail. This high-level status doesn’t factor in app-level success or failure.

In Mobile SDK for Android, the `RestResponse` object wraps the underlying `okHttp3.Response`. To help you code more defensively, `RestResponse` provides the following convenience methods for inspecting response details.- public isSuccess()

- `public static boolean isSuccess(int statusCode)`

  - : Returns `true` if the HTTP response status code or the given code is between 200 and 299, indicating app-level success.

- `public int getStatusCode()`

  - : Returns the response status code.

- `public String getContentType()`

  - : Returns the `content-type` header, if found.

- `public Map<String, List<String>> getAllHeaders()`

  - : Returns all headers associated with this response.

- `public Response getRawResponse()`

  - : Returns the underlying `okHttp3.Response` object.
