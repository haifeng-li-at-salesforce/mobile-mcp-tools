# SFUserAccountManager Class

The `SFUserAccountManager` class provides methods to access authenticated accounts, add new accounts, log out accounts, and switch between accounts.

To access the singleton `SFUserAccountManager` instance, send the following message:

```
[SFUserAccountManager sharedInstance]
```

## Properties

| Property                                                       | Description                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@property (nonatomic, strong) SFUserAccount *currentUser`     | The current user account.  If the user has never logged in, this property may be nil.                                                                                                                                                                                   |
| `@property (nonatomic, readonly) NSString *currentUserId`      | A convenience property to retrieve the current user's ID. This property is an alias for `currentUser.credentials.userId`.                                                                                                                                               |
| `@property (nonatomic, readonly) NSString *currentCommunityId` | A convenience property to retrieve the current user's community ID. This property is an alias for `currentUser.communityId`.                                                                                                                                            |
| `@property (nonatomic, readonly) NSArray *allUserAccounts`     | An `NSArray` of all the `SFUserAccount` instances for the app.                                                                                                                                                                                                          |
| `@property (nonatomic, readonly) NSArray *allUserIds`          | Returns an array that contains all user IDs.                                                                                                                                                                                                                            |
| `@property (nonatomic, copy) NSString *activeUserId`           | The most recently active user ID. If the user that’s specified by `activeUserId` is removed from the accounts list, this user may be temporarily different from the current user.                                                                                       |
| `@property (nonatomic, strong) NSString *loginHost`            | The host to be used for login.                                                                                                                                                                                                                                          |
| `@property (nonatomic, assign) BOOL retryLoginAfterFailure`    | A flag that controls whether the login process restarts after it fails. The default value is YES.                                                                                                                                                                       |
| `@property (nonatomic, copy) NSString *oauthCompletionUrl`     | The OAuth callback URL to use for the OAuth login process. Apps can customize this property. By default, the property’s value is copied from the `SFDCOAuthRedirectUri` property in the main bundle. The default value is `@"testsfdc:///mobilesdk/detect/oauth/done"`. |
| `@property (nonatomic, copy) NSSet *scopes`                    | The OAuth scopes that are associated with the app.                                                                                                                                                                                                                      |

## Methods

### userAccountPlistFileForUser

Returns the path of the .plist file for the specified user account.

```
- (NSString*)
userAccountPlistFileForUser:(SFUserAccount*)user
```

### addDelegate

Adds a delegate to this user account manager.

```
- (void)
addDelegate:(id<SFUserAccountManagerDelegate>)delegate
```

### removeDelegate

Removes a delegate from this user account manager.

```
- (void)
removeDelegate:(id<SFUserAccountManagerDelegate>)delegate
```

### updateLoginHost

Sets the app-level login host to the value in app settings.

```
- (SFLoginHostUpdateResult*)updateLoginHost
```

### loadAccounts

Loads all accounts.

```
- (BOOL)loadAccounts:(NSError**)error
```

### createUserACcount

Can be used to create an empty user account if you want to configure all of the account information yourself. Otherwise, use `[SFAuthenticationManager loginWithCompletion:failure:]` to automatically create an account when necessary.

```
- (SFUserAccount*)createUserAccount
```

### userAccountForUserId

Returns the user account that's associated with a given user ID.

```
- (SFUserAccount*)
userAccountForUserId:(NSString*)userId
```

### accountsForOrgId

Returns all accounts that have access to a particular organization.

```
- (NSArray*)
accountsForOrgId:(NSString*)orgId
```

### accountsForInstanceURL

Returns all accounts that match a particular instance URL.

```
- (NSArray *)
accountsForInstanceURL:(NSString *)instanceURL
```

### addAccount

Adds a user account.

```
- (void)addAccount:(SFUserAccount
*)acct
```

### deleteAccountForUserId

Removes the user account that's associated with the given user ID.

```
- (BOOL)
deleteAccountForUserId:(NSString*)userId
error:(NSError **)error
```

### clearAllAccountState

Clears the account's state in memory (but doesn't change anything on the disk).

```
- (void)clearAllAccountState
```

### applyCredentials

Applies the specified credentials to the current user. If no user exists, a user is created.

```
- (void)
applyCredentials:
(SFOAuthCredentials*)credentials
```

### applyCustomDataToCurrentUser

Applies custom data to the `SFUserAccount` that can be accessed outside that user's sandbox. This data persists between app launches. Because this data will be serialized, make sure that objects that are contained in `customData` follow the `NSCoding` protocol.

:::important
Use this method only for nonsensitive information.
:::

```
- (void)applyCustomDataToCurrentUser:
(NSDictionary*)customData
```

### switchToNewUser

Switches from the current user to a new user context.

```
- (void)switchToNewUser
```

### switchToUser

Switches from the current user to the specified user account.

```
- (void)switchToUser:(SFUserAccount *)newCurrentUser
```

### userChanged

Informs the `SFUserAccountManager` object that something has changed for the current user.

```
- (void)
userChanged:(SFUserAccountChange)change
```
