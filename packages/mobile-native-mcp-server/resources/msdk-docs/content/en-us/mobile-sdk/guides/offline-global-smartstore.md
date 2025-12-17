# Using Global SmartStore

Although you usually tie a SmartStore instance to a specific customer’s credentials, you can also access a global instance for special requirements.

Under certain circumstances, some applications require access to a SmartStore instance that is not tied to Salesforce authentication. This situation can occur in apps that store application state or other data that does not depend on a Salesforce user, organization, or community. To address this situation, Mobile SDK supports global stores that persists beyond the app’s life cycle.

Data stored in global stores does not depend on user authentication and therefore is not deleted at logout. Since a global store remains intact after logout, you are responsible for deleting its data when the app exits. Mobile SDK provides APIs for this purpose.

:::important

Do not store user-specific data in global SmartStore. Doing so violates Mobile SDK security requirements because user data can persist after the user logs out.

:::

## Android APIs

In Android, you access global SmartStore through an instance of `SmartStoreSDKManager`.

- Returns a global SmartStore instance with the specified database name. You can set `dbName` to any string other than “smartstore”. Set `dbName` to null to use the default global SmartStore database.

  ```java
    public  getGlobal(String dbName)
  ```

- Checks if a global SmartStore instance exists with the specified database name. Set `dbName` to null to verify the existence of the default global SmartStore.

  ```java
  public boolean hasGlobal(String dbName)
  ```

- Deletes the specified global SmartStore database. You can set this name to any string other than “smartstore”. Set `dbName` to null to remove the default global SmartStore.

  ```java
  public void removeGlobal(String dbName)
  ```

## iOS APIs

In iOS, you access global SmartStore through an instance of `SFSmartStore`.

- Returns a global SmartStore instance with the specified database name. You can set `storeName` to any string other than “defaultStore”. Set `storeName` to `kDefaultSmartStoreName` to use the default global SmartStore.

**Objective-C:**

```objc
+ (id)sharedGlobalStoreWithName:(NSString *)storeName
```

**Swift:**

::include{src="../../shared/smartstore_retrieve_store_global.md"}

- Deletes the specified global SmartStore database. You can set `storeName` to any string other than “defaultStore”. Set `storeName` to `kDefaultSmartStoreName` to use the default global SmartStore.

**Objective-C:**

```objc
+ (void)removeSharedGlobalStoreWithName:(NSString *)storeName
```

**Swift:**

::include{src="../../shared/smartstore_remove_store_global.md"}

::include{src="../../shared/global_hybrid.md"}

## See Also

- [SmartStore Stores](offline-store-types.md)
- [Managing Stores](offline-managing-stores.md)
- [Creating and Accessing User-based Stores](offline-access-store.md)
