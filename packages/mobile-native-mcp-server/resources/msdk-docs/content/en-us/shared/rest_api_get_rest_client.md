```java
String accountType =
    SalesforceSDKManager.getInstance().getAccountType();

LoginOptions loginOptions =
    SalesforceSDKManager.getInstance().getLoginOptions();
// Get a rest client
new ClientManager(this, accountType, loginOptions,
   SalesforceSDKManager.getInstance().
   shouldLogoutWhenTokenRevoked()).
   getRestClient(this, new RestClientCallback() {
      @Override
      public void
      authenticatedRestClient(RestClient client) {
         if (client == null) {
            SalesforceSDKManager.getInstance().
               logout(MyActivity.this);
            return;
         }
         // Cache the returned client
         MyActivity.this.client = client;
      }
   }
);
```
