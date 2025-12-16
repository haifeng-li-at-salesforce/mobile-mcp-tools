# Use Your Branded Login Page

Starting with Mobile SDK 5.2, you can display a branded Experience Cloud site login page on your client app.

Typically, the authorization URL for a branded login page looks like this example:

```bash
https://MYDOMAINNAME.my.site.com/services/oauth2/authorize/<brand>?response_type=code&...</brand>
```

In this URL, `<brand>` is the branding parameter that you reuse in your app. Use these methods to set this value, where loginBrand is the branding parameter for your Experience Cloud site login page.

- Android

  - :

    ```java

      SalesforceSDKManager.getInstance().setLoginBrand(brandedLoginPath);

    ```

### iOS

- Swift

  - :

    ```swift
    SalesforceManager.shared.brandLoginIdentifier = loginBrand
    ```

- Objective-C

  - :

    ```objectivec

      [SalesforceSDKManager sharedManager].brandLoginPath = loginBrand;

    ```
