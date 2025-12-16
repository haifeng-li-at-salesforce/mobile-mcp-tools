# Supported REST Services

Mobile SDK REST APIs support the standard object operations offered by Salesforce Platform REST and SOAP APIs. For most operation types, a factory method or factory object creates a REST request object specifically for that operation. You send this request object to Salesforce using the Mobile SDK REST API and receive the response asynchronously.

After you’ve sent a request to Salesforce, the response arrives in your app asynchronously. To handle these responses, you can specify a callback delegate when you send the request, or define a closure (Swift only).

## Notification

Get a notification.

**Delegate Method**

- Swift

  - :
    ```swift
    RestClient.shared.request(forNotification:apiVersion:)
    ```

- Objective-C

  - :

    ```nolang

    - (SFRestRequest *)requestForNotification:(NSString *)notificationId apiVersion:(NSString *)apiVersion;

    ```

**Block Method**

Not available.

## Notifications Status

Get the status of a range of notifications, including unread and unseen count.

**Delegate Method**

- Swift

  - :

    ```swift
    RestClient.shared.request(forNotificationsStatus:)
    ```

- Objective-C

  - :

    ```objc
    - (SFRestRequest *)requestForNotificationsStatus:(NSString *)apiVersion;
    ```

**Block Method**

Not available.

## Notifications

Get the given number (maximum 20) of archived Notification Builder notifications based on the given “before” or “after” date. In Mobile SDK, use the Swift `FetchNotificationsRequestBuilder` object or the Objective-C `SFSDKFetchNotificationsRequestBuilder` to create GET requests for notifications.

**Delegate Method**

- Swift

  - :

    ```swift
    let builder = FetchNotificationsRequestBuilder.init()
    builder.setSize(10)
    builder.setBefore(Date.init())
    let request = builder.buildFetchNotificationsRequest(SFRestDefaultAPIVersion)
    ```

- Objective-C

  - :

    ```objc
    SFSDKFetchNotificationsRequestBuilder *builder =
        [[SFSDKFetchNotificationsRequestBuilder alloc] init];
    [builder setBefore: [NSDate date]];
    [builder setSize:10];
    SFRestRequest *fetchRequest =
        [builder buildFetchNotificationsRequest:kSFRestDefaultAPIVersion];
    ```

**Block Method**

Not available.

## Notifications Update

Update the “read” and “seen” statuses of a given set of Notification Builder notifications. In Mobile SDK, use the Swift `UpdateNotificationsRequestBuilder` object or the Objective-C `SFSDKUpdateNotificationsRequestBuilder` object to create update requests.

To update a single notification, set the `notificationId` property. To update a range of notifications, set either the `notificationIds` or the `before` property. These properties—`notificationId`, `notificationIds`, and `before`—are mutually exclusive.

**Delegate Method**

- Swift

  - :

    ```swift
    let builder = UpdateNotificationsRequestBuilder.init()
    builder.setBefore(Date.init())
    builder.setRead(true)
    builder.setSeen(true)
    let request = builder.buildUpdateNotificationsRequest(SFRestDefaultAPIVersion)
    ```

- Objective-C

  - :

    ```objc
    SFSDKUpdateNotificationsRequestBuilder *builder =
        [[SFSDKUpdateNotificationsRequestBuilder alloc] init];
    [builder setRead:true];
    [builder setSeen:true];
    [builder setBefore: [NSDate date]];
    SFRestRequest *updateRequest = [builder buildUpdateNotificationsRequest:kSFRestDefaultAPIVersion];
    ```

**Block Method**

Not available.

## Example

For sample calls, see `/libs/SalesforceSDKCore/SalesforceSDKCoreTests/SalesforceRestAPITests.m` at [github.com/forcedotcom/SalesforceMobileSDK-iOS](https://github.com/forcedotcom/SalesforceMobileSDK-iOS).

## See Also

- [Supported Salesforce APIs](ref-rest-api.md)
