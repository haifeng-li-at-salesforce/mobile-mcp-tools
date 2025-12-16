# Updating Mobile SDK Apps (5.0 and Later)

Native and React native apps get an easier path to future Mobile SDK upgrades. Instead of creating an app and porting your app’s resources to it, you now update a simple configuration file and then run a script that regenerates your app with the new SDK libraries.

## Updating Native and React Native Apps

Each native and React native app directory contains a `package.json` file at its root level. This JSON file contains a “dependencies” object that includes a list of name-value pairs describing Mobile SDK source paths. You can set these values to any local or network path that points to a valid copy of the platform’s Mobile SDK. After you’ve updated this file, perform the update by running:

- `install.js` for Android native, iOS native, and native Swift apps
- `installandroid.js` for React native apps on Android
- `installios.js` for React native apps on iOS

You can find the appropriate file in your app’s root folder.

For example, here’s the dependencies section of a native Android `package.json` file:

```json
    "dependencies": {
    "salesforcemobilesdk-android": "https://github.com/forcedotcom/SalesforceMobileSDK-Android.git"
}
```

This path points to the current release branch of the SalesforceMobileSDK-Android repo.

For iOS, it’s the same idea:

```json
"dependencies": {
    "salesforcemobilesdk-ios": "https://github.com/forcedotcom/SalesforceMobileSDK-iOS.git"
}
```

For React native, you can set targets for both iOS and Android, as well as React native versions:

```json
    "sdkDependencies": {
    "SalesforceMobileSDK-Android": "https://github.com/forcedotcom/SalesforceMobileSDK-Android.git",
    "SalesforceMobileSDK-iOS": "https://github.com/forcedotcom/SalesforceMobileSDK-iOS.git"
},
"dependencies": {
    "@react-native-community/masked-view": "^0.1.10",
    "@react-navigation/native": "^6.0.2",
    "@react-navigation/stack": "^6.0.7",
    "react": "17.0.2",
    "react-native-force": "git+https://github.com/forcedotcom/SalesforceMobileSDK-ReactNative.git",
    "react-native": "0.65.1",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-safe-area-context": "^3.3.0",
    "react-native-screens": "^3.6.0",
    "create-react-class": "^15.7.0"
},
```

:::important

Remember that your React native version must be paired with compatible Mobile SDK versions.

:::

To point to the development branch of any Mobile SDK repo—that is, the branch where the upcoming release is being developed—append “#dev” to the URL. For example:

```json
    "dependencies": {
    "salesforcemobilesdk-android": "https://github.com/forcedotcom/SalesforceMobileSDK-Android.git#dev"
    "SalesforceMobileSDK-iOS": "https://github.com/forcedotcom/SalesforceMobileSDK-iOS.git#dev"
},
"dependencies": {
    "@react-native-community/masked-view": "^0.1.10",
    "@react-navigation/native": "^6.0.2",
    "@react-navigation/stack": "^6.0.7",
    "react": "17.0.2",
    "react-native-force": "git+https://github.com/forcedotcom/SalesforceMobileSDK-ReactNative.git#dev",
    "react-native": "0.65.1",
    ...
}
```

After you’ve changed the `package.json` file, don’t forget to run the Mobile SDK git installer script as shown in the example.

## Example

To upgrade an app to a different version of Mobile SDK for iOS:

1.  From your app directory, open `package.json` for editing.
2.  In the “sdkDependencies” section, change the value for “SalesforceMobileSDK-iOS” to point a different version of the SalesforceMobileSDK-iOS repo. You can point to the development branch or a different tag of the master branch (5.x or later).
3.  From the repo root directory, run the appropriate installer script for your app:
    - For native apps: `install.js`
    - For React Native apps: `installios.js`

The steps for Android are identical except for the iOS labels:

1.  From your app directory, open `package.json` for editing.
2.  In the “sdkDependencies” section, change the value for “SalesforceMobileSDK-Android” to point a different version of the SalesforceMobileSDK-Android repo. You can point to the development branch or a different tag of the master branch (5.x or later).
3.  From the repo root directory, run the appropriate installer script for your app:
    - For native apps: `install.js`
    - For React Native apps: `installandroid.js`

## Updating Hybrid Apps

For hybrid apps, Mobile SDK libraries are delivered through the Mobile SDK Cordova plug-in. However, with a major release, we recommend that you start with a new template app.

1.  Run: `forcehybrid create`
2.  Create the same type of hybrid project with the same name as your existing project, but in a different folder.
3.  When the script finishes, `cd` to your new project folder.
4.  Add any third-party Cordova plug-ins that your original app used. For example, if your app uses the Cordova status bar plug-in, type:

    ```nolang
    cordova plugin add cordova-plugin-statusbar
    ```

5.  Copy your web app resources—JavaScript, HTML5, and CSS files, and so on—from the original project into your new project’s `www/` folder. For example, on Mac OS X:

    ```nolang
    cp -RL ~/MyProjects/MyMobileSDK50Project/www/* www/
    ```

6.  Run: `cordova prepare`

<!-- To use the development branch of Mobile SDK:-->
<!--

1.  Clone the SalesforceMobileSDK-CordovaPlugin repo.

    ```nolang
    git clone https://github.com/forcedotcom/SalesforceMobileSDK-CordovaPlugin.git
    ```

2.  `cd` to the new repo directory.
3.  Run `./tools/update.sh` with the following arguments:

    | Parameter | Description |
    | -\-\-\-\-\-\-\-\- | -\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-- |
    | `-b` | Mobile SDK branch name, in the format `<[remote/]branch_name>` |
    | `-o` | Name of the platform to build (OS name): `ios`, `android`, or `all` |
    | `-n` | If present, the script does not rebuild Mobile SDK for iOS |

4.  `cd` to your hybrid app folder.
5.  Run `cordova plugin add <path-to-your-clone-of-plugin>`

-->

:::note

For details on required changes for specific releases, see [Migrating from the Previous Release](migration-migrating-from-previous.md).

:::
