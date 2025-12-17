# Collection Update

Updates the requested collection with the given records.

## Parameters

For collections, you can disallow partial updates by specifying an all-or-none parameter. When you set this parameter to true, Mobile SDK rolls back the entire request if any record update fails.

Mobile SDK provides a custom response object for parsing Collection request results. See [Collection Response](ref-rest-apis-collection-response.md).

- API version (string, optional)
- "All or none" preference (Boolean)
- Records (array of sObjects)

## iOS

### Swift

```nolang
let request = RestClient.shared.requestForCollectionUpdate(allOrNone,
    records:records, apiVersion: apiVersion)
```

### Objective-C

```nolang
- (SFRestRequest*) requestForCollectionUpdate:(BOOL)allOrNone
                                      records:(NSArray<NSDictionary*>*)records
                                    apiVersion:(nullable NSString *)apiVersion;
```

## Android

### Kotlin

```kotlin
val request =
    RestRequest.getRequestForCollectionUpdate(ApiVersionStrings.getVersionNumber(this),
        allOrNone, records)
```

### Java

```java
public static RestRequest getRequestForCollectionUpdate(String apiVersion,
    boolean allOrNone, JSONArray records) throws JSONException
```

## React Native

```javascript
collectionUpdate= <T>(
allOrNone: boolean,
records: Array<Record<string, unknown>>,
successCB: ExecSuccessCallback<T>,
errorCB: ExecErrorCallback,
): void
```

## See Also

- [“sObject Collections” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm)
