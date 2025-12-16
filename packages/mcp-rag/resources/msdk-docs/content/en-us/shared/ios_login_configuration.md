1.  Start the app without logging in.
2.  In the login screen, tap the Settings, or ”gear,” icon ![Settings icon](../../media/gear-icon.png) in the top navigation bar.
3.  In the Choose Connection screen, tap the Plus icon ![Plus icon](../../media/plus-icon.png).

    :::note
    In Mobile SDK 13.0, we redesigned the Add Connection screen for better accessibility. The updated screen comes with new localizable strings. If your app supports localization, see our updated list of [Localizable.strings](https://github.com/forcedotcom/SalesforceMobileSDK-iOS/blob/dev/shared/resources/SalesforceSDKResources.bundle/en.lproj/Localizable.strings) and localize the latest additions.
    :::

4.  (Optional but recommended) To help identify this configuration in future visits, enter a label.
5.  Enter your custom login host’s URI. Be sure to omit the `https://` prefix. For example, here’s how you enter a typical Experience Cloud site URI:

    ```nolang
    MYDOMAINNAME.my.site.com/fineapps
    ```
