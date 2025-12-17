# Using Passcodes

Passcodes are customer-defined tokens that can provide an extra layer of login security for your app. Optionally, a Salesforce administrator can set the connected app to require a passcode after login. This setting, for example, requires a backgrounded app to prompt for a passcode when it returns to the foreground. When the connected app requires a mobile app passcode, Mobile SDK 9.2 and later use the device system passcode.

To verify a passcode, Mobile SDK presents a lock screen that uses the customer’s configured verification mode—for example, biometric, pattern, PIN, or password. If no device passcode has been set, Mobile SDK prompts the customer to create one using any secure input mode supported by the device. If the connected app doesn’t require a mobile passcode, Mobile SDK skips the passcode verification step. Mobile SDK handles all login and passcode lock screens and the authentication handshake. Your app doesn’t have to do anything to display these screens.

::include{src="../../shared/conn_app_policies.md"}
::include{src="../../shared/conn_app_multiuser.md"}
::include{src="../../shared/conn_app_biometric_unlock.md"}

## See Also

- [Biometric Authentication](biometric-auth.md)
