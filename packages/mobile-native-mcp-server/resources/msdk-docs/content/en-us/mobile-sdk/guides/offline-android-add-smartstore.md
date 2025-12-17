# Adding SmartStore to Existing Android Apps

Hybrid projects created with Mobile SDK 4.0 or later automatically include SmartStore. If you used Mobile SDK 4.0+ to create an Android native project without SmartStore, you can easily add it later.

To add SmartStore to an existing native Android project (Mobile SDK 4.0 or later):

1.  Add the SmartStore library project to your project. In Android Studio, open your project’s `build.gradle` file and add a compile directive for `:libs:SmartStore` in the `dependencies` section. If the `dependencies` section doesn’t exist, create it.

    ```java
    dependencies {
    ...
      compile project(':libs:SmartStore')
    }
    ```

2.  In your `<*projectname*>App.java` file, import the `SmartStoreSDKManager` class instead of `SalesforceSDKManager`. Replace this statement:

    ```java
    import com.salesforce.androidsdk.
        app.SalesforceSDKManager
    ```

    with this one:

    ```java
    import com.salesforce.androidsdk.smartstore.app.SmartStoreSDKManager
    ```

3.  In your `<projectname>App.java` file, change your App class to extend the `SmartStoreSDKManager` class rather than `SalesforceSDKManager`.

:::note

1.  To add SmartStore to apps created with Mobile SDK 3.x or earlier, begin by upgrading to the latest version of Mobile SDK.
2.  The SmartStore plugin, `com.salesforce.plugin.smartstore.client`, uses promises internally.

Mobile SDK promised-based APIs include:

- `force+promise.js`
- The `smartstoreclient` Cordova plugin (`com.salesforce.plugin.smartstore.client`)
- `mobilesync.js`

:::

**See Also**

- [Migrating from the Previous Release](migration-migrating-from-previous.md)
