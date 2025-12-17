# Using Advanced Authentication

By default, Mobile SDK automatically uses standard authentication. On the server side, however, Salesforce orgs can choose to use advanced authentication by configuring either My Domain or MDM. Advanced auth requires a small amount of configuration in most Mobile SDK apps.

<!--
## Certificates-Based Browser-Based, and Native Implementations

For MDM certificate-based authentication, Salesforce provides a login certificate to the client mobile device. At login, the client device forwards this certificate to the MDM service for identification, and the MDM service checks the certificate’s validity. The certificate, rather than login credentials, verifies the customer’s identity.

“Browser-based auth” and “advanced auth” are synonymous terms. With browser-based auth, you rely on a browser’s built-in security controls to obtain and securely handle the customer’s login credentials. On Android, for example, Mobile SDK implements advanced auth through a custom Chrome tab. On iOS, Mobile SDK uses an iOS class that accesses the Safari browser (`SFSafariViewController` in Mobile SDK 7.x). Mobile SDK helps you if you use browser-based advanced auth.

Another option is custom native advanced auth. If you choose a native implementation, the work and responsibility are all yours.
-->

## Which Type of Auth Will Mobile SDK Use?

<!-- Do we need to mention various ways of implementing AA through MDM?-->

At runtime, Mobile SDK bases its authentication type on the login org’s configuration.

- If browser-based authentication is configured for the org’s My Domain, Mobile SDK conforms to the My Domain setting.
- If browser-based authentication hasn’t been configured for the org’s My Domain, Mobile SDK uses advanced auth only if the org uses MDM certificate-based auth.
- If the org doesn’t use My Domain browser-based authentication or MDM certificate-based auth, Mobile SDK uses standard auth.

## Advanced Auth User Flow on iOS

For browser-based authentication, customers log in through the familiar Salesforce web view, followed by an authorization screen.

For certificate-based authentication, instead of a login screen, the operating system prompts the customer to choose a certificate for authentication. The customer does not enter credentials. After choosing the certificate, the customer sees the authorization screen.

## Development Requirements

Mobile SDK requirements for implementing advanced auth are minimal. Most apps require only a small amount of configuration. Android apps that use MDM certificate-based auth do not require client-side configuration.

## Configuring a Connected App

- In a Salesforce connected app, under API (Enable OAuth Settings):
  - Apply the typical OAuth settings for Mobile SDK apps. See [API (Enable OAuth Settings)](connected-apps-howto.md#oauth).
  - Make sure that **Require Secret for Web Server Flow** is _not_ selected.

## Configuring My Domain Settings

An org administrator can require advanced auth through My Domain settings. To take advantage of advanced auth:

1.  From Setup, in the Quick Find box, enter `My Domain`, and then select **My Domain**.
2.  In My Domain settings, under Authentication Configuration, the administrator selects one or both of the following options:

    - **Use the native browser for user authentication on Android**
    - **Use the native browser for user authentication on iOS**

    See [“Customize Your My Domain Login Page for Mobile Auth Methods” in Salesforce Help](https://help.salesforce.com/articleView?id=domain_name_login_mobile_auth_methods.htm).

## Configuring MDM Settings

For logins managed through MDM, Mobile SDK uses advanced auth only if the org’s MDM settings specify certificate-based auth. An org’s MDM suite must:

- Set the `RequireCertAuth` property to `true`.
- **Android only:** Set the `ManagedAppCertAlias` property to an alias name.

## Login Session Management with Advanced Authentication

With advanced auth, logging out of an app can cause surprising behavior. How this behavior can affect your app depends on the type of login your app uses.

- Certificate-Based (MDM) Login

  - : With certificates, a customer remains authenticated until the certificate is revoked. A certificate remains valid until the issuer revokes it. If a customer logs out of the app while the certificate is valid, the Salesforce login screen appears briefly. However, because the certificate automatically supplies the customer’s credentials, the flow goes directly to the authorization (”Allow Access”) screen. By choosing **Allow**, the customer obtains new access and refresh tokens and can continue using the app. In effect, a customer can’t log out until the MDM issuer revokes the certificate.

- Web Server OAuth Login

  - : During OAuth 2.0 authentication, Salesforce creates a temporary short-term session to bridge the gap between login and the Salesforce authorization (”Allow Access”) screen. This temporary session, which uses a cookie, is not tied to the OAuth refresh or access token and therefore isn’t invalidated at logout. Instead, the session remains valid until it expires. The most recently authenticated customer remains logged in until the temporary session expires. These sessions have an intentionally short lifetime, after which the user can log in normally.

    The following unexpected behavior can occur during the lifetime of the temporary session: If the customer tries to log out and log in again before the cookie expires, the flow skips the login prompt. Instead, it goes directly to Salesforce authorization. By choosing **Allow**, the customer automatically obtains new access and refresh tokens and can continue using the app.

    This behavior doesn’t occur with standard web view authentication because the web view doesn’t preserve cookies from previous authentications. It also doesn’t occur if the customer logs out after the temporary session expires. Mobile SDK apps, including the Salesforce app, can’t control cookies from the Salesforce service.

:::important

Although advanced auth doesn’t use swizzling, the login page remains full-screen. This presentation can give customers the impression that they've temporarily left your app.

:::

## See Also

- [Using MDM with Salesforce Mobile SDK Apps](oauth-mdm.md).
- For information on server-side My Domain configuration, see [Customize Your My Domain Login Page with Your Brand](https://help.salesforce.com/articleView?id=domain_name_login_branding.htm) in _Salesforce Help_.
- For connected app details, see [Create a Connected App](https://help.salesforce.com/articleView?id=connected_app_create.htm) in _Salesforce Help_.
- For MDM configuration details, see [“Mobile Device Management (MDM)”](https://help.salesforce.com/s/articleView?id=sf.mobile_security_mdm.htm) in _Salesforce Mobile App Security Guide_.
- For information on configuring iOS URL schemes, look up at [“Inter-App Communication” or “Custom URL Schemes” in the _App Programming Guide for iOS_ at developer.apple.com/documentation](https://developer.apple.com/documentation/).
