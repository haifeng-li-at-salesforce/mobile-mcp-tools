<!-- owner=MobileSDK,date="2018-02-08",repo=”SalesforceMobileSDK-Android”,path=”/master/native/NativeSampleApps/MobileSyncExplorer/res/raw/usersyncs.json”,line=1-->

```nolang

{
  "syncs": [
    {
      "syncName": "syncDownContacts",
      "syncType": "syncDown",
      "soupName": "contacts",
      "target": {"type":"soql", "query":"SELECT FirstName, LastName, Title,
           MobilePhone, Email, Department, HomePhone FROM Contact LIMIT 10000",
           "maxBatchSize":500},
      "options": {"mergeMode":"OVERWRITE"}
    },
    {
      "syncName": "syncUpContacts",
      "syncType": "syncUp",
      "soupName": "contacts",
      "target": {"createFieldlist":["FirstName", "LastName", "Title", "MobilePhone",
          "Email", "Department", "HomePhone"]},
      "options": {"fieldlist":["Id", "FirstName", "LastName", "Title", "MobilePhone",
          "Email", "Department", "HomePhone"], "mergeMode":"LEAVE_IF_CHANGED"}
    }
  ]
}
```
