# Delete

Deletes the object of the given type and the given ID

## Parameters

- API version (string)
- Object type (string)
- Object ID (string)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.requestForDelete(withObjectType:objectId:)
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest *)requestForDeleteWithObjectType:(NSString *)objectType
                                            objectId:(NSString *)objectId
                                           apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForDelete(apiVersion: String?, objectType: String?, objectId: String?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForDelete(String apiVersion, String objectType, String objectId)
    ```

## See Also

- [“SObject Rows” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_retrieve.htm)

```

```
