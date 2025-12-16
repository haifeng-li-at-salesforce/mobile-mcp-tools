## Hybrid Apps

In hybrid apps, you access user-based stores and global stores the same way. Rather than creating stores explicitly, you automatically create stores that don’t already exist when you call `registerSoup()`. To use a named store—for subsequent direct references, for example—you call this function with a `StoreConfig` object as the first argument. This function object takes a store name and a Boolean value that indicates whether the store is global.

```javascript
var StoreConfig = function (storeName, isGlobalStore) {
  this.storeName = storeName;
  this.isGlobalStore = isGlobalStore;
};
```

You can pass this object as the optional first argument to most soup functions. If used, the `StoreConfig` object configures the execution context. Either `storeName` or `isGlobalStore` can be optional—you can specify one or both. SmartStore evaluates `StoreConfig` objects as follows:

- If `storeName` is not specified, `this.storeName` is set to the SmartStore default store name.
- If `isGlobalStore` is not specified, `this.isGlobalStore` is set to `false`.
- Store names aren’t necessarily unique. A single store name can be used twice—once for a user-based store, and once for a global store.
- If you provide a store name that doesn’t exist in the space indicated by your `isGlobalStore` setting, SmartStore creates it.

The following example creates a user-based store named “Store1” that contains the `soupName` soup.

```javascript
navigator.smartstore.registerSoup({storeName: "Store1", isGlobalStore:false}, soupName,
    indexSpecs, successCallback, errorCallback)
);
```

You can call `registerSoup()` with as many different soup names as necessary. If you call a soup function without passing in `StoreConfig`, SmartStore always performs the operation on the default user-based (non-global) store. This behavior applies even if you’ve created named stores. The following example creates a soup named `soupName`, with the provided index specs, in the current user’s default store.

<!-- owner=MobileSDK,date=05-25-2017,repo=”local”,path=”~/Development/DocTests/51/forceios-apps/SmartStuffHybridTest/platforms/ios/www/index.html”,line=-->

```nolang

var sfSmartstore = function() {
    return cordova.require("com.salesforce.plugin.smartstore");
};
sfSmartstore().registerSoup(soupName, indexSpecs, successCallback, errorCallback);
```
