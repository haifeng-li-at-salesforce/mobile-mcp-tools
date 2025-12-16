<!-- owner=MobileSDK,date="2019-11-15",repo=”SalesforceMobileSDK-Templates”,path=”/iOSNativeTemplate/iOSNativeTemplate/RootViewController.m”,line=65-->

```nolang
- (void)request:(SFRestRequest *)request
     didSucceed:(id)jsonResponse
    rawResponse:(NSURLResponse *)rawResponse {

    NSArray *records = jsonResponse[@"records"];
    [SFLogger d:[self class]
         format:@"request:didLoadResponse: #records: %lu",
             (unsigned long)records.count];
    self.dataRows = records;
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.tableView reloadData];
    });
}
```
