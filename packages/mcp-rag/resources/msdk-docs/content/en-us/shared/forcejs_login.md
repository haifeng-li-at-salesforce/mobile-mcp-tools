<!-- owner=MobileSDK,date=11-05-2019,repo=SalesforceMobileSDK-Shared,path=/samples/contactexplorer/index.html,line=67-->

```javascript
/* Do login */
force.login(
  function () {
    console.log("Auth succeeded");
    // Call your app’s entry point
    // ...
  },
  function (error) {
    console.log("Auth failed: " + error);
  },
);
```
