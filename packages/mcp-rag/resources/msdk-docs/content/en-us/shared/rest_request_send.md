<!-- owner=MobileSDK,date="2019-10-31",repo=”SalesforceMobileSDK-Templates”,path=”/iOSNativeSwiftTemplate/iOSNativeSwiftTemplate/RootViewController.swift”,line=39,length=-->

```swift

let request = RestClient.shared.request(forQuery: "SELECT Name FROM Contact LIMIT 10")
RestClient.shared.send(request: request)
{ [weak self] (result) in
    switch result {
        case .success(let response):
            self?.handleSuccess(response: response, request: request)
        case .failure(let error):
            SalesforceLogger.d(RootViewController.self,
                message:"Error invoking: \(request) , \(error)")
    }
}

```
