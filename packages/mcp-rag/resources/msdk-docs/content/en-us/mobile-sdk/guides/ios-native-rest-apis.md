# Using Salesforce REST APIs with Mobile SDK

The Salesforce API provides services for accessing Salesforce objects through REST endpoints. Mobile SDK supports these services by providing REST classes that

- Implement factory methods that create REST request objects for you.
- Send authenticated requests, based on your configuration, to Salesforce.
- Intercept the server’s response and return it to your app as a Swift or Objective-C object.

In Mobile SDK for iOS, all REST requests are performed asynchronously. Responses for successful REST requests arrive in your app as `Array` or `Dictionary` objects. If a request fails, the response contains an `Error` object.

## See Also

- [Supported REST Services](ios-rest-apis-supported.md)
- For an overview of all Salesforce APIs, see _[Which API Do I Use?](https://help.salesforce.com/articleView?id=integrate_what_is_api.htm)_ in Salesforce Help.
- For information on Salesforce API request and response formats, see _[REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/)_.
