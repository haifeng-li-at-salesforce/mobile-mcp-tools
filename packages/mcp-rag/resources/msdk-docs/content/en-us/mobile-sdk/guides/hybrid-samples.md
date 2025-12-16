# Hybrid Sample Apps

Salesforce Mobile SDK provides hybrid samples that demonstrate how to use Mobile SDK features in JavaScript. We provide hybrid samples two ways:

- As platform-specific apps with native wrappers. We provide these wrappers for a limited subset of our hybrid samples. You can access the iOS samples through the Mobile SDK workspace (`SalesforceMobileSDK.xcodeproj`) in the root directory of the SalesforceMobileSDK-iOS GitHub repository. Also, you can access the Android samples from the `hybrid/SampleApps` directory of the SalesforceMobileSDK-Android repository.
- As platform-agnostic web apps including only the HTML5, JavaScript, CSS source code. These apps include all of our hybrid samples and provide the basis for the platform-specific hybrid apps. You can download these sample apps from the SalesforceMobileSDK-Shared GitHub repo and build them using the Cordova command line.<!-- See [Build Hybrid Sample Apps](hybrid-samples-build.md).-->

## Android Hybrid Sample Wrappers

::include{src="../../shared/sample_apps_android_hybrid.md"}

## iOS Hybrid Sample Wrappers

::include{src="../../shared/sample_apps_ios_hybrid.md"}

## Source-only Hybrid Sample Apps

Salesforce Mobile SDK provides the following platform-agnostic hybrid sample apps in the the SalesforceMobileSDK-Shared GitHub repository.

::include{src="../../shared/hybrid_sourceonly_samples.md"}
