# Create an External Client App

A Salesforce administrator creates external client apps on the Salesforce server. Salesforce external client apps (ECAs) include many settings that are used only by other mobile offerings such as the Salesforce app. The following steps cover the settings that apply to Mobile SDK apps.

To create an external client app:

1. From Setup, in the Quick Find box, enter **App Manager**, and then select **App Manager**.
2. Click **New External Client App**.
3. Under **Basic Information**, fill out the form as follows:
   - **External Client App Name**: (whatever you like; can contain spaces)
   - **API Name**: accept the suggested value
   - **Contact Email**: enter your email address
   - **Distribution State**: To develop an external client app for your local org, select **Local**. To develop an external client app for packaging and distribution, set the Distribution State to **Packaged**.
4. Under **API (Enable OAuth Settings)**, check **Enable OAuth Settings**.
5. Set **Callback URL** to any URL string, real or fictional, such as `mysampleapp://auth/success`. If autofill offers a suggestion, do not accept it. Instead, type in the callback URL.
6. Under **Available OAuth Scopes**, select:
   - Manage user data via APIs (`api`)
   - Manage user data via Web browsers (`web`)
   - Perform requests at any time (`refresh_token`, `offline_access`)
7. Click **Add**. This minimal set of scopes works well for most Mobile SDK apps.
8. Uncheck **Require Secret for Web Server Flow**.
9. Click **Create**.

## Configure an External Client App’s Push Notification Settings

To configure an ECA’s push notification settings, see:

- [Configure the External Client App’s Push Notification Settings and Policies for iOS](https://help.salesforce.com/s/articleView?id=sf.mobile_sdk_push_notifications_ios.htm&type=5)
- [Configure the External Client App’s Push Notification Settings and Policies for Android](https://help.salesforce.com/s/articleView?id=sf.mobile_sdk_push_notifications_android.htm&type=5)

## See Also

- _Salesforce Help_: [Create an External Client App](https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm&type=5)
