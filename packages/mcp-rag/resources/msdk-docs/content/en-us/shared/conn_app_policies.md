## Mobile Passcode Policies

Each Mobile SDK app hard-codes a connected app’s consumer key and OAuth callback URL from a specific Salesforce org. Mobile SDK honors the configurable passcode requirement in that org’s designated connected app. <!-- Edits go somewhere around here.-->Beginning in version 9.2, Mobile SDK ignores org settings such as PIN length, and instead relies on device configuration. Similarly, incorrect passcode entries are handled according to the standard procedure of the mobile operating system.

:::note

Beginning in version 9.2, Mobile SDK ignored the **Lock App After** setting in the org’s Connected App, in favor of the device’s configuration for locking the device after it’s been idle. In version 10.1.1 and later, Mobile SDK again respects the **Lock App After** Connected App setting. When set, the mobile app locks after it has been in the background for longer than the timeout period. Locking occurs when the mobile app is activated. Unlocking the app remains the same.

:::

If a customer uses the app to log into a different org, Mobile SDK can’t retrieve the designated connected app settings. Therefore, that customer never encounters the passcode prompt.
