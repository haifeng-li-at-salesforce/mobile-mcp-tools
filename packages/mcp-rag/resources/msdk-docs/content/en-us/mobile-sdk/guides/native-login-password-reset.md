# Native Password Reset

With the Headless Forgot Password Flow, users can reset the password for their account by using a front-end experience that you customize. On the back end, your app calls the Headless Identity API’s Forgot Password Flow via an Experience Cloud site to reset the user’s password.

## Before You Begin

Before you set up a password reset flow, make sure that you completed the steps in [Native Passwordless Login](native-login-passwordless.md). 

## Request a One-Time Password

To start the password reset flow, request the delivery of a one-time password with this method from the native login manager object. 

### iOS

```
    SalesforceManager.shared.nativeLoginManager()
      .startPasswordReset(
        username: "your-username",
        reCaptchaToken: "your-recaptcha-token")
```

### Android

```
    nativeLoginManager
      .startPasswordReset(
        username = "your-username",
        reCaptchaToken = "your-recaptcha-token")
```

## Submit Password Reset Request

To reset the user’s password, use this method from the native login manager object. 

### iOS

```
    SalesforceManager.shared.nativeLoginManager()
      .completePasswordReset(
        username: "your-username",
        otp: "your-otp",
        newPassword: "your-password")
```

### Android

```
    nativeLoginManager
      .completePasswordReset(
        username = "your-username",
        otp = "your-otp",
        newPassword = "your-password")
```

For working examples of Headless Passwordless Login Flow on Mobile SDK, see the [iOSNativeLoginTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeLoginTemplate) or the [AndroidNativeLoginTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/AndroidNativeLoginTemplate) on GitHub.
