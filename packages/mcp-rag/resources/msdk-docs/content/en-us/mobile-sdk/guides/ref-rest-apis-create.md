# Create

Creates a record of the specified object type.

## Parameters

- API version (string)
- Object type (string)
- (Optional) Map of each field’s name (string) to an object containing its value

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.requestForCreate(withObjectType:fields:)
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest *)requestForCreateWithObjectType:(NSString *)objectType
                                              fields:(nullable NSDictionary<NSString*, id> *)fields
                                           apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForCreate(apiVersion: String?, objectType: String?,
        fields: Map<String?, Any?>?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForCreate(String apiVersion,
        String objectType, Map<String, Object> fields)
    ```

## See Also

- [“sObject Basic Information” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_basic_info.htm)

```

```
