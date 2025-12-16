# Object Layout

Gets layout metadata for the specified object type and parameters.

## Parameters

- API version (string, optional)
- Object API name (string, required)
- Form factor (string, optional)—“Large” (default), “Medium”, or “Small”
- Layout type (string, optional)—”Full” (default) or “Compact”
- Mode (string, optional)—”View” (default, “Create”, or “Edit”
- Record type ID (string, optional)—The ID of the RecordType object for the new record. If not provided, the default record type is used.

## iOS

- Swift

  - :
    ```nolang
    requestForLayout(withObjectAPIName:formFactor:layoutType:mode:recordTypeId:apiVersion:)
    ```

- Objective-C

  - :

    ```nolang

    - (SFRestRequest *)
    requestForLayoutWithObjectAPIName:(nonnull NSString *)objectAPIName
                           formFactor:(nullable NSString *)formFactor
                           layoutType:(nullable NSString *)layoutType
                                 mode:(nullable NSString *)mode
                         recordTypeId:(nullable NSString *)recordTypeId
                           apiVersion:(nullable NSString *)apiVersion;

    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForObjectLayout(apiVersion: String?, objectAPIName: String?,
        formFactor: String?, layoutType: String?, mode: String?,
        recordTypeId: String?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForObjectLayout(
        String apiVersion, String objectAPIName, String formFactor,
        String layoutType, String mode, String recordTypeId)
    ```

## See Also

- [“Get Record Layout Metadata” in _User Interface API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_resources_record_layout.htm)
