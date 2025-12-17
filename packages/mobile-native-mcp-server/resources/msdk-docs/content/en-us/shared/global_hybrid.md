## Hybrid APIs

Most SmartStore JavaScript soup methods take an optional first argument that specifies whether to use global SmartStore. This argument can be a Boolean value or a `StoreConfig` object. If this argument is absent, Mobile SDK uses the default user store.

For example:

```javascript
querySoup([isGlobalStore, ]soupName, querySpec,
    successCB, errorCB);
querySoup([storeConfig, ]soupName, querySpec,
    successCB, errorCB);
```

SmartStore defines the following functions for removing stores. Each function takes success and error callbacks. The `removeStore()` function also requires either a `StoreConfig` object that specifies the store name, or just the store name as a string.

```javascript
removeStore(storeConfig, successCB, errorCB);
removeAllGlobalStores(successCB, errorCB);
removeAllStores(successCB, errorCB);
```
