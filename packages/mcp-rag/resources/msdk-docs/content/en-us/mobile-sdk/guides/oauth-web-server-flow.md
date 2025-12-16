# OAuth 2.0 Web Server Flow

Beginning in Mobile SDK 11.0, OAuth 2.0 Web Server Flow is the default authentication flow. Upon upgrading to Mobile SDK 11.0, you do not need to make any changes in your client application. However, make sure the “Require Secret for Web Server Flow” checkbox is deselected in your connected app.

Prior to Mobile SDK 11.0, an intermediary authorization screen prompts the user to approve or deny the authorization request on each login attempt. With the upgrade to Web Server Flow in 11.0, this screen is shown only the first time a user authorizes the connected app (assuming the app is configured to allow the user to self-authorize). This behavior change is unlikely to impact day-to-day use, but it could impact areas such as automated tests, should they be written to anticipate this intermediary screen in the login flow.

For more information on using Web Server Flow, visit [OAuth 2.0 Web Server Flow for Web App Integration](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_web_server_flow.htm&type=5).

## Opting Out for User-Agent Flow

To opt out of your Web Server Flow in Mobile SDK 11.0 and on, you can revert to [User-Agent Flow](oauth-useragent-flow.md) in the `SalesforceSDKManager`.

- Android

  - :

    ```java
    SalesforceSDKManager.getInstance().setUseWebServerAuthentication(false)
    ```

- iOS

  - : Swift

    ```swift
    SalesforceManager.shared.useWebServerAuthentication = false
    ```

    Objective-C

    ```objc
    [SalesforceSDKManager sharedManager].useWebServerAuthentication = NO;
    ```
