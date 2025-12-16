# Native User Registration

With the Headless Registration Flow, users can register for a new account by using a front-end experience that you customize. On the back end, your app calls the Headless Registration API via an Experience Cloud site to register and log the user in.

## Before You Begin

Before you set up a user registration flow, make sure that you completed the steps in [Native Passwordless Login](native-login-passwordless.md). 

## Request a One-Time Password

To start the user registration flow, request the delivery of a one-time password with this method from the native login manager object. 

### iOS

```
SalesforceManager.shared.nativeLoginManager()
      .startRegistration(
        email: "your-email",
        firstName: "your-first-name",
        lastName: "your-last-name",
        username: "your-username",
        newPassword: "your-password",
        reCaptchaToken: "your-recaptcha-token",
        otpVerificationMethod: "your-verification-method")
```

### Android

```
    nativeLoginManager
      .startRegistration(
        email: "your-email",
        firstName: "your-first-name",
        lastName: "your-last-name",
        username: "your-username",
        newPassword: "your-password",
        reCaptchaToken: "your-recaptcha-token",
        otpVerificationMethod: "your-verification-method")
```

## Log the User In

To complete the registration request, log the new user in with this method from the native login manager object. 

### iOS

```
    SalesforceManager.shared.nativeLoginManager()
      .completeRegistration(
        otp: "your-otp",
        requestIdentifier: "your-request-id",
        otpVerificationMethod: "your-verification-method")
```

### Android

```
    nativeLoginManager
      .completeRegistration(
        otp: "your-otp",
        requestIdentifier: "your-request-id",
        otpVerificationMethod: "your-verification-method")
```

For working examples of Headless Passwordless Login Flow on Mobile SDK, see the [iOSNativeLoginTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeLoginTemplate) or the [AndroidNativeLoginTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/AndroidNativeLoginTemplate) on GitHub.
