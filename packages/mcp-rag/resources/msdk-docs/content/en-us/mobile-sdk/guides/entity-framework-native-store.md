# Storing and Retrieving Cached Data

The cache manager provides methods for writing and reading sObject metadata to the Mobile Sync cache. Each method requires you to provide a key string that identifies the data in the cache. You can use any unique string that helps your app locate the correct cached data.

You also specify the type of cached data. Cache manager methods read and write each of the three categories of sObject data: metadata, MRU (most recently used) list, and layout. Since only your app uses the type identifiers you provide, you can use any unique strings that clearly distinguish these data types.

## Cache Manager Classes

- **Android:** `com.salesforce.androidsdk.mobilesync.manager.CacheManager`
- **iOS:** `SFMobileSyncCacheManager`

## Read and Write Methods

Here are the methods for reading and writing sObject metadata, MRU lists, and sObject layouts.

- **Android:**- sObjects Metadata

  - :
    ```nolang
    public List<SalesforceObject> readObjects(String cacheType,
        String cacheKey);
    public void writeObjects(List<SalesforceObject> objects,
        String cacheKey, String cacheType);
    ```

- MRU List

  - :

    ```nolang
    public List<SalesforceObjectType>
    readObjectTypes(String cacheType, String cacheKey);

    public void
    writeObjectTypes(List<SalesforceObjectType> objects,
        String cacheKey, String cacheType);
    ```

- sObject Layouts

  - :

    ```nolang
    public List<SalesforceObjectTypeLayout>
    readObjectLayouts(String cacheType, String cacheKey);

    public void
    writeObjectLayouts(List<SalesforceObjectTypeLayout> objects,
        String cacheKey, String cacheType);
    ```

- **iOS:**- Read Method

  - :
    ```nolang
    - (NSArray *)
    readDataWithCacheType:(NSString *)cacheType
                 cacheKey:(NSString *)cacheKey
              cachePolicy:(SFDataCachePolicy)cachePolicy
              objectClass:(Class)objectClass
               cachedTime:(out NSDate **)lastCachedTime;
    ```

- Write Method

  - :
    ```nolang
    - (void)writeDataToCache:(id)data
                   cacheType:(NSString *)cacheType
                    cacheKey:(NSString *)cacheKey;
    ```

## Clearing the Cache

When your app is ready to clear the cache, use the following cache manager methods:

- **Android:**

  ```nolang
  public void removeCache(String cacheType, String cacheKey);
  ```

- **iOS:**

  ```nolang

  - (void)removeCache:(NSString *)cacheType
             cacheKey:(NSString *)cacheKey;
  ```

These methods let you clear a selected portion of the cache. To clear the entire cache, call the method for each cache key and data type you’ve stored.

<!--
## Example
-->
