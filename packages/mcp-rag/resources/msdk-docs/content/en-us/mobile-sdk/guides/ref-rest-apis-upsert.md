# Upsert

Updates or inserts an object from external data.

Salesforce inserts or updates a record depending on whether the external ID currently exists in the external ID field. To force Salesforce to create a new record, set the name of the external ID field to “Id” and the external ID to null.

## Parameters

- API version (string, optional)
- Object type (string)
- External ID field (string)
- External ID (string, optional)
- Fields (map, optional)—Maps each field name to an object containing its value

If fields is null, the upserted record is empty.

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.requestForUpsert(withObjectType:externalIdField:externalId:fields:)
    ```

- Objective-C

  - :
    ```nolang
    - (SFRestRequest *)requestForUpsertWithObjectType:(NSString *)objectType
                                    externalIdField:(NSString *)externalIdField
                                         externalId:(nullable NSString *)externalId
                                              fields:(NSDictionary<NSString*, id> *)fields
                                           apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForUpsert(apiVersion: String?, objectType: String?,
        externalIdField: String?, externalId: String?,
        fields: Map<String?, Any?>?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForUpsert(String apiVersion,
        String objectType, String externalIdField, String externalId,
        Map<String, Object> fields)
    ```

## See Also

- [“Insert or Update (Upsert) a Record Using an External ID” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_upsert.htm)
