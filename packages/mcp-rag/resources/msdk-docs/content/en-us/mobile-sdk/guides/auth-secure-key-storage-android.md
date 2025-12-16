# Secure Key Storage in Android

Mobile SDK encrypts data such as user identity tokens and SmartStore databases. In a normal workflow, the data protection pattern Mobile SDK uses is considered highly secure. However, “zero day” vulnerabilities can arise even in the most heavily guarded schemes. To stay ahead of hackers and malicious attacks, Mobile SDK reinforces its encryption with the highest standards Android supports.

<!--
Android provides two hardware-based secure storage options.

- Devices running Android 4.3 (API level 18) or higher can support the Android Keystore system. Android Keystore is a hardware-backed vault for storing keys and certificates. Keystore implementation is hardware-dependent and varies based on Android API version, device manufacturer, and other factors.
- Devices running Android P (API 28) or higher with sufficient hardware capabilities can offer StrongBox Keymaster. This solution provides the highest level of Android security by storing keys on a hardware module that resides on its own chip. Mobile SDK enables StrongBox Keymaster when the device’s configuration supports it.
-->

For some time, Mobile SDK has used a symmetric key pair for its encryption tasks. Mobile SDK 7.1 and later adds another level of encryption on top of this scheme that takes advantage of the Android Keystore. <!-- temporary placement of info from above.-->Any device that meets the current Mobile SDK Android requirements can support Android Keystore. Keystore implementation is hardware-dependent and varies with Android API version, device manufacturer, and other factors.

To enhance security, Mobile SDK generates an asymmetric public-private key pair to encrypt its symmetric key pair. This asymmetric key pair, which uses RSA-2048 encryption, is stored in the Android Keystore<!-- or the StrongBox Keymaster-->. At runtime, Mobile SDK encrypts the symmetric key with the asymmetric public key and then stores the encrypted key in a SharedPreferences file. To decrypt customer data, the app asks Mobile SDK for the symmetric key. To access that key, Mobile SDK fetches the asymmetric private key from the Keystore<!-- or Keymaster--> and uses it to decrypt the contents of the SharedPreferences file. Mobile SDK then delivers the unencrypted symmetric key to the application.

## Upgrading Apps

Mobile SDK automatically upgrades its keys to the new encryption scheme. Behavior and usage of `getEncryptionKey()` is unchanged.

## See Also

- [“Android keystore system” at developer.android.com](https://developer.android.com/training/articles/keystore)
<!-- - [“Hardward-backed Keystore” at source.android.com/security](https://source.android.com/security/keystore) -->
