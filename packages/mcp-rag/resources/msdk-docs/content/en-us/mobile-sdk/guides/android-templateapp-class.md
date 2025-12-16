# MainApplication Class

Every native Android app requires an instance of `android.app.Application`. The `MainApplication` class accomplishes these basic tasks:

- Overrides the Android `Application.onCreate()` method.
- In its `onCreate()` override:
  - Calls the superclass `onCreate()` method.
  - Initializes Salesforce Mobile SDK by calling `initNative()` on the SDK manager object (`MobileSyncSDKManager`).
  - Provides optional commented code that you can reinstate to use your app as a Salesforce identity provider.
  - Provides optional commented code that you can reinstate to support push notifications.

Here’s the entire class:

- Kotlin

  - :

    ```java
    package com.bestapps.android;

    import android.app.Application;
    import com.salesforce.androidsdk.mobilesync.app.MobileSyncSDKManager;

    /**
      * Application class for our application.
      */
    class MainApplication : Application() {

        companion object {
            private const val FEATURE_APP_USES_KOTLIN = "KT"
        }

        override fun onCreate() {
            super.onCreate()
            MobileSyncSDKManager.initNative(applicationContext, MainActivity::class.java)
            MobileSyncSDKManager.getInstance().registerUsedAppFeature(FEATURE_APP_USES_KOTLIN)
            /*
              * Uncomment the following line to enable IDP login flow. This will allow the user to
              * either authenticate using the current app or use a designated IDP app for login.
              * Replace 'idpAppURIScheme' with the URI scheme of the IDP app meant to be used.
              */
            // MobileSyncSDKManager.getInstance().idpAppURIScheme = idpAppURIScheme

            /*
          * Un-comment the line below to enable push notifications in this app.
          * Replace 'pnInterface' with your implementation of 'PushNotificationInterface'.
          * Add your Google package ID in 'bootonfig.xml', as the value
          * for the key 'androidPushNotificationClientId'.
          */
            // MobileSyncSDKManager.getInstance().pushNotificationReceiver = pnInterface
        }
    }

    ```

- Java

  - :

    ```java

    package com.salesforce.androidnativetemplate;

    import android.app.Application;
    import com.salesforce.androidsdk.mobilesync.app.MobileSyncSDKManager;
    /**
    * Application class for our application.
    */
    public class MainApplication extends Application {
        @Override
        public void onCreate() {
            super.onCreate();
            MobileSyncSDKManager.initNative(getApplicationContext(), MainActivity.class);

            /*
            * Uncomment the following line to enable IDP login flow. This will allow the user to
            * either authenticate using the current app or use a designated IDP app for login.
            * Replace 'idpAppURIScheme' with the URI scheme of the IDP app meant to be used.
            */
            // MobileSyncSDKManager.getInstance().setIDPAppURIScheme(idpAppURIScheme);

            /*
            * Un-comment the line below to enable push notifications in this app.
            * Replace 'pnInterface' with your implementation of 'PushNotificationInterface'.
            * Add your Google package ID in 'bootonfig.xml', as the value
            * for the key 'androidPushNotificationClientId'.
            */
            // MobileSyncSDKManager.getInstance().setPushNotificationReceiver(pnInterface);
        }
    }
    ```

Most native Android apps can use similar code. For this small amount of work, your app gets free implementations of passcode and login/logout mechanisms, plus a few other benefits. See [SalesforceActivity, SalesforceListActivity, and SalesforceExpandableListActivity Classes](android-native-classes-nativemainactivity.md).
