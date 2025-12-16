# Create a Connected App

A Salesforce administrator creates connected apps on the Salesforce server. Salesforce connected apps include many settings that are used only by other mobile offerings such as the Salesforce app. The following steps cover the settings that apply to Mobile SDK apps.

To create a connected app:

1.  Log in to your Salesforce instance.
2.  From Setup, enter `Apps` in the Quick Find box, and then select **Apps**.
3.  Go to **External Client Apps**, and then select **Settings**.
4.  In the Connected Apps section, toggle **Allow creation of connected apps** to **On**.
5.  In the pop-up, select **Enable**.
6.  Select **New Connected App**.
7.  Perform steps for [Basic Information](#basic-information).
8.  Perform steps for [API (Enable OAuth Settings)](#api-enable-oauth-settings).
9.  If applicable, perform the optional steps for [Mobile App Settings](#mobile-app-settings).
10. Click **Save**.

If you plan to support push notifications, see [Push Notifications and Mobile SDK](push-intro.md) for additional connected app settings. You can add these settings later if you don’t currently have the necessary information.

After you create your connected app, be sure to copy the consumer key and callback URL for safekeeping. You use these values in Mobile SDK apps for OAuth configuration. To look them up later in Lightning Experience:

::include{src="../../shared/conn_app_lex_instrux.md"}
:::note

- For basic Mobile SDK apps, the callback URL doesn’t have to be a valid URL; it only has to match what the app expects in this field. You can use any custom prefix, such as `sfdc://`.
- To support advanced authentication, the callback URL must be a valid endpoint using your custom URI scheme.
- For IdP use cases, the callback URL must be a valid endpoint using the HTTPS protocol.
- The detail page for your connected app displays a consumer key. It’s a good idea to copy this key, as you’ll need it later.
- After you create a new connected app, wait a few minutes for the token to propagate before running your app.

:::

## Basic Information

Specify basic information about your Mobile SDK app in this section.

1.  Enter a connected app name and press Return. The name you enter must be unique among connected apps in your org and may contain spaces.

    :::note

    Salesforce automatically fills in the API Name field with a version of the name without spaces.

    :::

2.  Enter a contact email.

Other basic information fields are optional and are not used by Mobile SDK.

## API (Enable OAuth Settings)

1.  Select **Enable OAuth Settings**.
2.  Enter the callback URL (endpoint). Mobile SDK uses this URL to call back to your application during authentication. This value must match the OAuth redirect URI specified in your app’s project configuration.
3.  For Selected OAuth Scopes, select **Access and manage your data (api)**, **Perform requests on your behalf at any time (refresh_token, offline_access)**, and **Provide access to your data via the Web (web)**.
4.  To support Mobile SDK apps that perform authentication through the device’s native browser, deselect **Require Secret for Web Server Flow**.

## Mobile App Settings

Most settings in this section are not used by Mobile SDK. Here are the exceptions.

1.  To support PIN protection, select **PIN Protect**.
2.  To support push notifications, select **Push Messaging Enabled**. You can find instructions for this section at [Step 2: Creating a Connected App](https://developer.salesforce.com/docs/atlas.en-us.pushImplGuide.meta/pushImplGuide/pns_create_connected_app_overview.htm) in the _Salesforce Mobile Push Notifications Implementation Guide_.

## See Also

- [Create a Connected App](https://help.salesforce.com/articleView?id=connected_app_create.htm) in _Salesforce Help_.
- [Scope Parameter Values](oauth-scope-parameter-values.md)
