<!-- owner=MobileSDK,date="2019-11-15",repo=”SalesforceMobileSDK-Templates”,path=”/iOSNativeTemplate/iOSNativeTemplate/AppDelegate.m”,line=58-->

```nolang
- (instancetype)init
{
    self = [super init];
    if (self) {
        [MobileSyncSDKManager initializeSDK];

        //App Setup for any changes to the current authenticated user

        [SFSDKAuthHelper registerBlockForCurrentUserChangeNotifications:^{
            [self resetViewState:^{
                [self setupRootViewController];
            }];
        }];
    }
    return self;
}
```
