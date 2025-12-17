# Using SQLCipher with SmartStore

Starting in Mobile SDK 13.0, SmartStore supports SQLCipher Commercial, Enterprise, and Enterprise FIPS.

## Set Up Your SQLCipher Edition on iOS

To set up SQLCipher Commercial, Enterprise, or Enterprise FIPS, follow these steps.

1. In [SQLCipher’s documentation](https://www.zetetic.net/sqlcipher/), find your SQLCipher edition of choice, and then download the corresponding package.
2. Find `SQLCipher.xcframework` and `openssl.xcframework` in the package you downloaded, and then add them to your application target.
3. Pass the license key to SmartStore during application initialization, prior to any SmartStore operations. To specify the license key for your app, use this method from `SFSmartStore.h`.

```objc
// @param licenseKey - The license key string provided by Zetetic.
+ (void)setLicenseKey:(NSString*)licenseKey;
```

4. Call `SmartStore.setLicenseKey("LICENSE_KEY_STRING")` from the `AppDelegate` class when the app finishes launching.

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    SmartStore.setLicenseKey("LICENSE_KEY_STRING")
    ...
}
```

## Set Up Your SQLCipher Edition on Android

To set up SQLCipher Commercial, Enterprise, or Enterprise FIPS, follow these steps.

1. In [SQLCipher’s documentation](https://www.zetetic.net/sqlcipher/), find your SQLCipher edition of choice, and then download the corresponding package.
2. Create a `libs` folder in the app directory.
3. Find `SQLCipher.aar` from the package you downloaded, and add it to the `libs` folder.
4. Pass the license key to SmartStore during application initialization, before any SmartStore operations. To specify the license key for your app, use this method from `SmartStore.java`.

```java
// @param licenseKey - The license key string provided by Zetetic.
+ public static void setLicenseKey(String licenseKey)
```

5. Call `SmartStore.setLicenseKey("LICENSE_KEY_STRING")` from the `Application` subclass before initializing `SalesforceSDKManager`.

```kotlin
class MainApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        appContext = applicationContext
        SmartStore.setLicenseKey("LICENSE_KEY_STRING")
        MobileSyncSDKManager.initNative(this, ContactsActivity::class.java)
    }
    ...
}
```

## Check the SQLCipher Status

To check the SQLCipher’s version, provider version, compile options, and FIPS status, use these methods.

### iOS

Find these methods in `SFSmartStore.h`.

```objc
/**
* Return SQLCipher compile options
* @return An array with all the compile options used to build SQL Cipher.
*/
- (NSArray *)getCompileOptions NS_SWIFT_NAME(compileOptions());

/**
* Return SQLCipher version
* @return The version of SQL Cipher in use.
*/
- (NSString *)getSQLCipherVersion NS_SWIFT_NAME(versionOfSQLCipher());

/**
* Return SQLCipher provider version
* @return cipher provider version
*/
- (NSString *)getCipherProviderVersion NS_SWIFT_NAME(cipherProviderVersion());

/**
* Return SQLCipher FIPS status
* @return true if using a FIPS enabled SQLCipher edition
*/
- (BOOL)getCipherFIPSStatus NS_SWIFT_NAME(cipherFIPSStatus());
```

### Android

Find these methods in `SmartStore.java`.

```java
/**
* Get SQLCipher version
*
* @return SQLCipher version
*/
public String getSQLCipherVersion()

/**
* Get SQLCipher provider version
*
* @return SQLCipher provider version
*/
public String getCipherProviderVersion()

/**
* Get SQLCipher FIPS status
*
* @return true if using a FIPS enabled SQLCipher edition
*/
public boolean getCipherFIPSStatus()

+ public static void setLicenseKey(String licenseKey)
```
