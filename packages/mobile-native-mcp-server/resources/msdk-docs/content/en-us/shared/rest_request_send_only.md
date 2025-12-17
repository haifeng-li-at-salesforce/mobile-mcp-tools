<!-- owner=MobileSDK,date="2019-10-31",repo=”SalesforceMobileSDK-Templates”,path=”/iOSNativeSwiftTemplate/iOSNativeSwiftTemplate/RootViewController.swift”,line=39,length=-->

```swift

Task {
    do {
        let response = try await RestClient.shared.send(request: request)
        self?.handleSuccess(response: response, request: request)
    } catch let error as RestClientError {
        SalesforceLogger.d(
            RootViewController.self,
            message: "Error invoking: \(request), \(error)"
        )
    } catch {
        SalesforceLogger.d(
            RootViewController.self,
            message: "Unexpected error invoking: \(request),
            \(error.localizedDescription)"
        )
    }
}


```
