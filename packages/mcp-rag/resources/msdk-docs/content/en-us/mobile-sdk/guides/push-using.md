# About Push Notifications

With the Salesforce notification service, you can develop and test push notifications in Mobile SDK custom apps. Mobile SDK provides APIs that you can implement to register devices with the push notification service. However, receiving and handling the notifications remain the responsibility of the developer.

Setup to receive push notification occurs on several levels:

- Configuring push services from the device technology provider (Apple for iOS, Google for Android)
- Configuring your Salesforce connected app definition to enable push notifications
- Configuring the Salesforce org to send push notifications to your app through one or more of these methods:
  - Implementing Apex triggers
  - Subscribing to Notification Builder custom notification types and pushing those notifications through Process Builder, Flow Builder, or the Connect REST API
  - Calling the push notification resource of the Connect REST API
- Making minor code changes to support registration in your Mobile SDK app
- Implementing a class extension to support decryption in iOS apps
- Registering the mobile device at runtime

You’re responsible for Apple or Google service configuration, connected app configuration, Apex or Connect REST API coding, and minor changes to your Mobile SDK app. Salesforce Mobile SDK handles runtime registration transparently.

For information on setting up mobile push notifications for your organization and creating your own custom notifications tray, see the [Mobile Notifications Implementation Guide](https://developer.salesforce.com/docs/atlas.en-us.pushImplGuide.meta/pushImplGuide/pns_overview.htm).
