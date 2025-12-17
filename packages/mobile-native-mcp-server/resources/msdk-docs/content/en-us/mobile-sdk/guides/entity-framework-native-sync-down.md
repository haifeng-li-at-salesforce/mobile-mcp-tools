# Syncing Down

To download sObjects from the server to your local Mobile Sync soup, use the appropriate “sync down” method.

For sync down methods, you define a target that provides the list of sObjects to be downloaded. To provide an explicit list, use `JSONObject` on Android, or `NSDictionary` on iOS. However, you can also define the target with a query string. The sync target class provides factory methods for creating target objects from a SOQL, SOSL, or MRU query.

You also specify the name of the SmartStore soup that receives the downloaded data. This soup is required to have an indexed string field named `__local__`. Mobile SDK reports the progress of the sync operation through the callback method or update block that you provide.

## Merge Modes

Sync down methods support an option that lets you control how incoming data merges with locally modified records. Choose one of the following behaviors:

1.  Overwrite modified local records and lose all local changes. Set the options parameter to the following value:

    - **iOS:**

      - Swift

        - :
          ::include{src="../../shared/mobilesync_newsyncoptions_forsyncdown_merge.md"}

      - Objective-C

        - : `[SFSyncOptions newSyncOptionsForSyncDown:SFSyncStateMergeModeOverwrite]`

    - **Android:**`SyncOptions.optionsForSyncDown(MergeMode.OVERWRITE)`

2.  Preserve all local changes and locally modified records. Set the options parameter to the following value:

    - **iOS:**

      - Swift

        - :
          ::include{src="../../shared/mobilesync_newsyncoptions_forsyncdown_leaveifchanged.md"}

      - Objective-C

        - : `[SFSyncOptions newSyncOptionsForSyncDown:SFSyncStateMergeModeLeaveIfChanged]`

    - **Android:**`SyncOptions.optionsForSyncDown(MergeMode.LEAVE_IF_CHANGED)`

:::important

- If you use a version of `syncDown` that doesn’t take an options parameter, existing sObjects in the cache can be overwritten. To preserve local changes, always run sync up before running sync down.
- Sync down payloads don’t reflect records that have been deleted on the server. As a result, the update operation doesn’t automatically delete the corresponding records in the target soups. These records that remain in the soup after deletion on the server are known as ghosts. To delete them, call one of the [cleanResyncGhosts](entity-framework-sync-ghosts.md) methods after you sync down.

:::

## iOS Sync Manager Methods

- Swift Class Name

  - :
    ```nolang
    SyncManager
    ```

- Objective-C Class Name

  - :
    ```nolang
    SFMobileSyncSyncManager
    ```

### To create a sync down operation without running it:

- Swift

  - :
    ::include{src="../../shared/mobilesync_sync_down_create.md"}

- Objective-C

  - :

    ```java
    - (SFSyncState *)createSyncDown:(SFSyncDownTarget *)target
                            options:(SFSyncOptions *)options
                           soupName:(NSString *)soupName
                           syncName:(NSString *)syncName;
    ```

### To create and run a sync down operation that overwrites any local changes:

- Swift

  - :

    ```swift
    func syncDown(target: SFSyncDownTarget, soupName: String) -> SyncState
    ```

- Objective-C

  - :

    ```nolang

    - (SFSyncState*) syncDownWithTarget:(SFSyncDownTarget*)target
                               soupName:(NSString*)soupName
                            updateBlock:(SFSyncSyncManagerUpdateBlock)updateBlock;
    ```

### To create and run an unnamed sync down operation:

- Swift

  - :
    ::include{src="../../shared/mobilesync_sync_down_target_soupname.md"}

- Objective-C

  - :

    ```nolang

    - (SFSyncState*) syncDownWithTarget:(SFSyncDownTarget*)target
                                options:(SFSyncOptions*)options
                               soupName:(NSString*)soupName
                            updateBlock:(SFSyncSyncManagerUpdateBlock)updateBlock;
    ```

### To create and run a named sync down operation:

- Swift

  - :
    ::include{src="../../shared/mobilesync_sync_down_target_options_soupname_syncname.md"}

- Objective-C

  - :

    ```nolang

    - (SFSyncState*) syncDownWithTarget:(SFSyncDownTarget*)target
                                options:(SFSyncOptions*)options
                               soupName:(NSString*)soupName
                               syncName:(NSString* __nullable)syncName
                            updateBlock:(SFSyncSyncManagerUpdateBlock)updateBlock                                   error:(NSError**)error;
    ```

### To run a named sync down operation:

- Swift

  - :
    ::include{src="../../shared/mobilesync_resync_named.md"}

- Objective-C

  - :

    ```nolang

    - (nullable SFSyncState*) reSyncByName:(NSString*)syncName
                               updateBlock:(SFSyncSyncManagerUpdateBlock)updateBlock
                                     error:(NSError**)error;
    ```

### To rerun a previous sync operation using its sync ID:

- Swift

  - :
    ::include{src="../../shared/mobilesync_resync.md"}

- Objective-C

  - :

    ```nolang

    - (nullable SFSyncState*) reSync:(NSNumber*)syncId
                         updateBlock:(SFSyncSyncManagerUpdateBlock)updateBlock
                               error:(NSError**)error;
    ```

## Android SyncManager Methods

- To create a sync down operation without running it:

  - :

    ```java
    public SyncState createSyncDown(SyncDownTarget target,
        SyncOptions options, String soupName, String syncName)
        throws JSONException;
    ```

- To create and run a sync down operation that overwrites any local changes:

  - :

    ```java
    public SyncState syncDown(SyncDownTarget target, String soupName,
       SyncUpdateCallback callback) throws JSONException;
    ```

- To create and run an unnamed sync down operation:

  - :

    ```java
    public SyncState syncDown(SyncDownTarget target, SyncOptions options,
       String soupName, SyncUpdateCallback callback)
       throws JSONException;
    ```

- To create and run a named sync down operation:

  - :

    ```java
    public SyncState syncDown(SyncDownTarget target, SyncOptions options,
       String soupName, String syncName, SyncUpdateCallback callback)
       throws JSONException;
    ```

- To run or rerun a named sync configuration:

  - :

    ```java
    public SyncState reSync(String syncName, SyncUpdateCallback callback)
       throws JSONException;
    ```

- To rerun a previous sync operation using its sync ID:

  - :

    ```java
    public SyncState reSync(long syncId, SyncUpdateCallback callback)
       throws JSONException;
    ```

## iOS Example

The [MobileSyncExplorerSwift](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/master/MobileSyncExplorerSwift) sample app demonstrates how to use named syncs and sync configuration files with the Salesforce Contact object. In iOS, this sample defines a `ContactSObjectData` class that represents a contact record as a Swift object. The sample also defines several support classes:

- `ContactSObjectDataSpec`
- `SObjectData`
- `SObjectDataSpec`
- `SObjectDataFieldSpec`
- `SObjectDataManager`

To sync Contact data with the SmartStore soup, this app defines the following named sync operations in the `Resources/usersyncs.json` file:

```json

{
"syncs": [
  {
    "syncName": "syncDownContacts",
    "syncType": "syncDown",
    "soupName": "contacts",
    "target": {"type":"soql", "query":"SELECT FirstName, LastName, Title,
        MobilePhone, Email, Department, HomePhone FROM Contact LIMIT 10000"},
    "options": {"mergeMode":"OVERWRITE"}
  },
  {
    "syncName": "syncUpContacts",
    "syncType": "syncUp",
    "soupName": "contacts",
    "target": {"createFieldlist":["FirstName", "LastName", "Title",
        "MobilePhone", "Email", "Department", "HomePhone"]},
    "options": {"fieldlist":["Id", "FirstName", "LastName", "Title",
        "MobilePhone", "Email", "Department", "HomePhone"],
        "mergeMode":"LEAVE_IF_CHANGED"}
  }
]
}
```

In the `RootViewController` class, the `syncUpDown()` method starts the flow by calling the `updateRemoteData(_:onFailure:)` method of `SObjectDataManager`.

```java

func syncUpDown(){
    let alert = self.showAlert("Syncing", message: "Syncing with Salesforce")
    sObjectsDataManager.updateRemoteData({ [weak self] (sObjectsData) in
        DispatchQueue.main.async {
            alert.message = "Sync Complete!"
            alert.dismiss(animated: true, completion: nil)
            self?.refreshList()
        }
    }, onFailure: { [weak self] (error, syncState) in
        alert.message = "Sync Failed!"
        alert.dismiss(animated: true, completion: nil)
        self?.refreshList()
    })
}
```

For the first argument of `updateRemoteData`, which represents success, `syncUpDown` passes a block that calls the `refreshList()` method of `RootViewController`. This method filters the local contacts according to customer input and refreshes the view.

`updateRemoteData` performs a sync up ensures that allowed soup changes are merged into the Salesforce org. If sync up succeeds—that is, if the `SyncState` status indicates “done”—then `updateRemoteData` does the following:

1.  Retrieves all raw data from the freshly updated soup.
2.  Transforms the soup’s data to `ContactSObjectData` objects and stores these objects in an internal array.
3.  Passes control to `refreshRemoteData(_:onFailure:)`. The `onSuccess` argument passed to `refreshRemoteData` is the block passed in from `syncUpDown`.

    ```swift
    func updateRemoteData(_ onSuccess: @escaping ([SObjectData]) -> Void,
                            onFailure:@escaping (NSError?, SyncState?) -> Void) -> Void {
    ...
        try strongSelf.refreshRemoteData({ (sobjs) in
            onSuccess(sobjs)
        }, onFailure:  { (error,syncState) in
            onFailure(error,syncState)
        })
    ….
    ```

In `refreshRemoteData`, the app again calls `reSync` but with the `syncDownContacts` model—aliased as `kSyncDownName`—to update the soup. If sync down succeeds, `refreshRemoteData` “closes the circle” by executing the block that’s passed to it from `syncUpDown` via `updateRemoteData`.

```swift

func refreshRemoteData(_ completion: @escaping ([SObjectData]) -> Void,onFailure: @escaping (NSError?, SyncState) -> Void  ) throws -> Void {

    try self.syncMgr.reSync(named: kSyncDownName) { [weak self] (syncState) in
        switch (syncState.status) {
        case .done:
            do {
                let objects = try self?.queryLocalData()
                self?.populateDataRows(objects)
                completion(self?.fullDataRowList ?? [])
            } catch {
               MobileSyncLogger.e(SObjectDataManager.self,
                   message: "Resync \(syncState.syncName) failed \(error)" )
            }
            break
        case .failed:
             MobileSyncLogger.e(SObjectDataManager.self,
                   message: "Resync \(syncState.syncName) failed" )
             onFailure(nil,syncState)
        default:
            break
        }
    }
}
```

To summarize everything that happens in the `syncUpDown` call stack:

1.  _Sync up_: It syncs soup changes up to the server by calling `updateRemoteData` on `SObjectsDataManager`. This step ensures that all allowable local and offline changes are merged into Salesforce.
2.  _Sync down_: After the soup records are merged with server data, it syncs server data down to the soup through a call to `refreshRemoteData`. This step ensures that the soup reflects changes originating on the server and also changes merged from sync up. **Remember:** The sync up merge mode determines which soup edits are allowed on the server.
3.  Finally, it updates its UI with the updated contact records from the soup.

:::important

When you’re syncing records, always call sync down after sync up as demonstrated by the MobileSyncExplorerSwift sample app.

:::

## Android Example

The native MobileSyncExplorer sample app demonstrates how to use Mobile Sync named syncs and sync configuration files with Contact records. In Android, it defines a `ContactObject` class that represents a Salesforce Contact record as a Java object. To sync Contact data down to the SmartStore soup, the `syncDown()` method resyncs a named sync down configuration that defines a SOQL query.

In the following snippet, the `reSync()` method loads the following named sync operations from the `res/raw/usersyncs.json` file:

```json

{
  "syncs": [
    {
      "syncName": "syncDownContacts",
      "syncType": "syncDown",
      "soupName": "contacts",
      "target": {"type":"soql", "query":"SELECT FirstName, LastName, Title,
           MobilePhone, Email, Department, HomePhone FROM Contact LIMIT 10000",
           "maxBatchSize":500},
      "options": {"mergeMode":"OVERWRITE"}
    },
    {
      "syncName": "syncUpContacts",
      "syncType": "syncUp",
      "soupName": "contacts",
      "target": {"createFieldlist":["FirstName", "LastName", "Title", "MobilePhone",
          "Email", "Department", "HomePhone"]},
      "options": {"fieldlist":["Id", "FirstName", "LastName", "Title", "MobilePhone",
          "Email", "Department", "HomePhone"], "mergeMode":"LEAVE_IF_CHANGED"}
    }
  ]
}
```

If the sync down operation succeeds—that is, if `sync.getStatus()` equals `Status.DONE`—the received data goes into the specified soup. The callback method then fires an intent that reloads the data in the Contact list.

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

```java

private void handleSyncUpdate(SyncState sync) {
    if (Looper.myLooper() == null) {
        Looper.prepare();
    }
    if (sync.isDone()) {
        switch(sync.getType()) {
            case syncDown:
                Toast.makeText(MainActivity.this,
                    "Sync down successful!",
                    Toast.LENGTH_LONG).show();
                break;
            case syncUp:
                Toast.makeText(MainActivity.this,
                    "Sync up successful!",
                    Toast.LENGTH_LONG).show();
                syncDownContacts();
                break;
            default:
                break;
         }
    }
}
```
