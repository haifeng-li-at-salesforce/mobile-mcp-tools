# Installing the Sample Apps

In GitHub, sample apps live in the Mobile SDK repository for the target platform. For hybrid samples, you have the option of using the Cordova command line with source code from the `SalesforceMobileSDK-Shared` repository.

## Accessing Sample Apps From the GitHub Repositories

**For Android:**

- Clone or refresh the SalesforceMobileSDK-Android GitHub repo ([https://github.com/forcedotcom/SalesforceMobileSDK-Android](https://github.com/forcedotcom/SalesforceMobileSDK-Android)).
- In the repo root folder, run the install script:
  - **Windows:** `cscript install.vbs`
  - **Mac OS X:** `./install.sh`
- In Android Studio, import the folder that contains your local `SalesforceMobileSDK-Android` clone.
- Look for sample apps in the `hybrid/HybridSampleApps` and `native/NativeSampleApps` project folders.

:::important

On Windows, be sure to run Android Studio as administrator.

:::

**For iOS:**

- Clone or refresh the SalesforceMobileSDK-iOS GitHub repo ([https://github.com/forcedotcom/SalesforceMobileSDK-iOS](https://github.com/forcedotcom/SalesforceMobileSDK-iOS)).
- Run `./install.sh` in the repository root folder.
- In Xcode, open the `SalesforceMobileSDK-iOS/SalesforceMobileSDK.xcworkspace` file.
- Look for the sample apps in the `NativeSamples` and `HybridSamples` workspace folders.

## Building Hybrid Sample Apps With Cordova

To build hybrid sample apps using the Cordova command line, see [Build Hybrid Sample Apps](hybrid-samples-build.md).
