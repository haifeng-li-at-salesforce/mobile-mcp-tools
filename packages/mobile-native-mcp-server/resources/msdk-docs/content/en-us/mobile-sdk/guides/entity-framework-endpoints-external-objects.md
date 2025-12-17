# Using External Objects

If you have data stored outside of Salesforce, you might need to use it with data inside your organization. For example, you might need to access inventory information that resides in an external database to more easily reconcile your stock. Salesforce lets you connect to an external data source from within your organization, access the data you want, create an external object for the data, and make it accessible to specific users from a tab.

## Accessing External Objects in Mobile SDK Apps

To access an external object with Mobile SDK, use `mobilesync.js`. Create an instance of either `Force.SObject` itself or a subclass of `Force.SObject`. Configure this instance as follows:

- Set `idAttribute` to "ExternalId".
- If you use a cache, set `idField` to "ExternalId".

## Example: Fetch an External Object Using Mobile Sync

The following JavaScript example accesses an external object named `Categories__x` with a field named `CategoryName__c` by extending `Force.SObject`.

1.  Set up a cache using StoreCache.

    ```javascript
    var cache = new Force.StoreCache("categories", ["CategoryName__c"], "ExternalId");
    cache.init();
    ```

2.  Create a `Force.SObject` subclass to represent `Categories__x` objects on the client. Set `idAttribute` to “ExternalId”, and pass in `cache` to enable caching.

    ```javascript
    var Category = Force.SObject.extend({
      sobjectType: "Categories__x",
      idAttribute: "ExternalId",
      fieldlist: ["CategoryName__c"],
      cache: cache,
    });
    ```

3.  Create an instance of `Category` that can fetch an external object whose external ID is “1”, then fetch that object.

    ```javascript
    var cat = new Category({ ExternalId: "1" });
    cat.fetch();
    ```

4.  Retrieve the fetched object from the cache:

    ```javascript
    var cat1 = cache.retrieve("1");
    ```

## Example: Fetch a Collection of External Objects Using Mobile Sync

You can also use a `Force.SObjectCollections` object to represent a collection of Category objects on the client.

1.  Create a subclass of `Force.SObjectCollection`.

    ```javascript
    var Categories = Force.SObjectCollection.extend({ model: Category, cache: cache });
    ```

2.  Fetch `Categories__x` objects by running a SOQL query.

    ```javascript
    var categories =  new Categories();
    categories.fetch({config:{
        type:"soql",
        query:"SELECT ExternalId, CategoryName__c
               FROM Categories__x"}
    });
    ```

3.  Retrieve the fetched object whose external ID is “2” from the collection within the cache.

    ```javascript
    var cat2 = cache.retrieve("2");
    ```
