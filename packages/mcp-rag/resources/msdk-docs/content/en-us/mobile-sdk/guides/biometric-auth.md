# Biometric Authentication

Starting in Mobile SDK 11.0, you can configure your app to use the device system biometric authentication to log in. For example, when the app exceeds its timeout period in the background, the login screen appears upon the user’s return to the app. This behavior gives the appearance that the user is logged out, even if the user’s login session hasn’t expired. The user can then log in using their username and password or their device’s biometric authentication if they enabled that option.

:::note

Alternatively, you can configure your app to require a passcode after login to achieve a similar effect. This feature is presented as a lock screen, while the biometric authentication introduced in Mobile SDK 11.0 presents a login screen. See also:

- [About Login and Passcodes](ios-native-login-passcodes.md)
- [Using Passcodes](android-passcodes.md)

:::

## Connected App Configuration

To configure biometric authentication, go to your org’s connected app.

1.  Add a custom attribute to your connected app with the key `ENABLE_BIOMETRIC_AUTHENTICATION`.
2.  To change the timeout period, add the `BIOMETRIC_AUTHENTICATION_TIMEOUT` key. You can adjust its value to the number of minutes that you want the app to be backgrounded for before it locks. If you choose not to add this key, the default value is set for 15 minutes.

:::note

The user’s authentication token doesn’t refresh while the app is locked. We recommend that admins enable a session timeout in the connected app and set the Lock App After attribute to the same value.

:::

## API and Customization

To manage biometric opt-in from within the app, use `SalesforceSDKManager` to get the `BiometricAuthenticationManager` instance. You can use this instance to:

- Check whether the user has opted in to biometric authentication.
- Prompt the user to opt in or out of biometric authentication and update the SDK with their response.
- Check whether the app is locked.
- Lock the app immediately.
- Disable the native biometric unlock button entirely.

To opt the user in to biometric authentication, you can use the Mobile SDK-provided prompts or create your own.

To use the Mobile SDK-provided prompts, implement one of these lines.

- Android (Kotlin)

  - :

    ```kotlin
    SalesforceSDKManager.getInstance().biometricAuthenticationManager.presentOptInDialog(fragmentManager)
    ```

- iOS (Swift)

  - :

    ```swift
    SalesforceManager.shared.biometricAuthenticationManager().presentOptInDialog(viewController: viewController)
    ```

If you choose to create a custom prompt, implement one of these lines to pass the user’s response to Mobile SDK.

- Android (Kotlin)

  - :

    ```kotlin
    SalesforceSDKManager.getInstance().biometricAuthenticationManager.biometricOptIn(userResponse)
    ```

- iOS (Swift)

  - :

    ```swift
    SalesforceManager.shared.biometricAuthenticationManager().biometricOptIn(optIn: userResponse)
    ```

If the user enables biometric authentication, a native button is added to the login screen so that they can trigger the OS prompt.

To create a custom button within the app’s web view, you can use an API found in `BiometricAuthenticationManager` to disable the native button. Then, configure the button to redirect to `mobilesdk://biometric/authentication/prompt`. Mobile SDK automatically ignores this redirect and presents the native OS prompt.
