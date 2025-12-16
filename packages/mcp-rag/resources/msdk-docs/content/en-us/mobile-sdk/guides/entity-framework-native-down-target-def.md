# Defining a Custom Sync Down Target

You define custom targets for sync down operations by subclassing your platform’s abstract base class for sync down targets. To use custom targets in hybrid apps, implement a custom native target class for each platform you support. The base sync down target classes are:

- **iOS:**

  | Swift            | Objective-C        |
  | ---------------- | ------------------ |
  | `SyncDownTarget` | `SFSyncDownTarget` |

- **Android:** `SyncDownTarget`

:::note

These classes sync the requested records but not their related records. To include related records, use the sync target classes described in [Syncing Related Records](entity-framework-sync-related.md).

:::

## Required Methods

Every custom target class must implement the following required methods.

### Start Fetch Method

Called by the sync manager to initiate the sync down operation. If `maxTimeStamp` is greater than 0, this operation becomes a “resync”. It then returns only the records that have been created or updated since the specified time.

### iOS:

- Swift

  - :

    ```swift
    func startFetch(syncManager: SyncManager,
                         maxTimeStamp: Int64,
                           errorBlock: SyncDownErrorBlock,
                             complete: SyncDownCompleteBlock)
    ```

- Objective-C

  - :

    ```objc
    - (void) startFetch:(SFMobileSyncSyncManager*)syncManager
           maxTimeStamp:(long long)maxTimeStamp
             errorBlock:(SFSyncDownTargetFetchErrorBlock)
                        errorBlock
          completeBlock:(SFSyncDownTargetFetchCompleteBlock)
                        completeBlock;
    ```

- Android:

  - : `JSONArray startFetch(SyncManager syncManager, long maxTimeStamp);`

### Continue Fetching Method

Called by the sync manager repeatedly until the method returns null. This process retrieves all records that require syncing.

### iOS:

- Swift

  - :

    ```swift

    func continueFetch(syncManager: SyncManager,
                            onFail: SyncDownErrorBlock,
                        onComplete: SyncDownCompletionBlock?)
    ```

- Objective-C

  - :

    ```objc
    - (void)
        continueFetch:(SFMobileSyncSyncManager*)syncManager
           errorBlock:(SFSyncDownTargetFetchErrorBlock)
                      errorBlock
        completeBlock:(SFSyncDownTargetFetchCompleteBlock)
                      completeBlock;
    ```

- Android:

  - : `JSONArray continueFetch(SyncManager syncManager);`

### modificationDateFieldName Property (Optional)

Optionally, you can override the `modificationDateFieldName` property in your custom class. If you provide `modificationDateFieldName`, Mobile Sync uses the field with this name to compute the `maxTimestamp` value that `startFetch` uses to resync the records. Default field name is `lastModifiedDate`.

- iOS (Swift and Objective-C):

  - : `modificationDateFieldName` property

- Android:

  - : `String getModificationDateFieldName();`

### idFieldName Property (Optional)

If you provide `"idFieldName"`, Mobile Sync uses the field with the given name to get the ID of the record. For example, if you specify `"idFieldName":"AcmeId"`, Mobile Sync obtains the record’s ID from the `AcmeId` field instead of the default `Id` field.

- iOS (Swift and Objective-C):

  - : `idFieldName` property

- Android:

  - : `String getIdFieldName();`
