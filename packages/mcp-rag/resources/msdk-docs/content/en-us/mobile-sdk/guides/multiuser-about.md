# About Multi-User Support

Beginning in version 2.2, Mobile SDK supports simultaneous logins from multiple user accounts. These accounts can represent different users from the same organization, or different users on different organizations (such as production and sandbox, for instance.)

Once a user signs in, that user’s credentials are saved to allow seamless switching between accounts, without the need to re-authenticate against the server. If you don’t wish to support multiple logins, you don’t have to change your app. Existing Mobile SDK APIs work as before in the single-user scenario.

Mobile SDK assumes that each user account is unrelated to any other authenticated user account. Accordingly, Mobile SDK isolates data associated with each account from that of all others, thus preventing the mixing of data between accounts. Data isolation protects `SharedPreferences` files, SmartStore databases, `AccountManager` data, and any other flat files associated with an account.

## Example

For native Android, the `RestExplorer` sample app demonstrates multi-user switching:

For native iOS, the `RestAPIExplorer` sample app demonstrates multi-user switching:

The following hybrid sample apps demonstrate multi-user switching:

- **Without SmartStore:** `ContactExplorer`
- **With SmartStore:** `AccountEditor`
