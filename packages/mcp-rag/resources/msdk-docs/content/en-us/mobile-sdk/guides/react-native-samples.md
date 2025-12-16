# Mobile SDK Sample App Using React Native

The best way to get up-to-speed on React Native in Mobile SDK is to study the sample code.

Mobile SDK provides four implementations of the MobileSyncExplorer application, including a React Native version. To use MobileSyncExplorerReactNative, follow the instructions in the [MobileSyncExplorerReactNative README.md](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/v9.0.0/MobileSyncExplorerReactNative/README.md) file.

<!-- Put this somewhere else? Maybe in the Mobile Sync docs?|Implementation|iOS|Android|
|--------------|---|-------|
|Native (Objective-C/Java)|<ol>
     <li>Clone the [SalesforceMobileSDK-iOS GitHub repo](https://github.com/forcedotcom/SalesforceMobileSDK-iOS).
</li>

     <li>Open the `SalesforceMobileSDK` workspace in Xcode.
</li>

     <li>Run the `MobileSyncExplorer` application (in the NativeSamples workspace folder).
</li>
  </ol>|<ol>
     <li>Clone the [SalesforceMobileSDK-Android GitHub repo](https://github.com/forcedotcom/SalesforceMobileSDK-Android).
</li>

     <li>Import the SalesforceMobileSDK-Android project in Android Studio.
</li>

     <li>Run the MobileSyncExplorer application (in the `native/NativeSampleApps` project folder).
</li>
  </ol>|
|Hybrid (HTML/JavaScript)|<ol>
     <li>Clone the [SalesforceMobileSDK-iOS GitHub repo](https://github.com/forcedotcom/SalesforceMobileSDK-iOS).
</li>

     <li>Open the `SalesforceMobileSDK` workspace in Xcode.
</li>

     <li>Run the `MobileSyncExplorerHybrid` application (in the HybridSamples workspace folder).
</li>
  </ol>|<ol>
     <li>Clone the [SalesforceMobileSDK-Android GitHub repo](https://github.com/forcedotcom/SalesforceMobileSDK-Android).
</li>

     <li>Import the SalesforceMobileSDK-Android project in Android Studio.
</li>

     <li>Run the “MobileSyncExplorer” application (in the `hybrid/HybridSampleApps` project folder).
</li>
  </ol>|
|React Native (JavaScript with React)|<ol>
     <li>Clone the `MobileSyncExplorerReactNative` repo at [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates).
</li>

     <li>In a terminal window or command prompt, run `./install.sh` (on Mac) or `cscript install.vbs` (on Windows)
</li>

     <li>`cd` to the `app` folder and run `npm start`
</li>

     <li>Open the `ios` folder in Xcode.
</li>

     <li>Run the `MobileSyncExplorerReactNative` application
</li>
  </ol>|<ol>
     <li>Clone the `MobileSyncExplorerReactNative` repo at [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates).
</li>

     <li>In a terminal window or command prompt, run `./install.sh` (on Mac) or `cscript install.vbs` (on Windows)
</li>

     <li>`cd` to the `app` folder and run `npm start`
</li>

     <li>Open the `android` folder in Android Studio
</li>

     <li>Run the `MobileSyncExplorerReactNative` application
</li>
  </ol>|

-->

Here are a few notes about the MobileSyncExplorerReactNative files.

## Key Folder and Files

| Path                | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `README.md`         | Instructions to get started                                                 |
| `installandroid.js` | Use this script to install the Android sample. See `README.md` for details. |
| `installios.js`     | Use this script to install the iOS sample. See `README.md` for details.     |
| `ios`               | The iOS application                                                         |
| `android`           | The Android application                                                     |
| `js`                | The JavaScript source files for the application                             |
| `index.js`          | App start page                                                              |

## React Components

| File                 | Component                     | Description                                                                      |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------------- |
| `js/events.js`       |                               | Event model                                                                      |
| `js/App.js`          | MobileSyncExplorerReactNative | Root component (the entire application) (iOS and Android)                        |
| `js/SearchScreen.js` | SearchScreen                  | Search screen (iOS and Android)                                                  |
| `jsContactScreen.js` | ContactScreen                 | Used for viewing and editing a single contact (iOS and Android)                  |
| `js/ContactCell.js`  | ContactCell                   | A single row in the list of results in the search screen (iOS and Android)       |
| `js/ContactBadge.js` | ContactBadge                  | Colored circle with initials used in the search results screen (iOS and Android) |
| js/Field.js          | Field                         | A field name and value used in the contact screen (iOS and Android)              |
| js/StoreMgr.js       | StoreMgr                      | Interacts with SmartStore and the server (via Mobile Sync).                      |
| js/NavImgButton.js   | NavImgButton                  | Navigation Bar button                                                            |

## Platform-Specific Native Projects

| File       | Description            |
| ---------- | ---------------------- |
| `android/` | Android native project |
| `ios/`     | iOS native project     |

:::note

Most components are shared between iOS and Android. However, some components are platform-specific.

:::
