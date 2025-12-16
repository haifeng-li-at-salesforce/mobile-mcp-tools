# Cache Policies

When you’re updating your app data, you can specify a cache policy to tell Mobile Sync how to handle the cache. You can choose to sync with server data, use the cache as a fallback when the server update fails, clear the cache, ignore the cache, and so forth. For Android, cache policies are defined in the `com.salesforce.androidsdk.mobilesync.manager.CacheManager.CachePolicy` class. For iOS, they’re part of the `SFDataCachePolicy` enumeration defined in `SFMobileSyncCacheManager.h`.

You specify a cache policy every time you call any metadata manager method that loads data. For example, here are the Android data loading methods:

```java
public List<SalesforceObjectType>
   loadSmartScopeObjectTypes(CachePolicy cachePolicy,
   long refreshCacheIfOlderThan);

public List<SalesforceObject> loadMRUObjects(String objectTypeName,
   int limit, CachePolicy cachePolicy, long refreshCacheIfOlderThan,
   String networkFieldName);

public List<SalesforceObjectType> loadAllObjectTypes(
   CachePolicy cachePolicy, long refreshCacheIfOlderThan);

public SalesforceObjectType loadObjectType(
   String objectTypeName, CachePolicy cachePolicy,
   long refreshCacheIfOlderThan);

public List<SalesforceObjectType> loadObjectTypes(
   List<String> objectTypeNames, CachePolicy cachePolicy,
   long refreshCacheIfOlderThan);

```

You also specify cache policy to help the cache manager decide if it’s time to reload the cache:

**Android:**

```java
 public boolean needToReloadCache(boolean cacheExists,
    CachePolicy cachePolicy, long lastCachedTime, long refreshIfOlderThan);
```

**iOS (Objective-C only):**

```objc
- (BOOL)needToReloadCache:(BOOL)cacheExists
    cachePolicy:(SFDataCachePolicy)cachePolicy
    lastCachedTime:(NSDate *)cacheTime
    refreshIfOlderThan:(NSTimeInterval)refreshIfOlderThan;
```

Here’s a list of cache policies.

| Cache Policy (iOS)                  | Cache Policy (Android)                    | Description                                                                                                       |
| ----------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `IgnoreCacheData`                   | `IGNORE_CACHE_DATA`                       | Ignores cached data. Always goes to the server for fresh data.                                                    |
| `ReloadAndReturnCacheOnFailure`     | `RELOAD_AND_RETURN_CACHE_ON_FAILURE`      | Attempts to load data from the server, but falls back on cached data if the server call fails.                    |
| `ReturnCacheDataDontReload`         | `RETURN_CACHE_DATA_DONT_RELOAD`           | Returns data from the cache, and doesn’t attempt to make a server call.                                           |
| `ReloadAndReturnCacheData`          | `RELOAD_AND_RETURN_CACHE_DATA`            | Reloads data from the server and updates the cache with the new data.                                             |
| `ReloadIfExpiredAndReturnCacheData` | `RELOAD_IF_EXPIRED_AND_RETURN_CACHE_DATA` | If the specified timeout has expired, it reloads data from the server. Otherwise, it returns data from the cache. |
| `InvalidateCacheDontReload`         | `INVALIDATE_CACHE_DONT_RELOAD`            | Clears the cache and does not reload data from the server.                                                        |
| `InvalidateCacheAndReload`          | `INVALIDATE_CACHE_AND_RELOAD`             | `Clears the cache and reloads data from the server.`                                                              |
