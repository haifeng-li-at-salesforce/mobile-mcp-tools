# Using Sync Names

Mobile SDK provides a collection of APIs for using and managing named sync operations. You can programmatically create and delete named syncs at runtime, run or rerun them by name, and manage named syncs in memory.

<!-- What are or where is the doc describing: storeConfig, options? How do you get a sync ID? What are the possible statuses returned by getSyncStatusByName?-->

## Name-Based APIs (iOS)

Most of these methods are new. Updated methods use the same parameters as their existing analogs for target, options, and updateBlock.

### Get sync status by name

- Swift

  - :
    ::include{src="../../shared/mobilesync_sync_status_named.md"}

- Objective-C

  - :

    ```java
    - (nullable
           SFSyncState*)getSyncStatusByName:(NSString*)syncName;
    ```

### Check for an existing sync by name

- Swift

  - :
    ::include{src="../../shared/mobilesync_has_sync.md"}

- Objective-C

  - :

    ```java
    - (BOOL)hasSyncWithName:(NSString*)syncName;
    ```

### Delete a sync configuration by name

- Swift

  - :
    ::include{src="../../shared/mobilesync_sync_delete_named.md"}

- Objective-C

  - :

    ```java
    - (void)deleteSyncByName:(NSString*)syncName;
    ```

- Create, run, or rerun a named sync configuration

  - : See [Syncing Down](entity-framework-native-sync-down.md) and [Syncing Up](entity-framework-native-sync-up.md).

- Call cleanResyncGhosts with a named sync configuration

  - : See [Calling cleanResyncGhosts Methods by Sync Name](entity-framework-sync-ghosts.md#clean-resync-ghosts-by-name).

## Name-Based APIs (Android)

Most of these methods are new. Overridden methods use the same parameters as their existing analogs for target, options, and callback.

- Get sync status by name

  - :

    ```java
    public SyncState getSyncStatus(String name);
    ```

- Check for an existing sync by name

  - :

    ```java
    public boolean hasSyncWithName(String name);
    ```

- Delete a sync configuration by name

  - :

    ```java
    public void deleteSync(String name);
    ```

- Create, run, or rerun a named sync configuration

  - : See [Syncing Down](entity-framework-native-sync-down.md) and [Syncing Up](entity-framework-native-sync-up.md).

- Call cleanResyncGhosts with a named sync configuration

  - : See [Calling cleanResyncGhosts Methods by Sync Name](entity-framework-sync-ghosts.md#clean-resync-ghosts-by-name).

## Name-Based APIs (Hybrid)

Most of these methods are existing legacy APIs. Wherever a sync ID is accepted, you can pass the sync name instead.

- Get sync status by name

  - : You can use this function to determine if a sync configuration exists. It returns null if the sync configuration doesn’t exist.

    ```java
    getSyncStatus(storeConfig, syncIdOrName, successCB, errorCB)
    ```

- Delete a sync configuration by name

  - :
    ```java
    deleteSync(storeConfig, syncIdOrName, successCB, errorCB)
    ```

- Create and run a named sync configuration

  - : The legacy `syncDown()` function now includes a syncName parameter. If the name is provided, Mobile SDK creates a configuration with the given name. This function fails if the requested sync name already exists.

    ```java
    syncDown(storeConfig, target, soupName, options, syncName, successCB, errorCB)
    ```

    ```java
    syncUp(storeConfig, target, soupName, options, syncName, successCB, errorCB)
    ```

- Run (or rerun) any sync by name

  - : This existing method now has an overload that accepts either a sync ID or name.

    ```java
    reSync(storeConfig, syncIdOrName, successCB, errorCB)
    ```

## Name-Based APIs (React Native)

Most of these methods are existing legacy APIs. Wherever a sync ID is accepted, you can pass the sync name instead.

- Get sync status by name

  - : This existing method now has an overload that accepts either a sync ID or a sync name.

    `getSyncStatus(storeConfig, syncIdOrName, successCB, errorCB)`

- Delete by name

  - : This method, new in Mobile SDK 6.0, accepts either a sync ID or a sync name.

    `deleteSync(storeConfig, syncIdOrName, successCB, errorCB)`

- Create and run a sync with a name - new optional parameter syncName

  - : This existing method now has an optional parameter that accepts a sync name.

    ```java
    syncDown(storeConfig, target, soupName, options, syncName, successCB, errorCB)
    syncUp(storeConfig, target, soupName, options, syncName, successCB, errorCB)
    ```

- Run (or rerun) any sync by name - overloaded to accept id or name

  - : This existing method now has an overload that accepts either a sync ID or a sync name.

    `reSync(storeConfig, syncIdOrName, successCB, errorCB)`

<!-- ## Example -->

## Invoking the Resync Method in Native iOS Apps

Excerpt from `SObject.swift` from MobileSyncExplorerSwift template app. In this example, `updateRemoteData` calls `reSync` with a sync up configuration (kSyncUpName). If that operation succeeds, it then calls `refreshRemoteData` with a sync down configuration (kSyncDownName). This follow-up step ensures that the soup reflects all the latest changes on the server:

::include{src="../../shared/mobilesync_explorer_update_remote_data_swift.md"}
::include{src="../../shared/mobilesync_explorer_refresh_remote_data_swift.md"}

<!-- ## Example -->

## Invoking the Resync Method in Native Android Apps

Excerpt from `SObjectSyncableRepoBase.kt` from MobileSyncExplorerKotlinTemplate.

```java
private suspend fun doSyncUp(): SyncState {
    try {
        return syncManager.suspendReSync(syncUpName)
    } catch (es: SyncManager.ReSyncException.FailedToStart) {
        throw SyncUpException.FailedToStart(cause = es)
    } catch (ef: SyncManager.ReSyncException.FailedToFinish) {
        throw SyncUpException.FailedToFinish(cause = ef)
    }
}

```

Excerpt from `ContactListLoader.java` from Android MobileSyncExplorer native sample app:

```java
public synchronized void syncUp() {
    try {
        syncMgr.reSync(SYNC_UP_NAME /* see usersyncs.json */, new SyncUpdateCallback() {
        @Override
            public void onUpdate(SyncState sync) {
                if (Status.DONE.equals(sync.getStatus())) {
                    syncDown();
                }
            }
        });
    } catch (JSONException e) {
        Log.e(TAG, "JSONException occurred while parsing", e);
    } catch (MobileSyncException e) {
        Log.e(TAG, "MobileSyncException occurred while attempting to sync up", e);
    }
}
```

```java
public synchronized void syncDown() {
    try {
        syncMgr.reSync(SYNC_DOWN_NAME /* see usersyncs.json */, new SyncUpdateCallback() {
        @Override
            public void onUpdate(SyncState sync) {
                if (Status.DONE.equals(sync.getStatus())) {
                    fireLoadCompleteIntent();
                }
            }
        });
    } catch (JSONException e) {
        Log.e(TAG, "JSONException occurred while parsing", e);
    } catch (MobileSyncException e) {
        Log.e(TAG, "MobileSyncException occurred while attempting to sync down", e);
    }
}
```

<!-- ## Example -->

## Invoking the Resync Method in Hybrid Apps

Excerpt from `MobileSyncExplorer.html` from MobileSyncExplorerHybrid sample app:

```javascript
syncDown: function() {
    cordova.require("com.salesforce.plugin.mobilesync").reSync("syncDownContacts" /* see usersyncs.json */,
                     this.handleSyncUpdate.bind(this));
},
syncUp: function() {
    cordova.require("com.salesforce.plugin.mobilesync").reSync("syncUpContacts" /* see usersyncs.json */,
                    this.handleSyncUpdate.bind(this));},
```
