# Native Login for Experience Cloud

Starting in Mobile SDK 12.0, apps built for Experience Cloud users can use a fully customizable login UI with native login. The app supplies a custom-designed login UI, and Mobile SDK displays it at the appropriate point in the login flow. There are no restrictions on how you can customize the login UI.

:::note
PKCE is a requirement for native login on Experience Cloud. See [PKCE](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_pkce.htm&type=5) in Salesforce Help.
Also, IDP flows aren’t available for users who authenticated using native login.
  :::

## Preliminary Setup

Before you configure native login on Mobile SDK, complete these steps.

1. Set up Headless Identity. See [Headless Identity APIs for Customers and Partners](https://help.salesforce.com/s/articleView?id=sf.headless_identity_customers_overview.htm&type=5) in Salesforce Help.
2. Configure a connected app for the authorization code and credentials flow.
3. For the connected app’s callback URL, enter `https://{your_Experience_Cloud_site_domain}/services/oauth2/echo`.

## Set Up Native Login on iOS

To enable native login on iOS, add this code to your `AppDelegate`. Or, the app can call the same function from `SceneDelegate`, which provides a scene that enables multi-window support.

```
SalesforceManager.shared.useNativeLogin(
  withConsumerKey: clientId, 
  callbackUrl: redirectUri, 
  communityUrl: loginUrl, 
  nativeLoginViewController: 
  vc, scene: nil)
```

### Customize Native Login on iOS

To authenticate a user with username and password, call this code in your custom UI.

```
let result = await SalesforceManager.shared.nativeLoginManager().login(
  username: username, password: password)
```

To fall back on the webview for authentication, call this code in your custom UI.

```
SalesforceManager.shared.nativeLoginManager().fallbackToWebAuthentication()

```

To generate a sample application with a native login screen written in SwiftUI, use the `forceios` command-line tool to run this command.

```
forceios createwithtemplate —templaterepouri=iOSNativeLoginTemplate

```

To set up passwordless login with a one-time password, see [Native Passwordless Login](native-login-passwordless.md).

## Set Up Native Login on Android

To enable native login on Android, pass your app’s native-login activity class into the fourth parameter of the `SalesforceManager.initNative method`.

In the `onCreate` of the app’s application class, call this method.

```
SalesforceSDKManager.getInstance().useNativeLogin(clientId, redirectUri, loginUrl)

```

### Customize Native Login on Android

To authenticate a user with their username and password, call this code in your custom UI.

```
val result = SalesforceSDKManager.getInstance()
.nativeLoginManager.login(username, password)
```

:::note
The calling activity is responsible for dismissing itself after a successful user login.
:::

To fall back on the webview for authentication, launch the intent provided by this code in such a way as to [get back a result](https://developer.android.com/training/basics/intents/result).

```
SalesforceSDKManager.getInstance()
.nativeLoginManager.getFallbackWebAuthenticationIntent()

```

A result code of `Activity.RESULT_OK` means the user has successfully authenticated via the webview and you can dismiss your activity.

To generate a sample application with a native login screen created with Jetpack Compose, use the `forcedroid` command-line tool to run this command.

```
forcedroid createwithtemplate —templaterepouri=AndroidNativeLoginTemplate
```

To set up passwordless login with a one-time password, see [Native Passwordless Login](native-login-passwordless.md).


:::important
We recommend protecting your login UI from screenshots and video recording with the [FLAG_SECURE](https://developer.android.com/about/versions/14/features/screenshot-detection#control-capture-ability) display flag.
:::
