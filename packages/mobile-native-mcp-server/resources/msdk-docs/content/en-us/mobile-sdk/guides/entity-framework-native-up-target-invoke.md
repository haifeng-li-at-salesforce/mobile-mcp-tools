# Invoking the Sync Up Method with a Custom Target

### iOS:

On a sync manager instance, call:

- Swift

  - :

    ```swift
    func syncUp(target: SyncUpTarget,
                 options: SyncOptions,
                soupName: String,
                onUpdate: ()) -> SyncState
    ```

    Here's an example:

    ::include{src="../../shared/mobilesync_sync_up_target_options_soupname.md"}

- Objective-C

  - :

    ```java
    - (SFSyncState*)
        syncUpWithTarget:(SFSyncUpTarget*)target
             syncOptions:(SFSyncOptions*)options
                soupName:(NSString*)soupName
             updateBlock:
                  (SFSyncSyncManagerUpdateBlock)updateBlock;
    ```

- Android:

  - : On a `SyncManager` instance, call:

    ```java
    SyncState syncUp(SyncUpTarget target,
        SyncOptions options, String soupName,
        SyncUpdateCallback callback);
    ```

- Hybrid:

  - :

    ```java
    cordova.require("com.salesforce.plugin.mobilesync").
          syncUp(isGlobalStore, target, soupName,
            options, successCB, errorCB);
    cordova.require("com.salesforce.plugin.mobilesync").
          syncUp(storeConfig, target, soupName,
            options, successCB, errorCB);
    ```
