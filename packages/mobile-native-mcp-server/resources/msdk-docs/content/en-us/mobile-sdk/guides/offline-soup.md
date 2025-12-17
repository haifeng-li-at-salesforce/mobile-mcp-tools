# Registering a Soup through Code

Before you try to access a soup, you’re required to register it.

To register a soup, you provide a soup name and a list of one or more index specifications. If, for some reason, you can't use a configuration file to define your soup structures, here's how you can do the same thing through code. Each of the following code examples builds an index spec array consisting of name, ID, and owner (or parent) ID fields.

You index a soup on one or more fields found in its entries. SmartStore makes sure that these indexes reflect any insert, update, and delete operations. Always specify at least one index field when registering a soup. For example, if you are using the soup as a simple key-value store, use a single index specification with a string type.

:::note

- As of Mobile SDK 6.0, you can register soups in native apps through a JSON configuration file. Where possible, we recommend this strategy over coding. See [Registering Soups with Configuration Files](offline-config-files.md).
- If your soup contains unusually large elements (> 1 MB), consider registering it to use external storage. See [Using External Storage for Large Soup Elements](offline-external-storage.md).

:::

## Hybrid Apps

::include{src="../../shared/soup_callbacks.md"}
::include{src="../../shared/soup_register_function.md"}
::include{src="../../shared/soup_exists.md"}
::include{src="../../shared/hybrid_registersoup_parms.md"}

To find out if a soup exists, use:

```nolang
navigator.smartstore.soupExists(soupName, successCallback, errorCallback);
```

## Android Native Apps

For Android, you define index specs in an array of type `com.salesforce.androidsdk.smartstore.store.IndexSpec`. Each index spec comprises a path—the name of an index field—and a type. Index spec types are defined in the `SmartStore.Type` enum and include the following values:

- `string`
- `integer`
- `floating`
- `full_text`
- `json1`

```nolang
public class OfflineStorage extends SalesforceActivity {
    private  smartStore;
    final IndexSpec[] ACCOUNTS_INDEX_SPEC = {
        new IndexSpec("Name", .Type.string),
        new IndexSpec("Id", .Type.string),
        new IndexSpec("OwnerId", .Type.string)
    };

    public OfflineStorage() {
        smartStore = SmartStoreSDKManager.getInstance().getSmartStore();
        smartStore.registerSoup("Account", ACCOUNTS_INDEX_SPEC);
    }

    // ...
}

```

## iOS Native Apps

For iOS, you define index specs in an array of `SFSoupIndex` objects. Each index spec comprises a path—the name of an index field—and a type. Index spec types are defined as constants in the `SFSoupIndex` class and include the following values:

- `kSoupIndexTypeString`
- `kSoupIndexTypeInteger`
- `kSoupIndexTypeFloating`
- `kSoupIndexTypeFullText`
- `kSoupIndexTypeJSON1`
<!-- -->
### Swift

  In Mobile SDK 8.0 and later, a SmartStore native Swift extension provides the following soup registration method:

  ::include{src="../../shared/smartstore_index2_swift.md"}

### Objective-C
  ::include{src="../../shared/smartstore_index2.md"}

**See Also**

- [SmartStore Data Types](offline-data-types.md)
- [Using Full-Text Search Queries](offline-full-text-search.md)
