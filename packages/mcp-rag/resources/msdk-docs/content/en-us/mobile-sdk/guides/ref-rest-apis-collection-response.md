# Collection Response

Handles responses for all Mobile SDK Collection requests.

**Properties:**

- Sub-responses (array)
- Sub-response properties:
  - Object ID (string)
  - Success (Boolean)
  - Errors (array)
  - JSON (dictionary)

## iOS

### Swift

Response handling:

```nolang
let parsedResponse = CollectionResponse(try response.asJson() as! [Any])
let objId = parsedResponse.subResponses[0].objectId  // String; can be nil
let success = parsedResponse.subResponses[0].success // Boolean
let errors = parsedResponse.subResponses[0].errors   // Array of CollectionErrorResponse objects with
                                                      // status code, message and fields
```

### Objective-C

Response handling:

```nolang
SFSDKCollectionResponse* parsedResponse = [[SFSDKCollectionResponse alloc]
    initWith:response];
parsedResponse.subResponses[0].objectId
parsedResponse.subResponses[0].success
parsedResponse.subResponses[0].errors // NSArray<SFSDKCollectionErrorResponse*> with status
                                            // code, message and fields
```

## Android

### Kotlin

Response handling:

```java
val parsedResponse = CollectionResponse(response.asJSONArray())
val objId = parsedResponse.subResponses[0].id         // a string or null
val success = parsedResponse.subResponses[0].success  // a boolean
val errors = parsedResponse.subResponses[0].errors    // a CollectionSubResponse.ErrorResponse object
                                                      // with status code, message and fields
```

### Java

Response handling:

```nolang
CollectionResponse parsedResponse =
    new CollectionResponse(response.asJSONArray());
String objId = parsedResponse.subResponses.get(0).id; // can be null
Boolean success =
    parsedResponse.subResponses.get(0).success;
List<CollectionResponse.ErrorResponse> errors =
    parsedResponse.subResponses.get(0).errors;
```

## See Also

- [SFSDKCollectionResponse.h](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/blob/dev/libs/SalesforceSDKCore/SalesforceSDKCore/Classes/RestAPI/SFSDKCollectionResponse.h) in the `SalesforceMobileSDK-iOS` repo.
- [CollectionResponse.java](https://github.com/forcedotcom/SalesforceMobileSDK-Android/blob/dev/libs/SalesforceSDK/src/com/salesforce/androidsdk/rest/CollectionResponse.java) in the `SalesforceMobileSDK-Android` repo.
- [“sObject Collections” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm)
