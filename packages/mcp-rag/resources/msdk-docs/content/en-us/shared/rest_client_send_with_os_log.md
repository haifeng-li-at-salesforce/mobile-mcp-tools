```nolang
RestClient.shared.send(request: request)
{ [weak self] (result) in
    switch result {
        case .success(let response):
            self?.handleSuccess(response: response, request: request)
        case .failure(let error):
            // SalesforceLogger.d(RootViewController.self,
            //    message:"Error invoking: \(request) , \(error)")
            os_log("\nError invoking: %@", log: .default, type: .debug, request)
    }
}
```
