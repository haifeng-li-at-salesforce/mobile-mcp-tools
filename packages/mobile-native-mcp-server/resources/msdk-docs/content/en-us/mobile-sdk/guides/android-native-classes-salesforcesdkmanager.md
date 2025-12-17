# SalesforceSDKManager Class

The `SalesforceSDKManager` class is the entry point for all native Android applications that use Salesforce Mobile SDK. It provides mechanisms for:

- Login and logout
- Passcodes
- Encryption and decryption of user data
- String conversions
- User agent access
- Application termination
- Application cleanup

Instead of calling `SalesforceSDKManager` directly, the forcedroid native template uses a subclass, `MobileSyncSDKManager`, to initialize apps.

## initNative() Method

During startup, you initialize the `MobileSyncSDKManager` class object by calling its static `initNative()` method. This method takes the following arguments:

| Parameter Name       | Description                                                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationContext` | An instance of `Context` that describes your application’s context. In an `Application` extension class, you can satisfy this parameter by passing a call to `getApplicationContext()`. |
| `mainActivity`       | The descriptor of the class that displays your main activity. The main activity is the first activity that displays after login.                                                        |

Here’s an example from the `MainApplication` class of the forcedroid Java template app:

<!-- owner=MobileSDK,date="2019-06-04",repo=”SalesforceMobileSDK-Templates”,path=”/AndroidNativeTemplate/app/src/com/salesforce/androidnativetemplate/MainApplication.java”,line=31,length=-->

```java
import com.salesforce.androidsdk.mobilesync.app.MobileSyncSDKManager;
...

public class MainApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        MobileSyncSDKManager.initNative(getApplicationContext(),
            MainActivity.class);
        ...
    }
}
```

In this example, `NativeKeyImpl` is the app’s implementation of `KeyInterface`. `MainActivity` subclasses `SalesforceActivity` and is designated here as the first activity to be called after login.

The Kotlin template app additionally defines a Kotlin-related constant and registers Kotlin as a used feature.

<!-- owner=MobileSDK,date="2020-01-21",repo=”SalesforceMobileSDK-Templates”,path=”/AndroidNativeKotlinTemplate/app/src/com/salesforce/androidnativekotlintemplate/MainApplication.kt”,line=35,length=-->

```java
class MainApplication : Application() {
    companion object {
        private const val FEATURE_APP_USES_KOTLIN = "KT"
    }

    override fun onCreate() {
        super.onCreate()
        MobileSyncSDKManager.initNative(applicationContext, MainActivity::class.java)
        MobileSyncSDKManager.getInstance().registerUsedAppFeature(FEATURE_APP_USES_KOTLIN)
        ...
    }
}
```

## logout() Method

The `SalesforceSDKManager.logout()` method clears user data. For example, if you’ve introduced your own resources that are user-specific, you can override `logout()` to keep those resources from being carried into the next user session. SmartStore, the Mobile SDK offline database, destroys user data and account information automatically at logout.

Always call the superclass `logout` method somewhere in your method override, preferably after doing your own cleanup. Here’s an example of how to override `logout()`.

- Kotlin

  - :
    ::include{src="../../shared/kotlin_android_logout_super_logout.md"}

- Java

  - :
    ::include{src="../../shared/android_logout_super_logout.md"}

## getLoginActivityClass() Method

This method returns the descriptor for the login activity. The login activity defines the `WebView` through which the Salesforce server delivers the login dialog.

## getUserAgent() Methods

Mobile SDK builds a user agent string to publish the app’s versioning information at runtime. For example, the user agent in Mobile SDK 7.1 takes the following form.

<!-- Review for each release.-->
<!-- owner=MobileSDK,date="2019-08-09",repo=”none”,path=””,line=,length=-->

```java
SalesforceMobileSDK/<SALESFORCESDK VERSION> android mobile/<ANDROID OS VERSION>
(<DEVICE MODEL>) <APPNAME>/<APPVERSION> <APPTYPE WITH QUALIFIER>
<DEVICE ID> <LIST OF FEATURES>
```

The list of features consists of one or more two-letter descriptors of Mobile SDK features. Here’s a typical example.

<!-- Review for each release.-->
<!-- owner=MobileSDK,date="2019-08-09",repo=”none”,path=””,line=,length=-->

```java
SalesforceMobileSDK/7.1.0 android mobile/9.0 (Pixel 3) RestExplorer/5.0 HybridRemote uid_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX ftr_MU.AI.BW
```

To retrieve the user agent at runtime, call the `SalesforceSDKManager.getUserAgent()` method.

## isHybrid() Method

Imagine that your Mobile SDK app creates libraries that are designed to serve both native and hybrid clients. Internally, the library code switches on the type of app that calls it, but you need some way to determine the app type at runtime. To determine the type of the calling app in code, call the boolean `SalesforceSDKManager.isHybrid()` method. True means hybrid, and false means native.
