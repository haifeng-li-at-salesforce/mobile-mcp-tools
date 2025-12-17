```java
private fun sendFromUIThread(restRequest: RestRequest) {
    client.sendAsync(restRequest, object : AsyncRequestCallback {
        private val start = System.nanoTime()
        override fun onSuccess(request: RestRequest, result: RestResponse) {
            // Consume before going back to main thread
            // Not required if you don't do main (UI) thread tasks here
            result.consumeQuietly()
            runOnUiThread {
                // Network component doesn’t report app layer status.
                // Use the Mobile SDK RestResponse.isSuccess() method to check
                // whether the REST request itself succeeded.
                if (result.isSuccess) {
                    try {
                        // Do something with the result
                    } catch (e: Exception) {
                        printException(e)
                    }

                    EventsObservable.get().notifyEvent(EventType.RenditionComplete)
                }
            }
        }

        override fun onError(exception: Exception) {
            printException(exception)
            EventsObservable.get().notifyEvent(EventType.RenditionComplete)
        }
    })
}
```
