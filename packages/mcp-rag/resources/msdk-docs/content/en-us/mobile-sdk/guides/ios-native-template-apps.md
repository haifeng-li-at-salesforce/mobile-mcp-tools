# iOS Native Template Apps

Mobile SDK provides a comprehensive set of iOS template apps to support different development use cases.

:::important

Where possible, we changed noninclusive terms to align with our company value of Equality. We maintained certain terms to avoid any effect on customer implementations.

:::

Here’s a comparison summary of the forceios default templates.

- Swift Template

  - :
    - [iOSNativeSwiftTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeSwiftTemplate)
    - Demonstrates two levels of master-detail navigation.
    - Uses SwiftUI for all views
    - Demonstrates model-view architecture
    - Distributes management of app life-cycle events between `AppDelegate` and `SceneDelegate`
    - Handles asynchronous REST responses with various Combine Publisher objects
    - Demonstrates offline features using SmartStore and Mobile Sync

- Objective-C Template

  - :
    - [iOSNativeTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeTemplate)
    - Displays a single list of contacts
    - Manages app life-cycle events through `AppDelegate`
    - Handles asynchronous REST responses in `SFRestDelegate`

You can find both templates in the [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates) repo. How you use them with forceios is slightly different.

- To select the native Swift application type, press `Return` or type `native_swift`:

  ```nolang
  $ forceios create
  Enter your application type (native_swift or native, leave empty for native_swift): <PRESS RETURN>
  ...
  ```

- To select the Objective-C application type, type `native`:

  ```nolang
  $ forceios create
  Enter your application type (native_swift or native, leave empty for native_swift): native
  ...
  ```

## Using Other Templates

Mobile SDK also offers the following specialized iOS templates.

- [MobileSyncExplorerSwift](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/MobileSyncExplorerSwift)

  - : A more extended example of Mobile Sync technology. Includes a Recent Contacts widget implementation. Also demonstrates iPad features, including multiple windows and landscape orientation support.

- [iOSIDPTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSIDPTemplate)

  - : For creating identity provider apps with Mobile SDK.

- [iOSNativeSwiftEncryptedNotificationTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeSwiftEncryptedNotificationTemplate)

  - : Demonstrates how to process encrypted notifications.

- [iOSNativeSwiftPackageManagerTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeSwiftPackageManagerTemplate)

  - : Demonstrates how to set up an iOS app with SwiftPackageManager.

- [iOSNativeLoginTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeLoginTemplate)

  - : Demonstrates how to set up native login.

You use these templates with the `forceios createwithtemplate` command. For example, to create an app with the Swift encrypted notifications template:

```nolang
  $ forceios createwithtemplate
  Enter URI of repo containing template application: iOSNativeSwiftEncryptedNotificationTemplate
  ...
```

:::note

(Mobile SDK 8.0 and later) If you’re using a template from the SalesforceMobileSDK-Templates repo, you can specify just the template name without the URI path.

:::
