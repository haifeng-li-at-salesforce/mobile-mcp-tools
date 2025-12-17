<!--
Comment re: '- (SFSmartStore *)store{}'

owner=MobileSDK,date=05-25-2017,repo=SalesforceMobileSDK-iOS,path=/Development/DocTests/51/forceios-apps/SmartStuffTest/SmartStuffTest/SmartStuffTest.m,line=20
-->

<!--
Comment re: '- (void)createAccountsSoup{}' :

owner=MobileSDK,date=05-25-2017,repo=SalesforceMobileSDK-iOS,path=/Development/DocTests/51/forceios-apps/SmartStuffTest/SmartStuffTest/SmartStuffTest.m,line=27
-->

```objc
NSString* const kAccountSoupName = @"Account";

...
- (SFSmartStore *)store
{
    return [SFSmartStore sharedStoreWithName:kDefaultSmartStoreName];
}

...
- (void)createAccountsSoup {
    if (![self.store soupExists:kAccountSoupName]) {
        NSArray *keys = @[@"path", @"type"];
        NSArray *nameValues = @[@"Name", kSoupIndexTypeString];
        NSDictionary *nameDictionary = [NSDictionary
            dictionaryWithObjects:nameValues forKeys:keys];

        NSArray *idValues = @[@"Id", kSoupIndexTypeString];
        NSDictionary *idDictionary =
            [NSDictionary dictionaryWithObjects:idValues forKeys:keys];

        NSArray *ownerIdValues = @[@"OwnerId", kSoupIndexTypeString];
        NSDictionary *ownerIdDictionary =
            [NSDictionary dictionaryWithObjects:ownerIdValues
                forKeys:keys];

        NSArray *accountIndexSpecs =
            [SFSoupIndex asArraySoupIndexes:@[nameDictionary,
                idDictionary, ownerIdDictionary]];

        NSError* error = nil;
        [self.store registerSoup:kAccountSoupName
                  withIndexSpecs:accountIndexSpecs
                           error:&error];
        if (error) {
            NSLog(@"Cannot create  soup '%@'\nError: '%@'",
                kAccountSoupName, error.localizedDescription);
        }
    }
}
```
