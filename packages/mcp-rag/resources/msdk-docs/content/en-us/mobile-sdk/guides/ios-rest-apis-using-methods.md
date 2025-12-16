# Using REST Request Methods

Salesforce offers some product-specific REST APIs that have no relationship to Salesforce Platform APIs. You can use Mobile SDK resources to configure and send such requests. For these cases, you create and configure your `RestRequest` object directly, instead of relying on factory methods.

To send a non-SOQL and non-SOSL REST request using `RestClient`:

1.  Create an instance of `RestRequest`.
2.  Set the properties you need on the `RestRequest` object.
3.  Call `send` on the `RestClient` object, passing in the `RestRequest` object you created as the first parameter.

    The following example performs a GET operation to obtain all items in a specific Chatter feed.

    ::include{src="../../shared/rest_feed_api_call.md"}

4.  To perform a request with parameters, wrap your parameter string using `SFJsonUtils.object(fromJSONString:)`, and assign it to the `queryParams` property of `RestRequest`. To send a custom request, create a `Dictionary` object and use the `setCustomRequestBodyData(_:contentType:)` method of `RestRequest`.

    The following example uses a custom request body to add a comment to a Chatter feed.

    ::include{src="../../shared/rest_feed_custom_request_body.md"}

5.  To set an HTTP header for your request, use the `setHeaderValue(_:forHeaderName:)` method. This method can help you when you’re displaying Chatter feeds, which come pre-encoded for HTML display. To avoid displaying unwanted escape sequences in Chatter comments, set the `X-Chatter-Entity-Encoding` header of your request to “false”:

    ```
    ...
    request.setHeaderValue("false", forHeaderName:"X-Chatter-Entity-Encoding")
    ```
