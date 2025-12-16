# Collection Delete

Deletes the objects in a collection that match the given object IDs.

Mobile SDK provides a custom response object for parsing Collection request results. See [Collection Response](ref-rest-apis-collection-response.md).

## Parameters

For collections, you can disallow partial updates by specifying an all-or-none parameter. When you set this parameter to true, Mobile SDK rolls back the entire request if any record deletion fails.

- API version (string)
- All or none (Boolean)
- Object Ids (array)

## iOS

### Swift

```nolang
let request = RestClient.shared.requestForDelete(allOrNone: allOrNone,
    withObjects: objectIds, apiVersion: nil)
```

### Objective-C

```nolang
- (SFRestRequest*)
requestForCollectionDelete:(BOOL)allOrNone
                  objectIds:(NSArray<NSString*>*)objectIds
                apiVersion:(nullable NSString *)apiVersion;
```

## Android

### Kotlin

```kotlin
val request =
    RestRequest.getRequestForCollectionDelete(ApiVersionStrings.getVersionNumber(this),
        allOrNone, objectIds)
```

### Java

```java
public static RestRequest getRequestForCollectionDelete(String apiVersion,
    boolean allOrNone, List<String> objectIds)
    throws UnsupportedEncodingException
```

## React Native

```javascript
collectionDelete = <T>(
  ids: Array<string>,
  successCB: ExecSuccessCallback<T>,
  errorCB: ExecErrorCallback,
): void
```

## See Also

- [“SObject Collections” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm)
