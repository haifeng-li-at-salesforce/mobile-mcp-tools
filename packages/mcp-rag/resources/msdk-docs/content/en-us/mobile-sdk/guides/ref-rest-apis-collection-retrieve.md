# Collection Retrieve

Retrieves a collection of objects of the given object type that match the given object IDs.

Mobile SDK provides a custom response object for parsing Collection request results. See [Collection Response](ref-rest-apis-collection-response.md).

## Parameters

If you provide a field list, Mobile SDK retrieves only those fields. Otherwise, it returns all accessible standard and custom fields.

- API version (string, optional)
- Object type (string)
- Object IDs (array)
- Field list (array)

## iOS

### Swift

```nolang
let request = RestClient.shared.requestForRetrieve(withObjectType: objectType,
    objectIds: objectIds!, fieldList: fieldList!, apiVersion: nil)

```

### Objective-C

```nolang
- (SFRestRequest*) requestForCollectionRetrieve:(NSString*)objectType
                                      objectIds:(NSArray<NSString*>*)objectIds
                                      fieldList:(NSArray<NSString*>*)fieldList
                                      apiVersion:(nullable NSString *)apiVersion;
```

## Android

### Kotlin

```kotlin
val request =
    RestRequest.getRequestForCollectionRetrieve(ApiVersionStrings.getVersionNumber(this),
        objectType, objectIds, fieldList)
```

### Java

```java

RestRequest getRequestForCollectionRetrieve(String apiVersion, String objectType,
    List<String> objectIds, List<String> fieldList)
```

## React Native

```javascript
collectionRetrieve = <T>(
  objectType: string,
  ids: Array<string>,
  fields: Array<string>,
  successCB: ExecSuccessCallback<T>,
  errorCB: ExecErrorCallback,
): void
```

## See Also

- [“sObject Collections” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm)
