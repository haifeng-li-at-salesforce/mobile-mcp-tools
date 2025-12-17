# Offline Caching

To provide offline support, your app must be able to cache its models and collections. Mobile Sync provides a configurable mechanism that gives you full control over caching operations.

## Default Cache and Custom Cache Implementations

For its default cache, the Mobile Sync library defines StoreCache, a cache implementation that uses SmartStore. Both StoreCache and SmartStore are optional components for Mobile Sync apps. If your application runs in a browser instead of the Mobile SDK container, or if you don't want to use SmartStore, you must provide an alternate cache implementation. Mobile Sync requires cache objects to support these operations:

- retrieve
- save
- save all
- remove
- find

## Mobile Sync Caching Workflow

The Mobile Sync model performs all interactions with the cache and the Salesforce server on behalf of your app. Your app gets and sets attributes on model objects. During save operations, the model uses these attribute settings to determine whether to write changes to the cache or server, and how to merge new data with existing data. If anything changes in the underlying data or in the model itself, the model sends event notifications. Similarly, if you request a fetch, the model fetches the data and presents it to your app in a model collection.

![Model data flow](../../../media/model.png)

Mobile Sync updates data in the cache transparently during CRUD operations. You can control the transparency level through optional flags.<!-- What are these optional flags?--> Cached objects maintain "dirty" attributes that indicate whether they've been created, updated, or deleted locally.

## Cache Modes

When you use a cache, you can specify a mode for each CRUD operation. Supported modes are:

| Mode                     | Constant                        | Description                                                                                                                                              |
| ------------------------ | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “cache-only”             | `Force.CACHE_MODE.CACHE_ONLY`   | Read from, or write to, the cache. Do not perform the operation on the server.                                                                           |
| “server-only”            | `Force.CACHE_MODE.SERVER_ONLY`  | Read from, or write to, the server. Do not perform the operation on the cache.                                                                           |
| “cache-first”            | `Force.CACHE_MODE.CACHE_FIRST`  | For FETCH operations only. Fetch the record from the cache. If the cache doesn't contain the record, fetch it from the server and then update the cache. |
| “server-first” (default) | `Force.CACHE_MODE.SERVER_FIRST` | Perform the operation on the server, then update the cache.                                                                                              |

To query the cache directly, use a cache query. SmartStore provides query APIs as well as its own query language, Smart SQL. See [Retrieving Data from a Soup](offline-query.md).
