# Defer Login

Mobile SDK hybrid apps always present a Salesforce login screen at startup. Sometimes, however, these apps can benefit from deferring authentication until some later point.With a little configuration, you can defer login to any logical place in your app.

Deferred login implementation with `force.js` is a two-step process:

1.  Configure the project to skip authentication at startup.
2.  In your JavaScript code, call the `force.init()` function, followed by the `force.login()` function, at the point where you plan to initiate authentication.

## Step 1: Configure the Project to Skip Authentication

1.  In your platform-specific project, open the `www/bootconfig.json` file.
2.  Set the `shouldAuthenticate` property to “false”.

## Step 2: Initiate Authentication in JavaScript

To initiate the authentication process, call the `force.js` `login()` functions at the point of deferred login. The `force.init()` method is usually necessary only for testing or other non-production scenarios.

<!-- owner=MobileSDK,date=11-05-2019,repo=SalesforceMobileSDK-Shared,path=/samples/contactexplorer/index.html,line=67-->

```javascript
/* Do login */
force.login(
  function () {
    console.log("Auth succeeded");
    // Call your app’s entry point
    // ...
  },
  function (error) {
    console.log("Auth failed: " + error);
  },
);
```

The `force.login()` function takes two arguments: a success callback function and a failure callback function. If authentication fails, your failure callback is invoked. If authentication succeeds, the `force` object caches the access token in its `oauth.access_token` configuration property and invokes your success callback.

<!-- 5.0 Rework in another section about the new force.js, then delete this comment.- `clientId`

- `loginUrl`
- `proxyUrl`
- `authzHeader`
- `accessToken` (or `sessionToken`)
- `refreshToken`
- `sessionId`
- `apiVersion`
- `instanceUrl`
- `asyncAjax`
- `userAgentString`
- `authCallback`

-->
