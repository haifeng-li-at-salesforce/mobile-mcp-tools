# Notifications

Gets the given number (maximum 20) of archived Notification Builder notifications based on the given “before” or “after” date.

## Parameters

- API version (string)
- Batch size (integer)
- Date before (date, optional)
- Date after (date, optional)

## iOS

In iOS, use the `FetchNotificationsRequestBuilder` object or the Objective-C `SFSDKFetchNotificationsRequestBuilder` to create GET requests for notifications.

- Swift

  - :
    ```nolang
    let builder = FetchNotificationsRequestBuilder.init()
    builder.setSize(10)
    builder.setBefore(Date.init())
    let request = builder.buildFetchNotificationsRequest(SFRestDefaultAPIVersion)
    ```

- Objective-C

  - :

    ```nolang
    #import <SalesforceSDKCore/SFRestAPI+Notifications.h>
    ...

    SFSDKFetchNotificationsRequestBuilder *builder =
        [[SFSDKFetchNotificationsRequestBuilder alloc] init];
    [builder setBefore: [NSDate date]];
    [builder setSize:10];
    SFRestRequest *fetchRequest =
        [builder buildFetchNotificationsRequest:kSFRestDefaultAPIVersion];
    ```

## Android

- Kotlin

  - :
    ```kotlin
    fun getRequestForNotifications(apiVersion: String?, size: Int?,
        before: Date?, after: Date?): RestRequest
    ```

- Java

  - :
    ```java
    public static RestRequest getRequestForNotifications(String apiVersion,
        Integer size, Date before, Date after)
    ```

## See Also

- [“Query” in _REST API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_query.htm)
