# Android Sample Apps

Use native, hybrid, and template sample apps to speed up development.

## Native

Find these samples in the `NativeSampleApps` directory of the [SalesforceMobileSDK-Android/native](https://github.com/forcedotcom/SalesforceMobileSDK-Android/tree/v9.0.0/native) repo.

- **RestExplorer** demonstrates the OAuth and REST API functions of Mobile SDK. It’s also useful for investigating REST API actions from a tablet.

## Hybrid

Find these samples in the `HybridSampleApps` directory of the [SalesforceMobileSDK-Android/hybrid](https://github.com/forcedotcom/SalesforceMobileSDK-Android/tree/v9.0.0/hybrid) repo.

- **AccountEditor**: Demonstrates how to synchronize offline data using the `mobilesync.js` library.
- **MobileSyncExplorerHybrid**: Demonstrates how to synchronize offline data using the Mobile Sync plugin.

## Template Apps

You can use template apps with `forcedroid create` or `forcedroid createwithtemplate` to spawn Mobile SDK “starter” apps. Find these samples in the [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates) repo.

- Used by forcedroid create

  - :
    - **AndroidNativeKotlinTemplate**: Standard Android native template, written in Kotlin. Default app type for the `forcedroid create` command. When `forcedroid create` prompts for app type, press `Return` or enter `native_kotlin`.
    - **AndroidNativeTemplate**: Standard Android native template, written in Java. When `forcedroid create` prompts for app type, enter `native`.

- For use with forcedroid createwithtemplate

  - :
    - **AndroidIDPTemplate**: Demonstrates how to set up an identity provider in an Android app. When `forcedroid createwithtemplate` prompts for the repo URI, enter `AndroidIDPTemplate`.
    - **MobileSyncExplorerKotlinTemplate**: Provides a comprehensive example of Mobile Sync usage. When `forcedroid createwithtemplate` prompts for the repo URI, enter `MobileSyncExplorerKotlinTemplate`.
    - **AndroidNativeLoginTemplate**: Demonstrates how to set up native login. When `forcedroid createwithtemplate` prompts for the repo URI, enter `AndroidNativeLoginTemplate`.
