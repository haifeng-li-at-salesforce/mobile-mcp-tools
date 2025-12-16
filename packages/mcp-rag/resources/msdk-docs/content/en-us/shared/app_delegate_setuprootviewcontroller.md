<!-- owner=MobileSDK,date="2019-11-15",repo=”SalesforceMobileSDK-Templates”,path=”/iOSNativeTemplate/iOSNativeTemplate/AppDelegate.m”,line=136-->

```nolang
- (void)setupRootViewController
{
    RootViewController *rootVC =
        [[RootViewController alloc] initWithNibName:nil bundle:nil];
    UINavigationController *navVC =
        [[UINavigationController alloc] initWithRootViewController:rootVC];
    self.window.rootViewController = navVC;
}
```
