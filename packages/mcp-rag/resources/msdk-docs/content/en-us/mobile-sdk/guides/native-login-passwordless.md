# Native Passwordless Login

With the Headless Passwordless Login Flow, users can log in by entering their email address or phone number and verifying their identity with a one-time password (OTP). You control the front-end experience in your app. On the back end, your app calls the Headless Passwordless Login API via an Experience Cloud site to log in the user.

## Before You Begin

Before setting up the passwordless login flow, make sure these tasks are complete.
- [Complete Prerequisites for Headless Identity](https://help.salesforce.com/s/articleView?id=sf.headless_identity_prerequisites.htm&language=en_US&type=5) in Salesforce Help.
- [Configure a Connected app for the Authorization Code and Credentials Flow](https://help.salesforce.com/s/articleView?id=sf.authorization_code_credentials_configure.htm&language=en_US&type=5) in Salesforce Help.
- [Set up Native Login for Experience Cloud](native-login-experience-cloud.md).
- [Configure Experience Cloud Settings for Headless Passwordless Login](https://help.salesforce.com/s/articleView?id=sf.headless_passwordless_login_settings.htm&language=en_US&type=5) in Salesforce Help.


:::note
For public clients, we recommend that you always enable **Require reCAPTCHA** to access the Headless Passswordless Login API, which requires your app to include a reCAPTCHA token in your initial request to the API. 
:::
To learn more about setting up reCAPTCHA, see: 

- [Secure Your Headless Identity Implementation with reCAPTCHA Enterprise](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_headless_recaptcha.htm&release=246&type=5)
- [Integrate reCAPTCHA Enterprise with iOS apps](https://cloud.google.com/recaptcha-enterprise/docs/instrument-ios-apps)
- [Integrate reCAPTCHA Enterprise with Android apps](https://cloud.google.com/recaptcha-enterprise/docs/instrument-android-apps)


## Enable Headless Passwordless Login Flow

To enable the flow with Mobile SDK, add these properties to the `useNativeLogin` method call. 

- To fill in these fields, use the values from the Google Cloud project reCAPTCHA settings. 
- Only enterprise reCAPTCHA requires `reCaptchaSiteKeyId` and `googleCloudProjectId`.
- When using non-enterprise reCAPTCHA, set `reCaptchaSiteKeyId` and `googleCloudProjectId` to `nil`, and set `isReCaptchaEnterprise` to `false`.

### iOS 

```
let reCaptchaSiteKeyId = "your-recaptcha-site-key-id"
let googleCloudProjectId = "your-google-cloud-project-id"
let isReCaptchaEnterprise = true

SalesforceManager.shared.useNativeLogin(
    withConsumerKey: clientId,
    callbackUrl: redirectUri,
    communityUrl: loginUrl,
    reCaptchaSiteKeyId: reCaptchaSiteKeyId,
    googleCloudProjectId: googleCloudProjectId,
    isReCaptchaEnterprise: isReCaptchaEnterprise,
    nativeLoginViewController: nativeLoginViewController,
    scene:scene)
```

### Android

```
val reCaptchaSiteKeyId = "your-recaptcha-site-key-id"
val googleCloudProjectId = "your-google-cloud-project-id"
val isReCaptchaEnterprise = true

MobileSyncSDKManager.getInstance().useNativeLogin(
    consumerKey = clientId,
    callbackUrl = redirectUri,
    communityUrl = loginUrl,
    googleCloudProjectId = googleCloudProjectId,
    reCaptchaSiteKeyId = reCaptchaSiteKeyId,
    isReCaptchaEnterprise = isReCaptchaEnterprise)
```


## Request Password and Initialize Login              

To request the password and initialize passwordless login with OTP, use this method.

### iOS

```
SalesforceManager.shared.nativeLoginManager().submitOtpRequest(
    username: username,
    reCaptchaToken: reCaptchaToken,
    otpVerificationMethod: otpVerificationMethod)
```


### Android

```
nativeLoginManager.submitOtpRequest(
    username = username,
    reCaptchaToken = reCaptchaToken,
    otpVerificationMethod = otpVerificationMethod)
```

## Submit the Passcode              

After the OTP has been requested, the user is prompted to enter the passcode. Use this method to submit the passcode with the OTP identifier returned by `submitOtpRequest` in the previous task.

### iOS

```
SalesforceManager.shared.nativeLoginManager()
.submitPasswordlessAuthorizationRequest(
    otp: otp,
    otpIdentifier: otpIdentifier,
    otpVerificationMethod: otpVerificationMethod)
```

### Android


```
nativeLoginManager.submitPasswordlessAuthorizationRequest(
    otp = otp,
    otpIdentifier = otpIdentifier,
    otpVerificationMethod = otpVerificationMethod)
```

For working examples of Headless Passwordless Login Flow on Mobile SDK, see the [iOSNativeLoginTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeLoginTemplate) or the [AndroidNativeLoginTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/AndroidNativeLoginTemplate) on GitHub.

