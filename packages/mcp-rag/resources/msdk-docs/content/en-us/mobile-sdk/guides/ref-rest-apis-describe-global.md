# Describe Global

Returns a list of all available objects in your org and their metadata.

## Parameters

- API version (string)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.requestForDescribeGlobal()
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest *)requestForDescribeGlobal
        apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForDescribeGlobal(apiVersion: String?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForDescribeGlobal(String apiVersion)
    ```

## See Also

- [“Describe Global” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_describeGlobal.htm)
