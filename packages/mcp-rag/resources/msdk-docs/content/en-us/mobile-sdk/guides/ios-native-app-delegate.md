# AppDelegate Class

The `AppDelegate` class is the true entry point for an iOS app. In Mobile SDK template apps, `AppDelegate` implements a portion of the iOS `UIApplicationDelegate` interface. In a Mobile SDK Swift app with SwiftUI, `AppDelegate` performs these tasks:

- Initializes Mobile SDK through the `MobileSyncSDKManager` object
- Hands off control to `SceneDelegate` for Salesforce login and root view instantiation
- Optionally, registers your app for push notifications and sets up identity provider (IDP) functionality

## Initialization

In the `init()` method of `AppDelegate`, the `SalesforceManager` object initializes Mobile SDK. The following code shows the `init` method as implemented by the template app.

::include{src="../../shared/swift_app_delegate_init.md"}

After `init()` returns, iOS calls `application(*:didFinishLaunchingWithOptions:\_:)`. This call simply returns unless you’ve uncommented the line in it that registers your app for push notifications.

iOS next calls `application(_:configurationForConnecting:_:)` on `AppDelegate`. This method passes control to the `SceneDelegate` instance running on the UI thread. While `SceneDelegate` is launching the app’s UI, `AppDelegate` continues to call push notification protocol methods. These notifications culminate in a prompt that asks the customer to allow or deny notifications.

If the app is currently active in the background, on foregrounding iOS performs an abbreviated version of this initialization process.

## Initialization (Objective-C)

<!-- “Future” means keep hidden until it’s fine to delete.-->

The following listing shows the `init` method as implemented by the template app. It is followed by a call to the `loginIfRequired:` method of `SalesforceSDKManager` in the `application:didFinishLaunchingWithOptions:` method.

::include{src="../../shared/app_delegate_full_init.md"}

In the `init` method, the `SalesforceSDKManager` object

- Initializes Mobile SDK.
- Registers a block to handle user change notifications. This block configures the app to call your `setupRootViewController` method to reset the view for the new user.

In your `AppDelegate` class, implement `setupRootViewController` to display your app’s first screen after authentication. The `self.window` object must have a valid `rootViewController` by the time `application:didFinishLaunchingWithOptions:` completes. Here’s the Mobile SDK Objective-C template’s implementation.

::include{src="../../shared/app_delegate_setuprootviewcontroller.md"}

## UIApplication Event Handlers

You can also use the `UIApplicationDelegate` protocol to implement `UIApplication` event handlers. Important event handlers that you might consider implementing or customizing include:

- application(\_:didFinishLaunchingWithOptions:)

  - : Called at the beginning of your app’s life-cycle. The template app implementation simply returns. Optionally, you can use this method to register the app for push notifications.

- applicationDidBecomeActive(\_:)

  - : Called after the application is foregrounded.

- application(\_:didRegisterForRemoteNotificationsWithDeviceToken:)

  - : Used for handling incoming push notifications from Salesforce. Follow the commented instructions and code in the template app’s stub implementations.

<!-- -   - Swift

    - :
      ```nolang
      application(_:didFinishLaunchingWithOptions:)
      ```

 - Objective-C

    - :
      ```nolang
      application:didFinishLaunchingWithOptions:
      ```



    First entry point when your app launches. Called only when the process first starts (not after a backgrounding/foregrounding cycle). The template app uses this method to:

    -   Initialize the `window` property
    -   Set the root view controller to the initial view controller (see `initializeAppViewState`)
    -   Display the initial window
    -   Initiate authentication
    After these actions, you can optionally customize the look and behavior of the Salesforce login screen. The template app provides code here that you can uncomment to perform these customizations.

    Finally, this method sends the `loginIfRequired` to display the Salesforce login screen.

-   - Swift

    - :
      ```nolang
      applicationDidBecomeActive(_:)
      ```

 - Objective-C

    - :
      ```nolang
      applicationDidBecomeActive:
      ```



    Called every time the application is foregrounded.

-   - Swift

    - :
      ```nolang
      application(_:didRegisterForRemoteNotificationsWithDeviceToken:)
      ```

      ```nolang
      application:didFailToRegisterForRemoteNotificationsWithError:
      ```

 - Objective-C

    - :
      ```nolang
      application(_:didRegisterForRemoteNotificationsWithDeviceToken:)
      ```

      ```nolang
      application:didFailToRegisterForRemoteNotificationsWithError:
      ```



    Used for handling incoming push notifications from Salesforce. Follow the commented instructions and code in the template app’s stub implementations.


 -->

For a list of all `UIApplication` event handlers, see the [UIApplicationDelegate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate) documentation.

**See Also**

- [Using Push Notifications in iOS](push-using-ios.md)
