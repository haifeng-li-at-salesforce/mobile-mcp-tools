# SDK Manager Classes

| Swift                        | Objective-C                  |
| ---------------------------- | ---------------------------- |
| `SalesforceManager`          | `SalesforceSDKManager`       |
| `SmartStoreSDKManager`       | `SmartStoreSDKManager`       |
| `MobileSyncSDKManager`       | `MobileSyncSDKManager`       |
| `SalesforceHybridSDKManager` | `SalesforceHybridSDKManager` |
| `SalesforceReactSDKManager`  | `SalesforceReactSDKManager`  |

The SalesforceManager class performs bootstrap configuration and initializes Mobile SDK components. It also coordinates all processes involved in app launching, including PIN code, OAuth configuration, and other bootstrap processes. In effect, SalesforceManager shields you from having to coordinate the app launch dance yourself.

In addition to SalesforceManager, Mobile SDK provides specialized SDK manager classes. The following SDK manager classes support special flavors of Mobile SDK. Their names are the same for Objective-C and Swift.

- `SmartStoreSDKManager`—subclass of SalesforceManager. For native apps that use SmartStore but not Mobile Sync. Replaces the deprecated `SalesforceSDKManagerWithSmartStore` class.
- `MobileSyncSDKManager`—subclass of `SmartStoreSDKManager`. Provides access to the full range of available Mobile SDK native features.
- `SalesforceHybridSDKManager`—subclass of `MobileSyncSDKManager`. For hybrid Cordova apps only. Includes all available Mobile SDK hybrid features.
- `SalesforceReactSDKManager`—subclass of `MobileSyncSDKManager`. For React Native apps only. Includes all available Mobile SDK React Native features.

All Mobile SDK apps use SalesforceManager or one of its subclasses to initialize Mobile SDK. To use one of these classes, you call its `initializeSDK` method in the initialization of your `AppDelegate` class. Apps normally don’t call SDK manager methods outside of `AppDelegate`. Apps created with the Mobile SDK native templates use an instance of `MobileSyncSDKManager`. The effect of this choice is that Mobile SDK internally configures `SalesforceSDKManager` to use `MobileSyncSDKManager` as its instance class.

## Swift Example

In the `AppDelegate` class, the Swift template calls `initializeSDK()` on the `MobileSyncSDKManager` class:

::include{src="../../shared/swift_initialize_sdk.md"}
The `initializeSDK()` call ensures that the correct pieces are in place for using SmartStore, Mobile Sync, and everything in the core SDK. To use a different SDK manager object, import its module and replace `MobileSyncSDKManager` in your code with the name of the appropriate manager class.

## Objective-C Example

You use the `MobileSyncSDKManager` in your `AppDelegate` class in the same way you use it in Swift apps. Here’s the pertinent template app code:

```nolang
#import <SalesforceSDKCore/SalesforceSDKManager.h>
...
#import <MobileSync/MobileSyncSDKManager.h>
...

@implementation AppDelegate

@synthesize window = _window;

- (instancetype)init
{
    self = [super init];
    if (self) {
        [MobileSyncSDKManager initializeSDK];
...
```

The `[MobileSyncSDKManager initializeSDK]` message ensures that the correct pieces are in place for using SmartStore, Mobile Sync, and everything in the core SDK. To use a different SDK manager object, import its header file and replace `MobileSyncSDKManager` in your code with the name of the appropriate manager class.

## Application Launch Flow

When the `application(_:didFinishLaunchingWithOptions:)` message arrives, you initialize the app window and set your root view controller. If appropriate, Mobile SDK executes its login and authentication flow. If the app’s connected app requires a passcode, the passcode verification screen appears before the bootstrap process can continue. The following diagram shows this flow.

![Application launch flow diagram](../../../media/new-bootstrap-ios.png)

Key points:

- If a valid access token is found, the flow bypasses Salesforce authentication.
- If no access token is found and the device is offline, the authentication module throws an error and returns the user to the login screen. `SalesforceSDKManager` doesn’t reflect this event to the app.

Besides what’s shown in the diagram, the `SalesforceSDKManager` launch process also delegates identity provider and push notification setup to apps that support those features. If the user fails or cancels either the passcode challenge or Salesforce authentication, an internal event fires. Control then returns to `AppDelegate`.

The `SalesforceSDKManager` object doesn’t reappear until a user logout, user switch, or token expiration occurs.

## Auth Helper Object

To handle login and logout events, Mobile SDK apps defer to the auth helper object.

| Swift        | Objective-C       |
| ------------ | ----------------- |
| `AuthHelper` | `SFSDKAuthHelper` |

The auth helper class defines only type-level methods. After you initialize your app window, you can call `loginIfRequired` on the auth helper object. This call causes Mobile SDK to check the status of the most recent user. If Mobile SDK detects invalid OAuth tokens, it reruns the application launch flow.

To avoid unwanted loss of data or state during reinitialization, use auth helper handler methods. These methods let you define completion blocks (or handlers) for various logout scenarios. You can define one general logout handler or separate handlers for specific operations.

- General Logout

  - :

    ```nolang
    handleLogout(completionBlock: (() → Void)!)
    ```

    For performing operations that apply to all logout scenarios. Use only this method if your app doesn’t support user switching.

- Change Current User

  - :

    ```nolang
    registerBlock(forCurrentUserChangeNotifications(completionBlock: (() → Void)!)
    ```

    For using a single completion block for logout and user switching operations. Calls the Logout Only method and then the Switch User method, passing your completion block to both methods.

- Logout Only

  - :

    ```nolang
    registerBlock(forLogoutNotifications(completionBlock: (() → Void)!)
    ```

    For handling logout operations in user-switching scenarios. Forwards your completion block to the `handleLogout` notification.

- Switch User

  - :

    ```nolang
    registerBlock(forSwitchUserNotifications(completionBlock: (() → Void)!)
    ```

    For handling user switching and initialization after a logout occurs.

## See Also

[`SFUserAccountManager`](https://forcedotcom.github.io/SalesforceMobileSDK-iOS/Documentation/SalesforceSDKCore/html/Classes/SFUserAccountManager.html)
