1.  The user opens the mobile app.
2.  The connected app directs the user to Salesforce to authenticate and authorize the mobile app.
3.  The user approves access for this authorization flow.
4.  The connected app receives the callback from Salesforce to the redirect URL, which extracts the access and refresh tokens.
5.  The connected app uses the access token to access data on the user’s behalf.
