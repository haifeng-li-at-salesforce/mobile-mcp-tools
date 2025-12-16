# Retrieve

Retrieves a single sObject record by object ID.

If you provide a list of fields, Mobile SDK retrieves only those fields. Otherwise, it returns all accessible standard and custom fields.

## Parameters

- API version (string, optional)
- Object type (string)
- Object ID (string)
- Field list (list of strings, optional)

## iOS

In iOS, the fieldList parameter expects a comma-separated list of field names, or nil.

- Swift

  - :
    ```swift
    RestClient.shared.requestForRetrieve(withObjectType:objectId:fieldList:apiVersion:)
    ```

- Objective-C

  - :

    ```nolang

    - (SFRestRequest *)requestForRetrieveWithObjectType:(NSString *)objectType
                                                objectId:(NSString *)objectId
                                              fieldList:(nullable NSString *)fieldList
                                                  apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForRetrieve(apiVersion: String?, objectType: String?,
    objectId: String?, fieldList: List<String>?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForRetrieve(String apiVersion, String objectType, String objectId, List<String> fieldList) throws UnsupportedEncodingException
    ```

## See Also

- For conditions governing field data retrieval, see [“Get Field Values from a Standard Object Record” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_get_field_values.htm)
