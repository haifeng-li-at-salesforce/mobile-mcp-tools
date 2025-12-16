## Hybrid Apps

In hybrid apps, you use the third parameter to pass either an ID array or a SmartStore query spec.

```javascript
removeFromSoup([isGlobalStore, ]soupName, entryIdsOrQuerySpec,
    successCB, errorCB)
removeFromSoup([storeConfig, ]soupName, entryIdsOrQuerySpec,
    successCB, errorCB)
```

In addition to success and error callbacks, this function takes the following arguments:

| Parameter Name        | Argument Description                                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `isGlobalStore`       | (Optional) Boolean that indicates whether this operation occurs in a global or user-based SmartStore database. Defaults to `false`. |
| `storeConfig`         | (Optional) `StoreConfig` object that specifies a store name and whether the store is global or user-based.                          |
| `soupName`            | String. Pass in the name of the soup.                                                                                               |
| `entryIdsOrQuerySpec` | Array or QuerySpec object. Pass in the name of the soup.                                                                            |
