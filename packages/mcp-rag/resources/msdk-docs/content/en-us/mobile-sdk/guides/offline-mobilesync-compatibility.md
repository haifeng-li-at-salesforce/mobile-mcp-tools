# Preparing Soups for Mobile Sync

Soups that exchange information with the Salesforce cloud typically use Mobile Sync for synchronization. To support Mobile Sync, most app types require you to create and manage special soup fields for “sync up” operations.

Types of apps that require you to code these special fields include:

- Hybrid apps that do not use `Force.SObject` (from `mobilesync.js`) to create and manage local records
- Native apps
- React Native apps

If your hybrid app uses `Force.SObject` for local records, Mobile Sync automatically creates and manages these fields for you. You can ignore the rest of this discussion.

## Add Required Fields

1.  Add the following fields to your soup elements. Be sure to set the appropriate field to true for every create, update, or delete operation. The first three are operation type fields:

    - `__locally_created__`

      - :
        - Type: `string`
        - Set this field to true on elements that your app _creates_ locally.

    - `__locally_updated__`

      - :
        - Type: `string`
        - Set this field to true after your app _updates_ an element locally.

    - `__locally_deleted__`

      - :
        - Type: `string`
        - Set this field to true when your app _is deleting_ an element locally.

    The other fields to add are control fields:

    - `__local__`

      - :
        - Type: `string`
        - This field indicates that some local change has occurred. You’re required to:
          - Set this field to true when any of the operation type fields is true.
          - Add a string index spec on this field.

    - `__sync_id__`

      - :
        - Type: `integer`
        - This field ensures that the `cleanResyncGhosts()` method removes only the desired soup elements. Mobile Sync manages the content of this field for you.

2.  Add a soup index for each of the operation and control fields. See [Registering Soups with Configuration Files](offline-config-files.md).

## Mobile Sync Behavior

During sync up operations, Mobile Sync looks for soup elements with `__local__` set to true. For each match, it evaluates the operation type fields and then performs the operation indicated by the following precedence hierarchy.

| Precedence  | Field                 | If set to true...                                                                                                                                                                                                                      |
| ----------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 (highest) | `__locally_deleted__` | <ul> <li>`__locally_created__` and `__locally_updated__` flags are ignored.</li><li>Mobile Sync deletes the local record and, if it exists, the server record. If the server record does not exist, no remote action occurs.</li></ul> |
| 2           | `__locally_created__` | <ul><li>`__locally_updated__` flag is ignored.</li><li>If `__locally_deleted__` is not true, Mobile Sync creates the record on the server.</li></ul>                                                                                   |
| 3           | `__locally_updated__` | <ul><li>Ignored if either `__locally_deleted__` or `__locally_created__` is true.</li> <li>Otherwise, Mobile Sync writes the updated record to the server.</li></ul>                                                                   |

Finally, Mobile Sync resets all four fields to false.

## Example

The following examples are taken from the various language versions of the MobileSyncExplorer sample app.

**iOS Native**

This Objective-C example sets system fields by sending `updateSoupForFieldName:fieldValue:` messages to an `SObjectData` object. Using `SFMobileSyncSyncManager` constants for the field names, it sets the `__local__` and `__locally_created__` fields before upserting the new element. You can find the `SObjectData` definition in the iOS sample app.

<!-- owner=MobileSDK,date=10/11/2016,repo=SalesforceMobileSDK-iOS,path=/native/SampleApps/MobileSyncExplorer/MobileSyncExplorerCommon/SObjectDataManager.m,line=144-->

```objc

- (void)createLocalData:(SObjectData *)newData {
    [newData updateSoupForFieldName:kSyncManagerLocal fieldValue:@YES];
    [newData updateSoupForFieldName:kSyncManagerLocallyCreated fieldValue:@YES];
    [self.store upsertEntries:@[ newData.soupDict ] toSoup:[[newData class] dataSpec].soupName];
}
```

**Android Native**

The following Java example handles created and updated elements, but not deletions. It calls the `JSONObject put()` method to create and initialize the system fields, using `SyncManager` constants for the field names. After the fields are properly assigned, it either creates or upserts the element based on the `isCreate` control flag.

<!-- owner=MobileSDK,date=10/11/2016,repo=SalesforceMobileSDK-Android,path=/native/NativeSampleApps/MobileSyncExplorer/src/com/salesforce/samples/mobilesyncexplorer/ui/DetailActivity.java,line=239-->

```java
contact.put(SyncTarget.LOCAL, true);
contact.put(SyncTarget.LOCALLY_UPDATED, !isCreate);
contact.put(SyncTarget.LOCALLY_CREATED, isCreate);
contact.put(SyncTarget.LOCALLY_DELETED, false);
if (isCreate) {
    smartStore.create(ContactListLoader.CONTACT_SOUP, contact);
} else {
    smartStore.upsert(ContactListLoader.CONTACT_SOUP, contact);
}
```

**Hybrid with the Mobile Sync Plug-in and React Native**

The following React Native code can easily be adapted for hybrid apps that use the Mobile Sync plug-in. This example shows how to update and delete—or undelete—a contact. The `onSaveContact()` function marks the record as updated, sets `__local__` to true, and then saves the changes. The `onDeleteUndeleteContact()` function flips the `__locally_deleted__` field. It then sets the `__local__` field to match the operation type value and saves the changes.

The `storeMgr` object is defined in the sample project as a wrapper around SmartStore and the Mobile Sync plug-in. Its `saveContact()` function accepts a contact object and a callback, and upserts the contact into the soup. The callback shown here calls `navigator.pop()`, which is specific to React Native. Hybrid apps can replace the `saveContact()` function with any code that calls the SmartStore `upsert()` function.

<!-- owner=MobileSDK,date=10/11/2016,repo=MobileSyncExplorerReactNative,path=/js/ContactScreen.js,line=58-->

```javascript
onSaveContact: {
    const contact = this.state.contact;
    contact.__locally_updated__ = contact.__local__ = true;
    storeMgr.saveContact(contact, () => {navigator.pop();});
},

onDeleteUndeleteContact: {
    const contact = this.state.contact;
    contact.__locally_deleted__ = !contact.__locally_deleted__;
    contact.__local__ = contact.__locally_deleted__ || contact.__locally_updated__ || contact.__locally_created__;
    storeMgr.saveContact(contact, () => {navigator.pop();});
},

```
