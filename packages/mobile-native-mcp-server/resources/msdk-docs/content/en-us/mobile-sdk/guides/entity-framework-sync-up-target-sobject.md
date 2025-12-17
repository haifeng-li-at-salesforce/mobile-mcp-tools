# Using the sObject Collection Sync Up Target

For the very best performance in large sync up operations, Mobile SDK 10.1 introduced an sObject collection sync up target.

#### iOS Native

_Swift_

```
CollectionSyncUpTarget
```

_Objective-C_

```
SFCollectionSyncUpTarget
```

#### Android Native

```
CollectionSyncUpTarget
```

This target enhances the standard sync up target behavior by using the Salesforce sObject Collections API. This API sends local records to the server in batches of up to 200 records. This target can be up to five times faster than the Batch sync up target, and up to 10 times faster than the standard single record sync up target.

:::note

Actual performance can vary depending on specific records, sObjects, and network conditions.

:::

## iOS Native

<!--
**Swift**

<!-\- TODO: Swift example, and target name. These are futured out.-\->

```nolang

```
-->

**Objective-C**

```nolang
SFCollectionSyncUpTarget* target = [[SFCollectionSyncUpTarget alloc] init];
// or
SFCollectionSyncUpTarget* target =
    [[SFCollectionSyncUpTarget alloc] initWithCreateFieldlist:createList
                                              updateFieldlist:updateList];

[syncManager syncUpWithTarget:target
                      options:options
                     soupName:soupName
                  updateBlock:updateBlock];
```

## Android Native

```java
CollectionSyncUpTarget target = new CollectionSyncUpTarget();
// or
CollectionSyncUpTarget target = new CollectionSyncUpTarget(createFieldlist, updateFieldlist);

syncManager.syncUp(target, options, soupName, callback);
```

## Hybrid and React Native

Existing sync up targets in hybrid and React Native apps automatically use the sObject collection sync up target.

:::note

This behavior replaces the automatic use of the Batch sync up target. The new sObject collection target is backwards compatible, and should result in improved performance without requiring any changes to your code.

:::

<!-- This is mostly an internal implementation detail, but if it turns out there are differences that customers depend on (which they shouldn’t, but which we also know they do anyway), wanted to call it out.-->

To use a different sync up target implementation such as the legacy `SyncUpTarget` class, specify that class in the “androidImpl” or “iOSImpl” setting.

## Usage in Sync Config Files

By default, sync up targets defined in sync config files use sObject Collection APIs. For example, the following sync configuration creates an sObject Collection sync up target.

```nolang
{
  "syncs": [
    {
      "syncName": "syncUpContacts",
      "syncType": "syncUp",
      "soupName": "contacts",
      "target":
          {"createFieldlist":
              ["FirstName",
               "LastName",
               "Title",
               "MobilePhone",
               "Email",
               "Department",
               "HomePhone"]
          },
      "options":
          {"fieldlist":
              ["Id",
               "FirstName",
               "LastName",
               "Title",
               "MobilePhone",
               "Email",
               "Department",
               "HomePhone"],
           "mergeMode":"LEAVE_IF_CHANGED"
          }
      }
   ]
}
```

## See Also

- [Invoking the Sync Up Method with a Custom Target](entity-framework-native-up-target-invoke.md)
- [“sObject Collections” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_sobjects_collections.htm)
