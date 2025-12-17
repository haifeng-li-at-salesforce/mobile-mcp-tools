# Code Modifications (iOS)

To handle notifications in iOS apps, you register in the `AppDelegate` class using the provided template code. In Swift apps, you must add an extension to decrypt incoming Notification Builder notifications.

## Registering to Receive Notifications

Mobile SDK for iOS provides the `PushNotificationManager` class to handle push registration. To use it in Objective-C, include `@import SalesforceSDKCore` to support `PushNotificationManager`. Swift doesn’t require a specific import.

The `SFPushNotificationManager` class is available as a runtime shared instance:

- Swift

  - :
    ```nolang
    PushNotificationManager.sharedInstance()
    ```

- Objective-C

  - :
    ```nolang
    [SFPushNotificationManager sharedInstance]
    ```

This class implements these registration methods:

- Swift

  - :

    ```nolang
    func registerForRemoteNotifications()

    func application(_ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data)

    func registerSalesforceNotifications(completionBlock: (() → Void)?,
        fail: (() → Void)?)

    func unregisterSalesforceNotifications(withCompletionBlock: UserAccount,
        completionBlock: (() → Void)?) // for internal use
    ```

- Objective-C

  - :

    ```nolang
    - (void)registerForRemoteNotifications;

    - (void)didRegisterForRemoteNotificationsWithDeviceToken:
        (NSData*)deviceTokenData;

    - (BOOL)registerSalesforceNotificationsWithCompletionBlock:(nullable
        void (^)(void))completionBlock failBlock:(nullable void (^)(void))failBlock;

    - (BOOL)unregisterSalesforceNotificationsWithCompletionBlock:(SFUserAccount*)user
        completionBlock:(nullable void (^)(void))completionBlock; // for internal use
    ```

Mobile SDK calls `unregisterSalesforceNotifications` at logout.

:::note

- Salesforce encrypts Notification Builder notifications.
- To support full content push notifications, your iOS app must implement the decryption class extension.
- If a Mobile SDK app that hasn’t implemented decryption receives an encrypted Salesforce notification, the customer sees only the notification title.
- Salesforce does not encrypt Apex push notifications.

:::

## Implementing a Decryption Extension (Swift)

In Mobile SDK 8.2 and later, the forceios [iOSNativeSwiftTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/master/iOSNativeSwiftTemplate/iOSNativeSwiftTemplate) app requests notification authorization through the iOS `UNUserNotificationCenter` object. A specialized version of `iOSNativeSwiftTemplate`, [iOSNativeSwiftEncryptedNotificationTemplate](https://github.com/forcedotcom/SalesforceMobileSDK-Templates/tree/dev/iOSNativeSwiftEncryptedNotificationTemplate), extends the `UNNotificationServiceExtension` iOS class to handle notification decryption. This extension class, `NotificationService`, provides boilerplate decryption code that Mobile SDK apps can use without changes. To support encrypted notifications, you must be using Mobile SDK 8.2 or later, and your app must include this extension.

To create a Swift project that supports Notification Builder encrypted notifications, you can use the `iOSNativeSwiftEncryptedNotificationTemplate` template with forceios. Even if you’re updating an existing Mobile SDK project, it’s easiest to start fresh with a new forceios template project. If you’d rather update a Swift project manually, skip to “Example: Add Push Registration Manually (Swift)”.

1.  Install the latest forceios version from node.js:

    ```nolang
    [sudo] npm install -g forceios
    ```

2.  Call the forceios `createWithTemplate` command:

    ```nolang
    forceios createWithTemplate
    ```

3.  At the first prompt, enter `iOSNativeSwiftEncryptedNotificationTemplate`:

    ```nolang
    forceios createWithTemplate
    Enter URI of repo containing template application or a Mobile SDK template name:
        iOSNativeSwiftEncryptedNotificationTemplate
    ```

4.  In the remaining prompts, enter your company and project information. If your information is accepted, forceios creates a project that is ready for encrypted notifications.
5.  If you’re updating an older Mobile SDK project, copy your app-specific resources from your old project into the new project.

## Example: Add Push Registration Manually (Swift)

This example requires an existing app built on Mobile SDK 8.2 or higher and based on the `iOSSwiftNativeTemplate` project.

**Configure Push Notification Registration in `AppDelegate`**

1.  In the `application(_:didFinishLaunchingWithOptions:)` method, uncomment the call to `registerForRemotePushNotifications`.

    ```swift
    func application(_ application: UIApplication, didFinishLaunchingWithOptions
        launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        self.window = UIWindow(frame: UIScreen.main.bounds)
        self.initializeAppViewState()
        // If you wish to register for push notifications, uncomment the line below.
        // Note that if you want to receive push notifications from Salesforce,
        // you will also need to implement the
        // application(application, didRegisterForRemoteNotificationsWithDeviceToken)
        // method (below).
        //
        self.registerForRemotePushNotifications()
        ...
    ```

    The `registerForRemotePushNotifications` method attempts to register your app with Apple for receiving remote notifications. If registration succeeds, Apple passes a device token to the `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)` method of your `AppDelegate` class.

2.  In the `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)` method, uncomment the call to `didRegisterForRemoteNotifications(withDeviceToken:)`.

    ```swift
    func application(_ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        // Uncomment the code below to register your device token with the
        // push notification manager
        //
            didRegisterForRemoteNotifications(deviceToken)
            ...
        }
        ...
    ```

3.  To log a debugger error if registration with Apple fails, add the following code to the `application(_:didFailToRegisterForRemoteNotificationsWithError:)` method.

    ```swift
    func application(_ application: UIApplication,
        didFailToRegisterForRemoteNotificationsWithError error: Error ) {

        // Respond to any push notification registration errors here.
        SalesforceLogger.d(type(of:AppDelegate.self),
            message:"Failed to get token, error: \(error)")
        }
    }
    ```

**Add the Decryption Extension**

1.  In the Project navigator, select the target where you modified `AppDelegate`.
2.  In Project settings, select **Signing & Capabilities**.
3.  Click **+ Capability** and search for “Push Notifications”. Double-click to add the capability.
4.  Follow the steps at [“Add a Service App Extension to Your Project” in _Modifying Content in Newly Delivered Notifications_](https://developer.apple.com/documentation/usernotifications/modifying_content_in_newly_delivered_notifications) at `developer.apple.com/documentation`.
5.  If you plan to test the extension with its own settings, you can accept the prompt to activate a scheme. Otherwise, click **Cancel**.
6.  Clone or download the [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates) repo.
7.  From the `iOSNativeSwiftEncryptedNotificationTemplate/NotificationServiceExtension` folder, replace the code in your new extension’s Swift file with the code from `NotificationServiceExtension.swift`.
