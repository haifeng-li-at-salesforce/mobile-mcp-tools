# Invoking the Sync Down Method with a Custom Target

### iOS:

Pass an instance of your custom `SFSyncDownTarget` class to the `SFMobileSyncSyncManager` sync down method:

- Swift

  - :
    ```nolang
    func syncDown(target: SyncDownTarget,
                soupName: String,
                onUpdate: ()) -> SyncState
    ```

- Objective-C

  - :
    ```nolang
    - (SFSyncState*)
        syncDownWithTarget:(SFSyncDownTarget*)target
                  soupName:(NSString*)soupName
               updateBlock:
                  (SFSyncSyncManagerUpdateBlock)updateBlock;
    ```

- Android:

  - : Pass an instance of your custom `SyncDownTarget` class to the `SyncManager` sync down method:

    ```nolang
    SyncState syncDown(SyncDownTarget target, SyncOptions options, String soupName, SyncUpdateCallback callback);
    ```

### Hybrid:

- &nbsp;

  - :

    1.  Create a target object with the following property settings:

        - Set `type` to "custom".
        - Set at least one of the following properties:

          - iOS (if supported):

            - : Set `iOSImpl` to the name of your iOS custom class.

          - Android (if supported):

            - : Set `androidImpl` to the package-qualified name of your Android custom class.

        The following example supports both iOS and Android:

        ```nolang
        var target =
        {type:"custom",
         androidImpl:
         "com.salesforce.samples.notesync.ContentSoqlSyncDownTarget",
         iOSImpl:"SFContentSoqlSyncDownTarget",
         …
        };
        ```

    2.  Pass this target to the hybrid sync down method:

        ```nolang
        cordova.require("com.salesforce.plugin.MobileSync").syncDown(target, …);
        ```
