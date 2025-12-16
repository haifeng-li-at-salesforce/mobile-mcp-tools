# Model Collections

Model collections in Mobile Sync are containers for query results. Query results stored in a model collection can come from the server via SOQL, SOSL, or MRU queries. Optionally, they can also come from the cache via SmartSQL (if the cache is SmartStore), or another query mechanism if you use an alternate cache.

Model collection objects are instances of `Force.SObjectCollection`, a subclass of the `Backbone.Collection` class. `SObjectCollection` extends `Collection` to work with Salesforce APIs and, optionally, with SmartStore.

## Properties

`Force.SObjectCollection` adds the following properties to `Backbone.Collection`:

- `config`

  - : Required. Defines the records the collection can hold (using SOQL, SOSL, MRU or SmartSQL).

- `cache`

  - : For updatable offline storage of records. The Mobile Sync comes bundled with Force.StoreCache, a cache implementation that’s backed by SmartStore.

- `cacheForOriginals`

  - : Contains original copies of records fetched from server to support conflict detection.

## Examples

You can assign values for model collection properties in several ways:

- As properties on a `Force.SObject` instance
- As methods on a `Force.SObject` sub-class
- In the options parameter of the `fetch()`, `save()`, or `destroy()` function call

For example, these code snippets are equivalent.

```js
// As properties on a Force.SObject instance
list = new Force.SObjectCollection({config:<VALID_CONFIG>});
list.fetch();
```

```js
// As methods on a Force.SObject sub-class
MyCollection = Force.SObjectCollection.extend({
  config: function() { return <VALID_CONFIG>; }
});
list = new MyCollection();
list.fetch();
```

```js
// In the options parameter of fetch()
list = new Force.SObjectCollection();
list.fetch({ config: VALID_CONFIG });
```
