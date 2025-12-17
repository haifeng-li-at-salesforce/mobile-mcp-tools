# Collection Create

Creates a collection of records of the specified object type.

Mobile SDK provides a custom response object for parsing Collection request results. See [Collection Response](ref-rest-apis-collection-response.md).

## Parameters

For collections, you can disallow partially successful results by specifying an all-or-none parameter. When you set this parameter to true, Mobile SDK rolls back the entire request if any record creation fails.

- API version (string)
- All or None (Boolean)
- Fields (array)

## iOS

### Swift

```nolang
let request = RestClient.shared.requestForCreate(allOrNone: allOrNone, records: records,
    apiVersion: nil)

```

### Objective-C

```nolang
- (SFRestRequest*) requestForCollectionCreate:(BOOL)allOrNone
                                      records:(NSArray<NSDictionary*>*)records
                                    apiVersion:(nullable NSString *)apiVersion;
```

## Android

### Kotlin

```kotlin
val request =
    RestRequest.getRequestForCollectionCreate(ApiVersionStrings.getVersionNumber(this),
        allOrNone, records)
```

### Java

```java
public static RestRequest getRequestForCollectionCreate(String apiVersion,
    boolean allOrNone, JSONArray records)
```

## React Native

```javascript
collectionCreate = <T>(
  allOrNone: boolean,
  records: Array<Record<string, unknown>>,
  successCB: ExecSuccessCallback<T>,
  errorCB: ExecErrorCallback,
): void
```

## See Also

- [“sObject Collections” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm)
