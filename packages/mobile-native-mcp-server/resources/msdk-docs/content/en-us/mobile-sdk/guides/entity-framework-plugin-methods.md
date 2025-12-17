# Mobile Sync Plugin Methods

The Mobile Sync plug-in exposes two methods: `syncDown()` and `syncUp()`. When you use these methods, several important guidelines can make your life simpler:

- To create, update, or delete records locally for syncing with the plug-in, use `Force.SObject` from `mobilesync.js`. Mobile Sync expects some special fields on soup records that `mobilesync.js` creates for you.
- Similarly, to create the soup that you’ll use in your sync operations, use `Force.StoreCache` from `mobilesync.js`.
- If you’ve changed objects in the soup, always call `syncUp()` before calling `syncDown()`.

## syncDown() Method

Downloads the sObjects specified by `target` into the SmartStore soup specified by `soupName`. If sObjects in the soup have the same ID as objects specified in the target, Mobile Sync overwrites the duplicate objects in the soup.

Mobile Sync also supports a refresh sync down target, which simplifies the process of refreshing cached records. See [Using the Refresh Sync Down Target](entity-framework-refresh-target.md).

**Syntax**

```javascript
cordova.require("com.salesforce.plugin.mobilesync").syncDown(
    [isGlobalStore, ]target, soupName, options, callback);
cordova.require("com.salesforce.plugin.mobilesync").syncDown(
    [storeConfig, ]target, soupName, options, callback);
```

**Parameters**

- `isGlobalStore`

  - :

    (Optional) Boolean that indicates whether this operation occurs in a global or user-based SmartStore database. Defaults to false.

- `storeConfig`

  - :

    (Optional) StoreConfig object that specifies a store name and whether the store is global or user-based.

<!-- -->

- `target`

  - : Indicates which sObjects to download to the soup. Can be any of the following strings:

    - ```javascript

       {type:"soql", query:"<SOQL QUERY>"}

      ```

      Downloads the sObjects returned by the given SOQL query.

    - ```javascript

        {type:"sosl", query:"<SOSL QUERY>"}

      ```

      Downloads the sObjects returned by the given SOSL query.

    - ```javascript
        {type:"mru", sobjectType:"<SOBJECT TYPE>", fieldlist:"<FIELDS TO FETCH>"}
      ```

      Downloads the specified fields of the most recently used sObjects of the specified sObject type.

    - ```javascript
        {type:"custom", androidImpl:"<NAME OF NATIVE ANDROID TARGET CLASS (IF SUPPORTED)>", iOSImpl:"<NAME OF NATIVE IOS TARGET CLASS (IF SUPPORTED)>"}
      ```

      Downloads the records specified by the given custom targets. If you use custom targets, provide either `androidImpl` or `iOSImpl`, or, preferably, both.See [Using Custom Sync Down Targets](entity-framework-native-custom-down-targets.md).

- `soupName`

  - : Name of soup that receives the downloaded sObjects.

- `options`

  - : Use one of the following values:

    - To overwrite local records that have been modified, pass `{mergeMode:Force.MERGE_MODE_DOWNLOAD.OVERWRITE}`.
    - To preserve local records that have been modified, pass `{mergeMode:Force.MERGE_MODE_DOWNLOAD.LEAVE_IF_CHANGED}`. With this value, locally modified records are not overwritten.

- `callback`

  - : Function called once the sync has started. This function is called multiple times during a sync operation:

    1.  When the sync operation begins
    2.  When the internal REST request has completed
    3.  After each page of results is downloaded, until 100% of results have been received

    Status updates on the sync operation arrive via browser events. To listen for these updates, use the following code:

    ```javascript
    document.addEventListener("sync", function (event) {
      // event.detail contains the status of the sync operation
    });
    ```

    The `event.detail` member contains a map with the following fields:

    - `syncId`: ID for this sync operation
    - `type`: “syncDown”
    - `target`: Targets you provided
    - `soupName`: Soup name you provided
    - `options`: “{}”
    - `status`: Sync status, which can be “NEW”, “RUNNING”, “DONE” or “FAILED”
    - `progress`: Percent of total records downloaded so far (integer, 0–100)
    - `totalSize`: Number of records downloaded so far

## syncUp() Method

Uploads created, deleted, or updated records in the SmartStore soup specified by `soupName`, and then updates, creates, or deletes the corresponding records on the Salesforce server. Updates are reported through browser events.

**Syntax**

```javascript
cordova
  .require("com.salesforce.plugin.mobilesync")
  .syncUp(isGlobalStore, target, soupName, options, callback);
cordova
  .require("com.salesforce.plugin.mobilesync")
  .syncUp(storeConfig, target, soupName, options, callback);
```

**Parameters**

- `isGlobalStore`

  - :
    (Optional) Boolean that indicates whether this operation occurs in a global or user-based SmartStore database. Defaults to false.

- `storeConfig`
  - :
    (Optional) StoreConfig object that specifies a store name and whether the store is global or user-based.

<!-- -->

- `target`

  - : JSON object that contains at least the name of one native custom target class, if you define custom targets.

    A Salesforce object can require certain fields that can’t be updated by apps. With these objects, a target that uses a single field list for both create and update operations can fail if it tries to update locked fields. Past versions of Mobile Sync required the developer to create a custom native target to differentiate between create and update field lists.

    As of Mobile SDK 5.1, you no longer have to define custom native targets for these scenarios. Instead, to specify distinct field lists for create and update operations, add the following JSON object to the `target` object:

    ```javascript
    {createFieldlist: [<ARRAY_OF_FIELDS_TO_CREATE>], updateFieldlist: [<ANOTHER_ARRAY_OF_FIELDS_TO_UPDATE>]}
    ```

    If you provide `createFieldlist` and `updateFieldlist` arguments, the native custom target uses them where applicable. In those cases, the target ignores the field list defined in its “sync options” settings.

    See the `syncDown()` method description for more information on `target` metadata.

- `soupName`

  - : Name of soup from which to upload sObjects.

- `options`

  - : A map with the following keys:

    - `fieldlist`: List of fields sent to the server.
    - `mergeMode`:
      - To overwrite remote records that have been modified, pass “OVERWRITE”.
      - To preserve remote records that have been modified, pass “LEAVE_IF_CHANGED”. With this value, modified records on the server are not overwritten.
      - Defaults to “OVERWRITE” if not specified.

- `callback`

  - : Function called multiple times after the sync has started. During the sync operation, this function is called for these events:

    1.  When the sync operation begins
    2.  When the internal REST request has completed
    3.  After each page of results is uploaded, until 100% of results have been received

    Status updates on the sync operation arrive via browser events. To listen for these updates, use the following code:

    ```javascript
    document.addEventListener("sync", function (event) {
      // event.detail contains the status of the sync operation
    });
    ```

    The `event.detail` member contains a map with the following fields:

    - `syncId`: ID for this sync operation
    - `type`: “syncUp”
    - `target`: “{}” or a map or dictionary containing the class names of iOS and Android custom target classes you’ve implemented
    - `soupName`: Soup name you provided
    - `options`:
      - `fieldlist`: List of fields sent to the server
      - `mergeMode`: “OVERWRITE” or “LEAVE_IF_CHANGED”
    - `status`: Sync status, which can be “NEW”, “RUNNING”, “DONE” or “FAILED”
    - `progress`: Percent of total records downloaded so far (integer, 0–100)
    - `totalSize`: Number of records downloaded so far

## See Also

- [Creating and Accessing User-based Stores](offline-access-store.md)
