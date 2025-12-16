# Syncing Metadata and Layouts on Android

Metadata and layout syncing on Android is easy to use. To get started, learn how to initialize and configure the APIs.

## Initializing MetadataSyncManager and LayoutSyncManager

In Android, you access a metadata or layout manager by calling the `getInstance()` static method as follows.

```java
MetadataSyncManager.getInstance();
LayoutSyncManager.getInstance();
```

In this form, `getInstance()` intializes the manager with the current user’s credentials and default store.

In multi-user environments, you can also initialize the metadata manager with a logged-in but non-current user by calling

```java
MetadataSyncManager.getInstance(account);
LayoutSyncManager.getInstance(account);
```

In this form, `account` is an instance of `UserAccount`. The `getInstance()` method intializes the manager with the given user’s credentials and default store.

To specify a community that the given user belongs to, provide its ID by calling

```java
MetadataSyncManager.getInstance(account, id);
LayoutSyncManager.getInstance(account, id);
```

If `account` is null, the manager defaults to the current user.

To specify a named SmartStore instance that’s associated with the given user, use

```java
MetadataSyncManager.getInstance(account, id, store);
LayoutSyncManager.getInstance(account, id, store);
```

To tell the manager to ignore the community setting, set `id` to null. The `store` argument is an instance of `SmartStore` and must be associated with the given user. When a valid store is provided, Mobile Sync uses the given store to create its metadata and layout soups.

## Retrieving Metadata

You use metadata manager classes to fetch metadata from a Salesforce org or a SmartStore instance. To fetch, call the following asynchronous method on your `MetadataSyncManager` instance.

```java
public void fetchMetadata(String objectType, Constants.Mode mode, MetadataSyncCallback syncCallback);
```

- `objectType`

  - : The Salesforce object whose metadata you’re fetching. For example, “Account” or “Opportunity”.

- `mode`

  - : This parameter helps determine the data’s source location. Data retrieval modes include:

    - `CACHE_ONLY` (Android) or `SFSDKFetchModeCacheOnly` (iOS) - Fetches data from the cache. If cached data is not available, returns null.
    - `CACHE_FIRST` (Android) or `SFSDKFetchModeCacheFirst` (iOS) - Fetches data from the cache. If cached data is not available, fetches data from the server .
    - `SERVER_FIRST` (Android) or `SFSDKFetchModeServerFirst` (iOS) Fetches data from the server. If server data is not available, fetches data from the cache. Data fetched from the server is automatically cached.

- `syncCallback`

  - : Asynchronous block that is executed when the operation completes. You pass the block’s implementation or handle to this parameter. This block takes the form of a `MetadataSyncCallback` interface that defines a single method:

    ```java
    void onSyncComplete(Metadata metadata);
    ```

Mobile SDK passes a `Metadata` object to this callback method. This object contains the true data model of the requested Salesforce object. You can use this metadata to query specific fields. This class defines properties whose names match the field names in the object’s manifest. Class properties represent all custom fields and customizable standard fields.

## Retrieving Layouts (Android)

To sync layouts, call the following asynchronous method on your `LayoutSyncManager` instance.

```java

public void fetchLayout(String objectAPIName, String formFactor,
    String layoutType, String mode, String recordTypeId,
    Constants.Mode syncMode, LayoutSyncCallback syncCallback);
```

- `objectAPIName`

  - : (Required) Salesforce object whose layout you’re fetching. For example, “Account” or “Opportunity”.

- `formFactor`

  - : (Optional) Form factor of the layout you’re fetching. Supported values are “Large”, “Medium”, and “Small”. If not specified, defaults to “Large”.

- `layoutType`

  - : (Optional) Type of layout you’re fetching. Supported values are “Compact” and “Full”. If not specified, defaults to “Full”.

- `mode`

  - : (Optional) Record mode of the layout you’re fetching. Supported values are “Create”, “Edit”, and “View”. If not specified, defaults to “View”.

- `recordTypeId`

  - : (Optional) Record type whose layout you’re fetching. If not specified, uses the default record type.

- `syncMode`

  - : Retrieval mode to use while retrieving data. Supported values are:

    - `CACHE_ONLY`—Fetches data from the cache. If cached data is not available, returns null.
    - `CACHE_FIRST`—Fetches data from the cache. If cached data is not available, fetches data from the server.
    - `SERVER_FIRST`—Fetches data from the server. If server data is not available, fetches data from the cache. Data fetched from the server is automatically cached.

- `syncCallback`

  - : Callback method that executes asynchronously when the operation completes. You pass either the method’s implementation or its handle to this parameter. This block implements the following method prototype:

    ```java
    void onSyncComplete(String objectAPIName, String formFactor, String layoutType,
        String mode, String recordTypeId, Layout layout);
    ```

Mobile SDK passes an `SFLayout` object to this callback method. This object contains the true data model of the requested Salesforce object’s layout. You can use this object’s properties to query specific fields.

Behind the scenes, `LayoutSyncManager` uses a Mobile Sync `LayoutSyncDownTarget` object to automatically create a SmartStore soup that contains the returned data. This soup includes index specs for retrieving layout data when the device is offline.
