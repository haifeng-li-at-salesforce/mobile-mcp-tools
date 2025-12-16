<!-- owner=MobileSDK,date="2019-11-15",repo=”SalesforceMobileSDK-Templates”,path=”/iOSNativeTemplate/iOSNativeTemplate/RootViewController.m”,line=53-->

```nolang
- (void)viewDidLoad
{
    [super viewDidLoad];
    self.title = @"Mobile SDK Sample App";

    SFRestRequest *request =
        [[SFRestAPI sharedInstance]
            requestForQuery:@"SELECT Name FROM Contact LIMIT 10"
                 apiVersion:kSFRestDefaultAPIVersion];
    [[SFRestAPI sharedInstance] send:request delegate:self];
}
```
