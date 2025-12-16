# Composite Request

Returns a RestRequest object that you then use to execute the composite request.

:::note

Regardless of the number of subrequests, each composite request counts as one API call.

:::

## Parameters

- `apiVersion` (string)
- `requests`

  - iOS

    - `requests` (array)—Array of subrequests
    - `refIds` (array)—Array of reference IDs for the requests. The number of elements should match the number of requests.

  - Android

    - `refIdToRequests` (map)— `LinkedHashMap` of reference IDs to `RestRequest` objects. Requests are played in the order in which they’re mapped.

- `allOrNone` (Boolean)—Flag that indicates whether to treat all requests as a single transactional block in error conditions.

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.compositeRequest(requests:refIds:allOrNone:apiVersion:)
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest *)compositeRequest:(NSArray<SFRestRequest *> *) requests
                                 refIds:(NSArray<NSString *> *)refIds
                              allOrNone:(BOOL)allOrNone
                             apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    @Throws(JSONException::class)
    fun getCompositeRequest(apiVersion: String?, allOrNone: Boolean,
    refIdToRequests: LinkedHashMap<String?, RestRequest?>): CompositeRequest
    ```

- Java

  - :
    ```java
    public static CompositeRequest getCompositeRequest(String apiVersion,
        boolean allOrNone, LinkedHashMap<String, RestRequest> refIdToRequests)
        throws JSONException
    ```

## See Also

- [Batch and Composite Requests](ios-rest-apis-batch-composite.md) (iOS)
- [Batch and Composite Requests](android-rest-apis-batch-composite.md) (Android)
- [“Composite” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_composite.htm)
