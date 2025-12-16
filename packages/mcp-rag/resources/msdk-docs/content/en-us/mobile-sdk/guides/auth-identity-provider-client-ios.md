# Configuring an iOS App as an Identity Provider Client

You can configure any app built on Mobile SDK 11.0 or later as an identity provider client. You configure it to identify itself as an identity provider client and to specify its identity provider. Mobile SDK does the rest.

1.  In the `init()` method of your `AppDelegate` class, specify the URI scheme for the identity provider you’re using:

    - Swift

      - :

        ```swift
        SalesforceManager.shared.identityProviderURLScheme = "sampleidpapp"
        ```

    - Objective-C

      - :

        ```

        [SalesforceSDKManager sharedManager].idpAppURIScheme = @"sampleidpapp";

        ```

2.  In your app's `info.plist` file, add the URI scheme defined in your identity provider clients’ connected app:

    ```xml
    <key>CFBundleURLTypes</key>
    <array>
       <dict>
           <key>CFBundleURLSchemes</key>
           <array>
               <string>sampleidpclientapp</string>
           </array>
       </dict>
    </array>
    ```

3.  In your `AppDelegate` class implementation, find the following method and reinstate the commented code as follows:

    - Swift

      - :
        ::include{src="../../shared/func_application_app_open_options.md"}

    - Objective-C

      - :

        ```objectivec
        - (BOOL)application:(UIApplication *)app
                    openURL:(NSURL *)url
                    options:(NSDictionary<UIApplicationOpenURLOptionsKey,id>*)options {

            return [[SFUserAccountManager sharedInstance]
                handleIDPAuthenticationResponse:url options:options];
        }
        ```

Your app is now ready for use as an identity provider client.

## (Optional) Configure Your IDP Client App to Use Keychain

After you set up your IDP app to initiate authentication, update the client to complete the flow. You can use these methods to handle the incoming IDP URL.

- Swift

  - :
    ```swift
    public func handleIdentityProviderCommand(from url: URL,
    with options: [AnyHashable: Any],
    completion: @escaping (Result<(UserAccount, AuthInfo),
    UserAccountManagerError>) -> Void) -> Bool {
        return __handleIDPAuthenticationCommand(url, options: options, completion: { (authInfo, userAccount) in
            completion(Result.success((userAccount, authInfo)))
        }) { (authInfo, error) in
            completion(Result.failure(.loginFailed(underlyingError: error, authInfo: authInfo)))
        }
    }
    ```

- Objective-C

  - :

    ```objectivec
    - (BOOL)handleIDPAuthenticationCommand:(NSURL *)url
    options:(nonnull NSDictionary *)options
    completion:(nullable SFUserAccountManagerSuccessCallbackBlock)completionBlock
    failure:(nullable SFUserAccountManagerFailureCallbackBlock)failureBlock NS_REFINED_FOR_SWIFT;
    ```

## (Optional) Customizing the Login Flow Selection View in the Client App

Mobile SDK provides template apps for both identity providers and their client apps. The client template defines a view that lets the user choose to log in through an identity provider or the Salesforce login screen. When a user opens an app built from the client template, the app presents this view if

- the user hasn’t yet logged in, or
- the current user hasn't been set.

To customize the login style selection view, a client app extends the `UIViewController` class and also must implement the `SFSDKLoginFlowSelectionView` protocol.

```java
@protocol SFSDKLoginFlowSelectionViewDelegate<NSObject>
/**
 * Used to notify the SDK of user selection on the login flow selection view
 * @param controller instance invoking this delegate
 * @param appOptions addl. name value pairs sent from the sdk for
 * the SFSDKLoginFlowSelectionView
 */
-(void)loginFlowSelectionIDPSelected:(UIViewController *)controller
    options:(NSDictionary *)appOptions;

/**
 * Used to notify the SDK of user selection on the login flow selection view
 * @param controller instance invoking this delegate
 * @param appOptions addl. name value pairs sent from the sdk for
 * the SFSDKLoginFlowSelectionView
 */
-(void)loginFlowSelectionLocalLoginSelected:(UIViewController *)controller
    options:(NSDictionary *)appOptions;

@end
```

```java
    @protocol SFSDKLoginFlowSelectionView<NSObject>
    @property (weak,nonatomic) id <SFSDKLoginFlowSelectionViewDelegate>selectionFlowDelegate;
    @property (nonatomic,strong) NSDictionary *appOptions;
@end
```

During the client app’s identity provider flow, Mobile SDK sets up an instance of the `selectionFlowDelegate` and `appOptions` properties defined in this protocol. You use these artifacts in your view controller to notify Mobile SDK of the user's login method selection. For example, assume that you’ve implemented the `SFSDKUserSelectionView` protocol in a `UIViewController` class named `IDPLoginNavViewController`. You then can use that view controller as the user selection dialog box by setting the `idpLoginFlowSelectionAction` on the `SalesforceSDKManager` shared instance, as follows:

```java
//optional : Customize the Login Flow Selection screen
[SalesforceSDKManager sharedManager].idpLoginFlowSelectionAction = ^UIViewController<SFSDKLoginFlowSelectionView> *{
    IDPLoginNavViewController *controller =[[IDPLoginNavViewController alloc] init];
    return controller;
}
```
