# Notifications Update

Updates the “read” (if non-null) and “seen” (if non-null) statuses of notifications with the given IDs, or those sent before the given date.

## iOS

In iOS, use the Swift `UpdateNotificationsRequestBuilder` object or the Objective-C `SFSDKUpdateNotificationsRequestBuilder` object to create update requests.

To define the range of affected notifications, pass either an array of notification IDs or a “before” date. The ID array and “before” date are mutually exclusive parameters.

### Swift

<!-- prettier-ignore -->
```nolang
let builder = UpdateNotificationsRequestBuilder.init() 
// builder.setNotificationIds("<array_of_ids>") 
// OR 
// builder.setBefore(Date.init()) 
builder.setRead(true) 
builder.setSeen(true) 
let request = .
    builder.buildUpdateNotificationsRequest(SFRestDefaultAPIVersion)
```

### Objective-C

```nolang
#import <SalesforceSDKCore/SFRestAPI+Notifications.h>
...

SFSDKUpdateNotificationsRequestBuilder *builder =
    [[SFSDKUpdateNotificationsRequestBuilder alloc] init];
// [builder setNotificationIds:<ARRAY_OF_IDS>]
// OR
// [builder setBefore: [NSDate date]];
[builder setRead:true];
[builder setSeen:true];
SFRestRequest *updateRequest =
    [builder buildUpdateNotificationsRequest:kSFRestDefaultAPIVersion];
```

## Android

### Kotlin

```kotlin
fun getRequestForNotificationUpdate(apiVersion: String?, notificationId: String?,
    read: Boolean?, seen: Boolean?): RestRequest
```

### Java

Parameters:

- `apiVersion` (String)
- Either:

  - `notificationIds` (Array)

    OR

  - `before` (Date)

- `read` (Boolean)
- `seen` (Boolean)

```java
public static RestRequest getRequestForNotificationsUpdate(String apiVersion,
    List<String> notificationIds, Date before, Boolean read, Boolean seen)
```

## See Also

- [“Notifications” in _Connect REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_notifications_list.htm)
