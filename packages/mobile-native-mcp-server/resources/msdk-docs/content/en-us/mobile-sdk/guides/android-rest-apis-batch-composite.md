# Batch and Composite Requests

Batch and composite APIs pose special challenges, because they handle multiple requests in a single call. Mobile SDK classes take the pain out of building and configuring these complex requests.

## Batch and Composite Request Classes

- Request:

  - `BatchRequest`
  - `CompositeRequest`

- Builder:

  - `BatchRequestBuilder`
  - `CompositeRequestBuilder`

- Response:

  - `BatchResponse`
  - `CompositeRequestBuilder`

These classes make it easy to create batch and composite requests. To use them:

1.  Create a builder instance. For batch requests, you can optionally set `haltOnError` property to true:

    - Kotlin

      - :
        ::include{src="../../shared/kotlin_batchrequest_builder.md"}

    - Java
      - :
        ::include{src="../../shared/android_batchrequest_builder.md"}

    For composite requests, you can optionally set the `allOrNone` rollback property to true.

    - Kotlin

      - :
        ::include{src="../../shared/kotlin_compositerequest_builder.md"}

    - Java

      - :
        ::include{src="../../shared/android_compositerequest_builder.md"}

2.  As you create REST requests, add them to the builder object. For batch requests:

    - Kotlin

      - :
        ::include{src="../../shared/kotlin_batchrequest_builder_addrequest.md"}

    - Java

      - :
        ::include{src="../../shared/android_batchrequest_builder_addrequest.md"}

    With composite requests, you also provide a reference ID as described in the _REST API Developer Guide_. You specify this ID when you add the `RestRequest` object:

    - Kotlin

      - :
        ::include{src="../../shared/kotlin_batchrequest_builder_addrequest_refid.md"}

    - Java

      - :
        ::include{src="../../shared/android_batchrequest_builder_addrequest_refid.md"}

3.  When you’re ready, call the builder object’s build method:

    - Kotlin

      - :
        ::include{src="../../shared/kotlin_batchrequest_builder_build.md"}

    - Java

      - :
        ::include{src="../../shared/android_batchrequest_builder_build.md"}

    Each build method returns a specialized `RestRequest` object (`BatchRestRequest` or `CompositeRestRequest` instance) that you can send through the shared `RestClient.sendAsync()` method.

    :::tip

    To use an older API version as the default argument, pass a literal string in the format “v42.0”.

    :::

4.  Responses to batch and composite requests arrive as instances of the response class (`BatchResponse` or `CompositeResponse`).

## See Also

- [“Batch” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/requests_composite_batch.htm)
- [“Composite” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_composite_composite.htm)
