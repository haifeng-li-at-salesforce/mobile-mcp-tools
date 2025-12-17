# Push Notifications and Mobile SDK

Notifications sent from Salesforce help your mobile users stay on top of important developments in their organizations. Salesforce notification services let you configure and test mobile push notifications before you implement any code. To receive mobile notifications in a production environment, your Mobile SDK app registers with the mobile OS provider and then registers for Salesforce notifications. Mobile SDK minimizes your coding effort by implementing most of the registration tasks internally.

Mobile SDK supports Salesforce Notification Builder custom notifications at no cost to your client app. Mobile SDK apps don’t require extra coding to receive and display Notification Builder push notifications. However, if you choose to implement a message tray in your app, Mobile SDK provides convenience methods for calling the required Salesforce APIs.

Notification Builder notifications arrive encrypted. Mobile SDK decrypts messages internally, requiring only the addition of a boilerplate class extension in iOS apps and no additional coding on Android. Apex push notifications are not encrypted and remain fully supported.
