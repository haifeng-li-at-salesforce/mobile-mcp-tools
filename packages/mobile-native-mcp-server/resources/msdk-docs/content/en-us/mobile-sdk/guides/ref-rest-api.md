# Supported Salesforce APIs

Mobile SDK supports these Salesforce APIs.

## RestRequest

The `RestRequest` class provides factory and extension methods that wrap Salesforce API calls. These methods use request parameters that you provide to construct the network call.

| Swift, Java, Kotlin | Objective-C     |
| ------------------- | --------------- |
| `RestRequest`       | `SFRestRequest` |

`RestRequest` returns a specialized copy of itself that reflects your parameters. To send your request to Salesforce, you pass this customized object to the Mobile SDK REST client.

`RestRequest` supports the Salesforce APIs in this section.

<!-- List of links is provided automatically by the build...but that can be overridden to create an explicit list with intelligent groupings.-->

## Single Access UI Bridge API

To display a Salesforce UI in a webview or an external browser without requiring users to re-enter their credentials, Mobile SDK constructs a frontdoor URL. The frontdoor URL takes an access token and a redirect URI, then directs the user to the redirect URI with a new session.

Beginning in version 12.2, Mobile SDK uses the Single Access UI Bridge API to construct the frontdoor URL, which was previously constructed manually.

To use the Single Access UI Bridge API, call this REST wrapper.

### iOS

```
// SFRestAPI.h

- (SFRestRequest *)requestForSingleAccess:(NSString *)redirectUri;

```

### Android

```
// RestRequest.java

public static RestRequest getRequestForSingleAccess(String redirectUri)
throws UnsupportedEncodingException
```

For more information on the Single Access UI Bridge API, see [_Salesforce Help_: Generate a Frontdoor URL to Bridge into UI Sessions](https://help.salesforce.com/s/articleView?id=sf.frontdoor_singleaccess.htm&type=5).

**See Also**

- [Using Salesforce REST APIs with Mobile SDK](ios-native-rest-apis.md)
- [Using REST APIs](android-using-rest-apis.md)
