# Defining Sync Names and Sync Configuration Files

Beginning in Mobile SDK 6.0, you can define sync configuration files and assign names to sync configurations. You can use sync names to run, edit, or delete a saved sync operation. Since all platforms and app types use the same configuration files, you can describe all your syncs in a single file. You can then compile that file into any Mobile SDK project.

Mobile Sync configuration files use JSON objects to express sync definitions. You can provide these files to avoid coding sync down and sync up configurations. The JSON schema for configuration files is the same for all app types and platforms. Hybrid apps load the configuration files automatically, while other apps load them with a single line of code. To keep the mechanism simple, Mobile SDK enforces the following file naming conventions:

- To define sync operations for the default global store, provide a file named `globalsyncs.json`.
- To define sync operations for the default user store, provide a file named `usersyncs.json`.

Configuration files can define syncs only in the default global store and default user store. For named stores, you define syncs through code.

In native and React Native apps, you load your JSON configuration file by calling a sync loading method. Call this method in your app initialization code after the customer successfully logs in. For example, in iOS, call this method in the block you pass to `loginIfRequired`. Call these methods only if you’re using a `globalsyncs.json` or `usersyncs.json` file instead of code to configure your syncs. Don’t call sync loading methods more than one time.

In hybrid apps that include them, sync configuration files are loaded automatically. To see loader examples, study the MobileSyncExplorer and MobileSyncExplorerHybrid sample apps. These apps use configuration files to set up their sync operations.

:::note

- Configuration files are intended for initial setup only. You can't change existing syncs by revising the JSON file and reloading it at runtime. Instead, you can use a `syncUp` or `syncDown` method to define the sync inline.
- If the name that a configuration file assigns to a sync operation exists, Mobile SDK ignores the configuration file. In this case, you can set up and manage your sync only through code.

:::

## Configuration File Format

The following example demonstrates the configuration file format.

```nolang
{
    "syncs": [
        {
            "syncName": "sync1",
            "syncType": "syncDown",
            "soupName": "accounts",
            "target": {"type":"soql",
                       "query":"SELECT Id, Name, LastModifiedDate
                                FROM Account",
                       "maxBatchSize":200},
            "options": {"mergeMode":"OVERWRITE"}
        },
        {
            "syncName": "sync2",
            "syncType": "syncUp",
            "soupName": "accounts",
            "target": {"createFieldlist":["Name"]},
            "options": {"fieldlist":["Id", "Name", "LastModifiedDate"],
                        "mergeMode":"LEAVE_IF_CHANGED"}
        }
    ]
}
```

For sync down, the `"target"` property’s `"type"` property accepts any one of the following values:

- `"soql"`

  Uses a SOQL query for sync down.

  **Properties:**

  - "type":"soql"
  - "query": \<string>
  - "idFieldName": \<string>
  - "modificationDateFieldName": \<string>
  - "maxBatchSize": \<integer>, any value from 200 and 2,000 (default value is 2,000)

  **Required:** "type", "query"

- `"sosl"`

  Uses a SOSL query for sync down.

  **Properties:**

  - "type":"sosl"
  - "query": \<string>
  - "idFieldName": \<string>
  - "modificationDateFieldName": \<string>
  - "maxBatchSize": \<integer>, any value from 200 and 2,000 (default value is 2,000)

  **Required:** "type", "query"

- `"briefcase"`

  Uses a briefcase for sync down.

  **Properties:**

  - "type":"briefcase"
  - "infos": array of \<BriefcaseObjectInfo> items

  **Required:** "type", "infos"

  See [Using the Briefcase Sync Down Target](entity-framework-sync-down-target-briefcase.md)

- `"mru"`

  Syncs most recently used records for the given object.

  **Properties:**

  - "type":"mru"
  - "sobjectType": \<string>
  - "fieldlist": array of \<string> items
  - "idFieldName": \<string>
  - "modificationDateFieldName": \<string>

  **Required:** "type", "sobjectType", "fieldlist"

- `"refresh"`

  Refreshes a sync of the given object and fields in the given soup.

  **Properties:**

  - "type":"refresh"
  - "sobjectType": \<string>
  - "fieldlist": array of \<string> items
  - "soupName": \<string>
  - "idFieldName": \<string>
  - "modificationDateFieldName": \<string>

  **Required:** "type", "sobjectType", "fieldlist", "soupName"

- `"layout"`

  Syncs layouts for the given object.

  **Properties:**

  - "type":"layout"
  - "sobjectType": \<string>
  - "formFactor": _Choice_: \<"Large" | "Medium" | "Small">
  - "layoutType": _Choice_: \<"Compact" | "Full">
  - "mode": _Choice_: \<"Create" | "Edit" | "View">
  - "recordTypeId": \<string>
  - "idFieldName": \<string>
  - "modificationDateFieldName": \<string>

  **Required:** "type", "sobjectType", "layoutType"

- `"metadata"`

  Syncs metadata for the given object.

  **Properties:**

  - "type":"metadata"
  - "sobjectType": \<string>
  - "idFieldName": \<string>
  - "modificationDateFieldName": \<string>

  **Required:** "type", "sobjectType"

- `"parent_children"`

  Syncs related records for the given parent object.

  **Properties:** See [Syncing Related Records](entity-framework-sync-related.md).

- `"custom"`

  Syncs using your custom sync down target. Assign the names of your native target sync down classes for iOS and Android the "iOSImpl" and "androidImpl" properties.

  **Properties:**

  - "type":"custom"
  - "iOSImpl": \<string>
  - "androidImpl": \<string>
  - "idFieldName": \<string>
  - "modificationDateFieldName": \<string>

  **Required:** "type", "iOSImpl", "androidImpl"

By default, sync up targets defined in sync config files use batch APIs. In addition, all sync up targets:

- Can define a `"createFieldList"` property.
- Can define an `"updateFieldList"` property.
- Don’t define a `"type"` property.

Here are the specific settings for the various types of sync up targets.

- **sObject Collection**

  - Standard sync up target type for Mobile SDK 10.1 and later.

    **Properties:**

    - "createFieldlist": array of \<string> items
    - "updateFieldlist": array of \<string> items
    - "externalIdFieldName": \<string>

    **Required:** none

- **Batch**

  - Similar to the standard target, but uses smaller batch operations. Standard target for Mobile SDK 7.1 to 10.0.

    **Properties:**

    - "createFieldlist": array of \<string> items
    - "updateFieldlist": array of \<string> items
    - "externalIdFieldName": \<string>

    **Required:** none

- **Non-batch**

  - Similar to the standard target, but doesn’t use batch or collection operations.

    **Properties:**

    - "iOSImpl":"SFSyncUpTarget"
    - "androidImpl":"com.salesforce.androidsdk.mobilesync.target.SyncUpTarget"
    - "createFieldlist": array of \<string> items
    - "updateFieldlist": array of \<string> items
    - "externalIdFieldName": \<string>

    **Required:** "iOSImpl", "androidImpl"

- **Parent-child**

  - Syncs related records for the given parent object.

    **Properties:** See [Syncing Related Records](entity-framework-sync-related.md).

- **Custom**

  - Syncs using your custom sync up target. Assign the names of your native sync up target classes for iOS and Android to the "iOSImpl" and "androidImpl" properties.

    **Properties:**

    - "iOSImpl": \<string>
    - "androidImpl": \<string>
    - "createFieldlist": array of \<string> items
    - "updateFieldlist": array of \<string> items

    **Required:** "iOSImpl", "androidImpl"

Target JSON definitions are specified in the [Mobile Sync JSON schema](https://raw.githubusercontent.com/forcedotcom/SalesforceMobileSDK-Package/master/shared/syncs.schema.json).

::include{src="../../shared/config_file_locations.md"}

## Loading Sync Definitions from Configuration Files (iOS Native Apps)

Loading methods are defined on the `MobileSyncSDKManager` class.

### User store

- Swift

  - :
    ::include{src="../../shared/swift_setup_user_syncs_from_default_config.md"}

- Objective-C

  - :
    ```nolang
    [[MobileSyncSDKManager sharedManager] setupUserSyncsFromDefaultConfig];
    ```

### Global store

- Swift

  - :
    ::include{src="../../shared/swift_setup_global_syncs_from_default_config.md"}

- Objective-C

  - : `[[MobileSyncSDKManager sharedManager] setupGlobalSyncsFromDefaultConfig];`

## Loading Sync Definitions from Configuration Files (Android Native Apps)

Loading methods are defined on the `MobileSyncSDKManager`. You can call these loaders from anywhere in your app. Make sure that the call occurs before you call any sync or resync functions.

- User store

  - : `MobileSyncSDKManager.getInstance().setupUserSyncsFromDefaultConfig();`

- Global store

  - : `MobileSyncSDKManager.getInstance().setupGlobalSyncsFromDefaultConfig();`
