# Using Maven to Update Mobile SDK Libraries in Android Apps

Beginning in Mobile SDK 9.2.0, native Android libraries are available at Maven Central. To consume a Mobile SDK library, you add a single line to the dependencies section of your app’s `build.gradle` file.

To import a library from [Maven Central](https://search.maven.org/search?q=SalesforceSDK) with Gradle, you add a `implementation` statement to the `dependencies` section of your project’s `build.gradle` file. To update a library with Gradle, you simply change its version number in the `implementation` statement to the updated version, and then resync your libraries.

## The Details

Here’s what a typical Gradle `dependencies` section looks like:

```
dependencies {
    classpath 'com.android.tools.build:gradle:7.0.2'
}
```

An `implementation` statement takes the form:

```
implementation '<groupID>:<artifactID>:<version>'
```

For Mobile SDK libraries:

- _`groupID`_ is `'com.salesforce.mobilesdk'`
- _`artifactID`_ is `SalesforceSDK`, `SalesforceHybrid`, `SmartStore`, or `MobileSync`
- _`version`_ is _`x.x.x`_ (for example, `9.2.0`)

The `implementation` statement imports not only the specified library, but also all its dependencies. As a result, you never have to explicitly compile SalesforceAnalytics, for example, because every other library depends on it. It also means that you can get everything you need with just one statement.

To import Mobile SDK 9.2.0 libraries, add one of the following lines:

- For the SalesforceSDK library:

  `implementation 'com.salesforce.mobilesdk:SalesforceSDK:9.2.0'`

- For the SmartStore library (also imports the SalesforceSDK library):

  `implementation 'com.salesforce.mobilesdk::9.2.0'`

- For the Mobile Sync library (also imports the SalesforceSDK and SmartStore libraries):

  `implementation 'com.salesforce.mobilesdk:MobileSync:9.2.0'`

- For the SalesforceHybrid library (imports the SalesforceSDK, SmartStore, Mobile Sync, and Apache Cordova libraries):

  `implementation 'com.salesforce.mobilesdk:SalesforceHybrid:9.2.0'`

- For the SalesforceReact library (imports the SalesforceSDK, SmartStore, and Mobile Sync libraries):

  `implementation 'com.salesforce.mobilesdk:SalesforceReact:9.2.0'`

:::note

- Mobile SDK enforces a few coding requirements for proper initialization and configuration. To get started, see [Android Application Structure](android-application-structure.md).

:::
