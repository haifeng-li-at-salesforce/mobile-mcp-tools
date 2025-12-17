# Adding Mobile Sync to Existing Android Apps

The following steps show you how to add Mobile Sync to an existing Android project (hybrid or native) created with Mobile SDK 4.0 or later.

1.  If your app is currently built on Mobile SDK 3.3 or earlier, upgrade your project to the latest SDK version as described in [Migrating from the Previous Release](migration-migrating-from-previous.md).

2.  Add the Mobile Sync library project to your project. Mobile Sync uses SmartStore, so you also need to add that library if your project wasn’t originally built with SmartStore.

    1.  In Android Studio, add the `libs/MobileSync` project to your module dependencies.

3.  Throughout your project, change all code that uses the `SalesforceSDKManager` object to use `MobileSyncSDKManager` instead.

    :::note

    If you do a project-wide search and replace, be sure _not_ to change the `KeyInterface` import, which should remain

    ```java
    import com.salesforce.androidsdk.app.SalesforceSDKManager.KeyInterface;
    ```

    :::
