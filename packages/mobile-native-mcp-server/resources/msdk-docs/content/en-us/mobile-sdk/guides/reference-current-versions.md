# Supported Versions of Tools and Components for Mobile SDK 13.1

## All Platforms

| Tool or Component      | Supported Version                | Installation Details                           |
| ---------------------- | -------------------------------- | ---------------------------------------------- |
| Node.js                | Latest                           | Install from [nodejs.org](https://nodejs.org/) |
| npm                    | 3.10                             | Installed by Node.js                           |
| shelljs                | 0.8.5                            | Installed by Node.js                           |
| SQLite                 | 3.49.2                           | Installed by Mobile SDK                        |
| SQLCipher              | 4.9.0 for Android, 4.9.0 for iOS | Installed by Mobile SDK                        |
| Full Text Search (FTS) | FTS5                             | Installed by Mobile SDK                        |

## iOS

| Tool or Component     | Supported Version          | Installation Details                                                  |
| --------------------- | -------------------------- | --------------------------------------------------------------------- |
| Xcode                 | 16                         | Install from the Mac App Store                                        |
| iOS Deployment Target | 17                         | Installed by Xcode                                                    |
| iOS Base SDK          | 18                         | Installed by Xcode                                                    |
| CocoaPods             | 1.8 to no declared maximum | Install from [cocoapods.org](https://www.cocoapods.org/)              |
| forceios              | 11.1                       | At a command line or Terminal prompt, type: `npm install -g forceios` |

## Android

| Tool or Component                           | Supported Version                                                        | Installation Details                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Java JDK                                    | 17                                                                       | Install from [oracle.com](https://www.oracle.com/)                                  |
| Android Studio                              | Latest                                                                   | Install from [developer.android.com/studio/](https://developer.android.com/studio/) |
| Gradle                                      | 8.14.2                                                                   | Installed by Android Studio                                                         |
| Android SDK minApi                          | Android 9 Pie (API 28)                                                   | Install through the Android SDK Manager in Android Studio                           |
| Android SDK targetApi                       | Android 15 (API 35)                                                      | Install through the Android SDK Manager in Android Studio                           |
| Default Android SDK version for hybrid apps | Target version is Android 15 (API 35), minimum version is Android API 28 | Install through the Android SDK Manager in Android Studio                           |
| OkHttp                                      | 3.12.1                                                                   | Installed by Mobile SDK                                                             |
| forcedroid                                  | 11.1                                                                     | At a command line or Terminal prompt, type: `npm install -g forcedroid`             |

## Hybrid

| Tool or Component                           | Supported Version                                                        | Installation Details                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Cordova                                     | 14.0.1 (for Android), 7.1.1 (for iOS)                                    | Install from [cordova.apache.org](https://cordova.apache.org/)       |
| Cordova command line                        | 12.0.0                                                                   | At a command line or Terminal prompt, type: `npm install -g cordova` |
| Default Android SDK version for hybrid apps | Target version is Android 13 (API 33), minimum version is Android API 28 | Install through the Android SDK Manager in Android Studio            |

## React Native

| Tool or Component | Supported Version | Installation Details                                                    |
| ----------------- | ----------------- | ----------------------------------------------------------------------- |
| React Native      | 0.79.3            | Installed by Mobile SDK                                                 |
| React             | 19.0.0            | Installed by Mobile SDK                                                 |
| forcereact        | 11.1              | At a command line or Terminal prompt, type: `npm install -g forcereact` |
