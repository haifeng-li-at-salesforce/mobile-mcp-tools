# Notifications Status

Get the status of the current user’s notifications, including unread and unseen count.

## Parameters

- API version (string)

## iOS

- Swift

  - : For the default `forNotificationsStatus` parameter, pass the API version string.

    ```swift
    RestClient.shared.request(forNotificationsStatus:)
    ```

- Objective-C

  - :
    ```nolang
    #import <SalesforceSDKCore/SFRestAPI+Notifications.h>
    ...
    - (SFRestRequest *)requestForNotificationsStatus:(NSString *)apiVersion;
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForNotificationsStatus(apiVersion: String?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForNotificationsStatus(String apiVersion)
    ```

## See Also

- [“Notifications Status” in _Connect REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_notifications_status.htm)
