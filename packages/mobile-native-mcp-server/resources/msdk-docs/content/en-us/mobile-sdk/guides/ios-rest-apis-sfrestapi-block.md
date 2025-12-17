# SFRestAPI (Blocks) Category

For receiving and handling REST API responses, you can use inline code blocks instead of a delegate class. This alternative Objective-C approach lets you send a request and handle its asynchronous response in a single method call.

Mobile SDK for native iOS provides block methods for single requests, composite requests, and batch requests. When you use these methods, you provide block arguments to handle success and failure responses. Mobile SDK forwards the asynchronous response to your success or failure block according to the response’s network status.

Block methods and associated typedefs are defined in the [`SFRestAPI (Blocks)`](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/blob/master/libs/SalesforceSDKCore/SalesforceSDKCore/Classes/RestAPI/SFRestAPI%2BBlocks.h) category as follows:

```nolang
// Sends a single request you've already built, using blocks to return status.
- (void) sendRequest:(SFRestRequest *)request
        failureBlock:(SFRestRequestFailBlock)failureBlock
        successBlock:(SFRestResponseBlock)successBlock
        NS_REFINED_FOR_SWIFT;

// Sends a composite request you've already built, using blocks to return status.
- (void) sendCompositeRequest:(SFSDKCompositeRequest *)request
                 failureBlock:(SFRestRequestFailBlock)failureBlock
                 successBlock:(SFRestCompositeResponseBlock)successBlock
                 NS_REFINED_FOR_SWIFT;

// Sends a batch request you've already built, using blocks to return status.
- (void) sendBatchRequest:(SFSDKBatchRequest *)request
             failureBlock:(SFRestRequestFailBlock)failureBlock
             successBlock:(SFRestBatchResponseBlock)successBlock
             NS_REFINED_FOR_SWIFT;
```

Each `send` method requires two blocks:

- Failure Block

  - : A failure block can receive timeout, cancellation, or error failures.

    - Block type:

      ```nolang
      typedef void (^SFRestRequestFailBlock) (id _Nullable response,
          NSError * _Nullable e, NSURLResponse * _Nullable rawResponse)
          NS_SWIFT_NAME(RestRequestFailBlock);
      ```

    - Response type: `NSError`

### Success Block

Block type and response type depend on the request type as follows:

- Single Request

  - :

    - Response type: `NSArray` or `NSData` object, depending on the data returned.
    - Block types (use the appropriate template for your request’s return type):

      ```nolang
      typedef void (^SFRestDictionaryResponseBlock) (NSDictionary * _Nullable dict,
          NSURLResponse * _Nullable rawResponse)
          NS_SWIFT_NAME(RestDictionaryResponseBlock);

      // Use this block when you request API versions
      typedef void (^SFRestArrayResponseBlock) (NSArray * _Nullable arr,
          NSURLResponse * _Nullable rawResponse)
          NS_SWIFT_NAME(RestArrayResponseBlock);
      ```

- Composite Request

  - :

    - Block type:

      ```nolang
      typedef void (^SFRestCompositeResponseBlock) (SFSDKCompositeResponse *response,
          NSURLResponse * _Nullable rawResponse)
          NS_SWIFT_NAME(RestCompositeResponseBlock);
      ```

    - Response type: [`SFSDKCompositeResponse`](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/blob/master/libs/SalesforceSDKCore/SalesforceSDKCore/Classes/RestAPI/SFSDKCompositeResponse.h)

- Batch Request

  - :

    - Block type:

      ```nolang
      typedef void (^SFRestBatchResponseBlock) (SFSDKBatchResponse *response,
          NSURLResponse * _Nullable rawResponse) NS_SWIFT_NAME(RestBatchResponseBlock);
      ```

    - Response type: [`SFSDKBatchResponse`](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/blob/master/libs/SalesforceSDKCore/SalesforceSDKCore/Classes/RestAPI/SFSDKBatchResponse.h)

## Send a Request Using Blocks

To send a request using a block method:

1.  Create the `SFRestRequest` object that fits your needs.

    - For a single request:

      - Create your `SFRestRequest` object by calling the appropriate [`SFRestAPI` factory method](ref-rest-api.md#topic-title).
      - Send your request. The following example handles any request that returns an `NSDictionary` response:

        ```nolang
        - (void)sendRequestForDictionary:(SFRestRequest *)request {
            // Block to handle failure
            SFRestRequestFailBlock failBlock = ^(id response, NSError *error, NSURLResponse *rawResponse) {
                // Do as you wish with the error information
                //...
            };

            // Block to handle success
            SFRestDictionaryResponseBlock completeBlock = ^(NSDictionary *data, NSURLResponse *rawResponse) {
                // Process the dictionary data
                //...
            };

            // Send the request to Salesforce along with your success and failure blocks
            [[SFRestAPI sharedGlobalInstance] sendRequest:request
                                                    failureBlock:failBlock
                                                successBlock:completeBlock];
        ...
        }
        ```

    - For batch and composite requests:

      1.  For each subrequest, create an `SFRestRequest` object by calling an appropriate factory method.
      2.  To create the `SFRestRequest` object that you send to Salesforce, pass an array of your subrequest objects to the batch or composite factory method. See [SFRestAPI.h](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/blob/master/libs/SalesforceSDKCore/SalesforceSDKCore/Classes/RestAPI/SFRestAPI.h) for more information.

          ```nolang
          // Batch request factory method
          - (SFRestRequest *) batchRequest:(NSArray<SFRestRequest *> *)requests
                               haltOnError:(BOOL)haltOnError
                                apiVersion:(nullable NSString *)apiVersion;

          // Composite request factory method
          - (SFRestRequest *)compositeRequest:(NSArray<SFRestRequest *> *) requests
                                       refIds:(NSArray<NSString *> *)refIds
                                    allOrNone:(BOOL)allOrNone
                                   apiVersion:(nullable NSString *)apiVersion;
          ```

2.  Design your success block to handle the expected data.
3.  Design your failure block to handle the issue gracefully.
4.  Pass the `SFRestRequest` object you created in step 1, and your success and failure blocks, to the appropriate `send` block method.

:::note

- For Swift, Mobile SDK refines the Objective-C block methods to funnel the REST response into a single Swift completion closure. See [Handling REST Responses](ios-rest-apis-sfrestdelegate.md).
- In Objective-C, judicious use of blocks and delegates can help fine-tune your app’s readability and ease of maintenance. Ideal conditions for using blocks often correspond to those that mandate inline functions in C++ or anonymous functions in Java. Ultimately, you make a judgment call based on your own requirements.

:::
