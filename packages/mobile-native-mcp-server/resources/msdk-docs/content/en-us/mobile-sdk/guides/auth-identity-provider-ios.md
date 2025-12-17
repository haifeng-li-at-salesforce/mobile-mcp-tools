# Configuring an iOS App as an Identity Provider

You can configure any app built on Mobile SDK 11.0 or later as an identity provider. You configure it to identify itself as an identity provider, and Mobile SDK does the rest.

The easiest way to create an identity provider app is by using the Mobile SDK Mobile SDK iOSIDPTemplate. This template is available on GitHub in the [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates) repo. Use the `forceios createwithtemplate` command with the URI of the template repo, as shown in the following command-line example.

<!-- owner=MobileSDK,date="2019-08-09",repo=”none”,path=””,line=,length=-->

```bash
$ forceios createwithtemplate
Enter URI of repo containing template application: IOSIDPTemplate
Enter your application name: MyIDP-iOS
Enter your package name: com.acme.android
Enter your organization name (Acme, Inc.): Acme Systems
Enter output directory for your app (leave empty for the current directory): MyIDP-iOS
```

## Convert an Existing Mobile SDK iOS App into an Identity Provider

To convert an existing Mobile SDK 11.x (or newer) iOS app into an identity provider:

1.  In the `SalesforceSDKManager`, set isIdentityProvider to true.
2.  In your `AppDelegate` class implementation, find the following method and reinstate the commented code as follows:

    - Swift

      - :
        ::include{src="../../shared/func_application_app_open_options.md"}

    - Objective-C

      - :
        <!-- owner=MobileSDK,date="2019-08-09",repo=”SalesforceMobileSDK-Templates”,path=”/iOSNativeTemplate/iOSNativeTemplate/AppDelegate.m”,line=114,length=-->

        ```java
        - (BOOL)application:(UIApplication *)app

                    openURL:(NSURL *)url
                    options:(NSDictionary<UIApplicationOpenURLOptionsKey,id>*)options {

            return [[SFUserAccountManager sharedInstance]
                handleIDPAuthenticationResponse:url options:options];
        }
        ```

3.  Add your custom URI scheme to the `info.plist` configuration. For example, the following XML defines “sampleidpapp” as a custom URI scheme:
    <!-- owner=MobileSDK,date="2019-08-09",repo=”none”,path=””,line=,length=-->

    ```xml
    <key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>sampleidpapp</string>
            </array>
        </dict>
    </array>
    ```

To convert an existing Mobile SDK 11.x (or newer) iOS app into an identity provider, go to the `SalesforceSDKManager`<!-- Find out what XML tag to use for SalesforceSDKManager-->. Then:

1.  Set isIdentityProvider to true.
2.  In `SFUserAccountManager`, initiate the flow using the following method.

    ```swift
    - (void)kickOffIDPInitiatedLoginFlowForSP:(SFSDKSPConfig *)config
                                 statusUpdate:(void(^)(SFSPLoginStatus))statusBlock
                                      failure:(void(^)(SFSPLoginError))failureBlock;
    ```

## (Optional) Configure Keychain for your IDP Flow

For IDP-initiated login, you can use a shared keychain group to communicate between IDP and IDP client apps, which reduces the number of times a user has to switch between apps.

1.  Add a keychain group in the “Keychain Sharing” section of your Xcode project configuration.

    If you’ve already configured an app group, you can use the keychain group automatically generated from the app group.

    :::note

    The keychain you use for IDP and the keychain you use for other Mobile SDK operations can be set independently.

    :::

2.  If you configure the app under the keychain group and want to share only the IDP token without the rest of the keychain items, set `KeychainHelper.accessGroup` to the app’s private keychain access group. Otherwise, the app defaults to the first keychain group in the list.

## (Optional) Configure Your IDP App to Use Keychain

1.  On the IDP app, go to the `SalesforceSDKManager` and set `isIdentityProvider` to `true`.
2.  Initiate the flow in `SFUserAccountManager` by using this method.

    ```swift
    - (void)kickOffIDPInitiatedLoginFlowForSP:(SFSDKSPConfig *)config
    statusUpdate:(void(^)(SFSPLoginStatus))statusBlock
    failure:(void(^)(SFSPLoginError))failureBlock;

    ```

## (Optional) Customizing the Identity Provider UI

When a client app forwards a login request, the identity provider typically presents a selection dialog box. This dialog box, which lists known users, appears only if at least one of the following conditions is true:

- A user has logged in from any other identity provider client app before this request.
- A user has directly logged in to the identity provider app before this request.
- Multiple users are currently logged in.

:::note

Note: If no users have logged in before this request, Mobile SDK displays a login screen and continues to authentication after the user successfully finishes the login flow.

:::

To customize the user selection view, an identity provider app extends the `UIViewController` class and must also implement the `SFSDKUserSelectionView` protocol.

<!-- owner=MobileSDK,date="2019-08-09",repo=”SalesforceMobileSDK-iOS”,path=”/libs/SalesforceSDKCore/SalesforceSDKCore/Classes/IDP/SFSDKUserSelectionView.h”,line=35,length=-->

```swift
@protocol SFSDKUserSelectionViewDelegate
- (void)createNewUser:(NSDictionary *)spAppOptions;
- (void)selectedUser:(SFUserAccount *)user
        spAppContext:(NSDictionary *)spAppOptions;
- (void)cancel();

@protocol SFSDKUserSelectionView<NSObject>
    @property (nonatomic,weak) id<SFSDKUserSelectionViewDelegate> userSelectionDelegate;
    @property (nonatomic,strong) NSDictionary *spAppOptions;
@end
```

In identity provider client apps, Mobile SDK sets up an instance of the `userSelectionDelegate` and `spAppOptions` properties defined in the `SFSDKUserSelectionView` protocol. You use these objects in your identity provider’s view controller to notify Mobile SDK of the user’s user account selection. For example, assume that you’ve implemented the `SFSDKUserSelectionView` protocol in a `UIViewController` class named `UserSelectionViewController`. You can then use that view controller as the user selection dialog box by setting the `idpUserSelectionBlock` on the `SalesforceSDKManager` shared instance, as follows:

<!-- owner=MobileSDK,date="2019-08-09",repo=”none”,path=””,line=,length=-->

```swift
//optional : Customize the User Selection Screen
[SalesforceSDKManager sharedManager].idpUserSelectionBlock =
    ^UIViewController<SFSDKUserSelectionView> *{
        UserSelectionViewController *controller =
            [[UserSelectionViewController alloc] init];
        return controller;
}
```
