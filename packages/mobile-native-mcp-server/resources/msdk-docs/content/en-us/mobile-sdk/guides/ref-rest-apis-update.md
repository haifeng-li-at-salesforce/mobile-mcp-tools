# Update

Updates specified fields of the requested record with the given values. Can also prevent the update from occurring if the record has been modified since a given date.

## Parameters

- API version (string, optional)
- Object type (string)
- Object ID (string)
- Fields (map, optional)—Maps fields to be updated to their new values<!-- TO DO: If fields map is nil/null, does this request merely perform a GET of the fields and their values?-->
- “If unmodified since” date (date, optional)—Fulfills the request only if the record hasn’t been modified since the given date

## iOS

- Swift

  - :

    ```swift
    RestClient.shared.requestForUpdate(withObjectType:objectId:fields:)

    RestClient.shared.requestForUpdate(withObjectType:objectId:fields:ifUnmodifiedSince:)
    ```

- Objective-C

  - :

    ```nolang

    - (SFRestRequest *)requestForUpdateWithObjectType:(NSString *)objectType
                                              objectId:(NSString *)objectId
                                                fields:(nullable NSDictionary<NSString*, id> *)fields
                                                apiVersion:(nullable NSString *)apiVersion;

          - (SFRestRequest *)requestForUpdateWithObjectType:(NSString *)objectType
                                              objectId:(NSString *)objectId
                                                fields:(nullable NSDictionary<NSString*, id> *)fields
                                ifUnmodifiedSinceDate:(nullable NSDate *) ifUnmodifiedSinceDate
                                                apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :

    ```kotlin
    fun getRequestForUpdate(apiVersion: String?, objectType: String?,
        objectId: String?, fields: Map<String?, Any?>?): RestRequest

    fun getRequestForUpdate(apiVersion: String?, objectType: String?,
        objectId: String?, fields: Map<String?, Any?>?,
        ifUnmodifiedSinceDate: Date?): RestRequest
    ```

- Java

  - :

    ```java
    public static RestRequest getRequestForUpdate(String apiVersion,
        String objectType, String objectId, Map<String, Object> fields)

    public static RestRequest getRequestForUpdate(String apiVersion,
        String objectType, String objectId, Map<String, Object> fields,
        Date ifUnmodifiedSinceDate)
    ```

## See Also

- [“Update a Record” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_update_fields.htm)
