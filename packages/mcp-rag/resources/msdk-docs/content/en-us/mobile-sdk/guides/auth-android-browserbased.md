# Upgrading Android Single Sign-On Apps to Google Login Requirements

In 2018, Google officially dropped support for logins through embedded web views in favor of browser-based login flows. As a result, older Mobile SDK Android apps that use Google as an SSO identity provider might require code changes.

Browser-based authentication is also known as “advanced authentication”. To upgrade your older apps, you implement advanced authentication as described in [Configuring Advanced Authentication in iOS Apps](auth-ios-advanced.md).

Mobile SDK supports advanced authentication through a Chrome custom tab in the application. If Chrome is not available at runtime, Mobile SDK uses the default system browser. Browser-based authentication requires the following.

- A browser must be installed on the device.
- If you use MDM, the browser must be installed in the work partition.

**See Also**

- [Chrome Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs)
- [Google’s developer blog](https://developers.googleblog.com/2016/08/modernizing-oauth-interactions-in-native-apps.html)
