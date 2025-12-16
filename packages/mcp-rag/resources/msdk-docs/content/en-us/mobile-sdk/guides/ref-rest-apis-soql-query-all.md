# SOQL Query All

Executes the given SOQL string. The result includes all current and deleted objects that satisfy the query.

The `batchSize` parameter can range from 200 to 2,000 (default value) and is not guaranteed to be the actual size at runtime. By default, returns up to 2,000 records at once. If you specify a batch size, this request returns records in batches up to that size. Specifying a batch size does not guarantee that the returned batch is the requested size.

## Parameters

- API version (string, optional)
- Query (string)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.request(forQueryAll:apiVersion:)
    ```

- Objective-C

  - :
    ```nolang
    - (SFRestRequest *)requestForQueryAll:(NSString *)soql
                               apiVersion:(nullable NSString *)apiVersion;
    ```

## Android

Not supported.

## See Also

- [“QueryAll” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_queryall.htm)
