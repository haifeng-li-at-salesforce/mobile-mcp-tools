# Using the Sync Manager with Global SmartStore

To use Mobile Sync with a global SmartStore instance, call a static factory method on the sync manager object to get a compatible sync manager instance.

## iOS

- Swift

  - :
    ::include{src="../../shared/mobilesync_sharedinstanceforstore.md"}

- Objective-C

  - :

    ```objc
    + (instancetype)
        sharedInstanceForStore:
            (SFSmartStore *)store;
    ```

Returns a sync manager instance that talks to the server as the current user and writes to or reads from the given SmartStore instance. Use this factory method for syncing data with the global SmartStore instance.

- Android

  - :

    ```java
    SyncManager getInstance(UserAccount account, String communityId,  smartStore);
    ```

    Returns a sync manager instance that talks to the server as the given community user and writes to or reads from the given SmartStore instance. Use this factory method for syncing data with the global SmartStore instance.

- Hybrid

  - : In each of the following methods, the optional first argument tells the Mobile Sync plug-in whether to use a global store. This argument accepts a Boolean value or a `StoreConfig` object. If you use a `StoreConfig` object, you can specify `storeName`, `isGlobalStore`, or both, depending on your context. See [Creating and Accessing User-based Stores](offline-access-store.md).

    - ```js
      syncDown(isGlobalStore, target, soupName, options, successCB, errorCB);
      syncDown(storeConfig, target, soupName, options, successCB, errorCB);
      ```

    - ```js
      reSync(isGlobalStore, syncId, successCB, errorCB);
      reSync(storeConfig, syncId, successCB, errorCB);
      ```

    - ```js
      syncUp(isGlobalStore, target, soupName, options, successCB, errorCB);
      syncUp(storeConfig, target, soupName, options, successCB, errorCB);
      ```

    - ```js
      getSyncStatus(isGlobalStore, syncId, successCB, errorCB);
      getSyncStatus(storeConfig, syncId, successCB, errorCB);
      ```

## See Also

- [Creating and Accessing User-based Stores](offline-access-store.md)
- [Using Global SmartStore](offline-global-smartstore.md)
