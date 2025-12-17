# What Was New in Recent Releases

Here’s an archive of What’s New bulletins from recent Mobile SDK releases.

## Mobile SDK 13.0.2

Mobile SDK 13.0.2 fixes a bug found in version 13.0, which inadvertently logged some users out after they upgraded their app from version 11.0 or older.

## Mobile SDK 13.0.1

Mobile SDK 13.0.1 is a minor patch release that features these changes.

### Android

- We now fetch `userIdentity`, whereas in Mobile SDK 13.0 we didn't.
- We improved the readability of status bar icons when the device theme and dynamic login color differ.

### iOS

- To resolve a naming conflict in `NewLoginHostView`, we renamed `label` to `hostName`.
- We fixed a bug that caused the Add Connection host URL to display incorrectly when it includes a scheme.

## Mobile SDK 13.0

Mobile SDK 13.0 is a major release that features user experience improvements on Android and iOS, asynchronous REST API requests, REST wrappers for SFAP APIs, and SmartStore support for several SQLCipher editions.

In major releases, we typically remove items that have been deprecated. To learn about new features and breaking changes that can affect your app, read the rest of this article. In every release, be sure to check your compiler logs for deprecation warnings so that you can address these changes before they go into effect.

### General Updates

These changes apply to more than one platform.

#### Receive Logs with LogReceiver

You can now receive logs with LogReceiver. See [Receiving Logs with LogReceiver](analytics-logging-logreceiver.md).

#### SmartStore Support for SQLCipher Editions

Smartstore now supports SQLCipher Commercial, Enterprise, and Enterprise FIPS. See [Using SQLCipher with SmartStore](offline-smartstore-sqlcipher.md).

#### External Component Version Updates

- React Native: 0.74.7

### iOS

See also: _General Updates in Mobile SDK 13.0_

#### Add Connection Screen Redesign

We redesigned the Add Connection screen for better accessibility.

**Note:** The updated screen comes with new localizable strings. If your app supports localization, see our updated list of [`Localizable.strings`](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/blob/dev/shared/resources/SalesforceSDKResources.bundle/en.lproj/Localizable.strings) on GitHub and localize the latest additions.

#### Asynchronous REST API Requests

We updated the way REST API requests are handled in the `RestClient` class.

- To streamline error handling, we replaced the callback-based patterns used in previous versions with Swift's asynchronous concurrency model.
- We refactored our network requests to use `async` and `await` methods instead of completion handlers.
- We're deprecating completion-based methods in favor of `async` and `await` methods. See [iOS Current Deprecations](reference-current-deprecations-ios.md).

#### REST Wrappers for SFAP APIs

We introduced REST wrappers for SFAP APIs in the `SfapApiClient` class. SFAP requires JWT-based access tokens, which we now support. See [REST Wrappers for SFAP APIs](sfap-rest-wrappers.md).

#### Hybrid Remote Application Session Management

In hybrid remote applications, we now use session IDs, sourced from the login and refresh token endpoints, to load the app's start page. This replaces the behavior in previous versions, which relied on a frontdoor URL to establish a UI session.

**Note:** This feature requires hybrid authentication, which is enabled by default. To verify the hybrid authentication setting, ensure that the `useHybridAuthentication` property in `SalesforceSDKManager` is set to `true`.

#### Version Updates

- Deployment target: 17
- Base SDK version: 18
- Xcode: 16

#### Removed APIs

See [iOS APIs Removed in Mobile SDK 13.0](reference-current-removed-ios.md).

#### Deprecated APIs

Check your compiler warnings, or see [iOS Current Deprecations](reference-current-deprecations-ios.md).

### Android

See also: _General Updates in Mobile SDK 13.0_

#### Login Redesign

We redesigned the login experience on Android. The redesign features a modernized architecture that uses Jetpack Compose and Model-View-ViewModel (MVVM), and these general changes.

- On the login screen, the top and bottom native elements now match the login `WebView` background by default.
- You can now customize the login screen in `LoginViewModel` without subclassing `LoginActivity`.
- You can now use the login server picker without leaving the login screen.
- For apps that exclusively use advanced authentication, we added a single-server Custom Tab login option that bypasses the standard `WebView`.
- The user account switcher is now a bottom sheet that displays over the host app.

See also:

- [Customizing the Android Login Screen Programmatically](auth-customize-login-android.md)
- [Migrating to Modern Android Login](auth-login-android-migrate.md)

**Note:** The login redesign introduces new localizable strings. If your app supports localization, see our updated list of [`sf__strings.xml`](https://github.com/forcedotcom/SalesforceMobileSDK-Android/blob/dev/libs/SalesforceSDK/res/values/sf__strings.xml) on GitHub and localize the latest additions.

#### Version Updates

- Android SDK (min API): 28
- Android SDK (target API): 35
- Default SDK version for hybrid apps: 35

#### Removed APIs

See [Android APIs Removed in Mobile SDK 13.0](reference-current-removed-android.md).

#### Deprecated APIs

Check your compiler warnings, or see [Android Current Deprecations](reference-current-deprecations-android.md).

## Mobile SDK 12.2

Mobile SDK 12.2 is a minor release that features QR code login, visionOS support, refresh behavior enhancements, and modernized support for iOS and Android.

In interim releases, we often deprecate items in native libraries for removal in an upcoming major release. Be sure to check your compiler logs for deprecation warnings so that you can address any changes before they go into effect.

### General Updates

These changes apply to more than one platform.

#### External Component Version Updates 

- React Native: 0.74.5

#### Single Access UI Bridge API

When displaying a Salesforce UI in a webview or external browser without requiring users to reenter their credentials, we now use the Single Access UI Bridge API (UI Bridge API for short) to construct the frontdoor URL, which was previously constructed manually. See also:

- [Supported Salesforce APIs](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/ref-rest-api.html)

- [_Salesforce Help_: Generate a Frontdoor URL to Bridge into UI Sessions. ](https://help.salesforce.com/s/articleView?id=sf.frontdoor_singleaccess.htm&type=5)

#### QR Code Login

With the help of Apex classes, Visualforce Pages, UI Bridge API, and new Mobile SDK methods, we can now log users in with a QR code. To learn more about QR code login and how to set it up, see:

- [QR Code Login with Single Access UI Bridge API](qrcode-login.md)
- [QR Code Login Prerequisites](qrcode-login-prereqs.md)
- [QR Code Login for Android](qrcode-login-android.md)
- [QR Code Login for iOS](qrcode-login-ios.md)

#### Refresh Behavior Enhancements

We enhanced our token refresh behavior for 403 (`Bad_OAuth_Token`) responses. Where apps previously managed a 403 response by performing a preliminary REST call to update the access token, we now refresh the token automatically.

The new refresh behavior impacts the `/service/oauth2` endpoint and helps with our new REST wrapper for [UI Bridge API](#single-access-ui-bridge-api).

### iOS

See also: _General Updates in Mobile SDK 12.2_

#### iOS 18 Compatibility 

We successfully tested Mobile SDK for compatibility with iOS 18 and XCode 16. See Apple’s [iOS 18 Release Notes](https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-18-release-notes).

#### visionOS Support

We added support for visionOS. See [Add visionOS as a supported destination for your app](https://developer.apple.com/documentation/visionos/bringing-your-app-to-visionos/#Add-visionOS-as-a-supported-destination-for-your-app) in Apple’s documentation.

#### Deprecated APIs 

Check your compiler warnings, or see [iOS Current Deprecations](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/reference-current-deprecations-ios.html).

### Android 

See also: _General Updates in Mobile SDK 12.2_

#### Version Updates 

- Android Gradle Plugin: 8.6.1

#### Login Screen Bug Fix and Breaking Change

We fixed a bug that sometimes caused the login screen to relaunch after a successful authentication.

:::important
This bug fix introduced a breaking change. If your app overrides LoginActivity or uses advanced authentication, change the launch mode from 'singleTop' to 'singleTask'. 
:::

#### Android 15 Compatibility 

We successfully tested Mobile SDK for compatibility with Android 15. See [Android Version 15](https://developer.android.com/about/versions/15).

Note: Apps that target SDK 35 on Android 15 now display edge-to-edge. To change the color of the status bar, override the `sf__api_35_status_bar_color` resource.

#### Hybrid Remote Application Session Management 

In hybrid remote applications, we now use session IDs, sourced from the login and refresh token endpoints, to load the app’s start page. This replaces the behavior in previous versions, which relied on a frontdoor URL to establish a UI session.

Note: This feature requires hybrid authentication, which is enabled by default. To verify the hybrid authentication setting, verify that the `useHybridAuthentication` property in `SalesforceSDKManager` is set to `true`.

#### Deprecated APIs

Check your compiler warnings, or see [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm).

## Mobile SDK 12.1.1

Mobile SDK 12.1.1 is a minor patch release that features these changes.

- We fixed a bug that cleared user account fields locally when some users logged in immediately after logout.
- SQLCipher upgrade: 4.6.1 (iOS and Android)
- SQLite upgrade: 3.46.1
- Google Lifecycle upgrade: 2.8.4 (Android)

## Mobile SDK 12.1

Mobile SDK 12.1.0 is a minor release that introduces user-registration and password-reset flows to the native login suite for Experience Cloud.

### Native User Registration and Password Reset

We added user-registration and password-reset support for Experience Cloud sites, which means you can now fully customize the UI for these flows.

- [Native User Registration](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/native-login-registration.html)

- [Native Password Reset](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/native-login-password-reset.html)

### External Component Version Updates 

- SQLCipher: 4.6.0 (iOS and Android)

- React Native: 0.74.3

### iOS

See also: _General Updates in Mobile SDK 12.1_.

#### Version Updates

- Cordova: 7.1.1

### Android

See also: _General Updates in Mobile SDK 12.1_.

#### Version Updates 

- Cordova: 13.0.0

- Gradle: 8.7.0

## Mobile SDK 12.0.1

Mobile SDK 12.0.1 is a minor patch release that features these changes.

- We updated our privacy manifests so that they’re compatible with the latest changes in Static Analyzer.
- We fine-tuned access modifiers on classes recently migrated from Java to Kotlin to ensure compatibility for the apps that extend them.
- We upgraded to SQLCipher 4.5.7, which comes with privacy manifests. See the 4.5.7 release notes from [SQLCipher](https://www.zetetic.net/blog/2024/04/24/sqlcipher-4.5.7-release/).

## Mobile SDK 12.0

Mobile SDK 12.0 is a major release that provides native login support for Experience Cloud, including passwordless login. In 12.0, we’re also changing the cipher mode used for encrypting push notifications on the server.

In major releases, we typically remove items that have been deprecated. To learn about new features and breaking changes that can affect your app, read the rest of this article. In every release, be sure to check your compiler logs for deprecation warnings so that you can address these changes before they go into effect.

### General Updates

These changes apply to more than one platform.

#### Native Login

We added native login support for Experience Cloud sites, including passwordless login. See also:

- [Native Login for Experience Cloud](native-login-experience-cloud.md)
- [Native Passwordless Login](native-login-passwordless.md)

#### Encrypted Push Notifications Change

Starting in Summer 2024, we use a new cipher mode for encrypting push notifications on the server.

- The server only understands the new cipher mode after Summer 2025.
- Mobile apps using Mobile SDK 12.0 can handle both the legacy and new cipher mode.
- To keep using encrypted push notifications, upgrade your mobile apps to Mobile SDK 12.0 (or a later version) before Summer 2025.

#### External Component Version Updates

- SQLCipher: 4.5.6
- SQLite: 3.44.2
- sf (previously sfdx): v2
- React Native: 0.73.6

### iOS

See also: _General Updates in Mobile SDK 12.0_

#### Privacy Manifests

We included privacy manifests in all of our libraries and upgraded our dependencies to a version that includes privacy manifests. See Apple’s documentation on privacy manifest files: https://developer.apple.com/documentation/bundleresources/privacy_manifest_files.

#### Login Updates

- We added configurable URL handling for login, which allows apps to control how links on the login screen are handled. For example, a phone number on the login screen can be configured to launch the device’s phone application.
- We fixed a bug that caused the biometric authentication opt-in status to be reset on login.

#### Version Updates

- Deployment target: 16
- Base SDK version: 17
- Xcode: 15

#### External Component Version Updates

- Cordova for iOS: 7.1.0
- FMDB: 2.7.10

#### Removed APIs

See [iOS APIs Removed in Mobile SDK 12.0](reference-current-removed-ios.md).

#### Deprecated APIs

Check your compiler warnings, or see [iOS Current Deprecations](reference-current-deprecations-ios.md).

### Android

See also: _General Updates in Mobile SDK 12.0_

#### Firebase Cloud Messaging (FCM) Upgrade

We upgraded FCM to version 23.3.1. For apps that use Android or Hybrid push notifications, `google-services.json` replaces `androidPushNotificationClientId` in Mobile SDK 12.0. See also:

- [Code Modifications (Android)](push-android-code.md)
- [Code Modifications (Hybrid)](push-hybrid-code.md)

Because of a change in how Google handles push notifications for apps, Android mobile connected apps now collect the Admin SDK private key and project ID from a Google Firebase project. This change applies to mobile connected apps with Android push notifications. See also:

- [Update Your Android Mobile Connected App’s Information for Push Notifications](https://help.salesforce.com/s/articleView?id=release-notes.rn_mobile_connected_app_firebase.htm&release=248&type=5) in _Salesforce Help_.
- [Configure Android Push Notifications](https://help.salesforce.com/s/articleView?id=sf.connected_app_mobile_push_notifications_android.htm&type=5) in _Salesforce Help_.

#### Gradle and JDK Upgrade

We upgraded to Gradle 8 and Android Gradle Plugin (AGP) 8. We also moved to Java JDK 17. See the release notes for Gradle 8 at https://docs.gradle.org/8.0/release-notes.html.

#### New SQLCipher for Android

We moved to a new SQLCipher for Android Package, with `sqlcipher-android` replacing `android-database-sqlcipher` in 12.0. See the SQLCipher release notes at [SQLCipher 4.5.5](https://www.zetetic.net/blog/2023/08/31/sqlcipher-4.5.5-release/) and [SQLCipher 4.5.6](https://www.zetetic.net/blog/2024/01/17/sqlcipher-4.5.6-release/).

#### Version Updates

- Android SDK (min API): 26
- Android SDK (target API): 34
- Default SDK version for hybrid apps: 34
- Gradle: 8.2.0
- Java JDK: 17
- Firebase Cloud Messaging: 23.3.1

#### Removed APIs

See [Android APIs Removed in Mobile SDK 12.0](reference-current-removed-android.md).

#### Deprecated APIs

Check your compiler warnings, or see [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm).

## Mobile SDK 11.1

Mobile SDK 11.1.0 is a minor release that features modernized support for iOS and Android.

In interim releases, we often deprecate items in native libraries for removal in an upcoming major release. Be sure to check your compiler logs for deprecation warnings so that you can address any changes before they go into effect.

### General Updates

These changes apply to more than one platform.

#### External Component Version Updates

- Cordova for Android: 12.0.1

- Cordova for iOS: 7.0.1

- React Native: 0.70.14

### iOS

#### iOS 17 Compatibility

We’ve successfully tested Mobile SDK for compatibility with iOS 17 and XCode 15. See [iOS 17 Release Notes](https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-17-release-notes).

#### Swift Package Manager Support

We’ve introduced support for Swift Package Manager, which can now be used to bring Mobile SDK into applications.

- Binary Frameworks for Mobile SDK are hosted on a new repository: <https://github.com/forcedotcom/SalesforceMobileSDK-iOS-SPM>.

- We’ve added a `iOSNativeSwiftPackageManager` template, which pulls its dependencies through Swift Package Manager.

- See also: [Add Mobile SDK Libraries to Your Project](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/ios-new-native-manual-clone-sdk.html), [Creating an iOS Swift Project Manually](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/ios-new-native-project-manual.html), [Creating an iOS Project with Forceios](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/ios-new-force-project.html).

#### Deprecated APIs

Check your compiler warnings, or see [iOS Current Deprecations](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/reference-current-deprecations-ios.html).

### Android

#### Android 14 Compatibility

We successfully tested Mobile SDK for compatibility with Android 14. See [Android Version 14](https://developer.android.com/about/versions/14).

#### Mobile Sync Library Modernization

We modernized the Mobile Sync Library on Android.

- All source files are now written in Kotlin.

- Parameters and members now use non-nullable types wherever nulls aren’t expected or supported.

- Kotlin syntax is now supported where appropriate. For example: string templates, `?:`, `let`, `also`, `map`, `forEach`, `when`, etc.

- Co-routine wrappers are now available for key methods in SyncManager. See [Incremental Syncs with reSync](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/entity-framework-native-inc-sync.html), [Handling “Ghost” Records After Sync Down Operations](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/entity-framework-sync-ghosts.html), [Using Sync Names](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/entity-framework-name-based-apis.html).

:::note
Although we don’t typically require consuming code changes in minor releases such as Mobile SDK 11.1, our modernized Mobile Sync library requires consuming code changes in some cases. For example, constants that were once imported from a class in Java are now imported from a companion object in consuming Kotlin code.
:::

#### Android Template Updates

- Our Mobile SDK Android templates are now up to date with the Kotlin DSL migration.

- Our templates are now set up to download Mobile SDK artifacts from Maven Central, which results in a friendlier build environment.

#### Advanced Authentication Enhancements

We fixed these bugs related to advanced auth.

- If Chrome wasn’t found during the advanced auth flow, Android users were presented with an error and couldn’t continue with login. Advanced authentication now reinstates the expected behavior of using the default browser if Chrome isn’t available at runtime.

- A bug caused some Android users’ login flow to reset to the initial screen when the app was backgrounded during MFA. We’ve fixed this issue and changed LoginActivity’s launch mode from `singleInstance` to `singleTop`. Apps that extend LoginActivity now require the same change.

We added new advanced auth methods that allow you to 1) configure which browser your app selects and 2) view the currently selected custom tab browser. See [Configuring Advanced Authentication in Android Apps](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/auth-android-advanced.html).

#### Deprecated APIs

Check your compiler warnings, or see [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm).

## Mobile SDK 11.0.1

Mobile SDK 11.0.1 is a minor patch release that features these changes.

- Bug fixes for login and refresh with custom domain and enhanced domain.
- Access token re-hydration in hybrid apps and when using an IDP flow.
- Improved read performance for Key-Value Stores.

## Mobile SDK 11.0

Mobile SDK 11.0 is a major release that modernizes several authentication flows. In major releases, we typically remove items that have been deprecated for removal. Read the following information to learn about new features and breaking changes that can affect your app. In every release, be sure to check your compiler logs for deprecation warnings so that you can address these changes before they go into effect.

### General Updates

These changes apply to more than one platform.

- The default authentication on iOS and Android now uses Web Server Flow instead of User-Agent Flow. See [OAuth 2.0 Web Server Flow](oauth-web-server-flow.md).
- Device system biometric authentication for logins. See [Biometric Authentication](biometric-auth.md).
- Reworked multi-app SSO flows and configurations with identity providers. See [Identity Provider Apps](auth-identity-providers.md).
  ::include{src="../../shared/external_component_version_updates.md"}

### iOS

See also: _General Updates in Mobile SDK 11.0_

- Version Updates

  - : Deployment target: 15

    Base SDK version: 16

    Xcode: 14

- Removed APIs

  - : See [iOS APIs Removed in Mobile SDK 11.0](reference-current-removed-ios.md).

- Deprecated APIs

  - : Check your compiler warnings, or see [iOS Current Deprecations](reference-current-deprecations-ios.md).

## Mobile SDK 10.2

Mobile SDK 10.2 is an interim release that features non-breaking API changes and modernized platform support.

### iOS

**iOS 16 Compatibility**

We’ve successfully tested Mobile SDK for compatibility with iOS 16. See [iOS 16 Release Notes](https://developer.apple.com/documentation/ios-ipados-release-notes/ios-16-release-notes).

- Version Updates

  - : SQLite: 3.39.2

    SQLCipher: 4.5.2

    React Native: 0.70.1

    ShellJS: 0.8.5 (for command line tools)

    TypeScript: 4.8.3 (for React Native)

- Deprecated APIs

  - : Check your compiler warnings, or see [iOS Current Deprecations](reference-current-deprecations-ios.md).

### Android

**Android 13 Compatibility**

We’ve successfully tested Mobile SDK for compatibility with Android 13. See [Android Version 13](https://developer.android.com/about/versions/13).

- Version Updates

  - : SQLite: 3.39.2

    SQLCipher: 4.5.2

    OkHttp: 4.10.0

    Cordova-android: 11.0.0

    React Native: 0.70.1

    ShellJS: 0.8.5 (for command line tools)

    TypeScript: 4.8.3 (for React Native)

    Android SDK (target API): 33

- Deprecated APIs

  - : Check your compiler warnings, or see [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm).

### React Native

- Version Updates

  - : React Native: 0.70.1

## Mobile SDK 10.1.1

Mobile SDK 10.1.1 is a minor patch release. Mobile SDK 10.1.1 restores use of the **Lock App After** timeout setting from the org’s Connected App settings for your mobile app. When set, the mobile app locks after it has been in the background for longer than the timeout period. Locking occurs when the mobile app is activated. Unlocking the app remains the same.

## Mobile SDK 10.1

Mobile SDK 10.1.0 is a minor release that includes bug fixes, performance enhancements, feature additions, and updates.

In interim releases, we often deprecate items in native libraries for removal in an upcoming major release. Be sure to check your compiler logs for deprecation warnings so that you can address any changes before they go into effect.

### General Updates

These changes apply to more than one platform.

- REST API Methods for Briefcase Priming Records (iOS, Android)

  - : REST request factory method and response parser for the Briefcase Priming Salesforce API. See [Briefcase Priming Records](ref-rest-apis-briefcase-priming.md).

- REST API Methods for sObject Collections (iOS, Android, React Native)

  - : REST request factory methods and response parser for the following sObject Collections operations:

    - `Create`—See [Collection Create](ref-rest-apis-collection-create.md).
    - `Retrieve`—See [Collection Retrieve](ref-rest-apis-collection-retrieve.md).
    - `Update`—See [Collection Update](ref-rest-apis-collection-update.md).
    - `Upsert`—See [Collection Upsert](ref-rest-apis-collection-upsert.md).
    - `Delete`—See [Collection Delete](ref-rest-apis-collection-delete.md).

- Briefcase Sync Down Target (iOS, Android)

  - : New sync down target for downloading and locally synchronizing records from an org's briefcases. See [Using the Briefcase Sync Down Target](entity-framework-sync-down-target-briefcase.md).

- Collection Sync Up Target using sObject Collections (iOS, Android)

  - : New sync up target that uses sObject Collections to improve performance. If you don't specify an implementation class ("androidImpl" or "iOSImpl") in your sync up target configuration, Mobile SDK automatically uses `CollectionSyncUpTarget`. See [Using the sObject Collection Sync Up Target](entity-framework-sync-up-target-sobject.md).

- External Component Version Updates

  - : SQLCipher: 4.5.1 (iOS and Android)

    SQLite: 3.37.2

    Gradle: 7.2.1

### iOS

See also _General Updates in Mobile SDK 10.0_.

- Version Updates

  - : SQLCipher: 4.5.1

    SQLite: 3.37.2

- Deprecated APIs

  - : Check your compiler warnings, or see [iOS Current Deprecations](reference-current-deprecations-ios.md).

### Android

See also _General Updates in Mobile SDK 10.0_.

- MobileSyncExplorerKotlin Template

  - : A new Android app template that demonstrates the full power of Mobile Sync, using Kotlin and Jetpack Compose: [https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/MobileSyncExplorerKotlinTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/MobileSyncExplorerKotlinTemplate)

- Version Updates

  - : SQLCipher: 4.5.4

    SQLite: 3.41.2

    Gradle: 7.2.1

- Deprecated APIs

  - : Check your compiler warnings, or see [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm).

### React Native

See also _General Updates in Mobile SDK 10.0_.

- Version Updates

  - : React Native: 0.70.14

### SmartStore

- Version Updates

  - : SQLCipher: 4.5.4 (iOS and Android)

    SQLite: 3.41.2

### Mobile Sync

See also _General Updates in Mobile SDK 10.0_.

- Briefcase Sync Down Target (iOS, Android)

  - : New sync down target for downloading and locally synchronizing records from an org's briefcases.

- Collection Sync Up Target using sObject Collections (iOS, Android)

  - : New sync up target that uses sObject Collections to improve performance. If you don't specify an implementation class in your sync up target configuration, Mobile SDK automatically uses `CollectionSyncUpTarget`.

## Mobile SDK 10.0

Mobile SDK 10.0.0 is a major trust release. It includes breaking API changes, bug fixes, performance enhancements, minor feature additions, and updates.

In major releases, we remove items in native libraries that were deprecated in interim releases. For your convenience, we've compiled lists of deprecated native APIs.

### General Updates

These changes apply to more than one platform.

- Binary Storage in Key-Value Stores

  - : Key-value stores in native iOS and Android now support secure binary storage APIs. See [Using Key-Value Stores for Secure Data Storage](key-value-store-about.md).

- External Component Version Updates

  - : React Native: 0.67.1

    Cordova for iOS: 6.2.0

    Cordova for Android: 10.1.1

    Cordova command line: 11.0.0

    SQLCipher: 4.5.0 (iOS and Android)

    SQLite: 3.36.0

    node.js: 12.0 to latest LTS version

### iOS

- Binary Storage in Key-Value Stores

  - : Key-value stores now support secure binary storage with new Mobile SDK APIs. See [Using Key-Value Stores for Secure Data Storage](key-value-store-about.md).

- Widgets in the MobileSyncExplorerSwift Template App

  - : We've added a Recent Contacts widget to this template.

- Version Updates

  - : Deployment target: 14

    Base SDK version: 15

    Xcode: 13

- Removed APIs

  - : See [iOS APIs Removed in Mobile SDK 11.0](reference-current-removed-ios.md).

- Deprecated APIs

  - : Check your compiler warnings, or see [iOS Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_ios.htm).

### Android

- Binary Storage in Key-Value Stores

  - : Key-value stores now support secure binary storage using existing Mobile SDK APIs. See [Using Key-Value Stores for Secure Data Storage](key-value-store-about.md).

- Version Updates

  - : Minimum API: Android Nougat (API 24)

    Target API: Android 12 (API 32)

    Default SDK version for hybrid apps: Android 12 (API 32)

- Removed APIs

  - : See [Android APIs Removed in Mobile SDK 11.0](reference-current-removed-android.md).

- Deprecated APIs

  - : Check your compiler warnings, or see [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm).

### React Native

- Version Updates

  - : React Native: 0.67.1

### Hybrid

- Version Updates

  - : Cordova for iOS: 6.2.0

    Cordova for Android: 10.1.1

    Cordova command line: 11.0.0

### SmartStore

- WAL for Android

  - : Mobile SDK 10.0 implements write-ahead logging (WAL) in SQLCipher for Android. Although SQLCipher's concurrent read-write support remains blocked on Android, lower-level updates bring measurable improvements to SmartStore performance.

- Feature Deprecations

  - : Due to improvements in third-party modules, the external storage feature and the `SoupSpec` class have been deprecated for removal in Mobile SDK 11.0. SmartStore is now fully capable of handling large data sets. See [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm) and [iOS Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_ios.htm).

- Version Updates

  - : SQLCipher: 4.5.0 (iOS and Android)

    SQLite: 3.36.0

## Mobile SDK 9.2.0

Mobile SDK 9.2.0 is an interim release that features non-breaking API changes and modernized iOS support.

In interim releases, we often deprecate items in native libraries for removal in an upcoming major release. Be sure to check your compiler logs for deprecation warnings so that you can address any changes before they go into effect.

These changes apply to more than one platform.

### General Updates

- Passcode Removal

  - : We’ve removed app-specific passcodes from iOS and Android apps in favor of mobile operating system security. Mobile SDK still honors an org’s passcode requirement but ignores passcode length, passcode timeout, and biometric settings from a connected app. For customers who’ve already configured a device lock screen or biometric unlock, this upgrade is seamless. For others, the new app lock screen prompts the customer to configure an authentication mode. When the customer reactivates the app from the background, the device passcode, rather than an app-specific passcode, is required. See [About Login and Passcodes](ios-native-login-passcodes.md) (iOS) and [Using Passcodes](android-passcodes.md) (Android).

### External Component Version Updates

- Cordova

  - :
    - iOS: 6.2.0
    - Android: 10.1.0

- React Native

  - : 0.66.0 (iOS and Android)

- SQLite

  - : 3.34.1

- SQLCipher

  - : 4.4.3 (iOS and Android)

## Mobile SDK 9.1.0

Mobile SDK 9.1.0 is an interim release that features non-breaking API changes and modernized iOS support.

In interim releases, we often deprecate items in native libraries for removal in an upcoming major release. Be sure to check your compiler logs for deprecation warnings so that you can address any changes before they go into effect.

### General Updates

These changes apply to more than one platform.

- Key-Value Stores (iOS, Android)

  - :
    - Key-value store version 2 debuts in 9.1. With version 2, you can use key-value store APIs to retrieve all keys from the store.
    - The **Inspect Key-Value Store** option of the Dev Support menu now lets you search for all keys that match a given partial or whole key name.
    - For details of these features, see [Using Key-Value Stores for Secure Data Storage](key-value-store-about.md).

### iOS

- iPad Support in Sample Apps

  - :
    - The [MobileSyncExplorerSwift](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/master/MobileSyncExplorerSwift) template app now supports Catalyst and multiple windows for iPad.
    - The [RestAPIExplorer](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/tree/master/native/SampleApps/RestAPIExplorer) sample app now supports Catalyst.

- REST API Wrapper Update

  - :
    - We’ve added a `batchSize` parameter to `requestForQuery` methods of `SFRestApi` (Objective-C) and `RestClient` (Swift). Use this parameter to specify a preferred number of records to be returned in each fetch. Permissible values range from 200 to 2,000 (default setting). To allow for run-time performance adjustments, Mobile SDK doesn’t guarantee that your requested size will be the actual batch size.

- Deprecations

  - :
    - Check your compiler warnings, or see [iOS Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_ios.htm).

### Android

- REST API Wrapper Update

  - :
    - We’ve added a `batchSize` parameter to the `RestRequest.getRequestForQuery` method. Use this parameter to specify a preferred number of records to be returned in each fetch. Permissible values range from 200 to 2,000 (default setting). To allow for run-time performance adjustments, Mobile SDK doesn’t guarantee that your requested size will be the actual batch size.

- Deprecations

  - : Check your compiler warnings, or see [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm).

- SmartStore

  - : Smart SQL no longer requires index paths for all fields referenced in SELECT or WHERE clauses. See [Smart SQL Queries](offline-smart-sql.md).

### Mobile Sync

- SOQL Sync Down Target Enhancement

  - : You can now configure the size for SOQL sync down batches. You can specify any value from 200 to 2,000 (default value). See [Using the SOQL Sync Down Target](entity-framework-sync-down-target-soql.md).

## Mobile SDK 9.0

- General

  - : These changes apply to more than one platform.

    **Developer Tools**

    (iOS, Android) The Dev Support menu now provides a new utility: **Inspect Key-Value Store**. [In-App Developer Support](tools-dev-support.md)

    **External Component Version Updates**

    - SQLCipher (iOS, Android): 4.4.2
    - SQLite (iOS, Android): 3.33.0
    - yarn: 1.22
    - Cordova:
      - **iOS:** 6.1.1
      - **Android:** 9.0.0

- iOS

  - : **iPadOS Support**

    - Implemented multiple window support for iPadOS. This new feature requires changes to existing apps that intend to run on iPads. See [Supporting iPadOS in Mobile SDK Apps](ios-ipados-compatibility.md).
    - Improved support for landscape mode on iPadOS. (Other than updating to Mobile SDK 9.0, no app changes required.)

    **Version Updates**

    - Deployment target: iOS 13
    - Base SDK: iOS 14
    - Xcode: 12
    - CocoaPods: 1.8.0 (no maximum)

    **Deprecations**

    - Check your compiler warnings, or see [iOS Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_ios.htm).
    - The Carthage framework manager is no longer officially supported.

- Android

  - : **Version Updates**

    Target API: Android 11 (API 30)

    **Deprecations**

    Check your compiler warnings, or see [Android Current Deprecations](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/reference_current_deprecations_android.htm).

- React Native

  - : **TypeScript Now Supported**

    Mobile SDK’s implementation of React Native now supports TypeScript for app development in addition to standard JavaScript. Mobile SDK libraries for React Native now also use types. TypeScript requires you to install the TypeScript compiler. [React Native Development](react-native-intro.md)

    **Version Updates**

    React Native version: 0.63.4

- Mobile Sync

  - : **Parent-Child Sync Up Adds externalIdField Parameter**

    The new `externalIdField` parameter for parent-child sync up matches the functionality added for basic sync operations in Mobile SDK 8.0. [Syncing Up by External ID](entity-framework-native-sync-up-external-id.md).
