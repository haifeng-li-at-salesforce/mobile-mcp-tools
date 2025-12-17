# Hybrid Apps Quick Start

Hybrid apps give you the ease of JavaScript and HTML5 development while leveraging Salesforce Mobile SDK

:::important

In 2020, the App Store has removed `UIWebView` architecture from all app submissions in favor of `WKWebView`. As a result, Mobile SDK hybrid apps for iOS can run only on Mobile SDK 8.1 or later. See [Removing UIWebView from iOS Hybrid Apps](hybrid-uiwebview-removal.md).

:::

If you’re comfortable with the concept of hybrid app development, use the following steps to get going quickly.

1.  To develop Android hybrid apps for Mobile SDK 11.1, you need:

    - Cordova 12.0.1.
    - Cordova CLI 12.0.0 or later.

    ::include{src="../../shared/prereq.md"}

2.  To develop iOS hybrid apps for Mobile SDK 11.1, you need:

    - Cordova 7.0.1.
    - Cordova CLI 12.0.0 or later.

    ::include{src="../../shared/xcode.md"}

    ::include{src="../../shared/ios6.md"}

    - CocoaPods (any version from 1.8 to no declared maximum—see [cocoapods.org](https://cocoapods.org/)).

3.  Install Mobile SDK.
    - [Android Preparation](install-android.md)
    - [iOS Preparation](install-ios.md)
4.  If you don’t already have a connected app, see [Creating a Connected App](connected-apps-creating.md). For OAuth scopes, select `api`, `web`, and `refresh_token`.

    :::note

    When specifying the Callback URL, there’s no need to use a real address. Use any value that looks like a URL, such as `myapp:///mobilesdk/oauth/done`.

    :::

5.  Create a hybrid app.
    - Follow the steps at [Create Hybrid Apps](hybrid-ios.md). Use `hybrid_local` for the application type.
6.  Run your new app.

    - [Build and Run Your Hybrid App on Android](hybrid-run-android.md)
    - [Build and Run Your Hybrid App On iOS](hybrid-run-ios.md)
      .
