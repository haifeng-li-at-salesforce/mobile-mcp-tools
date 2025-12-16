# Using Mobile Sync in Hybrid and React Native Apps

Mobile Sync for JavaScript is a Mobile SDK library that represents Salesforce objects as JavaScript objects. To use Mobile Sync in JavaScript, you create models of Salesforce objects and manipulate the underlying records just by changing the model data. If you perform a SOQL or SOSL query, you receive the resulting records in a model collection rather than as a JSON string.

In hybrid apps, Mobile SDK provides two options for using Mobile Sync.

- `com.salesforce.plugin.mobilesync`: The Mobile Sync plug-in offers basic “sync up” and “sync down” functionality. This plug-in exposes part of the native Mobile Sync library. For simple syncing tasks, you can use the plug-in to sync records rapidly in a native thread, rather than in the web view.
- `mobilesync.js`: The Mobile Sync JavaScript library provides a Force.SObject data framework for more complex syncing operations. This library is based on `backbone.js`, an open-source JavaScript framework that defines an extensible data modeling mechanism. To understand this technology, browse the examples and documentation at [backbonejs.org](http://www.backbonejs.org).

<!-- In React native, you don’t have the `com.salesforce.plugin.mobilesync` option. -->

A set of sample hybrid applications demonstrate how to use Mobile Sync. Sample apps in the `hybrid/SampleApps/AccountEditor/assets/www` folder demonstrate how to use the Force.SObject library in `mobilesync.js`:

- Account Editor (`AccountEditor.html`)
- User Search (`UserSearch.html`)
- User and Group Search (`UserAndGroupSearch.html`)

The sample app in the `hybrid/SampleApps/SimpleSync` folder demonstrates how to use the Mobile Sync plug-in.
