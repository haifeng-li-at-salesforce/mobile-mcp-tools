# Describe

Completely describes the object’s metadata at all levels, including fields, URLs, and child relationships.

## Parameters

- API version (string)
- Object type (string)

## iOS

### Swift

- Delegate Method

  - :
    ```swift
    RestClient.shared.requestForDescribe(withObjectType:)
    ```

- Block Method

  - :
    ```swift
    describe(_:onFailure:onSuccess:)
    ```

### Objective-C

- Delegate Method

  - :

    ```nolang

    - (SFRestRequest *)
              requestForDescribeWithObjectType:(NSString *)objectType
                                    apiVersion:(nullable NSString *)apiVersion;
    ```

- Block Method

  - :
    ```nolang
    - (SFRestRequest *) performDescribeWithObjectType:(NSString *)objectType
    	                                 failBlock:(SFRestFailBlock)failBlock
    	                             completeBlock:(SFRestDictionaryResponseBlock)completeBlock;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForDescribe(apiVersion: String?, objectType: String?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForDescribe(String apiVersion, String objectType)
    ```

## See Also

- [“sObject Describe” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_sobject_describe.htm)
