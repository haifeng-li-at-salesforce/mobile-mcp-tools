```bash
Task {
    let request = RestRequest(
        method: .GET,
        serviceHostType: .instance,
        path: "/v42.0/chatter/feeds/user-profile/me/feed-elements",
        queryParams: nil
    )

    do {
        let response = try await RestClient.shared.send(request: request)
        // Process the response
    } catch let error as RestClientError {
        SalesforceLogger.d(RootViewController.self,
            message: "Error invoking: \(request), \(error)")
    } catch {
        SalesforceLogger.d(RootViewController.self,
            message: "Unexpected error invoking: \(request),
            \(error.localizedDescription)")
    }
}
```
