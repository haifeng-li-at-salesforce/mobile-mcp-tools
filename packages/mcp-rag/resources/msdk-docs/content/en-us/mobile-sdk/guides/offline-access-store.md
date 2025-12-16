# Creating and Accessing User-based Stores

When an app initializes SmartStore, it creates an instance of a store. It then uses the store to register and populate soups and manipulate soup data. For a user-based store, SmartStore manages the store’s life cycle—you don’t need to think about cleaning up after the user’s session ends. For global stores, though, your app is responsible for deleting the store’s data when the app terminates.

## Android Native Apps

Android requires you to first get an instance of `SmartStoreSDKManager` which you then use to create stores.

```java
SmartStoreSDKManager sdkManager =
    SmartStoreSDKManager.getInstance();

SmartStore smartStore = sdkManager.getSmartStore(); // Creates a default store for the current user

```

A call to `SmartStoreSDKManager.getSmartStore()` without arguments always accesses the default anonymous store. To create a named user-based store, call the following method.

```java
public  getSmartStore(String dbNamePrefix, UserAccount account, String communityId)
```

Both `account` and `communityId` can be null. You can call these methods as many times as necessary to create additional stores.

## iOS Native Apps

For creating stores, iOS provides the `sharedStoreWithName:` class message.

```objc
- (SFSmartStore *)store
{
    return [SFSmartStore sharedStoreWithName:kDefaultSmartStoreName]; // Creates a default store for the current user
}

```

In Swift:

::include{src="../../shared/smartstore_retrieve_store.md"}

You can create a store with a custom name by passing in any string other than `kDefaultSmartStoreName`. You can call this method as many times as necessary to create additional stores.

::include{src="../../shared/access_store_hybrid.md"}

## See Also

- [SmartStore Stores](offline-store-types.md)
