```java
val ownedFilesRequest = FileRequests.ownedFilesList(null, null)
val client = this.client
client?.sendAsync(ownedFilesRequest, object : AsyncRequestCallback {
// Do something with the response
})
```
