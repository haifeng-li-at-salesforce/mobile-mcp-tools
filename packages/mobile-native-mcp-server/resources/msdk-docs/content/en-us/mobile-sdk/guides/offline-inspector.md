# Testing with the SmartStore Inspector

Verifying SmartStore operations during testing can become a tedious and time-consuming effort. SmartStore Inspector comes to the rescue.

During testing, it’s helpful to see if your code is handling SmartStore data as you intended. The SmartStore Inspector provides a mobile UI class for that purpose. With the SmartStore Inspector you can:

- Examine soup metadata, such as soup names and index specs for any soup
- Clear a soup’s contents
- Perform Smart SQL queries

:::note

SmartStore Inspector is for testing and debugging only. If you add code references to SmartStore Inspector, be sure to remove them before you build the final version of your app.

:::

As of Mobile SDK 6.0, you can access SmartStore Inspector in debug builds from the Dev Tools menu. This feature no longer requires you to add code to your app. See [Mobile SDK Tools for Developers](tools-intro.md).

<!-- Android Native Apps

 In native Android apps, use the `SmartStoreInspectorActivity` class to launch the SmartStore Inspector:

 ```java
<!-\- owner=MobileSDK,date=05-11-2017,repo=SalesforceMobileSDK-Android,path=native/NativeSampleApps/MobileSyncExplorer/src/com/salesforce/samples/mobilesyncexplorer/ui/MainActivity.java,line=229-\->this.startActivity(SmartStoreInspectorActivity.getIntent(this, false, null));

````

 -->
 <!-- iOS Native Apps

 In native iOS apps, send the `presentViewController` message of the current view controller to launch the SmartStore Inspector:

```
#import <SalesforceSDKCore/SFSmartStoreInspectorViewController.h>
...
<!-\- owner=MobileSDK,date=05-11-2017,repo=SalesforceMobileSDK-iOS,path=native/SampleApps/MobileSyncExplorer/MobileSyncExplorer/Classes/ContactListViewController.m,line=444-\->SFSmartStoreInspectorViewController *inspector =

    [[SFSmartStoreInspectorViewController alloc] initWithStore:self.store];

[self presentViewController:inspector animated:NO completion:nil];

```

where `self` is itself a view controller. The `SFSmartStoreInspectorViewController` class typically manages its own life cycle, so you’re typically not required to dismiss it explicitly.

-->
