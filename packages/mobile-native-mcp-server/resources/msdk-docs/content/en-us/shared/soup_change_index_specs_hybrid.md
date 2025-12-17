## Hybrid Apps

In hybrid apps, call:

```javascript
navigator.smartstore.alterSoup(soupName, indexSpecs, reIndexData, successCallback, errorCallback);
```

In addition to success and error callbacks, this function takes the following arguments:

**Parameters**

| Parameter Name | Argument Description                                                                                           |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| `soupName`     | String. Pass in the name of the soup.                                                                          |
| `indexSpecs`   | Array. Pass in the set of index entries in the index specification.                                            |
| `reIndexData`  | Boolean. Indicate whether you want the function to re-index the soup after replacing the index specifications. |

The success callback supports a single parameter that contains the soup name. For example:

```javascript
function(soupName) { alert("Soup " + soupName +
    " was successfully altered"); }
```

The following example demonstrates a simple soup alteration. To start, the developer defines a soup that’s indexed on `name` and `address` fields, and then upserts an agent record.

<!-- prettier-ignore-start -->
```javascript
navigator.smartstore.registerSoup("myAgents", [
  { path: 'name', type: 'string' },
  { path: 'address', type: 'string' },]);
navigator.smartstore.upsertSoupEntries("myAgents", [
  { name: 'James Bond', address: '1 market st', agentNumber: "007" },]);
```
<!-- prettier-ignore-end -->

When time and experience show that users really wanted to query their agents by "agentNumber" rather than `address`, the developer decides to drop the index on `address` and add an index on `agentNumber`.

<!-- prettier-ignore-start -->
```javascript
navigator.smartstore.alterSoup("myAgents", [{path:'name',type:'string'}, {path:'agentNumber', type:'string'}], true);
```
<!-- prettier-ignore-end -->

:::note

If the developer sets the `reIndexData` parameter to false, a query on `agentNumber` does not find the already inserted entry (”James Bond”). However, you can query that record by `name`. To support queries by `agentNumber`, you’d first have to call `navigator.smartstore.reIndexSoup("myAgents", ["agentNumber"])`

:::
