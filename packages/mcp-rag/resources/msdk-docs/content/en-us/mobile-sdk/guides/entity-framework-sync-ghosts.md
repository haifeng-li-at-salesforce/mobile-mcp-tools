# Handling “Ghost” Records After Sync Down Operations

If you’re finding that sync down operations sometimes leave unwanted records in your SmartStore soups, you can use the `cleanResyncGhosts` API to get rid of them.

In certain prescribed cases, SmartStore soups do not reflect the exact contents of the most recent sync down request. For example, if a record is deleted on the Salesforce server, the next sync down operation doesn’t remove that record from SmartStore. Also, records that don’t satisfy the sync criteria are excluded from the sync down results but aren’t automatically removed from the soup. These records that unexpectedly remain in the SmartStore soup are known as ghosts.

To root out these haunts, Mobile Sync provides a set of `cleanResyncGhosts` methods that identify and remove ghosts. You pass in the ID or name of a sync object and define a callback block. These methods are available for Android native, iOS native, hybrid, and React Native platforms.

:::note

Exercise restraint in using the `cleanResyncGhosts` methods! Calls to these methods can be expensive in both runtime performance and payload size. Use these methods for low-frequency cleanup, rather than as part of every sync down operation. Use your own judgment to determine whether a particular set of ghosts is problematic and therefore requires immediate cleanup.

:::

## Using cleanResyncGhosts with Custom Sync Down Targets

If your app uses a custom sync down target, `cleanResyncGhosts` requires the custom target to implement the `getListOfRemoteIds` method. This method returns the list of Salesforce IDs that satisfy the sync down target’s criteria. For `getListOfRemoteIds` coding examples, see the SOQL, SOSL, or MRU sync down target in these Mobile Sync library folders:

- iOS

  - : [https://github.com/forcedotcom/SalesforceMobileSDK-iOS/tree/master/libs/MobileSync/MobileSync/Classes/Util](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/tree/master/libs/MobileSync/MobileSync/Classes/Util)

- Android

  - : [https://github.com/forcedotcom/SalesforceMobileSDK-Android/tree/master/libs/MobileSync/src/com/salesforce/androidsdk/mobilesync/util](https://github.com/forcedotcom/SalesforceMobileSDK-Android/tree/master/libs/MobileSync/src/com/salesforce/androidsdk/mobilesync/util)

## Preparing Soups for cleanResyncGhosts

For the target soup, add an index for the following field:

- `__sync_id__`

  - : This field ensures that the `cleanResyncGhosts()` method removes only the desired soup elements. Mobile Sync manages the content of this field for you.

## Calling cleanResyncGhosts Methods by Sync ID

### iOS Native

| Swift         | Objective-C               |
| ------------- | ------------------------- |
| `SyncManager` | `SFMobileSyncSyncManager` |

- Swift

  - : In Mobile SDK 7.1, the following method is updated to throw.

    ```nolang
    open func cleanResyncGhosts(
                            forId syncId: NSNumber,
        onComplete completionStatusBlock: @escaping SyncCompletionBlock) throws
    ```

- Objective-C

  - : In Mobile SDK 7.1, the following method is updated to support an `NSError` output parameter.

    ```nolang
    - (BOOL)
            cleanResyncGhosts:(NSNumber*)syncId
        completionStatusBlock:
            (SFSyncSyncManagerCompletionStatusBlock)completionStatusBlock
                        error:(NSError**)error;
    ```

### Android Native

- Kotlin

  - :
    ```nolang
    suspend fun suspendCleanResyncGhosts(syncId: Long): Int
    ```

- Java

  - :

    ```java
    public void cleanResyncGhosts(final long syncId)
        throws JSONException, IOException

    public void cleanResyncGhosts(long syncId,
        final CleanResyncGhostsCallback callback)
        throws JSONException
    ```

- Hybrid

  - :

    ```javascript
    cleanResyncGhosts(isGlobalStore, syncId, successCB, errorCB);

    cleanResyncGhosts(storeConfig, syncId, successCB, errorCB);
    ```

- React Native

  - :

    ```javascript
    mobilesync.cleanResyncGhosts(isGlobalStore, syncId, successCB, errorCB);

    mobilesync.cleanResyncGhosts(storeConfig, syncId, successCB, errorCB);
    ```

## Calling cleanResyncGhosts Methods by Sync Name

You can also call `cleanResyncGhosts` with a sync name.

- iOS (Swift)

  - :

    ```nolang
    //Mobile Sync native Swift extension function
    public func cleanGhosts(named syncName: String,
        _ completionBlock: @escaping (Result<UInt, MobileSyncError>) -> Void

    //Objective-C function renamed for Swift
    open func cleanResyncGhosts(
                        forName syncName: String,
        onComplete completionStatusBlock: @escaping SyncCompletionBlock) throws

    //iOS 13 or above only:
    //Mobile Sync native Swift extension function, using Combine Publisher
    public func cleanGhostsPublisher(for syncName: String) ->
        Future<UInt, MobileSyncError>

    ```

- iOS (Objective-C)

  - :

    ```nolang
    - (*BOOL*)
        cleanResyncGhostsByName:(NSString*)syncName
          completionStatusBlock:
              (SFSyncSyncManagerCompletionStatusBlock)completionStatusBlock
                          error:(NSError**)error;

    - (*BOOL*)
            cleanResyncGhosts:(NSNumber*)syncId
        completionStatusBlock:
            (SFSyncSyncManagerCompletionStatusBlock)completionStatusBlock
                        error:(NSError**)error;
    ```

- Android (Kotlin)

  - :
    ```nolang
    suspend fun suspendCleanResyncGhosts(syncId: Long): Int
    ```

- Android (Java)

  - :
    ```nolang
    public void cleanResyncGhosts(final String syncName, final CleanResyncGhostsCallback callback)
    ```

## Deprecations in Mobile SDK 7.1

- Deprecated iOS Method (Objective-C)

  - : The following method that does not support an `NSError` output parameter is slated for removal in a future major release.

    ```nolang
    - (*BOOL*)
            cleanResyncGhosts:(NSNumber*)syncId
        completionStatusBlock:
            (SFSyncSyncManagerCompletionStatusBlock)completionStatusBlock;
    ```
