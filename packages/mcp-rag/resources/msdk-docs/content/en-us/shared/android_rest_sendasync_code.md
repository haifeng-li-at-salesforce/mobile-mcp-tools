```java
private void sendFromUIThread(RestRequest restRequest) {
    client.sendAsync(restRequest, new AsyncRequestCallback() {
        private long start = System.nanoTime();
        @Override
        public void onSuccess(RestRequest request, final RestResponse result) {
        	// Consume before going back to main thread
        	// Not required if you don't do main (UI) thread tasks here
        	result.consumeQuietly();
        	runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    // Network component doesn’t report app layer status.
                    // Use the Mobile SDK RestResponse.isSuccess() method to check
                    // whether the REST request itself succeeded.
                    if (result.isSuccess()) {
                        try {
                            // Do something with the result
                        }
                        catch (Exception e) {
                            printException(e);
                        }
                        EventsObservable.get().notifyEvent(EventType.RenditionComplete);
                    }
                }
            });
        }
        @Override
        public void onError(Exception exception)
        {
            printException(exception);
            EventsObservable.get().notifyEvent(EventType.RenditionComplete);
        }
    });
}
```
