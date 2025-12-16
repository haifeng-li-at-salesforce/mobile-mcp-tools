# Code Modifications (Hybrid)

1.  (Android only) If your target platform is Android:

- For Mobile SDK 12.0 and later, [Add a Firebase Configuration File](https://firebase.google.com/docs/android/setup#add-config-file) as described in the Google Firebase docs. 
- For Mobile SDK 11.1 and prior, add an entry for `androidPushNotificationClientId`.In `assets/www/bootconfig.json`:

    ::include{src="../../shared/hybrid_android_push_json.md"}
    ::include{src="../../shared/android_push_client_id_value.md"}

2.  In your callback for `cordova.require("com.salesforce.plugin.oauth").getAuthCredentials()`, add the following code:

    ```nolang
    cordova.require("com.salesforce.util.push").registerPushNotificationHandler(
        function(message) {
            // add code to handle notifications
        },
        function(error) {
            // add code to handle errors
        }
    );
    ```

## Example

This code demonstrates how you might handle messages. The server delivers the payload in `message["payload"]`.

```nolang
function(message) {
    var payload = message["payload"];
    if (message["foreground"]) {
        // Notification is received while the app is in
        // the foreground
        // Do something appropriate with payload
    }
    if (!message["foreground"]) {
        // Notification was received while the app was in
        // the background, and the notification was clicked,
        // bringing the app to the foreground
        // Do something appropriate with payload
    }
}
```
