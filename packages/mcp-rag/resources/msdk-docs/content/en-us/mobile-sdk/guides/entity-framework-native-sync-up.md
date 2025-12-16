# Syncing Up

To apply local changes on the server, use one of the “sync up” methods. These methods update the server with data from the given SmartStore soup. They look for created, updated, or deleted records in the soup, and then replicate those changes on the server. The `options` argument specifies a list of fields to be updated. In Mobile SDK5.1 and later, you can override this field list by initializing the sync manager object with separate field lists for create and update operations. See [Handling Field Lists in Create and Update Operations](entity-framework-native-up-target-def.md#mobilesync-field-lists-update) .

Locally created objects must include an “attributes” field that contains a “type” field that specifies the sObject type. For example, for an account named Acme, use: `{Id:”local_x”, Name: Acme, attributes: {type:”Account”}}`.

## iOS: SFMobileSyncSyncManager Methods

- You can create a named sync without running it.

  - Swift

    - :
      ::include{src="../../shared/mobilesync_sync_up_create.md"}

  - Objective-C

    - :

      ```nolang
      - (SFSyncState *)createSyncUp:(SFSyncUpTarget *)target
                            options:(SFSyncOptions *)options
                           soupName:(NSString *)soupName
                           syncName:(NSString *)syncName;
      ```

- You can create and run a sync with just options that uses the default target.

  - Swift

    - :
      ::include{src="../../shared/mobilesync_sync_up_options_soupname.md"}

  - Objective-C

    - :

      ```nolang
      - (SFSyncState*) syncUpWithOptions:(SFSyncOptions*)options
                                soupName:(NSString*)soupName
                             updateBlock:(SFSyncSyncManagerUpdateBlock)updateBlock;
      ```

- You can create and run a sync based on a target that you configure in code.

  - Swift

    - :
      ::include{src="../../shared/mobilesync_sync_up_options_soupname.md"}

  - Objective-C

    - :

      ```nolang
      - (SFSyncState*) syncUpWithTarget:(SFSyncUpTarget*)target
                                options:(SFSyncOptions*)options
                               soupName:(NSString*)soupName
                            updateBlock:(SFSyncSyncManagerUpdateBlock)updateBlock;
      ```

- Or, you can create and run a named sync. If you load a sync with the same name from a configuration file, this sync overrides it.

  - Swift

    - :
      ::include{src="../../shared/mobilesync_sync_up_target_options_soupname_syncname.md"}

  - Objective-C

    - :

      ```nolang
      - (SFSyncState*) syncUpWithTarget:(SFSyncUpTarget*)target
                                options:(SFSyncOptions*)options
                               soupName:(NSString*)soupName
                               syncName:(NSString*)syncName
                            updateBlock:(SFSyncSyncManagerUpdateBlock)updateBlock
                                  error:(NSError**)error;
      ```

- To run or rerun an existing named sync configuration:

  - Swift

    - :

      ```swift
            open func reSync(named syncName: String,
                        onUpdate updateBlock: @escaping SyncUpdateBlock) throws -> SyncState
      ```

      - Objective-C

        - :
          ::include{src="../../shared/mobilesync_nativeios_code5.md"}

- Or, to rerun a previous sync operation by sync ID:

  - Swift

    - :

      ```nolang
      open func reSync(id syncId: NSNumber,
            onUpdate updateBlock: @escaping SyncUpdateBlock) throws -> SyncState

      ```

  - Objective-C

    - :
      ::include{src="../../shared/mobilesync_nativeios_code6.md"}

- To rerun a sync without getting progress updates, use this function from the Mobile Sync Swift extension:

  - Swift

    - :

      ```nolang
      public func reSyncWithoutUpdates(named syncName: String,
          _ completionBlock: @escaping (Result<SyncState, MobileSyncError>) -> Void)
      ```

  - Objective-C

    - : (Not available.)

- To sync up by external ID, see [Syncing Up by External ID](entity-framework-native-sync-up-external-id.md).

## Android: SyncManager Methods

- You can create a named sync up configuration without running it.

  ```java
  public SyncState createSyncUp(SyncUpTarget target,
      SyncOptions options,
      String soupName,
      String syncName)
      throws JSONException;
  ```

- You can create and run an unnamed sync up configuration:

  ```java
  public SyncState syncUp(SyncUpTarget target,
      SyncOptions options,
      String soupName,
      SyncUpdateCallback callback)
      throws JSONException;
  ```

- You can create and run a named sync up configuration:

  ```java
  public SyncState syncUp(SyncUpTarget target,
      SyncOptions options,
      String soupName,
      String syncName,
      SyncUpdateCallback callback)
      throws JSONException;
  ```

- To run or rerun an existing named sync configuration:

  ::include{src="../../shared/mobilesync_nativean_code5.md"}

- Or, to rerun a previous sync operation by sync ID:

  ::include{src="../../shared/mobilesync_nativean_code6.md"}

- To sync up by external ID, see [Syncing Up by External ID](entity-framework-native-sync-up-external-id.md).

## Specifying Merge Modes

For sync up operations, you can specify a mergeMode option. You can choose one of the following behaviors:

1. Overwrite server records even if they've changed since they were synced down to that client. When you call the `syncUp` method:

   - **iOS:** Set the options parameter to

     - Swift

       - :
         ::include{src="../../shared/mobilesync_newsyncoptions_forsyncup_overwrite.md"}

     - Objective-C

       - : `[SFSyncOptions newSyncOptionsForSyncUp: ["Name"], mergeMode:SFSyncStateMergeModeOverwrite]`

   - **Android:** Set the options parameter to `SSyncOptions.optionsForSyncUp(fieldlist, SyncState.MergeMode.OVERWRITE)`
   - **Hybrid:** Set the syncOptions parameter to `{mergeMode:"OVERWRITE"}`

2. If any server record has changed since it was synced down to that client, leave it in its current state. The corresponding client record also remains in its current state. When you call the `syncUp()` method:

   - **iOS:** Set the options parameter to

     - Swift

       - :

         ::include{src="../../shared/mobilesync_newsyncoptions_forsyncup_leaveifchanged.md"}

     - Objective-C

       - : `[SFSyncOptions newSyncOptionsForSyncUp:fieldlist mergeMode:SFSyncStateMergeModeLeaveIfChanged]`

   - **Android:** Set the options parameter to `SyncOptions.optionsForSyncUp(fieldlist, SyncState.MergeMode.LEAVE_IF_CHANGED)`
   - **Hybrid:** Set the `syncOptions` parameter to `{mergeMode:"LEAVE_IF_CHANGED"}`

If your local record includes the target’s modification date field, Mobile SDK detects changes by comparing it to the server record’s matching field. The default modification date field is `lastModifiedDate`. If your local records do not include the modification date field, the `LEAVE_IF_CHANGED` sync up operation reverts to an overwrite sync up.

:::important

The `LEAVE_IF_CHANGED` merge requires extra round trips to the server. More importantly, the status check and the record save operations happen in two successive calls. In rare cases, a record that is updated between these calls can be prematurely modified on the server.

:::

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

```json

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

`updateRemoteData` calls `reSync` using the `syncUpContacts` model—aliased here as `kSyncUpName`—. Syncing up ensures that allowed soup changes are merged into the Salesforce org.

```java

func updateRemoteData(_ onSuccess: @escaping ([SObjectData]) -> Void,
                        onFailure:@escaping (NSError?, SyncState) -> Void) -> Void {
    do {
        try self.syncMgr.reSync(named: kSyncUpName) { [weak self] (syncState) in
            guard let strongSelf = self else {
                return
            }
            switch (syncState.status) {
            case .done:
                do {
                    let objects = try strongSelf.queryLocalData()
                    strongSelf.populateDataRows(objects)
                    try strongSelf.refreshRemoteData({ (sobjs) in
                        onSuccess(sobjs)
                    }, onFailure:  { (error,syncState) in
                        onFailure(error,syncState)
                    })
                } catch let error as NSError {
                    MobileSyncLogger.e(SObjectDataManager.self,
                        message: "Error with Resync \(error)" )
                    onFailure(error,syncState)
                }
                break
            case .failed:
                MobileSyncLogger.e(SObjectDataManager.self,
                    message: "Resync \(syncState.syncName) failed" )
                onFailure(nil,syncState)
                break
            default:
                break
            }
        }
    } catch {
        onFailure(error as NSError, nil)
    }
}
```

If sync up succeeds—that is, if the `SyncState` status indicates “done”—several things happen:

1.  `queryLocalData` retrieves all raw data from the freshly updated soup.

    ```java
    let objects = try strongSelf.queryLocalData()
    ```

2.  `populateDataRows` transforms the soup’s data to `ContactSObjectData` objects and stores these objects in an internal array.

    ```java
    strongSelf.populateDataRows(objects)
    ```

3.  Control passes to `refreshRemoteData(_:onFailure:)`. The `refreshRemoteData` method looks similar to `updateRemoteData` with two exceptions:
    - It performs a sync down instead of sync up.
    - If sync down succeeds, it “closes the circle” by executing the block that’s been passed to it from `syncUpDown` via `updateRemoteData`.

To summarize everything that happens in the `syncUpDown` call stack:

1.  _Sync up_: It syncs soup changes up to the server by calling `updateRemoteData` on `SObjectsDataManager`. This step ensures that all allowable local and offline changes are merged into Salesforce.
2.  _Sync down_: After the soup records are merged with server data, it syncs server data down to the soup through a call to `refreshRemoteData`. This step ensures that the soup reflects changes originating on the server and also changes merged from sync up. **Remember:** The sync up merge mode determines which soup edits are allowed on the server.
3.  Finally, it updates its UI with the updated contact records from the soup.

:::important

When you’re syncing records, always apply a sync up-sync down pair in the sequence demonstrated by the MobileSyncExplorerSwift sample app.

:::

```java

- (void)updateRemoteData:
    (SFSyncSyncManagerUpdateBlock)completionBlock {

    SFSyncOptions *syncOptions =
        [SFSyncOptions
            newSyncOptionsForSyncUp:self.dataSpec.fieldNames
                          mergeMode:SFSyncStateMergeModeLeaveIfChanged]];
    [self.syncMgr syncUpWithOptions:syncOptions
        soupName:self.dataSpec.soupName
        updateBlock:^(SFSyncState* sync) {
            if ([sync isDone] || [sync hasFailed]) {
                completionBlock(sync);
            }
        }
    ];
}

```

If the update block provided here determines that the sync operation has finished, it calls the completion block that’s passed into `updateRemoteData`. A user initiates a syncing operation by tapping a button. Therefore, to see the definition of the completion block, look at the `syncUpDown` button handler in `ContactListViewController.m`. The handler calls `updateRemoteData` with the following block.

```swift

[self.dataMgr updateRemoteData:^(SFSyncState *syncProgressDetails)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        strongSelf.navigationItem.rightBarButtonItem.enabled = YES;

        // When the sync failed it means not everything could be synced up
	 // it doesn't necessarily mean nothing could be synced up
	 // Therefore we refresh regardless of success status
	 [strongSelf.dataMgr refreshLocalData:completionBlock];
	 [strongSelf.dataMgr refreshRemoteData:completionBlock];

        // We’ll again call refreshLocalData when completing

	 // Letting the user know whether the sync succeeded
	 if ([syncProgressDetails isDone]) {
	     [strongSelf showToast:@"Sync complete!"];
	 } else if ([syncProgressDetails hasFailed]) {
	     [strongSelf showToast:@"Sync failed."];
	 }
    });
}];
```

If the sync up operation succeeded, this block first refreshes the display on the device, along with a “Sync complete!” confirmation toast. Regardless of the status of the sync operation, this method refreshes local and remote data. This step covers partial successes and completions.

## Android Example

To sync up to the server, you call `syncUp()` with the same arguments as `syncDown()`: list of fields, name of source SmartStore soup, and an update callback. The only coding difference is that you can format the list of affected fields as an instance of `SyncOptions` instead of `SyncTarget`. Here’s the way it’s handled in the MobileSyncExplorer sample:

```java

public synchronized void syncUp() {
    final SyncUpTarget target = new SyncUpTarget();
    final SyncOptions options =
        SyncOptions.optionsForSyncUp(Arrays.asList(ContactObject.CONTACT_FIELDS_SYNC_UP),
            MergeMode.LEAVE_IF_CHANGED);
    try {
        syncMgr.syncUp(target, options, ContactListLoader.CONTACT_SOUP,
            new SyncUpdateCallback() {
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

In the internal `SyncUpdateCallback` implementation, this example takes the extra step of calling `syncDown()` when sync up is done. This step guarantees that the SmartStore soup remains up-to-date with any recent changes made to Contacts on the server.

<!-- Keep this until build shows that it isn’t referenced anywhere.```nolang
private void handleSyncUpdate(SyncState sync) {
    if (Looper.myLooper() == null) {
        Looper.prepare();
    }
    if (sync.isDone()) {
        switch(sync.getType()) {
            case syncDown:
                Toast.makeText(
                    MainActivity.this,
                    Sync down successful!",
                    Toast.LENGTH_LONG).show();
                break;
            case syncUp:
                Toast.makeText(
                    MainActivity.this,
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

-->
