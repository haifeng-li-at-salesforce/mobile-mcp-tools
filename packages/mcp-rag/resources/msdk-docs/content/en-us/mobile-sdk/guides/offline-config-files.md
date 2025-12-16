# Registering Soups with Configuration Files

Beginning with Mobile SDK 6.0, SmartStore lets you define soup structures through configuration files rather than code. Since all platforms and app types use the same configuration files, you can describe all your soups in a single file. You can then compile that file into any Mobile SDK project.

## Overview

To register a soup, you provide a soup name and a list of one or more index specifications.

::include{src="../../shared/smartstore_regsoup.md"}
SmartStore configuration files use JSON objects to express soup definitions. The JSON schema for configuration files is the same for all app types and platforms. Hybrid apps load the configuration files automatically, while other apps load them with a single line of code. To keep the mechanism simple, Mobile SDK enforces the following file naming conventions:

- To define soups for the default global store, provide a file named `globalstore.json`.
- To define soups for the default user store, provide a file named `userstore.json`.

Configuration files can define soups only in the default global store and default user store. For named stores, you register soups through code. You can’t use configuration files to set up externally stored soups.

:::note

- Configuration files are intended for initial setup only. You can't change existing soups by revising the JSON file and reloading it at runtime. Instead, use SmartStore methods such as `alterSoup()`. See [Managing Soups](offline-managing-soups.md).
- If a configuration file defines a soup that exists, Mobile SDK ignores the configuration file. In this case, you can set up and manage your soups only through code.

:::

## Configuration File Format

The JSON format is self-evident as illustrated in the following example.

```nolang
{  "soups": [
    {
      "soupName": "soup1",
      "indexes": [
        { "path": "stringField1", "type": "string"},
        { "path": "integerField1", "type": "integer"},
        { "path": "floatingField1", "type": "floating"},
        { "path": "json1Field1", "type": "json1"},
        { "path": "ftsField1", "type": "full_text"}
      ]
    },
    {
      "soupName": "soup2",
      "indexes": [
        { "path": "stringField2", "type": "string"},
        { "path": "integerField2", "type": "integer"},
        { "path": "floatingField2", "type": "floating"},
        { "path": "json1Field2", "type": "json1"},
        { "path": "ftsField2", "type": "full_text"}
      ]
    }
  ]
}
```

For Mobile Sync compatibility, configuration files also require indexes on some system fields. See [Preparing Soups for Mobile Sync](offline-mobilesync-compatibility.md).

## Configuration File Locations

Configuration file placement varies according to app type and platform. Mobile SDK looks for configuration files in the following locations:

- iOS (Native and React Native)

  - : Under `/` in the Resources bundle

- Android (Native and React Native)

  - : In the `/res/raw` project folder

- Hybrid

  - : In your Cordova project, do the following:

    1.  Place the configuration file in the top-level `www/` folder.
    2.  In the top-level project directory, run: `cordova prepare`

## Loading SmartStore Configuration Files in Native Apps

SmartStore and its companion feature Mobile Sync require a special SDK manager object. For example, to use SmartStore or Mobile Sync in iOS, initialize the SDK by calling `MobileSyncSDKManager.initializeSDK()` rather than `SalesforceSDKManager.initializeSDK()`.

If you’re not using Mobile Sync, you can call `SmartStoreSDKManager.initializeSDK()`. However, such cases are rare.

In native and React Native apps, you load your JSON configuration file by calling a loading method. Make this call in your app initialization code after the customer successfully logs in. For example, in iOS, make this call in the block you pass to loginIfRequired. Call these methods only if you’re using a globalstore.json or userstore.json file instead of code to configure SmartStore. Do not call these loading methods more than once. In hybrid apps that include them, SmartStore configuration files are loaded automatically.

To load a soup configuration file, call the loader method for the store you’re targeting. Load this file before calling other SmartStore methods.

### Load a Default User Store - iOS (Native and React Native)

Load a soup configuration file by calling the appropriate method on the `MobileSyncSDKManager` object.

- Swift

  - :

    ```nolang
    // In the AppDelegate class:
    override init() {
            super.init()
            MobileSyncSDKManager.initializeSDK()
    ...

    // Load config files in the block you pass to loginIfRequired()
    func application(_ application: UIApplication, didFinishLaunchingWithOptions
        launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        self.window = UIWindow(frame: UIScreen.main.bounds)
        self.initializeAppViewState()
        // ...

        AuthHelper.loginIfRequired {
            self.setupRootViewController()
            MobileSyncSDKManager.shared.setupUserStoreFromDefaultConfig()
        }
    ...
    ```

- Objective-C

  - :

    ```nolang
    // In the AppDelegate class:
    - (instancetype)init
    {
        self = [super init];
        if (self) {
            [MobileSyncSDKManager initializeSDK];
    ...

    // Load config files in the block you pass to loginIfRequired()
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
    {
        self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
        [self initializeAppViewState];
    ...

        [SFSDKAuthHelper loginIfRequired:^{
            [self setupRootViewController];
            [[MobileSyncSDKManager sharedManager] setupUserStoreFromDefaultConfig];
        }];
    ...
    ```

### Load a Default Global Store - iOS (Native and React Native)

- Swift

  - :

    ```nolang
    // In the AppDelegate class:
    override init() {
            super.init()
            MobileSyncSDKManager.initializeSDK()
    ...

    // Load config files in the block you pass to loginIfRequired()
    func application(_ application: UIApplication, didFinishLaunchingWithOptions
        launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        self.window = UIWindow(frame: UIScreen.main.bounds)
        self.initializeAppViewState()
        // ...

        AuthHelper.loginIfRequired {
            self.setupRootViewController()
            MobileSyncSDKManager.shared.setupGlobalStoreFromDefaultConfig()
        }
    ...
    ```

- Objective-C

  - :

    ```nolang
    // In the AppDelegate class:
    - (instancetype)init
    {
        self = [super init];
        if (self) {
            [MobileSyncSDKManager initializeSDK];
    ...

    // Load config files in the block you pass to loginIfRequired()
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
    {
        self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
        [self initializeAppViewState];
    ...

        [SFSDKAuthHelper loginIfRequired:^{
            [self setupRootViewController];
            [[MobileSyncSDKManager sharedManager] setupGlobalStoreFromDefaultConfig];
        }];
    ...
    ```

### Load a Default User Store - Android (Native and React Native)

Load a soup configuration file by calling the appropriate method on the `MobileSyncSDKManager` object.

```nolang
public class MainApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        MobileSyncSDKManager.initNative(getApplicationContext(), MainActivity.class);
        MobileSyncSDKManager.getInstance().setupUserStoreFromDefaultConfig();
...
```

### Load a Default Global Store - Android (Native and React Native)

```nolang
public class MainApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        MobileSyncSDKManager.initNative(getApplicationContext(), MainActivity.class);
        MobileSyncSDKManager.getInstance().setupGlobalStoreFromDefaultConfig();
...
```

### Hybrid

If SmartStore finds a soup configuration file, it automatically loads the file. To add the file to your project:

1.  Copy the configuration file (`userstore.json` or `globalstore.json`) to the top-level `www/` directory of your hybrid project directory.
2.  In a command prompt or Terminal window, change to your hybrid project directory and run: `cordova prepare`

## Sample Code

MobileSyncExplorer and MobileSyncExplorerHybrid sample apps use a config file to set up SmartStore soups.

:::note

- Call the SmartStore loader method only if you are using a `userstore.json` to define soups. If you set up your soups with code instead of configuration files, don't call the loader method.
- Call the loader method after the customer has logged in.
- Do not call a loader method more than once.

:::

## Example

SmartStore uses the same configuration file—`userstore.json`—for native and hybrid versions of the MobileSyncExplorer sample. The final five paths in this configuration are required if you’re using Mobile Sync.

```nolang
{  "soups": [
    {
      "soupName": "contacts",
      "indexes": [
        { "path": "Id", "type": "string"},
        { "path": "FirstName", "type": "string"},
        { "path": "LastName", "type": "string"},
        { "path": "__local__", "type": "string"},
        { "path": "__locally_created__", "type": "string"},
        { "path": "__locally_updated__", "type": "string"},
        { "path": "__locally_deleted__", "type": "string"},
        { "path": "__sync_id__", "type": "integer"}
      ]
    }
  ]
}
```

**See Also**

- [Preparing Soups for Mobile Sync](offline-mobilesync-compatibility.md)
- [Registering a Soup Through Code](offline-soup.md)
