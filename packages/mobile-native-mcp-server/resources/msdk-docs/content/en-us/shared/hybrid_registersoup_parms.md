### indexSpecs

Use the indexSpecs array to create the soup with predefined indexing. Entries in the indexSpecs array specify how to index the soup. Each entry consists of a `path:type` pair. `path` is the name of an index field; `type` is either “string”, “integer”, “floating”, “full_text”, or “json1”.

```js
var indexSpecs = [
  { path: "Name", type: "string" },
  { path: "Id", type: "string" },
];
```

:::note

- Index paths are case-sensitive and can include compound paths, such as `Owner.Name`.
- Index entries that are missing any fields described in an indexSpecs array are not tracked in that index.
- The type of the index applies only to the index. When you query an indexed field (for example, “`select {soup:path} from {soup}`”), the query returns data of the type that you specified in the index specification.
- Index columns can contain null fields.
- Beginning in Mobile SDK 4.1, you can specify index paths that point to internal (non-leaf) nodes. You can use these paths with `like` and `match` (full-text) queries. Use the `string` type when you define internal node paths.

  For example, consider this element in a soup named “spies”:

  ```js
  {  
     "first_name":"James",
     "last_name":"Bond",
     "address":{  
        "street_number":10,
        "street_name":"downing",
        "city":"london"
     }
  }
  ```

  In this case, “address” is an internal node because it has children. Through the index on the path “address”, you can use a `like` or `match` query to find the “city” value—“london”—in “address”. For example:

  ```js
  SELECT {spies:first_name, spies:last_name} FROM spies WHERE {spies:address} LIKE 'london'
  ```

- Beginning in Mobile SDK 4.1, you can include arrays in index paths, with some restrictions. See [Using Arrays in Index Paths](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/offline-arrays.html).

Still running into issues? See “Creating Index Specs” in the _Mobile SDK Development Guide_ for advanced rules and restrictions.

:::

### successCallback

The success callback function you supply takes one argument: the soup name. For example:

```js
function(soupName) { alert("Soup " + soupName + " was successfully created"); }
```

When the soup is successfully created, `registerSoup()` calls the success callback function to indicate that the soup is ready. Wait to complete the transaction and receive the callback before you begin any activity. If you register a soup under the passed name, the success callback function returns the soup.

### errorCallback

The error callback function takes one argument: the error description string.

```js
function(err) { alert ("registerSoup failed with error: " + err); }
```

During soup creation, errors can happen for various reasons, including:

- An invalid or bad soup name
- No index (at least one index must be specified)
- Other unexpected errors, such as a database error
