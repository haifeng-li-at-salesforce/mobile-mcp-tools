# Mobile SDK REST Client Interface

| Swift      | Objective-C |
| ---------- | ----------- |
| RestClient | SFRestAPI   |

This class defines the native interface for creating, formatting, and sending REST requests to the Salesforce service. When the service responds, this class relays the asynchronous response to either your implementation of the `RestClientDelegate` protocol or a callback block or closure that you define.

`RestClient` serves as a factory for `RestRequest` instances. It defines a request factory method for each supported Lightning Platform endpoint. Each factory method returns a `RestRequest` instance that is customized with your request parameter values.

`SFRestAPI` defines REST request factory methods in Objective-C without Swift renaming. To call these methods on the Swift `RestClient` object, use the autocomplete suggestions offered by the Xcode compiler. For example, type `RestClient.shared.request` in a Mobile SDK app, then choose from the list.

:::note

Because the Swift compiler determines method and parameter names heuristically, signatures can differ from their Objective-C equivalents.

:::

## See Also

- For a list of supported Salesforce Platform APIs, see [Supported REST Services](ios-rest-apis-supported.md)

- [Creating REST Requests](ios-rest-apis-manual-calls.md)
