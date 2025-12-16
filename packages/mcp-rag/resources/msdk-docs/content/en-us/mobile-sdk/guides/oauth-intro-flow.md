# OAuth 2.0 Authentication Flow

The authentication flow depends on the state of authentication on the device. The following steps assume that Salesforce authentication occurs at app startup.

## First Time Authorization Flow

1.  The customer opens a Mobile SDK app.
2.  An authentication prompt appears.
3.  The customer enters a username and password.
4.  The app sends the customer’s credentials to Salesforce and, in return, receives a session ID as confirmation of successful authentication.
5.  The customer approves the app’s request to grant access to the app.
6.  The app starts.

## Ongoing Authorization

1.  The customer opens a mobile app.
2.  If the session ID is active, the app starts immediately. If the session ID is stale, the app uses the refresh token from its initial authorization to get an updated session ID.
3.  The app starts.

## PIN Authentication (Optional)

PIN protection is a function of the mobile policy and is used only when it’s enabled in the Salesforce connected app definition. See [About PIN Security](connected-apps-security-pin.md#topic-title).
