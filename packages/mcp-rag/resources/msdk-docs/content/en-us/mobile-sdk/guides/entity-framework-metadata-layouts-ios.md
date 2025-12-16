# Syncing Metadata and Layouts on iOS

Metadata and layout syncing on iOS is easy to use. To get started, learn how to initialize and configure the APIs.

## Initializing Metadata and Layout Sync Managers

In iOS, metadata and layout managers are both shared objects. You access them by calling the `sharedInstance` class method as follows:

- Swift

  - :

    ```swift
    MetadataSyncManager.sharedInstance()
    LayoutSyncManager.sharedInstance()
    ```

- Objective-C

  - :

    ```objectivec
    [SFMetadataSyncManager sharedInstance]
    [SFLayoutSyncManager sharedInstance]
    ```

In this form, `sharedInstance` initializes the manager with the current user’s credentials and the default store.

In multi-user environments, you can also initialize the manager with a logged-in but non-current user.

- Swift

  - :

    ```swift
    MetadataSyncManager.sharedInstance(user)
    LayoutSyncManager.sharedInstance(user)
    ```

- Objective-C

  - :

    ```objectivec
    [SFMetadataSyncManager sharedInstance:user]
    [SFLayoutSyncManager sharedInstance:user]
    ```

Here, `user` is an instance of `UserAccount` (Swift) or `SFUserAccount` (Objective-C).

To specify a store other than the user’s default, use

- Swift

  - :

    ```swift
    MetadataSyncManager.sharedInstance(user, smartStore: store)
    LayoutSyncManager.sharedInstance(user, smartStore: store)
    ```

- Objective-C

  - :

    ```objectivec
    [SFMetadataSyncManager sharedInstance:user smartStore:store]
    [SFLayoutSyncManager sharedInstance:user smartStore:store]
    ```

To tell the manager to default to the current user, set `user` to nil. The `store` argument is an instance of `SmartStore` (Swift) or `SFSmartStore` (Objective-C) and must be associated with the given user. When a valid store is provided, Mobile Sync uses the given store to create its metadata and layout soups.

## Retrieving Metadata (iOS)

You use metadata manager classes to fetch metadata from a Salesforce org or a SmartStore instance. To fetch, call the following asynchronous method on the shared instance of your metadata sync manager.

- Swift

  - :

    ```swift
    MetadataSyncManager.sharedInstance().fetchMetadata(forObject: String,
                                                            mode: FetchMode,
                                                 completionBlock: MetadataSyncCompletionBlock)
    ```

- Objective-C

  - :

    ```objectivec
    - (void)fetchMetadataForObject:(nonnull NSString *)objectType
                              mode:(SFSDKFetchMode)mode
                   completionBlock:(nonnull SFMetadataSyncCompletionBlock)completionBlock;
    ```

- `objectType`

  - : The Salesforce object whose metadata you’re fetching. For example, “Account” or “Opportunity”.

- `mode`

  - : This parameter helps determine the data’s source location. Data retrieval modes include:

    - iOS (Swift): `FetchMode.cacheOnly`

    - iOS (Objective-C): `SFSDKFetchModeCacheOnly`
    - Android: `CACHE_ONLY`

    Fetches data from the cache. If cached data is not available, returns null.

    - iOS (Swift): `FetchMode.cacheFirst`

    - iOS (Objective-C): `SFSDKFetchModeCacheFirst`
    - Android: `CACHE_FIRST`

    Fetches data from the cache. If cached data is not available, fetches data from the server .

    - iOS (Swift): `FetchMode.serverFirst`
    - iOS (Objective-C): `SFSDKFetchModeServerFirst`
    - Android: `SERVER_FIRST`

    Fetches data from the server. If server data is not available, fetches data from the cache. Data fetched from the server is automatically cached.

- `completionBlock`

  - : Callback block that executes asynchronously when the operation completes. You pass the block’s implementation or handle to this parameter. This block implements the following method prototype:

    ```objc
    typedef void (^SFMetadataSyncCompletionBlock) (SFMetadata * _Nullable metadata);
    ```

Mobile SDK passes a metadata object to this callback method. This object contains the true data model of the requested Salesforce object. You can use this metadata to query specific fields. This class defines properties whose names match the field names in the object’s manifest. Class properties represent all custom fields and customizable standard fields.

## Retrieving Layouts (iOS)

To sync layouts, call the following asynchronous method on the shared instance of your layout sync manager.

- Swift

  - :

    ```swift
    func fetchLayout(forObjectAPIName: String, formFactor: String?,
                          layoutType: String?,
                                mode: String?,
                        recordTypeId: String?,
                            syncMode: FetchMode,
                      completionBlock: LayoutSyncCompletionBlock)

    ```

- Objective-C

  - :

    ```objc
    (void)fetchLayoutForObjectAPIName:(nonnull NSString *)objectAPIName
                             formFactor:(nullable NSString *)formFactor
                             layoutType:(nullable NSString *)layoutType
                                   mode:(nullable NSString *)mode
                           recordTypeId:(nullable NSString *)recordTypeId
                               syncMode:(SFSDKFetchMode)syncMode
                        completionBlock:(nonnull SFLayoutSyncCompletionBlock)completionBlock;
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

    - `SFSDKFetchModeCacheOnly`—Fetches data from the cache. If cached data is not available, returns null.
    - `SFSDKFetchModeCacheFirst`—Fetches data from the cache. If cached data is not available, fetches data from the server.
    - `SFSDKFetchModeServerFirst`—Fetches data from the server. If server data is not available, fetches data from the cache. Data fetched from the server is automatically cached.

- `completionBlock`

  - : Asynchronous block that is triggered when the operation completes. You pass either the block’s implementation or its handle to this parameter. This block implements the following method prototype:

    ```objc
      typedef void (^SFLayoutSyncCompletionBlock) (NSString * _Nonnull objectAPIName,
          NSString * _Nullable formFactor,
          NSString * _Nullable layoutType,
          NSString * _Nullable mode,
          NSString * _Nullable recordTypeId,
          SFLayout  * _Nullable layout);
    ```

Mobile SDK passes an `SFLayout` object to this callback method. This object contains the true data model of the requested Salesforce object’s layout. You can use this object’s properties to query specific fields.

Behind the scenes, `SFLayoutSyncManager` uses a Mobile Sync `SFLayoutSyncDownTarget` object to automatically create a SmartStore soup that contains the returned data. This soup includes index specs for retrieving layout data when the device is offline.
