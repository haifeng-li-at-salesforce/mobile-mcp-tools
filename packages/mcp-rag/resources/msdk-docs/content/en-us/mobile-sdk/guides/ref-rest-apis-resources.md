# Resources

Gets available resources for the specified API version, including resource name and URI.

## Parameters

- API version (string, optional)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.requestForResources()
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest *)requestForResources
        apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForResources(apiVersion: String?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForResources(String apiVersion)
    ```

## See Also

- [“Resources by Version” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_discoveryresource.htm)
