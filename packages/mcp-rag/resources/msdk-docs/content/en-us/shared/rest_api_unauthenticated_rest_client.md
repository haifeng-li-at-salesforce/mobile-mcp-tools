```java
RestClient unauthenticatedRestClient = clientManager.peekUnauthenticatedRestClient();
RestRequest request = new RestRequest(RestMethod.GET,
    "https://api.spotify.com/v1/search?q=James%20Brown&type=artist", null);
RestResponse response = unauthenticatedRestClient.sendSync(request);
```
