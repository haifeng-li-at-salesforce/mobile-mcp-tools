# Configure the Login Endpoint

Finally, configure the app to use your Experience Cloud site login endpoint. The app’s mobile platform determines how you configure this setting.

## Android

In Android, login hosts are known as server connections. You can see the standard list of server connections in the `res/xml/servers.xml` file of the `SalesforceSDK` project. Mobile SDK uses this file to define production and sandbox servers.You can add your custom servers to the runtime list by creating your own `res/xml/servers.xml` file in your native Android project. The first server listed in your `servers.xml` file is used as the default login server at app startup. The root XML element for `servers.xml` is `<servers>`. This root can contain any number of `<server>` entries. Each `<server>` entry requires two attributes: `name` (an arbitrary human-friendly label) and `url` (the web address of the login server, including the “https://” prefix).

For example:

::include{src="../../shared/android_codesamp.md"}

## iOS

Before version 4.1, Mobile SDK apps for iOS defined their custom login URIs in the app’s Settings bundle. In Mobile SDK 4.1 and later, iOS apps lose the Settings bundle. Instead, you can use the `SFDCOAuthLoginHost` property in the app’s `info.plist` file to build in a custom login URI.

Customers can also set their own custom login hosts at runtime in your app. Here’s how:

::include{src="../../shared/ios_login_configuration.md"}
