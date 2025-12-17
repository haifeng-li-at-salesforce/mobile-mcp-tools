```java
val accountType = SalesforceSDKManager.getInstance().accountType

val loginOptions = SalesforceSDKManager.getInstance().loginOptions
// Get a rest client
ClientManager(this, accountType, loginOptions,
        SalesforceSDKManager.getInstance().shouldLogoutWhenTokenRevoked()).
            getRestClient(this, object : RestClientCallback() {
    fun authenticatedRestClient(client: RestClient?) {
        if (client == null) {
            SalesforceSDKManager.getInstance().logout(this@MainActivity)
            return
        }
        // Cache the returned client
        this@MainActivity.client = client
    }
}
)
```
