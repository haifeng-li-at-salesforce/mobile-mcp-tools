# What's New in Mobile SDK 13.1

Mobile SDK 13.1 is a minor release that features client-side support for WebSockets, iOS 26 support with Liquid Glass compatibility, URLRequest support on iOS, Android 16 support, updates to QR code login, and enhancements for internal apps around actionable notifications and login with the Salesforce welcome domain.

In interim releases, we often deprecate items in native libraries for removal in an upcoming major release. Be sure to check your compiler logs for deprecation warnings so that you can address any changes before they go into effect.

:::important
A regression in Mobile SDK for Android 13.1 prevents push notifications from being delivered to Experience Cloud users. The issue is caused by a failed device registration process that occurs after a user authenticates to an Experience Cloud site.

- **Impact**: Users on Experience Cloud sites will not receive push notifications.
- **Resolution**: A permanent fix is in progress. Until it's released, we recommend one of the following options:
  - **Apply a patch**: If you plan to upgrade to version 13.1, apply the targeted fix available [on our GitHub repo](https://github.com/forcedotcom/SalesforceMobileSDK-Android/pull/2788).
  - **Delay the upgrade**: If your application uses push notifications for Experience Cloud users, do not upgrade to version 13.1 until the release containing the permanent fix is available.

:::

## General Updates in Mobile SDK 13.1

These changes apply to more than one platform.

### WebSockets Support

We added support for WebSockets, a bidirectional TCP connection that works with our authentication features and products like Agentforce Speech Foundation. See [Configure WebSockets](websocket-configuration.md).

### QR Code Login Updates

We fixed a bug that caused QR code login to fail when web server flow was disabled or a native browser was configured. We also implemented a check to ensure the consumer key in the QR code matches the one configured in the app.

### Internal Login with Welcome Domain

Internal apps can now log in with welcome.salesforce.com. The welcome login domain is not yet available to external apps.

### External Component Version Updates

- React 19.0.0
- React Native 0.79.3
- SQLite 3.50.4
- SQLCipher 4.10.0

## What's New in Mobile SDK 13.1 for iOS

See also: [General Updates in Mobile SDK 13.1](#general-updates-in-mobile-sdk-131).

### iOS 26 Compatibility

We've successfully tested Mobile SDK for compatibility with iOS 26, including Liquid Glass. See Apple's [iOS 26 Release Notes](https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-26-release-notes).

### URLRequest Support

Our REST client now supports direct network calls with URLRequest, which reduces the need for SFRestRequest conversions. Existing SFRestRequest interfaces are still fully supported.

### Removed APIs

See [iOS APIs Removed in Mobile SDK 13.1](reference-current-removed-ios.md).

### Deprecated APIs

Check your compiler warnings, or see [iOS Current Deprecations](reference-current-deprecations-ios.md).

## What's New in Mobile SDK 13.1 for Android

See also: [General Updates in Mobile SDK 13.1](#general-updates-in-mobile-sdk-131).

### Android 16 Compatibility

We successfully tested Mobile SDK for compatibility with Android 16. See [Android Version 16](android-requirements.md#android-version-16).

### Version Updates

- Cordova 14.0.1
- Gradle 8.14.2
- Android Gradle Plugin 8.10.0

### Removed APIs

See [Android APIs Removed in Mobile SDK 13.1](reference-current-removed-android.md).

### Deprecated APIs

Check your compiler warnings, or see [Android Current Deprecations](reference-current-deprecations-android.md).
