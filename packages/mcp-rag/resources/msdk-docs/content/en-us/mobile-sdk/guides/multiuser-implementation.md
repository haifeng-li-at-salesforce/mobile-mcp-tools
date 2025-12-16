# Implementing Multi-User Support

Mobile SDK provides APIs for enabling multi-user support in native Android, native iOS, and hybrid apps.

Although Mobile SDK implements the underlying functionality, multi-user switching isn’t initialized at runtime unless and until your app calls one of the following APIs:

- Android native (`UserAccountManager` class methods)

  - : [`public void switchToUser(UserAccount user)`](multiuser-android-useracctmgr.md#android-switch-to-user)

    [`public void switchToNewUser()`](multiuser-android-useracctmgr.md#android-switch-to-new-user)

- iOS native (`SFUserAccountManager` class methods)

  - : [`- (void)switchToUser:(SFUserAccount *)newCurrentUser`](multiuser-ios-useracctmgr.md#ios-switch-user)

    [`- (void)switchToNewUser`](multiuser-ios-useracctmgr.md#ios-switch-new-user)

- Hybrid (JavaScript method)

  - : [`switchToUser`](multiuser-hybrid.md#sfaccountmanagerplugin-methods)

To let the user switch to a different account, launch a selection screen from a button, menu, or some other control in your user interface. Mobile SDK provides a standard multi-user switching screen that displays all currently authenticated accounts in a radio button list. You can choose whether to customize this screen<!-- at least in Android--> or just show the default version. When the user makes a selection, call the Mobile SDK method that launches the multi-user flow.

Before you begin to use the APIs, it’s important that you understand the division of labor between Mobile SDK and your app. The following lists show tasks that Mobile SDK performs versus tasks that your app is required to perform in multi-user contexts. In particular, consider how to manage the following:

- [Push Notifications](#push-notifications-tasks) (if your app supports them)
- [SmartStore Soups](#smartstore-tasks) (if your app uses SmartStore)
- [Account Management](#account-management-tasks)

## Push Notifications Tasks

Mobile SDK (for all accounts):

- Registers push notifications at login
- Unregisters push notifications at logout
- Delivers push notifications

Your app:

- Differentiates notifications according to the target user account
- Launches the correct user context to display each notification

## SmartStore Tasks

Mobile SDK (for all accounts):

- Creates a separate SmartStore database for each authenticated user account
- Switches to the correct backing database each time a user switch occurs

Your app:

- Refreshes its cached credentials, such as instances of SmartStore held in memory, after every user switch or logout

## Account Management Tasks

Mobile SDK (for all accounts):

- Loads the correct account credentials every time a user switch occurs

Your app:

- Refreshes its cached credentials, such as authenticated REST clients held in memory, after every user switch or logout
