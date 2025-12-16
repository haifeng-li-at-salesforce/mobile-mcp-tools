# Using the Mock SmartStore

To facilitate developing and testing code that makes use of the SmartStore while running outside the container, you can use an emulated SmartStore.

MockSmartStore is a JavaScript implementation of SmartStore that stores data in local storage (or optionally just in memory).

In the `external/shared/test` directory, you’ll find the following files:

- `MockCordova.js`—A minimal implementation of Cordova functions intended only for testing plug-ins outside the container. Intercepts Cordova plug-in calls.
- `MockSmartStore.js`—A JavaScript implementation of SmartStore intended only for development and testing outside the container. Also intercepts SmartStore Cordova plug-in calls and handles them using a MockSmartStore.

When you’re developing an application using SmartStore, make the following changes to test your app outside the container:

- Include `MockCordova.js` instead of `cordova.js`.
- Include `MockSmartStore.js`.

To see a MockSmartStore example, check out `test/test.html` in the [github.com/forcedotcom/SalesforceMobileSDK-Shared](https://github.com/forcedotcom/SalesforceMobileSDK-Shared) repo.

## Same-Origin Policies

Same-origin policy permits scripts running on pages originating from the same site to access each other’s methods and properties with no specific restrictions; it also blocks access to most methods and properties across pages on different sites. Same-origin policy restrictions are not an issue when your code runs inside the container, because the container disables same-origin policy in the webview. However, if you call a remote API, you need to worry about same-origin policy restrictions.

Fortunately, browsers offer ways to turn off same-origin policy, and you can research how to do that with your particular browser. If you want to make XHR calls against Salesforce Platform from JavaScript files loaded from the local file system, you should start your browser with same-origin policy disabled. The following article describes how to disable same-origin policy on several popular browsers: [Getting Around Same-Origin Policy in Web Browsers](http://romkey.com/2011/04/23/getting-around-same-origin-policy-in-web-browsers). <!-- This article is getting old. Might need to replace at some point in the near future.-->

## Authentication

For authentication with MockSmartStore, you will need to capture access tokens and refresh tokens from a real session and hand code them in your JavaScript app. You’ll also need these tokens to initialize the `force.js` JavaScript toolkit.

### Considerations and Limitations

- MockSmartStore doesn’t encrypt data and is not meant to be used in production applications.
- MockSmartStore currently supports the following forms of Smart SQL queries:

- `SELECT...WHERE...`. For example:

  ```js
  SELECT {soupName:selectField} FROM {soupName} WHERE {soupName:whereField} IN (values)
  ```

- `SELECT...WHERE...ORDER BY...`. For example:

  ```js
  SELECT {soupName:_soup} FROM {soupName} WHERE {soupName:whereField} LIKE 'value' ORDER BY LOWER({soupName:orderByField})
  ```

- `SELECT count(*) FROM {soupName}`

MockSmartStore doesn’t directly support the simpler types of Smart SQL statements that are handled by the `build*QuerySpec()` functions. Instead, use the query spec function that suits your purpose.

## See Also

- [Retrieving Data from a Soup](offline-query.md)
