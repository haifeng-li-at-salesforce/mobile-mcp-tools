# Unauthenticated REST Requests

In certain cases, some applications must make REST calls before the user becomes authenticated. In other cases, the application must access services outside of Salesforce that don’t require Salesforce authentication. To implement such requirements, use a special `RestClient` instance that doesn’t require an authentication token.

To obtain an unauthenticated `RestClient` on Android, use one of the following `ClientManager` factory methods:

<!-- owner=MobileSDK,date="2019-06-05",repo=”SalesforceMobileSDK-Android”,path=”/libs/SalesforceSDK/src/com/salesforce/androidsdk/rest/ClientManager.java”,line=121-->

```java
/**
* Method to create an unauthenticated RestClient asynchronously
* @param activityContext
* @param restClientCallback
*/
public void getUnauthenticatedRestClient(Activity activityContext, RestClientCallback restClientCallback);
```

<!-- owner=MobileSDK,date="2019-06-05",repo=”SalesforceMobileSDK-Android”,path=”/libs/SalesforceSDK/src/com/salesforce/androidsdk/rest/ClientManager.java”,line=134-->

```java
/**
* Method to create an unauthenticated RestClient.
* @return
*/
public RestClient peekUnauthenticatedRestClient();
```

:::note

A REST request sent through either of these `RestClient` objects requires a full path URL. Mobile SDK doesn’t prepend an instance URL to unauthenticated endpoints.

:::

## Example

- Kotlin

  - :
    ::include{src="../../shared/kotlin_rest_api_unauthenticated_rest_client.md"}

- Java

  - :
    ::include{src="../../shared/rest_api_unauthenticated_rest_client.md"}
