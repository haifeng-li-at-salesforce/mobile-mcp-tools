# Retrieving Data from a Soup

SmartStore provides a set of helper methods that build query strings for you.

For retrieving data from a soup, SmartStore provides helper functions that build query specs for you. A query spec is similar to an index spec, but contains more information about the type of query and its parameters. Query builder methods produce specs that let you query:

- Everything (”all” query)
- Using a Smart SQL
- For exact matches of a key (”exact” query)
- For full-text search on given paths (”match” query)
- For a range of values (”range” query)
- For wild-card matches (”like” query)

To query for a set of records, call the query spec factory method that suits your specifications. You can optionally define the index field, sort order, and other metadata to be used for filtering, as described in the following table:

| Parameter                          | Description                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectPaths` or `withSelectPaths` | (Optional in JavaScript) Narrows the query scope to only a list of fields that you specify. See [Narrowing the Query to Return a Subset of Fields](#narrowing-the-query-to-return-a-subset-of-fields).                                                                                                                                                        |
| `indexPath` or `path`              | Describes what you’re searching for; for example, a name, account number, or date.                                                                                                                                                                                                                                                                            |
| `beginKey`                         | (Optional in JavaScript) Used to define the start of a range query.                                                                                                                                                                                                                                                                                           |
| `endKey`                           | (Optional in JavaScript) Used to define the end of a range query.                                                                                                                                                                                                                                                                                             |
| `matchKey`                         | (Optional in JavaScript) Used to specify the search string in an exact or match query.                                                                                                                                                                                                                                                                        |
| `orderPath`                        | (Optional in JavaScript—defaults to the value of the path parameter) For exact, range, and like queries, specifies the indexed path field to be used for sorting the result set. To query without sorting, set this parameter to a null value. _Note: Mobile SDK versions 3.2 and earlier sort all queries on the indexed path field specified in the query._ |
| `order`                            | (Optional in JavaScript) <ul><li>JavaScript: Either `ascending` (default) or `descending`.</li><li>iOS: Either `kSFSoupQuerySortOrderAscending` or `kSFSoupQuerySortOrderDescending`.</li><li>Android: Either `Order.ascending` or `Order.descending`.</li></ul>                                                                                              |
| `pageSize`                         | (Optional in JavaScript. If not present, the native plug-in calculates an optimal value for the resulting `Cursor.pageSize`) Number of records to return in each page of results.                                                                                                                                                                             |

<!--
<sfdocstbl><table><col /><col /><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody><tr><td>selectPaths or withSelectPaths</td><td>(Optional in JavaScript) Narrows the query scope to only a list of fields that you specify. See <a>Narrowing the Query to Return a Subset of Fields</a>.</td></tr><tr><td>indexPath or path</td><td>Describes what you’re searching for; for example, a name, account number, or date.</td></tr><tr><td>beginKey</td><td>(Optional in JavaScript) Used to define the start of a range query.</td></tr><tr><td>endKey</td><td>(Optional in JavaScript) Used to define the end of a range query.</td></tr><tr><td>matchKey</td><td>(Optional in JavaScript) Used to specify the search string in an exact or match query.</td></tr><tr><td>orderPath</td><td>(Optional in JavaScript—defaults to the value of the path parameter) For exact, range, and like queries, specifies the indexed path field to be used for sorting the result set. To query without sorting, set this parameter to a null value. <br> <br> <i>Note: Mobile SDK versions 3.2 and earlier sort all queries on the indexed path field specified in the query.</i></td></tr><tr><td>order</td><td>(Optional in JavaScript) <ul><li>JavaScript: Either “ascending” (default) or “descending.”</li><li>iOS: Either <code>kSFSoupQuerySortOrderAscending</code> or <code>kSFSoupQuerySortOrderDescending</code>.</li><li>Android: Either <code>Order.ascending</code> or <code>Order.descending</code>.</li></ul></td></tr><tr><td>pageSize</td><td>(Optional in JavaScript. If not present, the native plug-in calculates an optimal value for the resulting <code>Cursor.pageSize</code>) Number of records to return in each page of results.</td></tr></tbody></table></sfdocstbl>
-->

For example, consider the following `buildRangeQuerySpec()` JavaScript call:

```js
navigator.smartstore.buildRangeQuerySpec(
    "name", "Aardvark", "Zoroastrian", "ascending", 10, "name");
);
```

This call builds a range query spec that finds entries with names between Aardvark and Zoroastrian, sorted on the name field in ascending order:

```js
{
   "querySpec":{
      "queryType":"range",
      "indexPath":"name",
      "beginKey":"Aardvark",
      "endKey":"Zoroastrian",
      "orderPath":"name",
      "order":"ascending",
      "pageSize":10
   }
}
```

In JavaScript `build*` functions, you can omit optional parameters only at the end of the function call. You can’t skip one or more parameters and then specify the next without providing a dummy or null value for each option you skip. For example, you can use these calls:

- `buildAllQuerySpec(indexPath)`
- `buildAllQuerySpec(indexPath, order)`
- `buildAllQuerySpec(indexPath, order, pageSize)`
- `buildAllQuerySpec(indexPath, order, pageSize, selectPaths)`

However, you can’t use this call because it omits the order parameter:

```js
buildAllQuerySpec(indexPath, pageSize);
```

:::note

All parameterized queries are single-predicate searches. Only Smart SQL queries support joins.

:::

## Query Everything

Traverses everything in the soup.

See [Working with Query Results](offline-cursor.md) for information on page sizes.

:::note

As a base rule, set pageSize to the number of entries you want displayed on the screen. For a smooth scrolling display, you can to increase the value to two or three times the number of entries shown.

:::

**JavaScript:**

::include{src="../../shared/hybrid_query_all.md"}

**iOS native:**

```objc
+ (SFQuerySpec*) newAllQuerySpec:(NSString*)soupName
                        withPath:(NSString*)path
                       withOrder:(SFSoupQuerySortOrder)order
                    withPageSize:(NSUInteger)pageSize;

+ (SFQuerySpec*) newAllQuerySpec:(NSString*)soupName
                 withSelectPaths:(NSArray*)selectPaths
                   withOrderPath:(NSString*)orderPath
                       withOrder:(SFSoupQuerySortOrder)order
                    withPageSize:(NSUInteger)pageSize;
```

**Android native:**

```java
public static QuerySpec buildAllQuerySpec(
    String soupName,
    String path,
    Order order,
    int pageSize)

public static QuerySpec buildAllQuerySpec(
    String soupName,
    String[] selectPaths,
    String orderPath,
    Order order,
    int pageSize);
```

## Query with a Smart SQL SELECT Statement

Executes the query specified by the given Smart SQL statement.This function allows greater flexibility than other query factory functions because you provide your own SELECT statement. See [Smart SQL Queries](offline-smart-sql.md).

The following sample code shows a Smart SQL query that calls the SQL `COUNT` function.

**JavaScript**

```js
var querySpec = navigator.smartstore.buildSmartQuerySpec("select count(*) from {employees}", 1);

navigator.smartstore.runSmartQuery(querySpec, function (cursor) {
  // result should be [[ n ]] if there are n employees
});
```

In JavaScript, pageSize is optional and defaults to 10.

**iOS native**

In Mobile SDK 8.0 and later, the native Swift SmartStore extension provides two ways to run a Smart SQL query.

### Swift

<!-- FOR OJBECTIVE-C - owner=MobileSDK,date=05-25-2017,repo=SalesforceMobileSDK-iOS,path=/Development/DocTests/51/forceios-apps/SmartStuffTest/SmartStuffTest/SmartStuffTest.m,line=80-->

- In iOS 12.2 or later:

  - :

    ```swift
    public func query(_ smartSql: String) -> Result<[Any], SmartStoreError>
    ```

- In iOS 13.0 or later, using Combine Publisher:

  - :

    ```swift
    public func publisher(for smartSql: String) -> Future<[Any], SmartStoreError>
    ```

- Objective-C

  - :

    ```objc
    SFQuerySpec* querySpec =
        [SFQuerySpec
            newSmartQuerySpec:@"select count(*) from {employees}"
                    withPageSize:1];
    NSArray* result = [_store queryWithQuerySpec:querySpec pageIndex:0 error:nil];
    // result should be [[ n ]] if there are n employees
    ```

**Android native:**

<!-- owner=MobileSDK,date=05-25-2017,repo=local,path=~/Development/DocTests/51/forcedroid-apps/SmartStuffTest/SmartStuffTest/app/src/com/bestapps/android/SmartStoreStuff.java,line=106-->

```java
try {
    JSONArray result =
        store.query(QuerySpec.buildSmartQuerySpec(
            "select count(*) from {Accounts}", 1), 0);
    // result should be [[ n ]] if there are n employees
    Log.println(Log.INFO, "REST Success!", "\nFound " +
        result.getString(0) + " accounts.");
} catch (JSONException e) {
    Log.e(TAG, "Error occurred while counting the number of account records. "
        +  "Please verify validity of JSON data set.");
}
```

## Query by Exact

Finds entries that exactly match the given matchKey for the indexPath value. You use this method to find child entities of a given ID. For example, you can find opportunities by `Status`.

**JavaScript:**

In JavaScript, you can set the order parameter to either “ascending” or “descending”. order, pageSize, and orderPath are optional, and default to “ascending”, 10, and the `path` argument, respectively. The selectPaths argument is also optional.

```js
navigator.smartstore.buildExactQuerySpec(path, matchKey, pageSize, order, orderPath, selectPaths);
```

The following JavaScript code retrieves children by ID:

```js
var querySpec = navigator.smartstore.buildExactQuerySpec(
   “sfdcId”,
   “some-sfdc-id”);
navigator.smartstore.querySoup(“Catalogs”,
   querySpec, function(cursor) {
   // we expect the catalog to be in:
   // cursor.currentPageOrderedEntries[0]
});

```

The following JavaScript code retrieves children by parent ID:

```js
var querySpec = navigator.smartstore.buildExactQuerySpec(“parentSfdcId”, “some-sfdc-id);
navigator.smartstore.querySoup(“Catalogs”, querySpec, function(cursor) {});

```

**iOS native**

In iOS, you can set the order parameter to either `kSFSoupQuerySortOrderAscending` or `kSFSoupQuerySortOrderDescending`. To narrow the query’s scope to certain fields, use the second form and pass an array of field names through the withSelectPaths parameter.

```objc
+ (SFQuerySpec*) newExactQuerySpec:(NSString*)soupName
                          withPath:(NSString*)path
                      withMatchKey:(NSString*)matchKey
                     withOrderPath:(NSString*)orderPath
                         withOrder:(SFSoupQuerySortOrder)order
                      withPageSize:(NSUInteger)pageSize;

+ (SFQuerySpec*) newExactQuerySpec:(NSString*)soupName
                   withSelectPaths:(NSArray*)selectPaths
                          withPath:(NSString*)path
                      withMatchKey:(NSString*)matchKey
                     withOrderPath:(NSString*)orderPath
                         withOrder:(SFSoupQuerySortOrder)order
                      withPageSize:(NSUInteger)pageSize;

```

**Android native:**

In Android, you can set the order parameter to either `Order.ascending` or `Order.descending`. To narrow the query’s scope to certain fields, use the second form and pass an array of field names through the selectPaths parameter.

```java
public static QuerySpec buildExactQuerySpec(
    String soupName, String path, String exactMatchKey,
    String orderPath, Order order, int pageSize)

public static QuerySpec buildExactQuerySpec(
    String soupName, String[] selectPaths, String path,
    String exactMatchKey, String orderPath,
    Order order, int pageSize);

```

## Query by Match

Finds entries that exactly match the full-text search query in matchKey for the indexPath value. See [Using Full-Text Search Queries](offline-full-text-search.md).

**JavaScript**

In JavaScript, you can set the order parameter to either “ascending” or “descending”. order, pageSize, and orderPath are optional, and default to “ascending”, 10, and the `path` argument, respectively. The selectPaths argument is also optional.

```js
navigator.smartstore.buildMatchQuerySpec(path, matchKey, order, pageSize, orderPath, selectPaths);
```

**iOS native:**

In iOS, you can set the order parameter to either `kSFSoupQuerySortOrderAscending` or `kSFSoupQuerySortOrderDescending`. To narrow the query’s scope to certain fields, use the second form and pass an array of field names through the withSelectPaths parameter.

```objc
+ (SFQuerySpec*) newMatchQuerySpec:(NSString*)soupName
                          withPath:(NSString*)path
                      withMatchKey:(NSString*)matchKey
                     withOrderPath:(NSString*)orderPath
                         withOrder:(SFSoupQuerySortOrder)order
                      withPageSize:(NSUInteger)pageSize;

+ (SFQuerySpec*) newMatchQuerySpec:(NSString*)soupName
                   withSelectPaths:(NSArray*)selectPaths
                          withPath:(NSString*)path
                      withMatchKey:(NSString*)matchKey
                     withOrderPath:(NSString*)orderPath
                         withOrder:(SFSoupQuerySortOrder)order
                      withPageSize:(NSUInteger)pageSize;
```

**Android native:**

In Android, you can set the order parameter to either `Order.ascending` or `Order.descending`. To narrow the query’s scope to certain fields, use the second form and pass an array of field names through the selectPaths parameter.

```java
public static QuerySpec buildMatchQuerySpec(
    String soupName, String path, String exactMatchKey,
    String orderPath, Order order, int pageSize)

public static QuerySpec buildMatchQuerySpec(
    String soupName, String[] selectPaths, String path,
    String matchKey, String orderPath, Order order,
    int pageSize)
```

## Query by Range

Finds entries whose indexPath values fall into the range defined by beginKey and endKey. Use this function to search by numeric ranges, such as a range of dates stored as integers.

By passing null values to beginKey and endKey, you can perform open-ended searches:

- To find all records where the field at indexPath is greater than or equal to beginKey, pass a null value to endKey.
- To find all records where the field at indexPath is less than or equal to endKey, pass a null value to beginKey.
- To query everything, pass a null value to both beginKey and endKey.

**JavaScript**

In JavaScript, you can set the order parameter to either “ascending” or “descending”. order, pageSize, and orderPath are optional, and default to “ascending”, 10, and the `path` argument, respectively. The selectPaths argument is also optional.

```js
navigator.smartstore.buildRangeQuerySpec(
  path,
  beginKey,
  endKey,
  order,
  pageSize,
  orderPath,
  selectPaths,
);
```

**iOS native**

In iOS, you can set the order parameter to either `kSFSoupQuerySortOrderAscending` or `kSFSoupQuerySortOrderDescending`. To narrow the query’s scope to certain fields, use the second form and pass an array of field names through the withSelectPaths parameter.

```objc
+ (SFQuerySpec*) newRangeQuerySpec:(NSString*)soupName
                          withPath:(NSString*)path
                      withBeginKey:(NSString*)beginKey
                        withEndKey:(NSString*)endKey
                     withOrderPath:(NSString*)orderPath
                         withOrder:(SFSoupQuerySortOrder)order
                      withPageSize:(NSUInteger)pageSize;

+ (SFQuerySpec*) newRangeQuerySpec:(NSString*)soupName
                   withSelectPaths:(NSArray*)selectPaths
                          withPath:(NSString*)path
                      withBeginKey:(NSString*)beginKey
                        withEndKey:(NSString*)endKey
                     withOrderPath:(NSString*)orderPath
                         withOrder:(SFSoupQuerySortOrder)order
                      withPageSize:(NSUInteger)pageSize;
```

**Android native:**

In Android, you can set the order parameter to either `Order.ascending` or `Order.descending`. To narrow the query’s scope to certain fields, use the second form and pass an array of field names through the selectPaths parameter.

```java
public static QuerySpec buildRangeQuerySpec(
    String soupName, String path, String beginKey,
    String endKey, String orderPath, Order order, int pageSize)

public static QuerySpec buildRangeQuerySpec(
    String soupName, String[] selectPaths, String path,
    String beginKey, String endKey, String orderPath,
    Order order, int pageSize);
```

## Query by Like

Finds entries whose indexPath values are like the given likeKey. You can use the “%” wild card to search for partial matches as shown in these syntax examples:

- To search for terms that begin with your keyword: “foo%”
- To search for terms that end with your keyword: “%foo”
- To search for your keyword anywhere in the indexPath value: “%foo%”

. Use this function for general searching and partial name matches. Use the query by “match” method for full-text queries and fast queries over large data sets.

:::note

Query by “like” is the slowest query method.

:::

**JavaScript:**

In JavaScript, you can set the order parameter to either “ascending” or “descending”. order, pageSize, and orderPath are optional, and default to “ascending”, 10, and the `path` argument, respectively. The selectPaths argument is also optional.

```js
navigator.smartstore.buildLikeQuerySpec(path, likeKey, order, pageSize, orderPath, selectPaths);
```

**iOS native:**

In iOS, you can set the order parameter to either `kSFSoupQuerySortOrderAscending` or `kSFSoupQuerySortOrderDescending`. To narrow the query’s scope to certain fields, use the second form and pass an array of field names through the withSelectPaths parameter.

```objc
+ (SFQuerySpec*) newLikeQuerySpec:(NSString*)soupName
                         withPath:(NSString*)path
                      withLikeKey:(NSString*)likeKey
                    withOrderPath:(NSString*)orderPath
                        withOrder:(SFSoupQuerySortOrder)order
                     withPageSize:(NSUInteger)pageSize;

+ (SFQuerySpec*) newLikeQuerySpec:(NSString*)soupName
                  withSelectPaths:(NSArray*)selectPaths
                         withPath:(NSString*)path
                      withLikeKey:(NSString*)likeKey
                    withOrderPath:(NSString*)orderPath
                        withOrder:(SFSoupQuerySortOrder)order
                     withPageSize:(NSUInteger)pageSize;

```

**Android native:**

In Android, you can set the order parameter to either `Order.ascending` or `Order.descending`. To narrow the query’s scope to certain fields, use the second form and pass an array of field names through the selectPaths parameter.

```java
public static QuerySpec buildLikeQuerySpec(
    String soupName, String path, String likeKey,
    String orderPath, Order order, int pageSize)

public static QuerySpec buildLikeQuerySpec(
    String soupName, String[] selectPaths,
    String path, String likeKey, String orderPath,
    Order order, int pageSize)

```

## Executing the Query

In JavaScript, queries run asynchronously and return a cursor to your success callback function, or an error to your error callback function. The success callback takes the form `function(cursor)`. You use the querySpec parameter to pass your query specification to the `querySoup` method.

```js
navigator.smartstore.querySoup(soupName, querySpec, successCallback, errorCallback);
```

## Narrowing the Query to Return a Subset of Fields

In Smart SQL query specs, you can limit the list of fields that the query returns by specifying the fields in the Smart SQL statement. For other types of query specs, you can do the same thing with the selectPaths parameter. When this argument is used, the method returns an array of arrays that contains an array for each element that satisfies the query. Each element array includes only the fields specified in selectPaths. This parameter is available for “all”, “exact”, “match”, “range”, and “like” query specs.

Here’s an example. Consider a soup that contains elements such as the following:

```js
{"_soupEntryId":1, "name":"abc", "status":"active", ...},
{"_soupEntryId":2, "name":"abd", "status":"inactive", ...}, ...
```

Let’s run a “like” query that uses “ab%” as the LIKE key and name as the path. This query returns an array of objects, each of which contains an entire element:

```js
[ {"_soupEntryId":1, "name": "abc", "status":"active",...},
{"_soupEntryId":2, "name":"abd", "status":"inactive",...},
...]

```

Now let’s refine the query by adding \_soupEntryId and name as selected paths. The query now returns a more efficient array of arrays with only the `_soupEntryId` and `name` field values:

```js
[[1, "abc"], [2, "abd"], ...]
```

## Retrieving Individual Soup Entries by Primary Key

All soup entries are automatically given a unique internal ID (the primary key in the internal table that holds all entries in the soup). That ID field is made available as the \_soupEntryId field in the soup entry.

To look up soup entries by \_soupEntryId in JavaScript, use the `retrieveSoupEntries` function. This function provides the fastest way to retrieve a soup entry, but it’s usable only when you know the \_soupEntryId:

```js
navigator.smartStore.retrieveSoupEntries(soupName, indexSpecs, successCallback, errorCallback);
```

The return order is not guaranteed. Also, entries that have been deleted are not returned in the resulting array.
