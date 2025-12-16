# Using the Batch Sync Up Target

To enhance performance in large sync up operations, Mobile SDK 7.1 introduces a batch sync up target.

#### iOS Native

_Swift_

```swift
BatchSyncUpTarget
```

_Objective-C_

```objc
SFBatchSyncUpTarget
```

#### Android Native

```java
BatchSyncUpTarget
```

This target enhances the standard sync up target behavior by calling the Salesforce composite API. The composite API sends local records to the server in batches of up to 25 records.

## iOS Native

**Swift**

```swift
var target = BatchSyncUpTarget.init(createFieldList, updateFieldList)
let syncMgr = SyncManager.sharedInstance(store: self.store!)
syncMgr!.syncUp(target: target, options: options, soupName: soupName) {...}
```

**Objective-C**

```objc
SFBatchSyncUpTarget* target = [[SFBatchSyncUpTarget alloc] init];
// or
SFBatchSyncUpTarget* target =
    [[SFBatchSyncUpTarget alloc] initWithCreateFieldlist:createList
                                            updateFieldlist:updateList];
[syncManager syncUpWithTarget:target
                      options:options
                     soupName:soupName
                  updateBlock:updateBlock];
```

## Android Native

```java
BatchSyncUpTarget target = new BatchSyncUpTarget();
// or
BatchSyncUpTarget target = new BatchSyncUpTarget(createFieldlist, updateFieldlist);
syncManager.syncUp(target, options, soupName, callback);
```

## Hybrid and React Native

Existing sync up targets in hybrid and React Native apps automatically use the batch sync up target. To use a different sync up target implementation such as the legacy `SyncUpTarget` class, specify “androidImpl” or “iOSImpl”.

## Usage in Sync Config Files

By default, sync up targets defined in sync config files use batch APIs. For example, the following sync configuration creates a batch sync up target.

```json
{
  "syncs": [
    {
      "syncName": "syncUpContacts",
      "syncType": "syncUp",
      "soupName": "contacts",
      "target": {
        "createFieldlist": [
          "FirstName",
          "LastName",
          "Title",
          "MobilePhone",
          "Email",
          "Department",
          "HomePhone"
        ]
      },
      "options": {
        "fieldlist": [
          "Id",
          "FirstName",
          "LastName",
          "Title",
          "MobilePhone",
          "Email",
          "Department",
          "HomePhone"
        ],
        "mergeMode": "LEAVE_IF_CHANGED"
      }
    }
  ]
}
```

## See Also

- [Invoking the Sync Up Method with a Custom Target](entity-framework-native-up-target-invoke.md)
- [“Composite” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_composite.htm)
