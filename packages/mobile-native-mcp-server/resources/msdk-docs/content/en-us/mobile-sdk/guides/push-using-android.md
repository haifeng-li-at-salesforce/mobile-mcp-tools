# Using Push Notifications in Android

Salesforce sends push notifications to Android apps through the Firebase Cloud Messaging (FCM) framework. See [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) for an overview of this framework.

When developing an Android app that supports push notifications, remember these key points:

- You must
  - be signed in to a Google account.
  - have access to Firebase.
- To test FCM push services, we recommend using an Android physical device with either the Android Market app or Google Play Services installed. Push notifications are less reliable on emulators and work only on the “Android with Google Play Services” emulator type.
- You can also use the Send Test Notification link in your connected app detail view to perform a "dry run" test without pinging a device. You can also use this feature with Notification Builder push notifications.

To begin, create a Google API project for your app. Your project must have the FCM for Android feature enabled. See [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) for instructions on setting up your project.

The setup process for your Google API project creates a key for your app. Once you’ve finished the project configuration, add the FCM key to your connected app settings.

:::note

Push notification registration occurs at the end of the OAuth login flow. Therefore, an app does not receive push notifications unless and until the user logs into a Salesforce organization.

:::
