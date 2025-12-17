# Batch and Composite Requests

Batch and composite APIs pose special challenges, because they handle multiple requests in a single call. In Swift, Mobile SDK extensions reduce the pain of building and configuring these complex requests.

## Batch and Composite Request Classes

- Swift

  - :

    - ```nolang

         BatchRequest

      ```

    - ```nolang

         BatchRequestBuilder

      ```

    - ```nolang



             BatchResponse

      ```

    - ```nolang

           CompositeRequest

      ```

    - ```nolang

       CompositeRequestBuilder

      ```

    - ```nolang

      CompositeResponse

      ```

- Objective-C

  - :

    - ```nolang

          SFSDKBatchRequest

      ```

    - ```nolang

          SFSDKBatchRequestBuilder

      ```

    - ```nolang

          SFSDKBatchResponse

      ```

    - ```nolang

          SFSDKCompositeRequest

      ```

    - ```nolang

          SFSDKCompositeRequestBuilder

      ```

    - ```nolang

          SFSDKCompositeResponse

      ```

These classes make it easy to create batch and composite requests. To use them:

1.  Create a builder instance. For batch requests, you can optionally set `haltOnError` property to true:

    ```swift
    let builder = BatchRequestBuilder()
    // Optional; defaults to false
    builder.setHaltOnError(true)
    ```

    For composite requests, you can optionally set the `allOrNone` rollback property to true.

    ```swift
    let builder = CompositeRequestBuilder()
    // Optional; defaults to false
    builder.setAllOrNone(true)
    ```

2.  As you create REST requests, add them to the builder object.

    ```swift
    builder.add(request as! BatchRequest)
    ```

    With composite requests, you also provide a reference ID as described in the _REST API Developer Guide_. You can add a base `RestRequest` object and specify the reference ID explicitly:

    ```swift
    builder.add(request, referenceId)
    ```

    or add a `CompositeSubRequest` object, which is a `RestRequest`object that stores the reference ID internally:

    ```swift
    builder.add(request as! CompositeSubRequest)
    ```

3.  When you’re ready, call the builder object’s build method—`buildBatchRequest(_:)` or `buildCompositeRequest(_:)`. For example:

    ```swift
    let request = builder.buildBatchRequest(SFRestDefaultAPIVersion)
    ```

    Each build method returns a specialized `BatchRestRequest` or `CompositeRestRequest` object. You can send these objects through the shared `RestClient` instance.

    :::tip

    To use an older API version as the default argument, pass a literal string in the format “v42.0”.

    :::

4.  Responses to batch and composite requests arrive as instances of the response class (`BatchResponse` or `CompositeResponse`).

## See Also

- [“Batch” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite_batch.htm)
- [“Composite” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_composite.htm)
