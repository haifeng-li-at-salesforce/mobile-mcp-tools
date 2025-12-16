# Defining a Custom Sync Up Target

You define custom targets for sync up operations by subclassing your platform’s abstract base class for sync up targets. To use custom targets in hybrid apps, you’re required to implement a custom native target class for each platform you support. The base sync up target classes are:

- **iOS:**

  | Swift          | Objective-C      |
  | -------------- | ---------------- |
  | `SyncUpTarget` | `SFSyncUpTarget` |

- **Android:** `SyncUpTarget`

:::note

These classes sync the requested records but not their related records. To include related records, use the sync target classes described in [Syncing Related Records](entity-framework-sync-related.md).

:::

## Handling Field Lists in Create and Update Operations

A target’s Create On Server and Update On Server methods operate only on the list of fields specified in their argument lists. However, a Salesforce object can require the target to create certain fields that can’t be updated by apps. With these objects, a target that uses a single field list for both create and update operations can fail if it tries to update locked fields.

To specify distinct field lists for create and update operations, you can use an initializer method that supports `createFieldlist` and `updateFieldlist` parameters. This option can save you the effort of defining a custom target if you’re doing so only to provide these field lists.

### iOS

Call the following `SFSyncUpTarget` init method:

- Swift

  - :

    ```swift
    SyncUpTarget.init(createFieldlist: [Any]?, updateFieldlist: [Any]?)
    ```

    Here's an example:

    ```swift
    SyncUpTarget.init(createFieldlist: nil, updateFieldlist: ["Name"])
    ```

- Objective-C

  - :

    ```nolang
    - (instancetype)initWithCreateFieldlist:(NSArray *)createFieldlist
                            updateFieldlist:(NSArray *)updateFieldlist
    ```

If you provide the `createFieldlist` and `updateFieldlist` arguments, the target uses them where applicable. In those cases, the target ignores the field list defined in the sync options object.

### Android

Use the following `SyncUpTarget` constructor:

```java
public SyncUpTarget(List<String> createFieldlist, List<String> updateFieldlist)
```

If you provide the `createFieldlist` and `updateFieldlist` arguments, the target uses them where applicable. In those cases, the target ignores the field list defined in the `SyncOptions` object.

## Required Methods

Every custom target class must implement the following required methods.

### Create On Server Method

Sync up a locally created record. Hybrid and React native apps can override the fields parameter by calling `syncUp` with the optional `createFieldList` parameter.

### iOS:

- Swift

  - :

    ```swift
    func createOnServer(syncManager: SyncManager,
                             record: [AnyHashable : Any],
                          fieldlist: [Any],
                         onComplete: SyncUpcompletionBlock([AnyHashable : Any]?)
                                         -> Void,
                             onFail: SyncUpErrorBlock(Error) -> Void)
    ```

- Objective-C

  - :

    ```nolang
    - (void) createOnServer:(NSString*)objectType
                     fields:(NSDictionary*)fields
            completionBlock:(SFSyncUpTargetCompleteBlock)
                            completionBlock
                  failBlock:(SFSyncUpTargetErrorBlock)failBlock;
    ```

### Android:

```java
String createOnServer(SyncManager syncManager,
    String objectType, Map<String, Object> fields);
```

### Update On Server Method

Sync up a locally updated record. For the objectId parameter, Mobile Sync uses the field specified in the `getIdFieldName()` method (Android) or the `idFieldName` property (iOS) of the custom target. Hybrid and React native apps can override the fields parameter by calling `syncUp` with the optional `updateFieldList` parameter.

### iOS:

- Swift

  - :

    ```swift
    func updateOnServer(syncManager: SyncManager,
                             record: [AnyHashable : Any],
                          fieldlist: [Any],
                         onComplete: SyncUpcompletionBlock([AnyHashable : Any]?)
                                         -> Void,
                             onFail: SyncUpErrorBlock(Error) -> Void)
    ```

- Objective-C

  - :

    ```nolang
    - (void) updateOnServer:(NSString*)objectType
                   objectId:(NSString*)objectId
                     fields:(NSDictionary*)fields
            completionBlock:(SFSyncUpTargetCompleteBlock)
                            completionBlock
                  failBlock:(SFSyncUpTargetErrorBlock)failBlock;
    ```

### Android:

```java
updateOnServer(SyncManager syncManager, String objectType, String objectId, Map<String, Object> fields);
```

### Delete On Server Method

Sync up a locally deleted record. For the objectId parameter, Mobile Sync uses the field specified in the `getIdFieldName()` method (Android) or the `idFieldName` property (iOS) of the custom target.

### iOS:

- Swift

  - :

    ```swift
    func deleteOnServer(syncManager: SyncManager,
                             record: [AnyHashable : Any],
                          fieldlist: [Any],
                         onComplete: SyncUpcompletionBlock([AnyHashable : Any]?)
                                         -> Void,
                             onFail: SyncUpErrorBlock(Error) -> Void)
    ```

- Objective-C

  - :

    ```nolang
    - (void) deleteOnServer:(NSString*)objectType
                   objectId:(NSString*)objectId
            completionBlock:(SFSyncUpTargetCompleteBlock)
                            completionBlock
                  failBlock:(SFSyncUpTargetErrorBlock)failBlock;
    ```

- Android:

  - :

    ```java

    deleteOnServer(SyncManager syncManager, String objectType,
        String objectId);
    ```

### Optional Configuration Changes

Optionally, you can override the following values in your custom class.

### getIdsOfRecordsToSyncUp

List of record IDs returned for syncing up. By default, these methods return any record where `__local__` is true.

### iOS:

- Swift

  - :

    ```swift
    func getIdsOfRecords(toSyncUp: SyncManager, soupName: String)
    ```

- Objective-C

  - :

    ```nolang
    - (NSArray*)
    getIdsOfRecordsToSyncUp:(SFMobileSyncSyncManager*)syncManager
                   soupName:(NSString*)soupName;
    ```

- Android:

  - :

    ```java
    Set<String> getIdsOfRecordsToSyncUp(SyncManager syncManager,
        String soupName);
    ```

### Modification Date Field Name

Field used during a `LEAVE_IF_CHANGED` sync up operation to determine whether a record was remotely modified. Default value is `lastModifiedDate`.

- iOS (Swift and Objective-C):

  - : `modificationDateFieldName` property

- Android:

  - :

    ```java
    String getModificationDateFieldName();
    ```

### isNewerThanServer

Determines whether a soup element is more current than the corresponding server record.

### iOS:

- Swift

  - :

    ```swift
    func isNewerThanServer(syncManager: SyncManager,
                                record: [AnyHashable : Any],
                           resultBlock: RecordNewerThanServerBlock(Bool) -> Void)
    ```

- Objective-C

  - :

    ```nolang
    - (void)isNewerThanServer:(SFMobileSyncSyncManager *)syncManager
                       record:(NSDictionary*)record
                  resultBlock:(SFSyncUpRecordNewerThanServerBlock)resultBlock;
    ```

- Android:

  - :

    ```java
    public boolean isNewerThanServer(SyncManager syncManager,
        JSONObject record) throws JSONException, IOException
    ```

### ID Field Name

Field used to get the ID of the record. For example, during sync up, Mobile SDK obtains the ID that it passes to the `updateOnServer()` method from the field whose name matches `idFieldName` in the local record.

- iOS (Swift and Objective-C):

  - : `idFieldName` property

- Android:

  - : `String getIdFieldName();`
