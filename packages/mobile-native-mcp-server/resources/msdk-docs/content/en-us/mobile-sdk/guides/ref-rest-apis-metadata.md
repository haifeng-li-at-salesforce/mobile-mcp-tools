# Metadata

Describes metadata provided by sObject basic information for the specified object.

## Parameters

- API version (string)
- Object type (string)

## iOS

### Swift

- Delegate Method

  - :

    ```swift
    RestClient.shared.requestForMetadata(withObjectType:apiVersion:)
    ```

### Objective-C

- Delegate Method

  - :

    ```nolang

    - (SFRestRequest *)
              requestForMetadataWithObjectType:(NSString *)objectType
                                    apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :

    ```kotlin
    fun getRequestForMetadata(apiVersion: String?, objectType: String?): RestRequest
    ```

- Java

  - :

    ```java
      public static RestRequest getRequestForMetadata(String apiVersion, String objectType)
    ```

## See Also

- [“sObject Basic Information” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_basic_info.htm)
