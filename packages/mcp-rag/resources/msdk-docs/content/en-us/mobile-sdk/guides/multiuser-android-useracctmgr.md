# UserAccountManager Class

The `UserAccountManager` class provides methods to access authenticated accounts, add new accounts, log out existing accounts, and switch between existing accounts.<!-- Trying to figure out whether “existing accounts” has a special meaning here. Are accounts recreated at each login?-->

You don’t directly create instances of `UserAccountManager`. Instead, obtain an instance using the following call:

```java
SalesforceSDKManager.getInstance().getUserAccountManager();
```

## Methods

| Method                                                                     | Description                                                                                                                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `public UserAccount getCurrentUser()`                                      | Returns the currently active user account.                                                                                                             |
| `public List<UserAccount> getAuthenticatedUsers()`                         | Returns the list of authenticated user accounts.                                                                                                       |
| `public boolean doesUserAccountExist(UserAccount account)`                 | Checks whether the specified user account is already authenticated.                                                                                    |
| `public void switchToUser(UserAccount user)`                               | Switches the application context to the specified user account. If the specified user account is invalid or null, this method launches the login flow. |
| `public void switchToNewUser()`                                            | Launches the login flow for a new user to log in.                                                                                                      |
| `public void signoutUser(UserAccount userAccount, Activity frontActivity)` | Logs the specified user out of the application and wipes the specified user’s credentials.                                                             |

**See Also**

- [UserAccount Class](multiuser-android-useracct.md)
