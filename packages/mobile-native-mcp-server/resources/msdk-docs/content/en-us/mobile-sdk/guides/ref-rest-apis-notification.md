# Notification

Fetches a single notification by its notification ID.

## Parameters

- API version (string)
- Notification ID (string)

## iOS

- Swift

  - :
    ```swift
    RestClient.shared.request(forNotification:apiVersion:)
    ```

- Objective-C

  - :

    ```nolang
    #import <SalesforceSDKCore/SFRestAPI+Notifications.h>
    ...
    - (SFRestRequest *)requestForNotification:(NSString *)notificationId apiVersion:(NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForNotification(apiVersion: String?, notificationId: String?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForNotification(String apiVersion, String notificationId)
    ```

## See Also

- [“Notification” in _Connect REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resource_notifications_specific.htm)
