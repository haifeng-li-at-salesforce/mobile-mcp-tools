# Configuring an Android App as an Identity Provider

You can configure any app built on Mobile SDK 11.0 or later as an identity provider. You call a method to define which identity provider client apps you want to connect to, then select the identity provider client in your app’s UI.

The easiest way to create an identity provider app is by using the Mobile SDK AndroidIDPTemplate. This template is available on GitHub in the [github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates) repo. Use the `forcedroid createwithtemplate` command with the URI of the template repo, as shown in the following command-line example.

<!-- owner=MobileSDK,date="2019-08-09",repo=”none”,path=””,line=,length=-->

```bash
$ forcedroid createwithtemplate
Enter URI of repo containing template application: AndroidIDPTemplate
Enter your application name: MyIDP-Android
Enter your package name: com.acme.android
Enter your organization name (Acme, Inc.): Acme Systems
Enter output directory for your app (leave empty for the current directory): MyIDP-Android

```

## Convert an Existing Mobile SDK Android App into an Identity Provider

To let the identity provider app know about the client app you want it to service, define one (or multiple) client app configurations in the `onCreate` method of its application subclass.

```java
class MyApplication : Application() {

 override fun onCreate() {
   super.onCreate()
   SalesforceSDKManager.initNative(applicationContext, MainActivity::class.java)
   SalesforceSDKManager.getInstance()
     .setAllowedSPApps(listOf(
     SPConfig(
       "com....restexplorer", /* Package name of SP app */
       "com....restexplorer.ExplorerActivity", /* Main activity of SP app */
       "<-- the oauth consumer key of the sp app -->",
       "<-- the oauth callback url of the sp app -->",
       arrayOf("api", "web") /* Oauth scopes of the SP app */
   ),
 }
 /* Code here not shown */
}

```

To kick off the IDP-initiated login flow, the following example code calls `kickOffIDPInitiatedLoginFlow` for the chosen client app package name, which handles the status updates. In this example, updates are presented in a toast notification, but the application ultimately decides how to show progress to the user. You can find the corresponding version of this code in the UI of your IDP app. Examples of the selection UI can be found on GitHub, in the [https://github.com/forcedotcom/SalesforceMobileSDK-Templates](https://github.com/forcedotcom/SalesforceMobileSDK-Templates) repo. For Android, check out the AndroidIDPTemplate.

```java
SalesforceSDKManager.getInstance().idpManager?.let { idpManager ->
   idpManager.kickOffIDPInitiatedLoginFlow(this, spAppPackageName,
       object:IDPManager.StatusUpdateCallback {
           override fun onStatusUpdate(status: IDPManager.Status) {
               CoroutineScope(Dispatchers.Main).launch {
                   Toast.makeText(
                       applicationContext,
                       getString(status.resIdForDescription),
                       Toast.LENGTH_SHORT
                   ).show()
               }
           }
       }
   )
} ?: run {
   Log.e(TAG, "Cannot proceed with launch of ${appName} - not configured as IDP")
}

```

The `onStatusUpdate` callback can return any of the following status updates.

- LOGIN_REQUEST_SENT_TO_SP
- GETTING_AUTH_CODE_FROM_SERVER
- ERROR_RECEIVED_FROM_SERVER
- AUTH_CODE_SENT_TO_SP
- SP_LOGIN_COMPLETE
