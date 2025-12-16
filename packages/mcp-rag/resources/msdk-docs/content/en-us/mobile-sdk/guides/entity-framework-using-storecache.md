# Using StoreCache For Offline Caching

The `mobilesync.js` library implements a cache named StoreCache that stores its data in SmartStore. Although Mobile Sync uses StoreCache as its default cache, StoreCache is a stand-alone component. Even if you don’t use Mobile Sync, you can still leverage StoreCache for SmartStore operations.

:::note

Although StoreCache is intended for use with Mobile Sync, you can use any cache mechanism with Mobile Sync that meets the requirements described in [Offline Caching](entity-framework-caching.md).

:::

## Construction and Initialization

StoreCache objects work internally with SmartStore soups. To create a StoreCache object backed by the soup `soupName`, use the following constructor:

```nolang
new Force.StoreCache(soupName [, additionalIndexSpecs, keyField])
```

- soupName

  - : Required. The name of the underlying SmartStore soup.

- additionalIndexSpecs

  - : Fields to include in the cache index in addition to default index fields. See [Registering a Soup](offline-soup.md) for formatting instructions.

- keyField

  - : Name of field containing the record ID. If not specified, StoreCache expects to find the ID in a field named "Id."

Soup items in a StoreCache object include four additional boolean fields for tracking offline edits:

- `__locally_created__`

- `__locally_updated__`

- `__locally_deleted__`

- `__local__` (set to true if any of the previous three are true)

These fields are for internal use but can also be used by apps. If your app uses the Mobile Sync plugin to sync up to the server, you’re probably required to create these fields in the source soup. See [Preparing Soups for Mobile Sync](offline-mobilesync-compatibility.md) for instructions.

StoreCache indexes each soup on the`__local__` field and its ID field. You can use the `additionalIndexSpecs` parameter to specify additional fields to include in the index.

To register the underlying soup, call `init()` on the StoreCache object. This function returns a jQuery promise that resolves once soup registration is complete.

## StoreCache Methods

### init()

Registers the underlying SmartStore soup. Returns a jQuery promise that resolves when soup registration is complete.

### retrieve(key [, fieldlist])

Returns a jQuery promise that resolves to the record with key in the keyField returned by the SmartStore. The promise resolves to null when no record is found or when the found record does not include all the fields in the fieldlist parameter.

- key

  - : The key value of the record to be retrieved.

- fieldlist

  - : (Optional) A JavaScript array of required fields. For example:

    ```nolang
    ["field1","field2","field3"]
    ```

### save(record [, noMerge])

Returns a jQuery promise that resolves to the saved record once the SmartStore upsert completes. If `noMerge` is not specified or is false, the passed record is merged with the server record with the same key, if one exists.

- record

  - : The record to be saved, formatted as:

    ```nolang
    {<field_name1>:"<field_value1>"[,<field_name2>:"<field_value2>",...]}
    ```

    For example:

    ```nolang
    {Id:"007", Name:"JamesBond", Mission:"TopSecret"}
    ```

- noMerge

  - : (Optional) Boolean value indicating whether the passed record is to be merged with the matching server record. Defaults to false.

### saveAll(records [, noMerge])

Identical to `save()`, except that `records` is an array of records to be saved. Returns a jQuery promise that resolves to the saved records.

- records

  - : An array of records. Each item in the array is formatted as demonstrated for the `save()` function.

- noMerge

  - : (Optional) Boolean value indicating whether the passed record is to be merged with the matching server record. Defaults to false.

### remove(key)

Returns a jQuery promise that resolves when the record with the given key has been removed from the SmartStore.

- key

  - : Key value of the record to be removed.

### find(querySpec)

Returns a jQuery promise that resolves once the query has been run against the SmartStore. The resolved value is an object with the following fields:

| Field         | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| `records`     | All fetched records                                         |
| `hasMore`     | Function to check if more records can be retrieved          |
| `getMore`     | Function to fetch more records                              |
| `closeCursor` | Function to close the open cursor and disable further fetch |

- querySpec

  - : A specification based on SmartStore query function calls, formatted as:

    ```nolang
    {queryType: "like" | "exact" | "range" | "smart"[, QUERY_TYPE_PARAMS]}
    ```

    where `query_type_params` match the format of the related SmartStore query function call. See [Retrieving Data from a Soup](offline-query.md).

    Here are some examples:

    ```nolang
    {queryType:"exact", indexPath:"<INDEXED_FIELD_TO_MATCH_ON>", matchKey:<VALUE_TO_MATCH>, order:"ascending"|"descending", pageSize:<ENTRIES_PER_PAGE>}

    {queryType:"range", indexPath:"<INDEXED_FIELD_TO_MATCH_ON>", beginKey:<START_OF_RANGE>, endKey:<END_OF_RANGE>, order:"ascending"|"descending", pageSize:<ENTRIES_PER_PAGE>}

    {queryType:"like", indexPath:"<INDEXED_FIELD_TO_MATCH_ON>", likeKey:"<VALUE_TO_MATCH>", order:"ascending"|"descending", pageSize:<ENTRIES_PER_PAGE>}

    {queryType:"smart", smartSql:"<SMART_SQL_QUERY>", order:"ascending"|"descending", pageSize:<ENTRIES_PER_PAGE>}
    ```

## Examples

The following example shows how to create, initialize, and use a StoreCache object.

```nolang
var cache = new Force.StoreCache("agents", [{path:"Mission", type:"string"} ]);
// initialization of the cache / underlying soup
cache.init()
.then(function() {
    // saving a record to the cache
    return cache.save({Id:"007", Name:"JamesBond", Mission:"TopSecret"});
})
.then(function(savedRecord) {
    // retrieving a record from the cache
    return cache.retrieve("007");
})
.then(function(retrievedRecord) {
    // searching for records in the cache
    return cache.find({queryType:"like", indexPath:"Mission", likeKey:"Top%", order:"ascending", pageSize:1});
})
.then(function(result) {
    // removing a record from the cache
    return cache.remove("007");
});

```

The next example shows how to use the `saveAll()` function and the results of the `find()` function.

```nolang
// initialization
var cache = new Force.StoreCache("agents", [ {path:"Name", type:"string"}, {path:"Mission", type:"string"} ]);
cache.init()
.then(function() {
    // saving some records
    return cache.saveAll([{Id:"007", Name:"JamesBond"},{Id:"008", Name:"Agent008"}, {Id:"009", Name:"JamesOther"}]);
})
.then(function() {
    // doing an exact query
    return cache.find({queryType:"exact", indexPath:"Name", matchKey:"Agent008", order:"ascending", pageSize:1});
})
.then(function(result) {
    alert("Agent mission is:" + result.records[0]["Mission"];
});

```
