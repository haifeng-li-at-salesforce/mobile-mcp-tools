# Creating REST Requests

The Mobile SDK REST API supports many types of Salesforce REST requests. For the Lightning Platform API, `RestClient` defines factory methods that return `RestRequest` instances for every supported endpoint. You obtain a customized `RestRequest` object by calling the appropriate REST client factory method with your request parameters. Factory `RestRequest` objects are specialized for the indicated request type and configured with your input values.

Here’s an overview of how you can create REST requests.

- For the Lightning Platform API, `RestClient` factory methods return preformatted `RestRequest` objects based on minimal data input.
- (Objective-C only) `SFRestAPI (Blocks)` category methods let you define a REST request and send it in a single call. Block arguments, instead of a REST delegate object, handle REST responses.
- `SFRestAPI (Files)` category methods create `RestRequest` instances that provide access to Salesforce file-based resources.
- `RestRequest` methods support custom configurations for calling non-Lightning Platform and external APIs.
- `SFRestAPI (QueryBuilder)` category methods save you from having to manually format your own queries or searches. These methods construct SOQL query and SOSL search strings based on your input.

<!-- Add examples?-->

## See Also

- [Using REST Request Methods](ios-rest-apis-using-methods.md)
- [Unauthenticated REST Requests](ios-unauthenticated-rest-requests.md)
- [SFRestAPI (Blocks) Category](ios-rest-apis-sfrestapi-block.md)
- [SFRestAPI (QueryBuilder) Category](ios-rest-apis-sfrestapi-querybuilder.md)
- [SFRestAPI (Files) Category](ios-rest-apis-sfrestapi-files.md)
