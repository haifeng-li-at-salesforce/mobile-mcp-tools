# Setting Custom Login Servers in iOS Apps

For special cases—for example, if you’re a Salesforce partner using Trialforce—you can redirect your user’s login requests to a custom login URI.

In iOS apps, login servers are often called login hosts. Mobile SDK defines standard login URIs for production and sandbox servers in the `SalesforceSDKCore` project. These two login hosts appear in the Choose Connection login screen.

For iOS, the default login host can potentially be set through any of the following means.

1.  MDM enforced
    - At startup, your app’s MDM provider configures the login URI.
    - The MDM policy can also hide the navigation bar and Settings icon to prevent users from changing the login host.
2.  App configuration through the `info.plist` file
    - Your app can configure the default login URI in the project’s `info.plist` properties file. The login host property name is `SFDCOAuthLoginHost`.
    - At startup, the `SFDCOAuthLoginHost` setting overrides user-defined login hosts.
    - By default, `SFDCOAuthLoginHost` property is set to “login.salesforce.com”.
    - Do not use a protocol prefix such as “https://” when specifying the login URI.
3.  User configuration through the Add Connection screen

    Here’s how a user can configure a custom login server.

    ::include{src="../../shared/ios_login_configuration.md"}
    Mobile SDK enables this functionality by default. You can disable the Add Connection option by setting `SFLoginHostViewController` properties.

:::important

- At startup, MDM runtime configuration overrides compile-time settings.
- Before version 4.1, Mobile SDK apps for iOS defined their custom login URIs in the app’s Settings bundle. In Mobile SDK 4.1 and later, iOS apps lose the Settings bundle. Instead, you can use the `SFDCOAuthLoginHost` property in the app’s `info.plist` file to build in a custom login URI.

:::

**See Also**

- [Customizing the iOS Login Screen Programmatically](oauth-hide-gear-icon.md)
