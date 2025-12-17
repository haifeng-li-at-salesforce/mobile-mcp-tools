```java
val unauthenticatedRestClient = clientManager.peekUnauthenticatedRestClient()
val request = RestRequest(RestMethod.GET,
    "https://api.spotify.com/v1/search?q=James%20Brown&type=artist", null)
val response = unauthenticatedRestClient.sendSync(request)
```
