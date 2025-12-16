# SOQL Query

Executes the given SOQL query and returns the requested fields of records that satisfy the query.

The `batchSize` parameter can range from 200 to 2,000 (default value) and is not guaranteed to be the actual size at runtime. By default, returns up to 2,000 records at once. If you specify a batch size, this request returns records in batches up to that size. Specifying a batch size does not guarantee that the returned batch is the requested size.

## Parameters

- API version (string, optional)
- Query (string)
- Batch size (integer)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.request(forQuery:apiVersion:batchSize:)
    ```

- Objective-C

  - :

    ```nolang
    - (SFRestRequest *)requestForQuery:(NSString *)soql
                            apiVersion:(nullable NSString *)apiVersion
                             batchSize:(NSInteger)batchSize;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    @Throws(UnsupportedEncodingException::class)
    fun getRequestForQuery(apiVersion: String?, q: String?): RestRequest
    ```

- Java

  - :

    ```java
    public static RestRequest
        getRequestForQuery(String apiVersion, String q)
        throws UnsupportedEncodingException

    public static RestRequest
        getRequestForQuery(String apiVersion, String q, int batchSize)
        throws UnsupportedEncodingException
    ```

## See Also

- [“Query” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_query.htm)
