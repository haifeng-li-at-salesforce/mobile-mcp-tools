# Models

Models on the client represent server records. In Mobile Sync, model objects are instances of `Force.SObject`, a subclass of the `Backbone.Model` class. `SObject` extends `Model` to work with Salesforce APIs and, optionally, with SmartStore.

You can perform the following CRUD operations on `SObject` model objects:

- Create
- Destroy
- Fetch
- Save
- Get/set attributes

In addition, model objects are observable: Views and controllers can receive notifications when the objects change.

## Properties

`Force.SObject` adds the following properties to `Backbone.Model`:

- `sobjectType`

  - : Required. The name of the Salesforce object that this model represents. This value can refer to either a standard object or a custom object.

- `fieldlist`

  - : Required. Names of fields to fetch, save, or destroy.

- `cacheMode`

  - : [Offline behavior](entity-framework-caching.md).

- `mergeMode`

  - : [Conflict handling behavior](entity-framework-conflict-detection.md).

- `cache`

  - : For updatable offline storage of records. The Mobile Sync comes bundled with Force.StoreCache, a cache implementation that is backed by SmartStore.

- `cacheForOriginals`

  - : Contains original copies of records fetched from server to support conflict detection.

## Examples

You can assign values for model properties in several ways:

- As properties on a `Force.SObject` instance.
- As methods on a `Force.SObject` sub-class. These methods take a parameter that specifies the desired CRUD action (“create”, “read”, “update”, or “delete”).
- In the options parameter of the `fetch()`, `save()`, or `destroy()` function call.

For example, these code snippets are equivalent.

```js
// As properties on a Force.SObject instance
acc = new Force.SObject({ Id: "<SOME_ID>" });
acc.sobjectType = "account";
acc.fieldlist = ["Id", "Name"];
acc.fetch();
```

```js
// As methods on a Force.SObject sub-class
Account = Force.SObject.extend({
  sobjectType: "account",
  fieldlist: function (method) {
    return ["Id", "Name"];
  },
});
Acc = new Account({ Id: "<SOME_ID>" });
acc.fetch();
```

```js
// In the options parameter of fetch()
acc = new Force.SObject({Id:"<SOME_ID>"});
acc.sobjectType = "account";
acc.fetch({fieldlist:["Id", "Name"]);

```
