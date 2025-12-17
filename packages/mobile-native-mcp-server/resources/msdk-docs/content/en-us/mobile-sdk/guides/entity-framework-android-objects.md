# Object Representation

When you use the metadata manager, Mobile Sync model information arrives as a result of calling metadata manager load methods. The metadata manager loads the data from the current user’s organization and presents it in one of three classes:

- [Object](#object)
- [Object Type](#object-type)
- [Object Type Layout](#object-type-layout)

## Object

- **Android class**: `com.salesforce.androidsdk.mobilesync.model.SalesforceObject`
- **iOS class (Objective-C only)**: `SFObject`

These classes encapsulate the data that you retrieve from an sObject in Salesforce. The object class reads the data from a `JSONObject` in Android, or an `NSDictionary` object in iOS, that contains the results of your query. It then stores the object’s ID, type, and name as properties. It also stores the `JSONObject` itself as raw data.

## Object Type

- **Android class** `com.salesforce.androidsdk.mobilesync.model.SalesforceObjectType`
- **iOS class (Objective-C only)** `SFObjectType`

The object type class stores details of an sObject, including the prefix, name, label, plural label, and fields.

## Object Type Layout

- **Android class** `com.salesforce.androidsdk.mobilesync.model.SalesforceObjectTypeLayout`
- **iOS class (Objective-C only)** `SFObjectTypeLayout`

The object type layout class retrieves the columnar search layout defined for the sObject in the organization, if one is defined. If no layout exists, you’re free to choose the fields you want your app to display and the format in which to display them.

<!--
## Example

## Android Example

The following test code shows how to use the metadata manager to load Case object type data from the server.

```java

public void testLoadCaseObjectTypeFromServer() {
    final SalesforceObjectType actualCase =
        metadataManager.loadObjectType(Constants.CASE,
        CachePolicy.RELOAD_AND_RETURN_CACHE_DATA, REFRESH_INTERVAL);
    assertNotNull("case object should not be null.", actualCase);
    assertEquals(String.format("case object type name should be %s", Constants.CASE), actualCase.getName(), Constants.CASE);
}
```

## Example

## iOS Example

The following test code shows how to use the metadata manager to load Case object type data from the server.

```java
_blocksUncompletedCount = 0;
SFMobileSyncMetadataManager *metadataMgr =
    [SFMobileSyncMetadataManager sharedInstance:_currentUser];

NSMutableArray *objectsToLoad = [NSMutableArray new];
[metadataMgr loadObjectType:@"Case"
    cachePolicy:SFDataCachePolicyReloadAndReturnCacheOnFailure
    refreshCacheIfOlderThan:kRefreshInterval
    completion:^(SFObjectType *result, BOOL isDataFromCache) {
        if (nil != result) {
            [objectsToLoad addObject:result];
        }
        _blocksUncompletedCount--;
    }
    error:^(NSError *error) {
        _blocksUncompletedCount--;
    }
];
_blocksUncompletedCount++;

```
-->
