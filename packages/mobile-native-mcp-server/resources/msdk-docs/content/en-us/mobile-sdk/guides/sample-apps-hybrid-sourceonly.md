# Hybrid Sample Apps (Source Only)

Mobile SDK provides only the web app source code for most hybrid sample apps. You can build platform-specific versions of these apps using the Cordova command line. To get the source code, clone the [SalesforceMobileSDK-Shared](https://github.com/forcedotcom/SalesforceMobileSDK-Shared) GitHub repository and look in the `samples` folder. To build these hybrid apps for specific mobile platforms, follow the instructions at [Build Hybrid Sample Apps](hybrid-samples-build.md).

- **accounteditor**: Uses the Mobile Sync to access Salesforce data.
- **contactexplorer**: Uses Cordova to retrieve local device contacts. It also uses the `force.js` toolkit to implement REST transactions with the Salesforce REST API. The app uses the OAuth2 support in Salesforce SDK to obtain OAuth credentials and then propagates those credentials to `force.js` by sending a javascript event.
- **fileexplorer**: Demonstrates the Files API.
- **mobilesyncexplorer**: Demonstrates using `mobilesync.js`, rather than the Mobile Sync plug-in, for offline synchronization.
- **notesync**: Uses non-REST APIs to retrieve Salesforce Notes.
- **simplesyncreact:**: Demonstrates a React Native app that uses the Mobile Sync plug-in.
- **smartstoreexplorer**: Lets you explore SmartStore APIs.
- **userandgroupsearch**: Lets you search for users in groups.
- **userlist**: Lists users in an organization. This is the simplest hybrid sample app.
- **usersearch**: Lets you search for users in an organization.
- **vfconnector**: Wraps a Visualforce page in a native container. This example assumes that your org has a Visualforce page called `BasicVFTest`. The app first obtains OAuth login credentials using the Salesforce SDK OAuth2 support and then uses those credentials to set appropriate webview cookies for accessing Visualforce pages.
