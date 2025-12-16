# Notification Update

Updates the “read” (if non-null) and “seen” (if non-null) statuses of the notification with the given ID.

## iOS

In iOS, use the Swift `UpdateNotificationsRequestBuilder` object or the Objective-C `SFSDKUpdateNotificationsRequestBuilder` object to create update requests.

Pass the notification’s ID to the `notificationId` property

- Swift

  - : <!-- TO DO: Test this-->

    ```nolang
    let builder = UpdateNotificationsRequestBuilder.init()
    builder.setNotificationId("<SOME_ID>")
    builder.setBefore(Date.init())
    builder.setRead(true)
    builder.setSeen(true)
    let request = builder.buildUpdateNotificationsRequest(SFRestDefaultAPIVersion)
    ```

- Objective-C

  - : <!-- TO DO: Test this-->

    ```nolang
    #import <SalesforceSDKCore/SFRestAPI+Notifications.h>
    ...

    SFSDKUpdateNotificationsRequestBuilder *builder =
        [[SFSDKUpdateNotificationsRequestBuilder alloc] init];
    [builder setNotificationId:"<SOME_ID>"]
    [builder setRead:true];
    [builder setSeen:true];
    [builder setBefore: [NSDate date]];
    SFRestRequest *updateRequest = [builder buildUpdateNotificationsRequest:kSFRestDefaultAPIVersion];
    ```

## Android

**Parameters**

- `apiVersion` (String)
- `notificationId` (String)
- `read` (Boolean)
- `seen` (Boolean)
<!-- -->
- Kotlin

  - :
    ```kotlin
    fun getRequestForNotificationUpdate(apiVersion: String?, notificationId: String?,
        read: Boolean?, seen: Boolean?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForNotificationUpdate(String apiVersion,
        String notificationId, Boolean read, Boolean seen)
    ```

## See Also

- [“Notification” in _Connect REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resource_notifications_specific.htm)
