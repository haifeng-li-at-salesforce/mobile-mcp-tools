# Configuring Advanced Authentication in iOS Apps

To support advanced auth, all iOS apps require some custom configuration.

Advanced auth in iOS uses the latest iOS technology supported by the current Mobile SDK release.

## Standard Authentication Versus Advanced Authentication

Here’s a partial list of differences between standard and advanced auth on iOS. These differences are specific to My Domain browser-based authentication.

- Standard auth flow: This flow uses `WKWebView`. This class offers a superior user experience with access to the iOS view toolbar and other compelling features.
- Advanced auth flow: Advanced auth uses the latest iOS technology supported by the current Mobile SDK release. It’s the more secure option—it doesn’t allow the app to set cookies or inject content into the view without the customer's consent. In advanced mode, the auth flow doesn’t swizzle.

## App Configuration

In iOS apps, the steps are the same for both MDM certificate-based and browser-based approaches. Perform the following steps to guarantee compatibility with all orgs.

- Add your custom URL schemes for the OAuth redirect URI to your project’s `Info.plist` file.

  1.  In your app’s `Info.plist` file, create a key named `CFBundleURLTypes`.
  2.  Assign the key an array that contains a dictionary with the following keys:

      <sfdocstbl><table><col /><col /><col /><thead><tr><th>Name</th><th>Type</th><th>Value</th></tr></thead><tbody><tr><td><code>CFBundleURLName</code></td><td>String</td><td>A unique abstract name of the URL scheme, preferably an identifier in reverse-DNS style. For example: <code><!-- owner=MobileSDK,date="2019-08-09",repo=”none”,path=””,line=,length=-->com.acme.myscheme</code>.</td></tr><tr><td><code>CFBundleURLSchemes</code></td><td>Array of strings</td><td>URL scheme names, such as <code>http</code> and <code>mailto</code>.</td></tr></tbody></table></sfdocstbl>

## Example

If your OAuth callback URI is `com.mydomain.myapp://oauth/success`, add the following key to your `Info.plist` file:

<!-- owner=MobileSDK,date="2019-08-09",repo=”none”,path=””,line=,length=-->

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.mydomain.myapp</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.mydomain.myapp</string>
        </array>
    </dict>
</array>
```

In this example, the URL scheme and URL name are the same, but this matching is not required. You can add as many schemes as your app requires.

## See Also

- For information on server-side My Domain configuration, see [Customize Your My Domain Login Page with Your Brand](https://help.salesforce.com/articleView?id=domain_name_login_branding.htm) in _Salesforce Help_.
- For MDM configuration details, see [“Mobile Device Management (MDM)”](https://help.salesforce.com/s/articleView?id=sf.mobile_security_mdm.htm) in _Salesforce Mobile App Security Guide_.
- For information on configuring iOS URL schemes, look up at [“Inter-App Communication” or “Custom URL Schemes” in the _App Programming Guide for iOS_ at developer.apple.com/documentation/.](https://developer.apple.com/documentation/).
