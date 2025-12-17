# Batch Request

Executes a batch of subrequests.

Returns a `RestRequest` object containing a batch of up to 25 subrequests specified in a list of `RestRequest` objects. Each subrequest counts against rate limits.

## Parameters

- `requests` (array/list)
- `haltOnError` (Boolean)
- `apiVersion` (string)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.batchRequest(requests:haltOnError:apiVersion:)
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest *) batchRequest:(NSArray<SFRestRequest *> *)requests
                         haltOnError:(BOOL)haltOnError
                          apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Java

  - :
    ```java
    public static BatchRequest getBatchRequest(String apiVersion, boolean haltOnError, List<RestRequest> requests) throws JSONException
    ```

## See Also

- [Batch and Composite Requests](ios-rest-apis-batch-composite.md) (iOS)
- [Batch and Composite Requests](android-rest-apis-batch-composite.md) (Android)
- [“Composite Batch” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_batch.htm)
