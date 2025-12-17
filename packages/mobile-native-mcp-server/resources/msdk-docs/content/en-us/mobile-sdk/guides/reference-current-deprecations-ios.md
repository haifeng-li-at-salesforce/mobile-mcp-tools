# iOS Current Deprecations

These lists show currently deprecated Mobile SDK objects and artifacts for iOS, as annotated in the source files. Use this information to prepare for the removal of these artifacts in the release indicated.

<!-- The easiest way to update this doc is to sync your local SalesforceMobileSDK-iOS repo to the desired branch (getting latest or an appropriate tag), open SalesforceMobileSDK.xcworkspace, and then search the workspace for calls to the SFSDK_DEPRECATED macro.-->

## RestClient.swift

We deprecated completion-based methods in 13.0 for removal in 14.0. Use the asynchronous equivalents instead.

| Deprecated Method                                                                | Asynchronous Equivalent                                                       |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `send(request:completionBlock:)`                                                 | `send(request:) async throws`                                                 |
| `send(compositeRequest:completionBlock:)`                                        | `send(compositeRequest:) async throws`                                        |
| `send(batchRequest:completionBlock:)`                                            | `send(batchRequest:) async throws`                                            |
| `fetchRecords(ofModelType:forRequest:withDecoder:completionBlock:)`              | `fetchRecords(ofModelType:forRequest:withDecoder:) async throws`              |
| `fetchRecords(ofModelType:forQuery:withApiVersion:withDecoder:completionBlock:)` | `fetchRecords(ofModelType:forQuery:withApiVersion:withDecoder:) async throws` |
