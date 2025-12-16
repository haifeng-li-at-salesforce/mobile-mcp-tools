# OAuth 2.0 Refresh Token Flow

::include{src="../../shared/p1def.md"}
The refresh token flow involves the following steps.

1.  The connected app uses the existing refresh token to [request a new access token](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_refresh_token_flow.htm).
2.  After verifying the request, Salesforce [grants a new access token](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_refresh_token_flow.htm) to the client.

:::note

Mobile SDK apps can use the SmartStore feature to store data locally for offline use. SmartStore data is inherently volatile. Its lifespan is tied to the authenticated user as well as to OAuth token states. When the user logs out of the app, SmartStore deletes all soup data associated with that user. Similarly, when the OAuth refresh token is revoked or expires, the user’s app state is reset, and all data in SmartStore is purged. Carefully consider the volatility of SmartStore data when designing your app. This warning is especially important if your org sets a short lifetime for the refresh token.

:::
