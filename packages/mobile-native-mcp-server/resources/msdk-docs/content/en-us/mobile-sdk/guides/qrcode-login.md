# QR Code Login with Single Access UI Bridge API

Starting in Mobile SDK 12.2, your app can log users in with a QR code. The process of generating a QR code for login requires a Visualforce page, an Apex class, the Single Access UI Bridge API (UI Bridge API for short), and Mobile SDK methods to finish the job.

## Overview of Steps

These are the high-level steps that comprise a QR code login.

1. A user logs in to Salesforce on a desktop web browser.
2. The user goes to the QR code login Visualforce page.
3. The Visualforce page requests a UI Bridge API login URL from the QR code login APEX controller class.
4. The Apex class interacts with the UI Bridge API to generate the login URL and returns it to the Visualforce page.
5. The Visualforce page encodes the QR code login URL to the QR code and displays it to the user.
6. The user scans the QR code.
   :::note
   The QR code can be scanned with any QR code compatible app on the user’s device or a QR code scanner built within the app. When using another app to scan the QR code, the login URL must be received as a deep link according to the native platform’s reference documentation.
   :::
7. The app provides the QR code login URL to Mobile SDK.
8. Mobile SDK parses the UI Bridge API parameters, frontdoor URL, and optional code verifier from the QR code login URL.
9. Mobile SDK logs the user in.

## Implementation Resources

This software, template code, and sample code can help you set up and customize QR code login.

- **Apex Class**: The custom Apex class is where an authenticated web user generates the login URL for the QR code. To configure an Apex class for QR code login, see the corresponding section in: [QR Code Login: Set Up Prerequisites].
- **Visualforce Pages**: The custom Visualforce page calls the Apex class to receive the login URL and encodes it to the QR code. To configure a Visualforce page for QR code login, see the corresponding section in [QR Code Prerequisites](qrcode-login-prereqs.md).
- **AndroidNativeKotlinTemplate**: Use this template to create Salesforce-integrated Android apps with a working QR code login implementation. The QR code login implementation is commented out and disabled by default. See [QR Code Login for Android](qrcode-login-android.md).
- **iOSNativeSwiftTemplate**: Use this template to create Salesforce-integrated iOS apps with a working QR code login implementation. See [QR Code Login for iOS](qrcode-login-ios.md).
- **Mobile SDK for Android and iOS**: Mobile SDK provides methods to receive a QR code login URL, parse the URL’s data, and log users in. These methods are useful for apps that use a QR code login URL format that matches our reference implementation and sample source code. However, apps are free to customize their own QR code login URL format. Mobile SDK also provides a method to receive the UI Bridge API frontdoor login URL (and optional code verifier for web server authorization flow), which helps when the app uses a custom QR code login URL format.

## See Also

- [_Salesforce Help_: Generate a Frontdoor URL to Bridge into UI Sessions](https://help.salesforce.com/s/articleView?id=sf.frontdoor_singleaccess.htm&type=5)
