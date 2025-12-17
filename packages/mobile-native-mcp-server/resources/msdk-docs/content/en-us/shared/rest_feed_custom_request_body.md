```bash
if let dataString = "{\"body\" : {\"messageSegments\" : [{\"type\" : \"Text\", " +
 "\"text\" : \"Some Comment\"}]}, \"feedElementType\":\"FeedItem\", " +
 "\"subjectId\":\"me\"}" if let data = dataString.data(using: .utf8) {
    let request = RestRequest(
        method: .POST,
        serviceHostType: .instance,
        path: "/v42.0/chatter/feed-elements",
        queryParams: nil
    )
    request.setCustomRequestBodyData(data, contentType: "application/json")


    Task {
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
}

```
