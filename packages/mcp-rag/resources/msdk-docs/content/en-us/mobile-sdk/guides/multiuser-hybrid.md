# Hybrid APIs

Hybrid apps can enable multi-user support through Mobile SDK JavaScript APIs. These APIs reside in the `SFAccountManagerPlugin` Cordova-based module.

## SFAccountManagerPlugin Methods

Before you call any of these methods, you need to load the `sfaccountmanager` plug-in. For example:

```javascript
cordova.require("com.salesforce.plugin.sfaccountmanager").logout();
```

| Method Name      | Description                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `getUsers`       | Returns the list of users already logged in.                                                                              |
| `getCurrentUser` | Returns the current active user.                                                                                          |
| `logout`         | Logs out the specified user if a user is passed in, or the current user if called with no arguments.                      |
| `switchToUser`   | Switches the application context to the specified user, or launches the account switching screen if no user is specified. |

Hybrid apps don’t need to implement a receiver for the multi-user switching broadcast event. This handler is implemented by the `SalesforceDroidGapActivity` class.

<!-- Possible examples: Logout current user; Logout all users; Switch to another user; Switch but to no user.-->
