# Search Scope and Order

Gets an ordered list of objects in the current user’s default global search scope.

## Parameters

- API version (string, optional)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.requestForSearchScopeAndOrder(apiVersion:)
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest *)requestForSearchScopeAndOrder
        apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForSearchScopeAndOrder(apiVersion: String?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForSearchScopeAndOrder(String apiVersion)
    ```

## See Also

- [“Search Scope and Order” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_search_scope_order.htm)
