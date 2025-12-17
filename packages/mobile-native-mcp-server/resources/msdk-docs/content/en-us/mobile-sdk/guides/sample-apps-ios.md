# iOS Sample Apps

Use native, hybrid, and template sample apps to speed up development.

## Native

Find these samples in the `SampleApps` directory of the [SalesforceMobileSDK-iOS/native](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/tree/v9.0.0/native/SampleApps) repo.

- **MobileSyncExplorer** demonstrates the power of the native Mobile Sync library on iOS. It resides in Mobile SDK for iOS under `native/SampleApps/MobileSyncExplorer`.
- **RestAPIExplorer** exercises all native REST API wrappers. It resides in Mobile SDK for iOS under `native/SampleApps/RestAPIExplorer`.

## Hybrid

Find these samples in the `hybrid/SampleApps` directory of the [SalesforceMobileSDK-iOS-Hybrid](https://github.com/forcedotcom/SalesforceMobileSDK-iOS-Hybrid/tree/v9.0.0/hybrid/SampleApps) repo.

- **AccountEditor**: Demonstrates how to synchronize offline data using the `mobilesync.js` library.
- **MobileSyncExplorer**: Demonstrates how to synchronize offline data using the Mobile Sync plugin.

## Template Apps

You can use template apps with `forceios create` or `forceios createwithtemplate` to spawn Mobile SDK “starter” apps. Find these samples in the [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates) repo.

- Used by forceios create

  - :
    - **iOSNativeSwiftTemplate**: Standard iOS native template, written in Swift. Default app type for the `forceios create` command. When `forceios create` prompts for app type, press `Return` or enter `native_swift`.
    - **iOSNativeTemplate**: Standard iOS native template, written in Objective-C. When `forceios create` prompts for app type, enter `native`.

- For use with forceios createwithtemplate

  - :
    - **iOSIDPTemplate**: Demonstrates how to set up an identity provider in an iOS app. When `forceios createwithtemplate` prompts for the repo URI, enter `iOSIDPTemplate`.
    - **iOSNativeSwiftEncryptedNotificationTemplate**: Demonstrates how to set up an iOS app to receive encrypted notifications. When `forceios createwithtemplate` prompts for the repo URI, enter `iOSNativeSwiftEncryptedNotificationTemplate`.
    - **iOSNativeSwiftPackageManagerTemplate**: Demonstrates how to set up an iOS app with SwiftPackageManager. When `forceios createwithtemplate` prompts for the repo URI, enter (or copy and paste) `iOSNativeSwiftPackageManagerTemplate`.
    - **iOSNativeLoginTemplate**: Demonstrates how to set up native login. When `forceios createwithtemplate` prompts for the repo URI, enter `iOSNativeLoginTemplate`.
    - **MobileSyncExplorerSwift**: Provides a comprehensive example of Mobile Sync usage. When `forceios createwithtemplate` prompts for the repo URI, enter `MobileSyncExplorerSwift`.
