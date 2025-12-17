# Collection Upsert

Updates or inserts a collection of objects from external data.

Mobile SDK provides a custom response object for parsing Collection request results. See [Collection Response](ref-rest-apis-collection-response.md).

## Parameters

Salesforce inserts or updates a record depending on whether an external ID currently exists in the external ID field. To force Salesforce to create a new record, set the name of the external ID field to “Id” and the external ID value to null.

For collections, you can disallow partial upserts by specifying an all-or-none parameter. When you set this parameter to true, Mobile SDK rolls back the entire request if any record upsert fails.

- API version (string, optional)
- "All or none" preference (Boolean)
- Object type (string)
- External ID field name (string)
- Records (array)

## iOS

### Swift

```nolang
let request = RestClient.shared.requestForCollectionUpsert(allOrNone: allOrNone,
    withObjectType: objectType, externalIdField: externalIdFieldName!,
    records: records!, apiVersion: nil)
```

### Objective-C

```nolang
- (SFRestRequest*)
requestForCollectionUpsert:(BOOL)allOrNone
                objectType:(NSString*)objectType
            externalIdField:(NSString*)externalIdField
                    records:(NSArray<NSDictionary*>*)records
                apiVersion:(nullable NSString *)apiVersion;
```

## Android

### Kotlin

```kotlin
val request =
    RestRequest.getRequestForCollectionUpsert(ApiVersionStrings.getVersionNumber(this),
        allOrNone, objectType, externalIdFieldName, records)
```

### Java

```java
public static RestRequest getRequestForCollectionUpsert(
    String apiVersion, boolean allOrNone, String objectType, String externalIdField,
    JSONArray records)
    throws JSONException
```

## React Native

```javascript
collectionUpsert = <T>(
  allOrNone: boolean,
  objectType: string,
  externalIdField: string,
  records: Array<Record<string, unknown>>,
  successCB: ExecSuccessCallback<T>,
  errorCB: ExecErrorCallback,
): void
```

## See Also

- [“sObject Collections” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm)
